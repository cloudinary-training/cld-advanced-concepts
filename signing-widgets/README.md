---
title: "Objectives"
metaTitle: "Objectives"
metaDescription: "Objectives"
---


## Widgets

- What are the Cloudinary Widgets? Upload and Media Library
- Look at functionality and differences in widgets
- Why do the widgets offer a signing option?
- Use server side rendering to render signed widgets
- Use server APIs to provide signature and timestamp
- Become familiar with the signing functions and how to include them in an application
- Bonus: how to create an API that will sign your URLs

As you study the images of the widgets below, you'll recognize them as looking identical to what is provided in the Cloudinary DAM.  When you instruct the creation of these widgets in your code, hidden iframes are set up in your browser memory and are made visible by a user clicking on a button. 

## Media Library  
![Media Library Widget](https://res.cloudinary.com/cloudinary-training/image/upload/v1588093366/book/media-library.png)

## Upload
![Upload Widget](https://res.cloudinary.com/cloudinary-training/image/upload/v1588093116/book/upload-widget.png)


## How to sign widgets

In this module we'll create a server that contains modules for signing the Upload and Media Library widgets.  We'll provide two ways to sign the widgets: 

1. Server side rendering  
2. APIs
---
title: "Signed vs. Unsigned"
metaTitle: "Signed vs. Unsigned"
metaDescription: "Signed vs. Unsigned"
---



It is possible to render and use both signed and unsigned widgets.  In order to better understand the difference, we'll code both of them.  

## Signed vs. Unsigned Widget Input

![Signed vs Unsigned Inputs](https://res.cloudinary.com/cloudinary-training/image/upload/v1588093966/book/unsigned-v-signed-input.png)

The two widgets require different inputs, and noticed that both widgets require the **API_SECRET** and a **timestamp** in order to be signed.  The API_SECRET is a part of your Cloudinary credentials that must remain hidden.  You can't supply it in front end code.  You'll either need to use a server or a serverless function to write code that uses the API_SECRET.  Your CLOUDINARY_URL contains the API_SECRET, so this is a good value to add to your environment variables.  Remember, you can access the individual variables from the CLOUDINARY_URL by using the SDK.  

```JavaScript
require('dotenv').config()
const cloudinary = require('cloudinary').v2
const cloudName = cloudinary.config().cloud_name
const apiSecret = cloudinary.config().api_secret
const apiKey = cloudinary.config().api_key

```
## Unsigned Credentials
Notice that the Media Library Widget uses the API_KEY and the Upload Widget uses an unsigned preset for front end credentials when they are unsigned.  This is sufficient for may work-flows.  Whether you're using signed or unsigned widgets, its a good idea to host them on web pages that are authenticated in some way or behind a firewall because they allow you to modify the contents of your cloud.

The API_KEY and unsigned presets can be managed by changing their values: the API_KEY can be reset and the unsigned presets can be deleted or renamed.  Even with such management, they signed widgets will be more secure than the unsigned widgets because they are rendered with a timestamp and are only valid for use 1 hour from when they are rendered.
---
title: "Unsigned Example"
metaTitle: "Unsigned Example"
metaDescription: "Unsigned Example"
---



## Unsigned Widgets

Before we look at how to sign widgets, let look at how to set up unsigned widgets.  The code for the front end is very similar whether you are signing or not.  We'll see that the inputs for the Upload and Media Library widgets are different, but that the organization of the front end code and libraries is similar.  

## Credentials for Unsigned Widgets

![Credentials for Unsigned Widgets](https://res.cloudinary.com/cloudinary-training/image/upload/book/unsigned-widgets.png)

## Exercise: Coding Unsigned Widgets  

Create an unsigned preset “widget-preset” for upload widget: 

```bash
node signing-widgets/unsigned-example/create-preset.js
```


Locate `signing-widget/unsigned-example/script.js` and update with the following

```javascript
const cloudName = '<cloudname>'
// upload widget needs unsigned preset
const uploadPreset = 'widget-preset'
// media library widget needs apiKey and user email
const apiKey = '<api key>'
const userEmail = '<account email>'

```

## Code Snippets

Set up the library and client JavaScript imports.

```html
 <!-- upload widget -->
    <script
      src="https://widget.cloudinary.com/v2.0/global/all.js"
      type="text/javascript">
    </script>
  
    <!-- media library -->
    <script src="https://media-library.cloudinary.com/global/all.js"
      type="text/javascript">
    </script>

    <!-- instantiate widgets -->
    <script src="script.js"
     type="text/javascript">
    </script>

```  

### Upload Widget

#### HTML

For the upload widget, we'll render a button.  We'll see in the JavaScript that we can attach a click event handler to this button.  We'll also render an id'd image tag.  Once the image is uploaded, we'll receive the upload response containing the secure_url from Cloudinary. We can apply the secure_url to the image `src` to get visual confirmation that the upload was successful.

```html
<h2>Upload Widget</h2>
    <div>
      <button id="upload_widget" class="cloudinary-button">Upload files</button>
    </div>
    <div>
      <img id="uploaded" />
    </div>
```

### Media Library Widget 

For the Media Library Widget, we'll render an id'd block element, in this case a `div`. The media library code will take care of setting up the event handler.  There is no need to provide a visual cue of activities that take place on the media library, since you can see the effect of the changes as you make them with this widget.

```html 
 <h2>Media Library</h2>
    <div id="ml-button"></div>

```

#### Client JavaScript

First we can set up code that will wait for the JavaScript libraries request in the HTML to load.  Then we call functions to set up the widgets.

```javascript
document.addEventListener('DOMContentLoaded', async () => {
  renderUploadWidget()
  renderMediaLibrary()
})
```

##### Upload Widget  
With the credentials setup, we can supply the options.

```javascript
const uploadOptions = {
  cloudName: cloudName,
  uploadPreset: uploadPreset
}
```

Next we can define a callback function that will test the callback event.  The upload widget fires a number of events that allow the developer to monitor the callback process.  In this code we test for 'success' and the apply the secure_url from the response to the image tag already rendered.

```javascript
const processResults = (error, result) => {
  if (!error && result && result.event === 'success') {
    console.log(result)
    // if successful renders to page
    document.querySelector('#uploaded').src = result.info.secure_url
  }
}
```

Finally we instantiate the upload widget and pass it the options and callback defined above.  Then we add a click event to the button rendered and call the widget's `open()` function.

```javascript
const renderUploadWidget = () => {
  const myWidget = window.cloudinary.createUploadWidget(
    uploadOptions,
    processResults
  )
  document
    .getElementById('upload_widget')
    .addEventListener('click', () => myWidget.open(), false)
}
```

#### Media Library Widget

With the credentials setup, we can supply the options.

```javascript
const mlOptions = {
  cloud_name: cloudName,
  api_key: apiKey,
  username: userEmail,
  button_class: 'myBtn',
  button_caption: 'Select Image or Video'
}
```
We create an insert handler that will log back to the client and assets inserted while working in the Media Library.

```javascript
const insertHandler = data => {
  data.assets.forEach(asset =>
    console.log('Inserted asset:', JSON.stringify(asset, null, 1))
  )
}
```

Finally, we'll create the media library using the options and insert handler created above, as well as supplying it the element rendered in html where we want the media library to appear on the page.

```javascript
const renderMediaLibrary = () => {
  window.cloudinary.createMediaLibrary(
    mlOptions,
    {insertHandler: insertHandler},
    document.querySelector('#ml-button')
  )
}
```



---
title: "Signing Application"
metaTitle: "Signing Application"
metaDescription: "Signing Application"
---



In order to sign the assets we need to use API_SECRET which should only be access from a backend application.  We're going to build a node **express** server and use the **pug** templating engine to generate signature on server side rendered pages and APIs that can be accessed from front end applications via AJAX.

## Signing Application Architecture

![Signing App Architecture](https://res.cloudinary.com/cloudinary-training/image/upload/v1588095246/book/signing-app-architecture.png)

## Exercise: Server Routes

Let's start by looking at the routes.  In order to test these out, you'll need to get your local server running.  Start by copying your `.env` file from the root of the project into the `signing-widgets/server` directory.

```bash
cp .env signing-widgets/server  
cd signing-widgets/server
node app.js
```

Open in browser: [http://localhost:3000](http://localhost:3000)

Now try out the routes listed below.


![Signing Widgets Server](https://res.cloudinary.com/cloudinary-training/image/upload/book/signing-widgets-routes.png)

## Comparing Backend and Frontend Inputs for the Two Widgets

We've seen when looking at the code for unsigned widgets that there are similiarities between these widgets.  As we move into looking at code for the signed widgets, let compare the inputs for each of the widgets from the perspective of backend and frontend.  

Using the server we'll be supplying both front end and backend inputs.  For the Server Side rendering we'll render both via our templating engine.  For the API, we'll render a static HTML page with the client scripts that make AJAX calls to the APIs to get the inputs supplied by the signing module and the CLOUDINARY_URL.

### Back End Inputs

![Back End Inputs for both widgets](https://res.cloudinary.com/cloudinary-training/image/upload/book/signing-backend-compare.png)


### Front End Inputs

![Front End Inputs for both widgets](https://res.cloudinary.com/cloudinary-training/image/upload/v1588109615/book/signing-frontend-compare.png)

## Server Code Walkthrough

We'll view the code that renders signatures in three layers, starting at the bottom with `app.js`, moving up through the `/routes` and ending at the `module` layer where the timestamps and signatures are actually calculated.  Then we'll look at the static `index.html` and see how to make AJAX calls to the server APIs to get the signatures for a front end example.  

![3 layers](https://res.cloudinary.com/cloudinary-training/image/upload/v1588110312/book/signing-three-layers.png)

### app.js  

Starting with `app.js`, look at how we designate the routing we've experimented with.

![app.js](https://res.cloudinary.com/cloudinary-training/image/upload/h_400/book/signing-code-app.png)  

First we load the routing code.

```javascript
const mlRouter = require('./routes/ml')
const uploadRouter = require('./routes/upload')
const signmedialibRouter = require('./routes/signml')
const signuploadRouter = require('./routes/signupload')

```

Then we map the URI to the route.

```javascript
app.use('/ml', mlRouter)
app.use('/upload', uploadRouter)
app.use('/api/signml', signmedialibRouter)
app.use('/api/signupload', signuploadRouter)

```  

We tell express to look for views in the views directory and set up the pug templating engine.

```javascript
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

```

We tell express to serve static files from the public directory.

```javascript
app.use(express.static('public'))
```

### routes

Note: These routes should be served from authenticate pages since they provide signatures for widgets that allow the cloud to be changed.

Moving up to the `routes` dirextory, you'll find 4 routes: `ml` and `upload` are the server side rendered pages and `signml` and `signupload` are the APIs.

![routes](https://res.cloudinary.com/cloudinary-training/image/upload/h_400/book/signing-code-routes.png)  

#### Upload Widget Routes

Compare the routes used for the upload widget to render a page with signed widgets versus rendering JSON with the signature an other data needed by the front end.  one of the main differences is that the server side page uses a `res.render` while the API uses a `res.json`.  Both of these routes use the same module to get the signature and timestamp.  The rendering route passes data off to the pug engine to produce a web page response, while the API route passes data back to the project as JSON.

![Upload Widget Routes](https://res.cloudinary.com/cloudinary-training/image/upload/v1588113317/book/signing-compare-upload-routes.png)

#### Media Library Widget Routes

Compare the routes used for the media library widget to render a page with signed widgets versus rendering JSON with the signature an other data needed by the front end.  one of the main differences is that the server side page uses a `res.render` while the API uses a `res.json`.  Both of these routes use the same module to get the signature and timestamp.  The rendering route passes data off to the pug engine to produce a web page response, while the API route passes data back to the project as JSON.

![Media Library Widget Routes](https://res.cloudinary.com/cloudinary-training/image/upload/v1588114243/book/signing-compare-media-library-routes.png)

### modules

The actual creation of the signatures occurs in the module layer.  First a timestamp is generated because widget signatures are time scoped to one hour.  A "string to sign" is created based on verification requirements.  Then the string is hashed using one of the encryption algorithms.  The SHA1 encrypted string is UTF8 encoded.  

![modules](https://res.cloudinary.com/cloudinary-training/image/upload/h_400/book/signing-code-modules.png) 

We're coding different modules for each of the widgets because they have different back end and front end inputs. 

![two modules](https://res.cloudinary.com/cloudinary-training/image/upload/book/signing-code-two-modules.png)

 Each module grabs the data it needs from CLOUDINARY_URL and the USER_NAME environment variable.  Then it generates the data needed by the front end and returns is as an object.

 ### views

![views](https://res.cloudinary.com/cloudinary-training/image/upload/h_400/book/signing-code-views.png)

When rendering the views we start with `layout.pug` and then extend that layout to create the media library page with `ml.pug` and the upload page with `upload.pug`.
 
 #### layout.pug  

The layout is setting up script tags to pull in the libraries from CDNs.  It also renders a navigation bar and media library widget is rendered to the home page while upload widget has it's own page.  


 ```javascript
doctype html
html
  head
    title= title
    link(rel='stylesheet', href='/stylesheets/style.css')
    script(src='https://widget.cloudinary.com/v2.0/global/all.js'  type="text/javascript")
    script(src='https://media-library.cloudinary.com/global/all.js'  type="text/javascript")
  body
    ul.nav
      li: a(href='/ml') Home
      li: a(href='/upload') Upload
    block content

 ```

 #### ml.pug  

 The script for rendering the Media Library widget should look a little familar - somewhat like the unsigned widget, but the inputs include signature and timestamp.

 ```javascript
 extends layout

block content
  h1= title
  p Welcome to #{title}
  p Timestamp: #{timestamp}
  p Signature: #{signature}
  div
  button#ml-button

  script(type="text/javascript").
    document.addEventListener("DOMContentLoaded",e => {
      const options = {
      cloud_name: "#{cloudname}",
      api_key: "#{apikey}",
      username: "#{username}",
      timestamp: "#{timestamp}",
      signature: "#{signature}",
      button_class: "ml-btn",
      button_caption: "Open Media Library",
      insert_transformation: true
      }

      const insertHandler = data => {
        data.assets.forEach(asset =>
          console.log('Inserted asset:', JSON.stringify(asset, null, 1))
        )
      }
      window.cloudinary.createMediaLibrary(
        options,
        insertHandler,
        '#ml-button'
      )
    })

 ```

 #### upload.pug  

 The upload widget page extends the layout like the media library page.  It renders the necessary HTML and JavaScript to create the upload widget, along with the data needed as input, which includes the signature and timestamp.

 ```javascript
extends layout

block content
  h1= title
 
  h2 Welcome to #{title}
  p Timestamp: #{timestamp}
  p Signature: #{signature}
  
  div
    button#upload_widget.cloudinary-button Upload files
  div
    img#uploaded

  script(type="text/javascript").
    document.addEventListener("DOMContentLoaded",e => {
      const options = {
        cloudName: "#{cloudname}",
        apiKey: "#{apikey}",
        uploadSignatureTimestamp: "#{timestamp}",
        uploadSignature: "#{signature}",
        cropping: false
      };
      const processResults = (error, result) => {
        if (!error && result && result.event === 'success') {
          console.log(result)
          document.querySelector('#uploaded').src = result.info.secure_url
        }
      }

      const myWidget = window.cloudinary.createUploadWidget(
        options,
        processResults
      )
      document
        .getElementById('upload_widget')
        .addEventListener('click', () => myWidget.open(), false)
    })

 ```


 ### static page with AJAX client calling API

 ![views](https://res.cloudinary.com/cloudinary-training/image/upload/h_400/book/signing-code-public.png)

Finally we look at rendering the static page and using `fetch` to make AJAX calls to the server APIs.  The `public/index.html` should look something like the unsigned `index.html` that we saw at the beginning of this module.  The public folder contains the the client scripts `ml-client` and `upload-client` that contain the code to get fetch the date from the APIs and create the widgets.  


#### index.html

```html
<h2>Upload Widget</h2>
  <div><button id="upload_widget" class="cloudinary-button">Upload files</button></div>
  <div><img id="uploaded" /></div>

<h2>Media Library Widget</h2>
  <div><button id="ml-button"></button></div>

<script src="https://widget.cloudinary.com/v2.0/global/all.js" type="text/javascript"></script>
<script src="https://media-library.cloudinary.com/global/all.js" type="text/javascript"> </script>
<script src="./js/upload-client.js" type="text/javascript"></script>
<script src="./js/ml-client.js" type="text/javascript"></script>
```

#### upload-client.js

```javascript
document.addEventListener('DOMContentLoaded', async () => {
  const response = await fetch('/api/signupload')
  const data = await response.json()

  const options = {
    cloudName: data.cloudname,
    apiKey: data.apikey,
    uploadSignatureTimestamp: data.timestamp,
    uploadSignature: data.signature,
    cropping: false
  }

  const processResults = (error, result) => {
    if (!error && result && result.event === 'success') {
      console.log(result)
      document.querySelector('#uploaded').src = result.info.secure_url
    }
  }

  const myWidget = window.cloudinary.createUploadWidget(
    options,
    processResults
  )
  document
    .getElementById('upload_widget')
    .addEventListener('click', () => myWidget.open(), false)
})


```


#### ml-client.js

```javascript
document.addEventListener('DOMContentLoaded', async () => {
  const response = await fetch('/api/signml')
  const data = await response.json()

  const options = {
    cloud_name: data.cloudname,
    api_key: data.apikey,
    username: data.username,
    timestamp: data.timestamp,
    signature: data.signature,
    button_class: 'ml-btn',
    button_caption: 'Open Media Library',
    insert_transformation: true
  }

  const insertHandler = data => {
    data.assets.forEach(asset =>
      console.log('Inserted asset:', JSON.stringify(asset, null, 1))
    )
  }
  window.cloudinary.createMediaLibrary(
    options,
    {insertHandler: insertHandler},
    '#ml-button'
  )
})

```












---
title: "Bonus: API Sign URL"
metaTitle: "Bonus: API Sign URL"
metaDescription: "Bonus: API Sign URL"
---



## Create an API that could help with asset signing from the front end
Since we're creating APIs to help with securing widgets via AJAX, in this bonus section we look at creating an API that can make it easy to sign a URL from the front end.  If you make this API call available on the front end, you'll want any pages using it to be available only behind a firewall or using token authentication.

Remember that you don't want your front end code to have access to API_SECRET, but if you want to take advantage of code the relies on API_SECRET like the Cloudinary Node SDK, you can run that code in a web API or a serverless function that has access to environmental variables.

In this section, we'll set up a server that takes an object with two strings: public ID and transformation.  The transformation is an object of key value pairs where the key is a valid transformation option.  

### Use Case

You're using a front end library or framework (think Vue.js, Angular, React, jQuery), and you need to sign your URLs.

You can use an HTTP client to call your API with a public ID and a transformation.

### Exercise: Create a server to provide API that could sign a URL

Copy your .env file to `signing-widgets/bonus`.  Upload an image for this exercise. Go into the `signing-widgets/bonus` directory and install packages.

```bash
cp .env signing-widgets/bonus
node signing-widgets/bonus/upload-image.js
cd signing-widgets/bonus
run npm install
run node app.js

```
Open the server in a browser and see that that GET tells you need to post to the `/api/signurl` route.

```javascript
{"message":"post to /api/signurl an object with public_id and transformation keys"}
```

You can use cURL to post an object with a public ID and a transformation to the API.

```bash
curl --location --request POST 'http://localhost:3000/api/signurl' \
--header 'Content-Type: application/json' \
--data-raw '{
 "public_id":"tiger-lilly",
 "transformation":{
   "type": "upload",
   "width": 400,
   "quality": "auto",
   "fetch_format": "auto",
   "secure": "true",
   "sign_url": "true"
 }
}
'
```

You should this response.

```bash
{"status":"accepted","url":"https://res.cloudinary.com/pictures77/image/upload/s--dlCfufWD--/f_auto,q_auto,w_400/tiger-lilly"}

```

So, we input a JSON object 

```javascript
{
 "public_id":"tiger-lilly",
 "transformation":{
   "type": "upload",
   "width": 400,
   "quality": "auto",
   "fetch_format": "auto",
   "secure": "true",
   "sign_url": "true"
 }
}
```
and we got back a signed URL.

What do you think happened in our API?  We called the node SDK url helper. Let's look at the server code.

### Server code snippets  

We begin by setting up an express server and we use body parser to parse the object that we're posting.

```javscript
require('dotenv').config()
const cloudinary = require('cloudinary').v2
const bodyParser = require('body-parser')

const express = require('express')
const app = express()
app.use(bodyParser.json())

const port = 3000

```

Our GET endpoint just informs the user that they should use the `/api/signurl`. 

```javascript
app.get('/', (req, res) => {
  res.json({
    message:
      'post to /api/signurl an object with public_id and transformation keys'
  })
})

```

Now, the API is not really signing the URL.  The input is requesting that the URL be signed by providing the `sign_url: true`.  I leave it to you to create an API that adds that option to any URL.

The post pulls the public id and transformation out of the input and then calls `cloudinary.url` to create a signed URL.

 ```javascript
app.post('/api/signurl', (req, res) => {
  console.log('req.body', req.body)
  console.log(req.body.public_id)
  console.log(req.body.transformation)

  const url = cloudinary.url(req.body.public_id, req.body.transformation)
  console.log(url)
  res.json({ status: 'accepted', url: url })
})

 ```



---
title: "Resources"
metaTitle: "Resources"
metaDescription: "Resources"
---

Generating a signature: 

https://cloudinary.com/documentation/upload_images#generating_authentication_signatures

