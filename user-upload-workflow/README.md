---
title: "Objectives"
metaTitle: "Objectives"
metaDescription: "Objectives"
---

This is the beginning of three modules where use cases or requirements are presented and we see how to solve them through upload workflows.  The purpose of this module is help you see how to break down project requirements into solutions that take advantage of Cloudinary features and SDKs. In many cases there is more than one way to solve these problems.  Cloudinary also provides support for problem solving through the [Support Engineers](support@cloudinary.com), the Customer Success Managers, and the Solution Architects. 

In solving the real life problems in this module you'll be able to apply many of the concepts you've learned about in this course.

---
title: "Image Upload Workflows"
metaTitle: "Image Upload Workflows"
metaDescription: "Image Upload Workflows"
---

The objectives below represent solutions to problems that have been asked about by Cloudinary customers.  We'll work through solutions to each of these problems.  

1. Create animation from static images
2. Create responsive signed images
3. Use an API that will list all assets with the same SKU
4. Sharing a set of large images
5. Remote Functions


## Animation

**Use Case:** You want a carousel-like gif that scrolls through a set of images.

The **multi** method to easily turn a set of images into a gif or animation format that resembles an image carousel
gather images based on a shared **tag**.

- control the delay between transitions from one image to the next
- images are ordered based on alphabetical order of public ids
- large images not allowed so use compression before creating the gif

### 3 step process

1.  Create an upload prest that will crop and compress the images we want to use for this animation.  We'll add a tag to each of them so that they can be gathered up for the animation.  We'll use the filename as the public id.  You may want to consider an id naming scheme if you want to enforce a particular order.

Exercise: 
This preset will add the tag: "sea-life"  to all uploads.  We'll also crop and compress all images.

```bash
node user-upload-workflow/animation/create-preset.js
```

```javascript
cloudinary.api
  .create_upload_preset({
    name: 'sea-life-preset',
    use_filename: true,
    unique_filename: false,
    unsigned: false,
    transformation: [
      {
        width: 400,
        height: 300,
        crop: 'fit'
      },
      {
        fetched_format: 'auto',
        quality: 'auto'
      }
    ],
    tags: 'sea-life',
    allowed_formats: 'jpg'
  })

```

2.  Upload the set of images from local drive using the preset. 


```bash
node user-upload-workflow/animation/upload-images-for-transformation.js
```

```javascript
const assets = [
  './assets/images/dolphin.jpg',
  './assets/images/goldfish.jpg',
  './assets/images/koi.jpg',
  './assets/images/shark.jpg',
  './assets/images/killer-whale.jpg'
]
for (const asset of assets) {
  cloudinary.uploader
    .upload(asset, {
      upload_preset: 'sea-life-preset'
    })
    .then(uploadResult => console.log(uploadResult))
    .catch(error => console.error(error))
}
```

Which image will show up first in the animation?


3.  Use the **multi** method to create the **.gif** file in the cloud.  The **multi** method is part of the **Upload API**.  It looks for a specified tag and creates a gif using that tag as it's name. 

```bash
node user-upload-workflow/animation/create-animation-delay.js
```

We're add a 2 second delay expressed in milli-seconds.

```javascript
cloudinary.uploader
  .multi('sea-life', { delay: 2000 })
  .then(result => {
    console.log(result)
    open(result.secure_url)
  })
  .catch(error => {
    console.log(error)
  })

```
Voila!

![sea life animation](https://res.cloudinary.com/pictures77/image/multi/dl_2000/v1589314918/sea-life.gif)

___

## Responsive Signed Images


**Use Case:** You want to use private or authenticated delivery types to create a set of signed responsive images.

Recall that the signature is based on the public id and the transformations.  When creating URLs for responsive images, they will have unique sizes based on the number of devices and their pixel support.  The responsive option can create these transformations for you, but they must be signed after they are generated.  

We'll create, sign and test in 3 steps:

1. Upload the image with the responsive_breakpoints parameter.  In the parameter you can specify min and max width as well as step size.  You can add other incoming transformations as well.

```bash
node user-upload-workflow/signed-responsive/upload-create-signed-urls.js
```
The `responsive_breakpoints` option allows us to create a set of URLs based on min and max width with a `byte_step`.  By adding the `sign_url:true` option, we can generate a set signed, derived URLs that are accessible in the response.  

```javascript
cloudinary.uploader
  .upload('./assets/images/blue-chair.jpg', {
    public_id: 'blue-chair',
    type: 'authenticated',
    invalidate: true,
    sign_url: true,
    responsive_breakpoints: {
      create_derived: true,
      bytes_step: 20000,
      min_width: 200,
      max_width: 1000,
      transformation: { crop: 'fill', aspect_ratio: '16:9', gravity: 'auto' }
    }
  })

```


2. Extract URLs from array of signed urls and use in the `srcset` of your picture tag.

We log the URLs obtained from the responsive_breakpoints array in the response.

```javascript
 .then(result => {
    console.log(result)
    const urls = result.responsive_breakpoints[0].breakpoints.map(
      item => item.secure_url
    )
    console.log(urls)
  })
  .catch(error => console.log(error))
```

The set of URL's look like this:

```javscript
[
  "https://res.cloudinary.com/cloudinary-training/image/authenticated/s--R44wFa4H--/ar_16:9,c_fill,g_auto/c_scale,w_1000/v1586049070/blue-chair.jpg",
  "https://res.cloudinary.com/cloudinary-training/image/authenticated/s--L-_A0Qli--/ar_16:9,c_fill,g_auto/c_scale,w_984/v1586049070/blue-chair.jpg",
  "https://res.cloudinary.com/cloudinary-training/image/authenticated/s--ENxMLGnv--/ar_16:9,c_fill,g_auto/c_scale,w_876/v1586049070/blue-chair.jpg",
  "https://res.cloudinary.com/cloudinary-training/image/authenticated/s--L6OUUBLF--/ar_16:9,c_fill,g_auto/c_scale,w_758/v1586049070/blue-chair.jpg",
  "https://res.cloudinary.com/cloudinary-training/image/authenticated/s--O98zP3cH--/ar_16:9,c_fill,g_auto/c_scale,w_616/v1586049070/blue-chair.jpg",
  "https://res.cloudinary.com/cloudinary-training/image/authenticated/s--pmLC6hpC--/ar_16:9,c_fill,g_auto/c_scale,w_437/v1586049070/blue-chair.jpg",
  "https://res.cloudinary.com/cloudinary-training/image/authenticated/s--ml_xOQob--/ar_16:9,c_fill,g_auto/c_scale,w_200/v1586049070/blue-chair.jpg")
]


````

3. In the next step we select some or all of the signed URL's add render them in a web page.  You can test this by adding the URL's to the `<source>` tags in a `<picture>` tag. 

```html
<picture>
  <source
    media="(min-width: 1000px)"
    srcset="https://res.cloudinary.com/cloudinary-training/image/authenticated/s--R44wFa4H--/ar_16:9,c_fill,g_auto/c_scale,w_1000/v1586049070/blue-chair.jpg"
  />
  <source
    media="(min-width: 700px)"
    srcset="https://res.cloudinary.com/cloudinary-training/image/authenticated/s--L6OUUBLF--/ar_16:9,c_fill,g_auto/c_scale,w_758/v1586049070/blue-chair.jpg"
  />
  <source
    media="(min-width: 1px)"
    srcset="https://res.cloudinary.com/cloudinary-training/image/authenticated/s--ml_xOQob--/ar_16:9,c_fill,g_auto/c_scale,w_200/v1586049070/blue-chair.jpg"
  />
  <img src='https://res.cloudinary.com/cloudinary-training/image/authenticated/s--R44wFa4H--/ar_16:9,c_fill,g_auto/c_scale,w_1000/v1586049070/blue-chair.jpg' alt="blue chair"/>
</picture>
```

After you add your derived URLs to the the [web page](https://cloudinary-training.github.io/cld-advanced-concepts/user-upload-workflow/signed-responsive/index.html), open it in the browser and inspect the network tab.  If you shrink your viewport, you'll see the appropriate images rendered based on viewport size.

In the example, where only 3 signed responsive images were added to the index.html, you can see that there are 3 different sized images rendered as the windows was dragged from full screen to a minimum width.

![responsive signed images](https://res.cloudinary.com/cloudinary-training/image/upload/v1589316655/book/wf-responsive-signed.png)

---

## List Assets Per Tag

We can list all asset with the same tag using an API.  

**Use case**:  We are uploading multiple images and/or video with the same product.  We want to be able to get a list of all assets with the same SKU.

We start by uploading a set of assets and assigning them the same tag.  In this example we have 2 images of the same product and we add tags containing the SKU that represents the product to each image in a tag.

```bash
node user-upload-workflow/list-assets-per-sku/upload-images-with-skus.js
```
You can imagine that the SKU data below comes from an external PIM (Product Information System).

```javascript
const data = {
  description: 'Black Zebra Purse',
  sku: 'sku12345',
  assets: [
    './assets/images/black-purse-1.jpg',
    './assets/images/black-purse-2.jpg'
  ]
}
for (const asset of data.assets) {
  cloudinary.uploader
    .upload(asset, {
      use_filename: true,
      unique_filename: false,
      tags: data.sku
    })
    .then(uploadResult => {
      console.log(uploadResult)
      open(uploadResult.secure_url)
    })
    .catch(error => console.error(error))
}

```
With product tagged by SKU we simply apply the SKU to the tag gathering API.

```bash
node user-upload-workflow/list-assets-per-sku/get-asset-list-per-sku.js
```
This API returns a JSON file with all of the information about items containing the tag.

```javascript
const data = {
  sku: 'sku12345'
}
const api = `https://res.cloudinary.com/cloudinary-training/image/list/${data.sku}.json`
open(api)
```
The data returned in a browser request for this example will look like this:

```javascript
{
"resources": [
    {
    "public_id": "black-purse-2",
    "version": 1585163079,
    "format": "jpg",
    "width": 3300,
    "height": 2479,
    "type": "upload",
    "created_at": "2020-03-25T19:04:39Z"
    },
    {
    "public_id": "black-purse-1",
    "version": 1585163077,
    "format": "jpg",
    "width": 3300,
    "height": 2803,
    "type": "upload",
    "created_at": "2020-03-25T19:04:37Z"
    }
  ],
  "updated_at": "2020-04-10T17:26:38Z"
}
```
You can pull together a set of assets by tag with this API.

## Sharing Photos

**Use Case:** 
You’re working with a photographer who has a set of photos that the design team wants to look at while designing a website.  The photographer would like to apply a water mark to the images before sharing.

We'll look at 3 steps to achieve this.

1. Provide a preset that allows the photographer to upload the set as compressed images with a watermark. 

Upload the logo to be used as as a watermark. The preset also places all the images in their own folder and tags them.  This tag will help in creating the sharable zip file. 

```bash
node user-upload-workflow/share-images/upload-logo.js
```

Create the preset 
```bash
node user-upload-workflow/share-images/create-preset
```

```javascript
cloudinary.api
  .create_upload_preset({
    name: 'photo-share',
    use_filename: true,
    unsigned: false,
    tags: 'photo-share',
    folder: 'photo-share',
    transformation: [
      {
        crop: 'fit',
        width: 400,
        height: 300
      },
      {
        overlay: 'logo-big',
        width: 100,
        gravity: 'south_east',
        opacity: 50
      },
      {
        quality: 'auto',
        fetch_format: 'auto',
        dpr: '2.0'
      }
    ]
  })
```


2. Incorporate the upload that uses this preset into a script that creates a zip file of these images that can be mailed or setup as a link on a web page.

```bash
node user-upload-workflow/share-images/upload-images.js
```

In the script below, we're specifying only 2 images.  All images will be compressed and watermarked by the `photo-share` preset instructions.


```javascript
const uploadImage = async filename => {
try {
  const response = await cloudinary.uploader.upload(filename, {
    upload_preset: 'photo-share'
  })
  const publicId = response.public_id
  console.log(`uploaded: ${publicId}`)
  return response.public_id
} catch (error) {
  console.log('uploadImage error', JSON.stringify(error, null, 1))
  throw new Error(error)
}
}

const photos = ['./assets/images/dolphin.jpg', './assets/images/goldfish.jpg']
for (const photo of photos) {
uploadImage(photo)
}

```

3. Execute a command to create a zip archive.  This archive will be loaded onto the cloud and can be shared as a link.

```bash
node user-upload-workflow/share-images/create-archive.js
```

The `create_zip` command looks for a tag that was added to every image because of the preset used for upload.


```javascript
cloudinary.uploader
  .create_zip({
    tags: 'photo-share',
    resource_type: 'image'
  })
```

![zip archive](https://res.cloudinary.com/cloudinary-training/image/upload/v1589317518/book/wf-zip-archive.png)

___

## Remote Functions

**Use Case:** You have created a function that accepts an image file, transforms it, and returns base64 encode image. You want to add it to a chained transformation.

Cloudinary provides way to create external transformations using Custom Functions which can take 2 forms: 

- Web Assembly Functions which are written in a high level language, compiled to WASM, and delivered from the Cloudinary cloud.
- Remote functions are written in JavaScript and made available via an API 

In this course we’ll look at creating, deploying and delivering Remote Functions.  These functions can be implemented in a Web API or as a Lambda serverless function.  If you use Lambda, you'll want an API Gateway because you'll be posting a multipart form containing your image file data.

We'll use the JavaScript libraries, **imagemagik** to add a date string overlay transformations.
You can run the server transformation code locally for development, but you must deploy it to the internet to call it as a remote function.  In this exercise, it's deployed to [heroku](https://www.heroku.com/home#) as a web API. 

To run server locally:

```bash
cd user-upload-workflow/remote-function
npm i
node app
```

The easiest way to test this function locally is using Postman.  In the picture below, you can see that this is setup as 

- local URL for API is `http://localhost:5000/api/file`
- POST
- Body is `form-data`
- key for input is `file` which will allow you to select a local file

When you sen the post, you should get back the transformed image as binary.

[Postman local server](https://res.cloudinary.com/cloudinary-training/image/upload/v1589319321/book/wf-remote-fn-postman.png)

### Upload file

Upload a file before testing transformation. This file will already exist in your cloud if you're running the modules in sequence.

```bash
node user-upload-workflow/remote-functions/upload-image.js
```

### Calling the remote function

We have function already deployed to **heroku** at this address: https://secure-caverns-90265.herokuapp.com/api/file. If you call https://secure-caverns-90265.herokuapp.com/ with a GET (from the browser), it will inform you that you need to post to the `/api/file` route.  

We can start by accessing this function. 

```bash
node user-upload-workflow/remote-functions
```

The code to create a URL that includes a remote function must sign the URL. This is a chained transformation because we add a border to the transformation provided by the remote function.

```javascript
const url = cloudinary.url('shell', {
  sign_url: true,
  transformation: [
    {
      custom_function: {
        function_type: 'remote',
        source: 'https://secure-caverns-90265.herokuapp.com/api/file'
      }
    },
    { border: '15px_solid_coral' }
  ]
})

```

You should see something like this, although the date may differ because the date string is dynamically created when the function is run.  If you run the request a second time, the date most likely will not change because the entire URL has been cached.

![result of remote function transformation](https://res.cloudinary.com/cloudinary-training/image/upload/w_400/book/wp-remote-function.png)

### Look at the server code

We're using multer memory storage as middleware to capture the posted image.  Then we call a `transform` function that gets the current date in string format and overlays it on the image.  There is also some resizing.  All of the transformations are part of the **imagemagick** library.

#### Post to Server

The image file is posted to Node Express server /api/file using multipart form input. Multer extracts the file from the post.  The transform function is called and the transformed image is sent back to client as base64 encoded.

```javascript
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

app.post('/api/file', upload.fields([{ name: 'file' }]), function(req, res) {
 return transform(req.files.file[0])
   .then(result => {
     // return the image and new metadata.
…
res.statusCode = 200
     res.headers = {
       'Content-Type': 'image/jpeg',
       'Content-Length': result.length
     }
     res.isBase64Encoded = true
     res.send(result)

```
#### Transform function

The “moment” library helps with date time calculations and formatting. The default is local server time zone is used. The `transform` function gets current date and time and creates a string. Custom arguments and temporary input file are passed to imagemagick transform function.

```javascript
const moment = require('moment')
...
const transform = async file => {
const date = moment().format('MMM Do YYYY, h:mm a')
const customArgs = ['-resize','314x','-fill','blue','-draw',   `text 5,15 'Date cached: ${date}'` ]
let inputFile = null
let outputFile = null
inputFile = '/tmp/inputFile.jpg'
fs.writeFileSync(inputFile, file.buffer)
customArgs.unshift(inputFile)
outputFile = '/tmp/outputFile.jpg'
customArgs.push(outputFile)
try {
  const output = await perform('convert', customArgs)
 ...

```

### Deploy to heroku

You can find [instructions online](https://devcenter.heroku.com/articles/deploying-nodejs) for deploying a JavaScript web API to heroku.  You need to set up an account.  You can add your Cloudinary credentials to the heroku server config settings.  The `Procfile` required by heroku is already available in the course repo. 










---
title: "Images with AI"
metaTitle: "Images with AI"
metaDescription: "Images with AI"
---


In this module we focus on using Add-ons that provide AI Services when working with images.

We'll look at solutions for image upload workflows:

1. Create image alt attributes from auto tagging
2. Upload and Apply Moderation to detect suspected blurry images
3. Apply external data to tags and context and use background removal
4. Provide moderation after background removal to allow human inspection

---

## Exercise: Creating alt attributes for images

**Use case:** If you don’t have external data to supply alt attribute during upload, you can create value from your tags, and tags can be created automatically using **Amazon Rekognition**.

It is alway preferable to create custom alt attributes values.  In this solution, we address a case where these values are not available.

In the Cloudinary Fundamentals for Developer course, we learned to use Amazon Rekognition for tagging.  As Web Developers, we know the importance of providing `alt` attributes for Accessibility.  We can now combine tagging with alt attribute creation.  This is only one solution for this use case.   You can read about other solutions in these blogs:

[Making Media Accessible: How to Generate alt Text for Images](https://cloudinary.com/blog/making_media_accessible_how_to_automatically_generate_alt_text_for_images)

![Making Media Accessible: How to Generate alt Text for Images](https://res.cloudinary.com/cloudinary-training/image/upload/v1589399146/book/wf-alt-harish.png)

[m16y: Make Your Cloudinary Images More Accessible](https://cloudinary.com/blog/m16y_make_your_cloudinary_images_more_accessible)

![Making Media Accessible: How to Generate alt Text for Images](https://res.cloudinary.com/cloudinary-training/image/upload/v1589399261/book/wf-alt-akshay.png)

#### Creating context from tags in response

In a script we can capture the tags assigned to an image and, based on confidence, create a comma separated value for the image alt attribute.

```bash
node user-upload-workflow/alt-from-auto-tag/auto-tagging.js
```
You'll need to activate the **Amazon Rekognition Auto Tagging** Add-on to run the upload script.

[Amazon Recognition Auto Tagging](https://cloudinary.com/console/addons#aws_rek_tagging)
![Amazon Recognition Auto Tagging](https://res.cloudinary.com/cloudinary-training/image/upload/v1589399843/book/wf-amazon-rek.png)

This script contains 3 sections:

1.  In step 1, we upload the image with a `categorization:` option that triggers automatically applying tags based on 85% confidence level by **Amazon Rekognition**.

2.  In step 2, we create an array of tags that have greater than 85% confidence. Then we concatenate all the tags into comma separated string. Then we use `uploader.explicit` to update the context `alt` value with the calculated string.

3.  In step 3, we use the `image` helper to create an image string that uses the `alt` string value for the alt attribute.

```bash
node user-upload-workflow/alt-from-auto-tag/auto-tagging.js
```


```javascript
require('dotenv').config()
const cloudinary = require('cloudinary').v2
//step 1
cloudinary.uploader
  .upload('assets/images/shell.jpg', {
    public_id: 'shell',
    categorization: 'aws_rek_tagging',
    auto_tagging: 0.85
  })
  .then(uploadResult => {
    console.log(uploadResult)
    // console.log(uploadResult.info.categorization.aws_rek_tagging)
    const rekTags = uploadResult.info.categorization.aws_rek_tagging.data.filter(
      item => item.confidence > 0.85
    )
    const alt = rekTags.map(item => item.tag).join(', ')
    console.log('rekTags', rekTags)
    if (rekTags) {
      // add tags to show up in CL Console
      // step 2
      cloudinary.uploader
        .explicit(uploadResult.public_id, {
          type: 'upload',
          context: `alt=${alt}`
        })
        .then(result => {
          console.log(JSON.stringify(result, null, 1))
        })
        .catch(error => console.error(error))
    }
    // create an image tag using the rektags
    // step 3
    console.log(
      'image tag:',
      cloudinary.image(uploadResult.public_id, {
        width: '400',
        crop: 'scale',
        alt: alt
      })
    )
  })
  .catch(error => console.error(error))
```

### View alt string in browser

Once you've generated this image tag it can be rendered in a web page. 

```html
<img
  src="http://res.cloudinary.com/cloudinary-training/image/upload/c_scale,w_400/shell"
  alt="Animal, Invertebrate" 
  width="400"
/>
```

You can disable images on a web page and view any alt tags by accessing this setting in  chrome settings: `chrome://settings/content/images?search=images`.

![chrome disable image output](https://res.cloudinary.com/cloudinary-training/image/upload/v1589405664/book/wf-turn-off-images.png)

Now you can see how a screen reader would see the web page.

![screen reader reads alt attribute](https://res.cloudinary.com/cloudinary-training/image/upload/v1589406081/book/wf-alt-string.png)

### Be Sure to Turn images back on in chrome if you've done this test!

---

## Quality Moderation

If you’re providing a way for your users to upload images, you may want to moderate for quality. Cloudinary provides an upload parameter for quality analysis. 

You can access the `quality_analysis.focus` value in the response.  If it is lower than your threshold, you can use the `explicit` method to move the image into a pending moderation state.

This is a multi step process, but we can execute it in a single script by adding `moderation: manual` to the upload.

The image must be fully uploaded before we can test the quality for moderation.  This means that the image could be served from Cloudinary before it has been moderated.  We'll see in the next section on **Video with AI** ways to prevent image service until moderation is complete.  This exercise would fit a use case with in house moderation requirements, not moderation for uploads from the public.

Execute this script:

```bash
node user-upload-workflow/quality-moderation/quality-moderate.js
```

In this script we are uploading a picture of an image on TV.  We use the `quality_analysis` option to test for blurry-ness. In the response we can test to moderate an image with a threshold quality of less than **.7** where 1.0 would be 100% or the best quality.  So, if the image is less than 70% we could signal that it required human moderation before moving on to the next step in the workflow pipeline.

```javascript
cloudinary.uploader
.upload('./assets/images/image-from-tv.jpg', {
  type: 'upload',
  public_id: 'image-from-tv-1',
  quality_analysis: true,
  invalidate: true
})
.then(uploadResult => {
  console.log(uploadResult)
  if (uploadResult.quality_analysis.focus < 0.7) {
    cloudinary.uploader.explicit(uploadResult.public_id, {
      type: 'upload',
      moderation: 'manual'
    })
  }
})

```
If you look in the DAM, under manual moderation, you'll see that this image missed the accepted quality threshold and was place in pending moderation. 

![pending moderation](https://res.cloudinary.com/cloudinary-training/image/upload/v1589407569/book/wf-moderate-image.png)

### New quality moderation in Beta

If you’re a paying customer you can request to take part in the Beta.
Talk to support@cloudinary.com or use this form: 
https://support.cloudinary.com/hc/en-us/requests/new

---

### Exercise: Using External Data and Background Removal



We'll cover a couple of requirements in this exercise: using external data 


```bash
node user-upload-workflow/bgremoval/upload-bg-removal-using-external-data.js

```

In the script below we've hard-coded data to mock a situation where we are fetching external data about an ecommerce item.  This would come from a Project Information System.  We're using this data to fill in variables in an upload.  We're also making use of the Cloudinary AI Background Removal that you studied in the Fundamentals course.

#### Multi step process

1. In the first step we’ll use external data to supply public id, context and tags to an uploaded image. We’ll also request the asynchronous process for Cloudinary background removal. A webhook will let us know when this is complete.

2. We’ll check the webhook and apply manual moderation when background removal is complete.

3. Finally we’ll run a script that finds approved images and creates image tags with an alt attribute based on the external data in step 1.


### 1. Cloudinary Background Remove Add-on

You'll need to request the free tier Cloudinary AI Background Removal for this exercise.

![Cloudinary background removal](https://res.cloudinary.com/cloudinary-training/image/upload/v1589411247/book/wf-cld-bgremoval.png)

[Cloudinary background removal](https://cloudinary.com/console/addons)


### Upload Script

Execute this script: 

```bash
node user-upload-workflow/bgremoval/upload-bg-removal-using-external-data.js
```

1. provide source image location `data.image,` 
2. assign public ID ` public_id: data.imageId,`, 
3. set a context description that tells us what the product is and whether or not it is on sale: 

```javascript
context: `description=${data.description} ${
      data.sale ? 'on sale' : ''
    } | sku=${data.sku} | alt=${data.description}`,
```
4. add a tag `tags: data.category,`


```javascript
const data = {
  sku: 's0001',
  category: 'shoes',
  description: 'Yellow Shoes',
  image: './assets/images/yellow-shoes.jpg',
  imageId: 'yellow-shoes',
  sale: true
}

cloudinary.uploader
  .upload(data.image, {
    public_id: data.imageId,
    context: `description=${data.description} ${
      data.sale ? 'on sale' : ''
    } | sku=${data.sku} | alt=${data.description}`,
    tags: data.category,
    background_removal: 'cloudinary_ai',
    notification_url:
      'https://webhook.site/5e96159b-630d-4fbe-91ed-d3f2807aedca',
    transformation: [{ height: 200, width: 200, crop: 'thumb' }]
  })
  .then(uploadResult => {
    console.log(JSON.stringify(uploadResult, null, 1))
  })
  .catch(error => console.error(error))

```
 ### Background Removal Complete?

 You can specify a webhook to detect that the background removal is complete.  We're using https://webhook.site, but this could be a web api on your system that receives notification of the completion of the background removal.  

 You might notify people in your organization that an upload is complete and in pending status based on the webhook notification.

 ### Check the Moderation Queue

 You'll want to manage the moderation queue and this can be automated.  You might run a script every hour to see if there are approved images and these could be moved down the pipeline.  

```bash
node user-upload-workflow/bgremoval/check-approved-status.js
```
In the following script, if an image is approved, we get the publid ID and **alt** context value to create an image tag. 

 ```javascript
cloudinary.api
  .resources_by_moderation('manual', 'approved', {
    resource_type: 'image'
  })
  .then(result => {
    if (result.resources.length > 0) {
      for (const img of result.resources) {
        // create image tag with alt attribute to use once moderation is complete
        cloudinary.api
          .resource(img.public_id)
          .then(result => {
            // console.log(result)
            console.log(cloudinary.image(result.public_id, { alt: result.context.custom.alt }))
          })
          .catch(error => {
            console.log(error)
          })
      }
    } else {
      console.log('no images approved')
    }
  })
  .catch(error => {
    console.log(error)
  })
```













---
title: "Video with AI"
metaTitle: "Video with AI"
metaDescription: "Video with AI"
---


In this module we focus on using Add-ons that provide AI Services when working with video.

We'll look at solutions for image upload workflows:

1. Create video subtitles and captions using Google Vision 
2. Google AI Video Moderation for User generated content

I recommend this background reading: [Automate Your Media Assets’ Workflow With Machine Learning](https://res.cloudinary.com/cloudinary-training/image/upload/v1589477837/book/wf-video-blog.png).

![Automate Your Media Assets’ Workflow With Machine Learning](https://res.cloudinary.com/cloudinary-training/image/upload/v1589477837/book/wf-video-blog.png)

---

## Video Subtitles and Captions

### Translation?

Cloudinary offers a tag translation Add-on. If you want to translate video transcriptions look into incorporating a Translation API such as [Google Translate](https://cloud.google.com/translate#section-1), [Yandex](https://tech.yandex.com/translate/), or [Watson](https://cloud.ibm.com/apidocs/language-translator).

### Google AI Video Transcription

We can use **Google AI Video Transcription** to create both subtitles and captions.  The difference between subtitles and captions is that captions may include sounds besides people talking, such as "dog barking", where as subtitles are strict text translations of what is being said.

### Google AI Video Transcription Add-on

To begin, you need to add the **Google AI Video Transcription** Add-on. 

Navigate to the [Add-ons](https://cloudinary.com/console/addons) page in and select the free plan.

![Google AI Video Transcription](https://res.cloudinary.com/cloudinary-training/image/upload/v1589478383/book/wf-google-ai-video-transcription.png)

### Subtitles

There can be substantial cost associated with creating subtitles manually.  Using **Google AI Video Transcription**, or **Microsoft Azure Indexer**, to create the text and then the Cloudinary subtitle **overlay** option to apply the subtitles to the video can reduce costs. We can use transformations to position and style the subtitles.

The **Google AI Video Transcription** Add-on uses the Google Speech API. We’re going to use the transcribed video to create subtitles in this exercise. Subtitles are essentially **text overlays** and we can use SRT or VTT files to provide the text content. Google will create these files for us using the Cloudinary Upload API. 

SRT and VTT are different formats for capturing text transcription and timing.

- SRT: Subrip Text Format
- VTT: Video Text Tracks

#### Exercise: Create subtitle and caption files

To create video transcription using the Google Add-on, execute

```bash
node user-upload-workflow/google-video-transcription/create-transcriptions
```

The transcription is triggered by the `raw-convert: google_speech:srt:vtt` option.  There is a webhook that can help us to see when transcription is complete. 

![webhook reports complete](https://res.cloudinary.com/cloudinary-training/image/upload/v1589481800/book/wf-video-transcribe-web-hook.png)

We're generating both transcriptions file types: SRT and VTT.  We'll use the SRT for the subtitles and later, the VTT for captions.

```javascript
cloudinary.uploader
 .upload('./assets/video/UnderwritersLaboratoryPsa.mp4', {
   resource_type: 'video',
   public_id: 'ul-video',
   raw_convert: 'google_speech:srt:vtt',
   notification_url:
     'https://webhook.site/c49e5d9e-15dd-43c0-b3c1-9e744d92cdbe'
 })
 .then(result => console.log(result))
 .catch(error => console.log(error))
```
You can see similarities between the VTT and SRT files.  The VTT file format is show on the left. Both formats provide a numbered list of transcribed text that are paired with a start and end time.  You can manually modify these files.  You can use the start and end times to pair the text with what frames are show on the video. 

![Compare SRT and VTT formats](https://res.cloudinary.com/cloudinary-training/image/upload/v1589479037/book/wf-video-srt-vtt.png)

If you look in the Media Library, you'll see that 5 files were created during the upload.

Both SRT and VTT have duplicate `.en-US` files which indicate the transcriptions awareness of the language.  

![SRT, VTT and Transcript files](https://res.cloudinary.com/cloudinary-training/image/upload/v1589481449/book/image.png)

You also get a `.transcript` file which is a JSON formatted file that provides ML confidence reporting.  There is also word for word mapping to start and end time.

```javascript
{ "confidence": 0.0, "transcript": "", "words": [] },
  {
    "confidence": 0.8454251289367676,
    "transcript": "an electric frying pan",
    "words": [
      { "word": "an", "start_time": 1.7, "end_time": 1.9 },
      { "word": "electric", "start_time": 1.9, "end_time": 2.4 },
      { "word": "frying", "start_time": 2.4, "end_time": 2.8 },
      { "word": "pan", "start_time": 2.8, "end_time": 3.3 }
    ]
  },

```

#### Exercise: Apply SRT for subtitles  

Let apply subtitles to the video.

```bash
user-upload-workflow/google-video-transcription/subtitles/video-tag-with-subtitles.js
```

We can use the familiar `overlay` option to apply subtitles with the video helper in the SDK.  We're using the `.srt` file.  Notice we can apply the same kind of text transformations that we have previously used with other text overlays.  We'll be looking for yellow on a black background positioned at the top of the video for this example.

```javascript
const video = cloudinary.video('ul-video', {
  overlay: {
    public_id: 'subtitles:ul-video.srt'
  },
  controls: true,
  background: 'black',
  color: 'yellow',
  gravity: 'north'
})

console.log(video)

```
You can copy past the video tag created above into the index.html file and then see the subtitles.

```bash

user-upload-workflow/google-video-transcription/subtitles/index.html
```

```html
<video controls
 poster="http://res.cloudinary.com/pictures77/video/upload/b_black,co_yellow,g_north,l_subtitles:ul-video.srt/ul-video.jpg"
   >
     <source
       src="http://res.cloudinary.com/pictures77/video/upload/b_black,co_yellow,g_north,l_subtitles:ul-video.srt/ul-video.webm"
       type="video/webm"
     />
     <source
       src="http://res.cloudinary.com/pictures77/video/upload/b_black,co_yellow,g_north,l_subtitles:ul-video.srt/ul-video.mp4"
       type="video/mp4"
     />
     <source
       src="http://res.cloudinary.com/pictures77/video/upload/b_black,co_yellow,g_north,l_subtitles:ul-video.srt/ul-video.ogv"
       type="video/ogg"
     />
   </video>

```

When you add the video tag the is using your cloud to index.html, you should see the yellow on black subtitles in this video.

![Rendering subtitles](https://res.cloudinary.com/cloudinary-training/image/upload/v1589499647/book/wp-subtitles.png)

This is an HTML 5 video tag, so you don't have many styling options.

#### Exercise: Add Captions 

In this exercise, you're going to use a Video Player to render captions.

Execute this script to open the Video Text Tracks file natively in your browser. 

```bash
node user-upload-workflow/google-video-transcription/captions/create-vtt-url.js

```

 If you change `vtt` to `srt` and try to open the sub rip text format, you'll see that it's not supported by your browser.  This format can be use for captions as it can be played as a **track** with the video.

```javascript

const url = cloudinary.url('ul-video.vtt', {
  resource_type: 'raw'
}):
```

The URL created for the `vtt` file can be used in the setting up the Video Player.

Open the `user-upload-workflow/google-video-transcription/captions/index.html` file and locate the HTML and JavaScript for the Video Player

```html
<video id="example-player" controls muted class="cld-video-player cld-video-player-skin-dark"
  data-cld-transformation='{ "width": 400, "crop": "fill"}'>
</video>
```

We add 2 tracks using the `textTracks` option.  We're using the URL created in the node script above.  The same URL is used for both the caption and the subtitle.

```javascript
 document.addEventListener("DOMContentLoaded", function () {
    const cld = cloudinary.Cloudinary.new({
      cloud_name: 'cloudinary-training'
    })
    const player = cld.videoPlayer('example-player')

    // add your video text tracks
    player.source(
      'ul-video',
      {
        textTracks: {
          captions: {
            label: 'English captions',
            language: 'en',
            default: true,
            url: 'https://res.cloudinary.com/cloudinary-training/raw/upload/ul-video.vtt'
          },
          subtitles: [
            {
              label: 'English subtitles',
              language: 'en',
              url: 'https://res.cloudinary.com/cloudinary-training/raw/upload/ul-video.vtt'
            }
          ]
        }
      });

  })

```
Set the cloudname to your cloud name in the index.html and open in browser.

```bash
user-upload-workflow/google-video-transcription/captions/index.html
```

Because this is a video player you can choose to show captions or subtitles.  In our case they are both the same, but the captions could be edited to include other audio information.  

![choose captions or subtitles](https://res.cloudinary.com/cloudinary-training/image/upload/v1589502883/book/wp-choose-captions-subtitles.png)

You should see either captions or subtitles at the bottom of the video.  You can experiment with other settings to see that the user has control over the display of the text.

![captions and subtitles](https://res.cloudinary.com/cloudinary-training/image/upload/v1589502952/book/wp-captions-subtitles-bottom.png)


---

## Google Video AI Moderation 

When we allow users to upload assets that you will serve from your website, we want to provide ways to check that these assets meet our standards.  We've looked at manual moderation with image background removal and blurriness.  In those cases we did make moderation but we didn't address the problem that the asset, because it was public, could be accessed before it was approved.

Look at the chart below to better understand the flow of the asset as it makes its way to the moderation queue.

![asset flow to moderation queue](https://res.cloudinary.com/cloudinary-training/image/upload/v1589568005/book/wf-video-moderation-flow.png)

We use webhooks to alert our system that the moderation process has completed, but the moderation won't even start until the asset is uploaded and ready for request. If a user requests the asset before it's completed moderation and its something that we would reject, that asset could get cached on the CDN even though we wouldn't approve of it.

In this section we'll look at 2 ways to keep the uploaded image out of the public's view until the moderation process is complete and the asset is approved.  The two techniques will look at are

- Upload the asset with an `access_control` option with a **token** and don't remove unless approved
- Upload the asset as `private` and put it in a holding directory until approved and then `rename` to make it public and move the directory from which it will be served

### Steps in Moderation with Google Video Moderation

1. Your users upload a video to Cloudinary through your application.
2. The uploaded video is sent to Google for moderation.
3. There are multiple levels of rejection to choose from depending on your threshold for violence and pornography with “possible”, “likely” or “very likely” with “likely” being the default.
4. The video is marked as either approved or rejected based on the results returned by Google.
5. An optional notification callback is sent to your application (webhook) with the video moderation results.
6. A rejected video is moved to a secondary backup queue, and you may want to clean this up to keep your media library organized.
7. Moderated videos can be listed programmatically using Cloudinary's Admin API or interactively using the Media Library in your account console.
8. You can manually override the automatic moderation results using the Admin API or the Media Library

### Google Video Moderation Add-on

Navigate to the [Add-ons](https://cloudinary.com/console/addons) page in and select the free plan.

![Google Video Moderation](https://res.cloudinary.com/cloudinary-training/image/upload/v1589582510/book/wp-video-moderation.png)

### Exercise: A Rejected Video

We can restrict client access by adding `access_control:token`.  Recall that we used the `access_control` option with `anonymous` and a start and end date to add time based access control.  We can use the `token` access control even if we though we don’t support.

If we comment out the access control option, we’ll see that we have access to the video before moderation is complete with no access control. 

When we add access control to the upload, and the video is restricted
When moderation is complete we can remove the access control and delete any rejected videos to save on storage costs.

```bash
node user-upload-workflow/google-video-moderation/rejected/upload-video.js
```

```javascript
cloudinary.uploader
  .upload('./assets/video/hot-tub.mp4', {
    resource_type: 'video',
    public_id: 'hot-tub',
    access_control: [{ access_type: 'token' }],
    moderation: 'google_video_moderation:possible',
    notification_url:
      'https://webhook.site/17a3d46c-5d18-46b0-ab6c-94b12d7f645c'
  })
  .then(result => {
    console.log(result)
    console.log(result.moderation.repsonse)
  })
  .catch(error => console.log(error))

```

The video will go into a pending state while Google is processing it.  If you go to the Media Library and look at the video before the moderation process is complete, you can see it as restricted.


![restrict video](https://res.cloudinary.com/cloudinary-training/image/upload/v1589582172/book/wp-video-restricted.png)

Once the moderation processing is complete, you won't find it in the Media Library if it has been rejected.  Instead, you can go to the Google Video Moderation queue and see that it is rejected.

![reject video](https://res.cloudinary.com/cloudinary-training/image/upload/v1589582384/book/image.png)

If you check the website.hook final response, you'll get detailed information on where the pornography or violence was detected.

```javascript
{
  "moderation_response": {
    "moderation_confidence": "POSSIBLE",
    "frames": [
      {
        "pornography_likelihood": "POSSIBLE",
        "time_offset": 0.415886
      },
      {
        "pornography_likelihood": "POSSIBLE",
        "time_offset": 1.5739779999999999
      },
      {
        "pornography_likelihood": "POSSIBLE",
        "time_offset": 2.422259
      },
    ...
```
Since we indicated a threshold of  **possible**, the video was rejected. This conclusion can be found at the bottom of the response.

```javascript
 "moderation_status": "rejected",
  "moderation_kind": "google_video_moderation",
  "moderation_updated_at": "2020-05-15T22:32:19Z",
  "public_id": "hot-tub",
  "uploaded_at": "2020-03-19T22:53:48Z",
  "version": 1589581905,
  "url": "http://res.cloudinary.com/pictures77/video/upload/v1589581905/hot-tub.mp4",
  "secure_url": "https://res.cloudinary.com/pictures77/video/upload/v1589581905/hot-tub.mp4",
  "etag": null,
  "notification_type": "moderation"

```

#### Manage the Rejected Queue

We need to manage both the rejected and approved queues.  We might fire off the script below on a periodic basis to remove rejected videos.  We're using the Admin API for this, so the more we can bundle rejections, the less quota we'll use.

You could start with just listing the rejected video.  While the response shows the URL for the video, you won't be able to view it because its rejected.  In addition, its still has the token access control, so its restricted.

```bash
user-upload-workflow/google-video-moderation/rejected/list-rejected-videos.js
```

```javascript
{
 "resources": [
  {
   "asset_id": "1c0c00f6a8c40d277369708a14726b0a",
   "public_id": "hot-tub",
   "format": "mp4",
   "version": 1589582125,
   "resource_type": "video",
   "type": "upload",
   "placeholder": true,
   "created_at": "2020-03-19T22:53:48Z",
   "bytes": 0,
   "width": 720,
   "height": 1280,
   "backup": true,
   "access_mode": "public",
   "access_control": [
    {
     "access_type": "token"
    }
   ],
   "url": "http://res.cloudinary.com/pictures77/video/upload/v1589582125/hot-tub.mp4",
   "secure_url": "https://res.cloudinary.com/pictures77/video/upload/v1589582125/hot-tub.mp4"
  }
 ],
 "rate_limit_allowed": 500,
 "rate_limit_reset_at": "2020-05-15T23:00:00.000Z",
 "rate_limit_remaining": 499
}

```

Use a combination of the Admin API `resources_by_moderation` and the Upload API `destroy` to clear out the rejected queue.

```bash
node user-upload-workflow/google-video-moderation/rejected/destroy-rejected-videos.js
```

```javascript
cloudinary.api
  .resources_by_moderation('google_video_moderation', 'rejected', {
    resource_type: 'video'
  })
  .then(result => {
    // delete anything that's rejected
    for (const video of result.resources) {
      cloudinary.uploader
        .destroy(video.public_id, {
          invalidate: true,
          resource_type: 'video'
        })
        .then(result => {
          console.log('destroying: ', video.public_id)
          console.log(result)
        })
        .catch(error => console.error(error))
    }

    console.log(result)
  })
  .catch(error => {
    console.log(error)
  })


```

### Exercise: An Accepted Video

Now, we'll upload a video that we know will be accepted. We'll use the same  `access_control` setting to restrict the video until its been put into the approved queue.  

```bash
node user-upload-workflow/google-video-moderation/approved/upload-video
```

```javascript
cloudinary.uploader
  .upload('./assets/video/elephants.mp4', {
    resource_type: 'video',
    public_id: 'elephants',
    access_control: [{ access_type: 'token' }],
    moderation: 'google_video_moderation:possible',
    notification_url:
      'https://webhook.site/17a3d46c-5d18-46b0-ab6c-94b12d7f645c'
  })
  .then(result => {
    console.log(result)
    console.log(result.moderation.repsonse)
  })
  .catch(error => console.log(error))

```

Event though we know this video will ultimately be approved, it is restricted because of the `access_control` setting.

![restrict video](https://res.cloudinary.com/cloudinary-training/image/upload/v1589582172/book/wp-video-restricted.png)

Once moderation is complete, we'll see the video in the approved queue, but it's still restricted.


We can remove the restriction by removing the `token` setting.

```bash
node user-upload-workflow/google-video-moderation/approved/reset-access-control-uploaded-video.js
```

Again, using a combination of the Admin API get a list of approved videos and then update the `access_control` to `anonymous` to remove the token and make the video public. 

```javascript
cloudinary.api
  .resources_by_moderation('google_video_moderation', 'approved', {
    resource_type: 'video'
  })
  .then(result => {
    // remove tokens from approved videos
    for (const video of result.resources) {
      cloudinary.api
        .update(video.public_id, {
          resource_type: 'video',
          access_control: [{ access_type: 'anonymous' }],
          invalidate: true
        })
        .then(result => {
          console.log(
            'no version url:',
            cloudinary.url(result.public_id, {
              resource_type: 'video',
              format: result.format
            })
          )
        })
        .catch(error => console.error(error))
    }
    console.log(result)
  })
```

## Authentication Exercise

We'll look at another technique for restricting access to a video until moderation is complete.  In this case, we mark all uploaded videos as `authenticated` and we put them in a separate folder.  

```bash
node user-upload-workflow/google-video-moderation/approved/upload-authenticated.js
```
All videos are private and put in a directory named **moderated**

```javascript
cloudinary.uploader
  .upload('./assets/video/elephants.mp4', {
    folder: 'moderated',
    use_filename: true,
    unique_filename: false,
    resource_type: 'video',
    type: 'authenticated',
    moderation: 'google_video_moderation:possible',
    notification_url:
      'https://webhook.site/17a3d46c-5d18-46b0-ab6c-94b12d7f645c',
    invalidate: true
  })

```
These videos will remain inaccessible until we've completed the moderation process and marked the video as **approved**.  The script uses the Admin API to get a list of approved videos.  Then it uses the Upload API to **rename** the videos and in the process change their type from `authenticated` to `upload` making them public.  We also change the name of the public id by removing the directory through string manipulation.  This will put the video in the root of the cloud and allow public access.

```bash
node
```

```javascript
cloudinary.api
  .resources_by_moderation('google_video_moderation', 'approved', {
    resource_type: 'video'
  })
  .then(result => {
    // move any approved videos out of moderation folder, and set as public
    for (const video of result.resources) {
      if (video.type === 'authenticated') {
        const newPublicId = video.public_id.substring(10) // removing 'moderated' folder name and slash

        console.log(
          'video.public_id',
          video.public_id,
          'newPublicID',
          newPublicId
        )
        cloudinary.uploader
          .rename(video.public_id, newPublicId, {
            resource_type: 'video',
            type: 'authenticated',
            to_type: 'upload',
            invalidate: true,
            overwrite: true
          })
          .then(result => {
            console.log(
              'new version url:',
              cloudinary.url(result.public_id, {
                resource_type: 'video',
                format: result.format
              })
            )
          })
          .catch(error => console.error(error))
      }
    }
```
After the script above is run the image will be moved from the `moderation` directory to the root. The approved video is now ready to serve with public access. 

![authentication removed for public access](https://res.cloudinary.com/cloudinary-training/image/upload/v1589583948/book/wf-moderation-auth-approved.png)

---

## Summary

Using Google Speech to analyze video content in order to create transcriptions which can be use for subtitles and captions
Using Google AI for content moderation that can flag pornography and violence and you can use Admin or Upload API to remove rejected videos. We analyzed the gap between upload and async add-ons processing and how to prevent access to assets not approved
The code in these work-flows can be integrated into your back-end using a notification queue which we mocked with webhook.site.
---
title: "Resources"
metaTitle: "Resources"
metaDescription: "Resources"
---

Multi Method  
https://cloudinary.com/documentation/image_upload_api_reference?query=multi&c_query=Multi%20method#multi_method

https://cloudinary.com/documentation/animated_images#creating_animated_images  

https://cloudinary.com/documentation/paged_and_layered_media#creating_pdf_files_from_images  

Quality Analysis  
https://cloudinary.com/documentation/upload_images?query=quality%20ana&c_query=Image%20quality%20analysis#image_quality_analysis

Blog on creating alt for text  
https://cloudinary.com/blog/making_media_accessible_how_to_automatically_generate_alt_text_for_images  

Blog making Cloudinary images more accessible  
https://cloudinary.com/blog/m16y_make_your_cloudinary_images_more_accessible

Article - how to get a list of resources based on tag  
https://support.cloudinary.com/hc/en-us/articles/203189031-How-to-retrieve-a-list-of-all-resources-sharing-the-same-tag-

Custom Functions: Remote function     
https://cloudinary.com/documentation/custom_functions?query=custom%20fun&c_query=Custom%20functions#remote_functions


Blog on automation with ML    
https://cloudinary.com/blog/automate_your_media_assets_workflow_with_machine_learning

Google Video Transcription addon    
https://cloudinary.com/documentation/google_ai_video_transcription_addon  

Google AI Video Moderation Addon  
https://cloudinary.com/documentation/google_ai_video_moderation_addon?query=google%20moder&c_query=Google%20AI%20Video%20Moderation#automatic_video_moderation_flow

Rename method   
https://cloudinary.com/documentation/image_upload_api_reference#rename_method  
