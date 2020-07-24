---
title: "Objectives"
metaTitle: "Objectives"
metaDescription: "Objectives"
---

## Video Player

- Uploading video: look at video upload response and terminology
- Video format and compression
- Codecs, Containers and Browser Support
- Video Player versus SDK Video Tag
- What the Cloudinary Video Player Widget Provides that HTML5 tag does not
- How to use the video player in a JavaScript Framework (Vue.js)
- Using the Video Player to manage collections of videos

---
title: "Video Upload Response"
metaTitle: "Video Upload Response"
metaDescription: "Video Upload Response"
---

## Use case

You allow your customers to upload video and they upload **.mov** files from their Apple devices. Not all browsers serve this format.  How can format this video to make it available for all browsers and devices? 

Let start by uploading video and look at the response.

## Cloudinary video upload repsonse

Look at the upload response to learn more about video formatting and terminology.

### Exercise: Upload a video and examine the response

```bash
node video-player/upload-rooster.js
```

```javascript
cloudinary.uploader.upload('./assets/video/rooster.mov', {
 public_id: 'rooster',
 type: 'upload',
 overwrite: true,
 invalidate: true,
 resource_type: 'video'
})
```
Let's define the items called out in yellow in the reponse.

![video upload response](https://res.cloudinary.com/cloudinary-training/image/upload/v1588356470/book/player-response.png)

- audio and video codecs: algorithms for formatting audio and video content which often provide compression 
- video level: quality meaure with 100 being the highest
- dar: display aspect ratio which matches the ratio of width : height in the repsonse
- video format: **.mov** is a file extension and represents a container that can hold audio and/or video
- is_audio: Cloudinary reports true if this file contains only audio
- frame_rate: measure of **frames per second** where a calculation of fps * duration = nb_frames (number of frames)
- duration: length of video in seconds 

**Note:** If you want to serve just audio, you can upload it with the resource type set to "video".

## Codecs, Containers and Browsers

The next two sections introduce the relationship between codecs, containers and browsers.  You'll see that certain codecs are contained by certain formats, and certain formats are served by certain browsers.

### Codecs and Containers 

The chart below lists some common codecs and you'll see them referenced in this course, especially in the Adaptive Streaming module.  This chart shows how familiar formats, such as mp4, can contain a number of different codecs. Only video codecs are shown in this chart.

![Codecs and Containers](https://res.cloudinary.com/cloudinary-training/image/upload/v1588357375/book/codecs-containers.png)

### Containers to Browsers   

The table below shows browsers that can be used to serve each of the listed container formats. Referring back to our **Use Case** with the uploaded **.mov** file, we can see from this chart that only Firefox can serve that format, whereas all of the browsers can serve **.mp4** formats.

![Containers to Browsers](https://res.cloudinary.com/cloudinary-training/image/upload/v1588358016/book/container-browser.png)


## Video Formats supported by Cloudinary Video Player

Looking ahead to implementing the video player, we can see that while many formats can be uploaded, not all can be served.  We'll see that Cloudinary transformations can be used to convert to deliverable formats.

![Cloudinary Video Formats](https://res.cloudinary.com/cloudinary-training/image/upload/v1588358368/book/cl-video-formats.png)  


---
title: "SDK Video"
metaTitle: "SDK Video"
metaDescription: "SDK Video"
---

The Cloudinary Vue JS SDK contains a video component that renders an HTML 5 Video tag.  We'll review the HTML 5 video element and how the SDK Video component augments it.

# HTML 5 Video Tag

The browser is going to choose the first source that it can play based on codec ("type") support.  Adding mp4 and `webm` should cover most browsers. Include "type" to let browser know, or it will try to play even if it can’t handle that type. I’m putting `webm` first because it has slightly better quality and lower file size.

```html
<video controls>
 	<source src="rooster.webm" type="video/webm">
  <source src="rooster.mp4" type="video/mp4">
  <p>Your browser doesn't support HTML5 video. Here is a 
    <a href="https://cloudinary-training.github.io/cld-advanced-concepts/assets/video/rooster.mp4">link to the video</a> instead.
  </p>
</video>
```

If there is no `webm` or `mp4` format of this video available, the script above will have to play the video from the Cloudinary training server. 

## Exercise: SDK Video tag helper 

You've uploaded the `rooster.mov` and the format can't be served except in Firefox.  Check your derived derived images at this point.  You'll see a the thumbnail used in the media library and a jpg that represents the image of the video.

![before SDK create derived videos](https://res.cloudinary.com/cloudinary-training/image/upload/v1588361718/book/video-derivatives-before.png)

Next, run the SDK video helper.

Run the script to create a video tag using the Cloudinary node SDK.

```bash
node video-player/html5/create-cloudinary-video-tag
```

This will generate video tag with the source fallbacks that you need. 

```html
<video
  controls="true"
  poster="http://res.cloudinary.com/cloudinary-training/video/upload/rooster.jpg"
>
<source
  src="http://res.cloudinary.com/cloudinary-training/video/upload/rooster.webm"
  type="video/webm"
/>
<source
  src="http://res.cloudinary.com/cloudinary-training/video/upload/rooster.mp4"
  type="video/mp4"
/>
<source
  src="http://res.cloudinary.com/cloudinary-training/video/upload/rooster.ogv"
  type="video/ogg"
/>
```

Before you open the `video-player/html5/index.html in the browser, look at the derived images in the Media Library and you can see that an **mp4** video derivation now exists. 

![after SDK see mp4](https://res.cloudinary.com/cloudinary-training/image/upload/v1588361827/book/video-derivative-after.png)  

Now, open the `video-player/html5/index.html` in the chrome browser.  Open the Chrome Dev tools Network tab and look refresh.  You'll see that chrome is using the **.webm** format.---
title: "Video Player"
metaTitle: "Video Player"
metaDescription: "Video Player"
---

In this section we'll see how to get the Cloudinary Video Player running on a static web page.

## Exercise: Loading Libraries

JavaScript libraries available on [CDN](https://unpkg.com/#/) or [npmjs.org](https://www.npmjs.com/package/cloudinary-video-player).  We'll use both in this course.  For this section, we're using libraries from the CDN.  This allows use to serve this [page](https://cloudinary-training.github.io/cld-advanced-concepts/video-player/video-player.html) from github.io without uploading `node_modules`.  

There are 3 dependencies for the full video player that need to be installed.

```bash
npm install lodash cloudinary-core cloudinary-video-player
```  

Look at code and open in browser:  `video-player/video-player.html`

The HTML below shows that we need to reference a CSS file,  `cloudinary-core-shrinkwwrap` (the JavaScript SDK), and `cld-video-player.min.js` (the video player).

```html
<head>
  <link href="https://unpkg.com/cloudinary-video-player/dist/cld-video-player.min.css" rel="stylesheet"/>
</head>
...

<script src="https://unpkg.com/cloudinary-core/cloudinary-core-shrinkwrap.min.js" type="text/javascript"></script>
<script src="https://unpkg.com/cloudinary-video-player/dist/cld-video-player.min.js" type="text/javascript" ></script>

```

## Exercise: Rendering a Video Tag 

Look at the HTML portion of the `index.html`.  We need to render an HTML5 video tag and supply and identifier, in this case and `id`.  We can add standard attributes such as `controls` and `muted`.  We can also use video player styles the we get from the CSS imported above. The `cld-fluid` class will cause the video to fill the container which, in this case is a 400px `div`.

```html
<div style="max-width:400px">
  <video
    id="doc-player"
    controls
    muted
    class="cld-video-player cld-fluid"
  ></video>  
</div>
```

## Exercise: JavaScript Instantiation

Because we're loading JavaScript libraries, the code is wrapped in a `DOMContentLoaded` event listener.  

We start by instantiating the SDK cloudinary object and providing the cloud name from which the video will be delivered.  For this example we instantiate the video player form the cloudinary object by referencing the element id, `doc-player`.  Finally, we provide a public ID as an argument to the player's `source` function.

```javascript 
document.addEventListener('DOMContentLoaded', async () => {
   const cld = window.cloudinary.Cloudinary.new({
     cloud_name: 'demo'
   })
   const demoplayer = cld.videoPlayer('doc-player')
   demoplayer.source('race_road_car')
   })

```

## What is rendered?

If you inspect the elements in the rendered video player, you'll see that the JavaScript has wrapped the initial video tag in a number of other elements.  These elements create the video player.  They provide a set of DOM objects that fire events that can be listened to an acted on, as well as styled.  

![video player elements](https://res.cloudinary.com/cloudinary-training/image/upload/v1588365037/book/video-player-elements.png)---
title: "Video in Vuejs app"
metaTitle: "Video in Vuejs app"
metaDescription: "Video in Vuejs app"
---

## Video in a JavaScript Single Page App 
Questions come up in support on how to integrate the Video Player into JavaScript SPA Framework code. We’ll see that it's a matter of determining how to:

- import libraries
- add video tag to template
- add Vue.js Vuejs SDK video tag
- execute `videoPlayer` function


In this section we'll implement both the video player and the Vuejs SDK in a Vue.js app.  This provides a comparison of implementations and results for each of these methods of making video available in a front end framework application.

## Exercise: Run a Vue.js app

You’ll need to have the Vue.js CLI installed to run these commands: 

```bash
npm install -g @vue/cli
```

Start by uploading a logo image.  

```bash
node video-player/upload-logo.js
```

Start the app in development mode.

```bash 
cd video-player/vuejs
npm install
npm run serve
``` 

Open in browser at http://localhost:8080/ 

You'll see an app with 2 routes: `player` and `tag`.  These routes run the same video using the Cloudinary Video Player and the Cloudinary generated HTML 5 video tag respectively.  

![tag view](https://res.cloudinary.com/cloudinary-training/image/upload/w_400/book/vuejs-tag-view.png)

![player view](https://res.cloudinary.com/cloudinary-training/image/upload/w_400/book/vuejs-player-view.png)

You already have experience running these in a static HTML `index.html` but now you'll see how to incorporate these in an Vue.js application.  

## Vue.js SDK vs Cloudinary Video Player

The table below compares the JavaScript objects that render Video Player and Vue.js HTML 5 tag. The biggest difference between these objects is that the Vue.js SDK will render an HTML 5 video tag, while the Video Player will render all the elements needed to construct a video player. It important to note that the video player uses a global object while the vuejs SDK uses a Vue plugin.  This can be an issue in single page apps that use a build process that requires typing or linting.

![video player vs vue.js object](https://res.cloudinary.com/cloudinary-training/image/upload/v1588367364/book/video-player-vs-vuejs-objects.png)

## Coding 


You can see the dependencies for this app in the package.json.  

```javascript
 "dependencies": {
    "cloudinary-core": "^2.8.2",
    "cloudinary-video-player": "^1.3.4",
    "cloudinary-vue": "^1.0.1",
    "current-script-polyfill": "^1.0.0",
    "lodash": "^4.17.15",
    "vue": "^2.5.22",
    "vue-router": "^3.1.6"
  },
  ```
 The Vuejs app requires `vue` and the `vue-router` provides routing.  The Vue.js SDK only requires `cloudinary-vue`.  The video player requires `cloduinary-core`, `cloudinery-video-player`, `lodash` and `current-script-polyfill`. 

#### Video Player

Add the following the `<script>` in the `Player` view.

```javacript
import "../node_modules/cloudinary-video-player/dist/cld-video-player.min.css"
import cloudinary from 'cloudinary-core';
import "../../node_modules/cloudinary-video-player/dist/cld-video-player.min.js";
```

Add the following to the template portion of the `Player` view.

```html
<video id="demo-player" width="500" class="cld-video-player" ></video>
```

Then, add the code that instantiates the JavaScript SDK and wraps the video tag above in Player elements.  The code is added to the `mounted` life-cyle event to so that it will not be executed until the DOM has been mounted and you can manipulate it.  If you were working with the **react** framework you might use the `componentDidMount` life-cyle hook or with  **angular**, the `ngOnInit` life-cycle hook to set up the video player code.

Notice that there is an **eslint** exception because the `cld` object is global.

```javascript
 mounted: function() {
   /*global cloudinary*/
   /*eslint no-undef: "error"*/
   const cld = cloudinary.Cloudinary.new({
     cloud_name: "<cloud name>"
   });
   const demoplayer = 
         cld.videoPlayer("demo-player").width(600);
   demoplayer.source("<public id>");
}

```

#### Vuejs SDK

Instantiate Vue and provide the cloud name in `main.js` .

```javascript
import Cloudinary from 'cloudinary-vue';
Vue.use( Cloudinary, { 
    configuration: {cloudName: "<cloud name>"}
});
```

Install the component in the template portion of the Tag view.  You can optionally supply the cloud name in the the `cld-video` component.

```html
<cld-video cloudName="<cloud name>" publicId="<public id>"> 
</cld-video>
```---
title: "Video Collections"
metaTitle: "Video Collections"
metaDescription: "Video Collections"
--- 


In this section, we'll look at how we can provide options to the video player using both JavaScript and HTML.  

Then we'll look at Video Player functionality that is not available with the HTML5 Video tag.  We'll see how Cloudinary Video Player is built on [Video.js](https://videojs.com/), but provides additional functionality such as on the fly transformations.  We'll focus on the Video player's ability to provide collections of video in various ways. 

Video.js provides a basic video player.  There are many plug-ins that can be used to add features.  Here's a set of feature you can look for in the Cloudinary video player:

- Skinning the player
- Adding your own logo
-  Playlists
- Autoplay on Scroll
- Recommendations
- Info data overlay
- Inserting Ads
- Google Analytics
- Adaptive Streaming
- Transformations



## Video Player Options 

You can apply video player options in HTML using the `data-` attributes or in JavaScript.  The table below lists and compares how you could apply these options in each language.  You'll see these options applied in both languages.

![video player options](https://res.cloudinary.com/cloudinary-training/image/upload/v1588373067/book/video-player-options.png) 

See the options as attributes in HTML

```html
<video 
  id=”demo-player”
  width="500" 
  class=”cld-video-player”
  data-cld-font-face="Arial">
</video>
```
... and in JavaScript

```javascript
const demoplayer = cld.videoPlayer("demo-player", 
  {
     autoplay: false,
     muted: true,
     controls: true,
     transformation: [
       { width: 500, crop: "fit" },
       {
         overlay: "video-logo",
         width: 100,
         gravity: "north_east",
         x: 5,
         y: 5,
         opacity: 70
       }
     ]
   });
demoplayer.source("rooster");
```

## Exercise: Upload Collection of Videos

### Upload a logo to be used as an overlay.

```bash
node video-player/upload-video-collection.js
```

Upload a set of four video that are tagged as 'skiing'.

```bash
node video-player/upload-video-collection.js
``` 

Notice the upload includes an eager transformation to change the aspect ration to from 16:9 to 1:1.  

```javascript
let result = await cloudinary.uploader.upload(filename, {
     use_filename: true,
     tags: "skiing",
     unique_filename: false,
     type: "upload",
     overwrite: true,
     invalidate: true,
     resource_type: "video",
     aysnc: false,
     eager:{
       crop: "fill",
       width: 300,
       gravity: "auto",
       aspect_ratio: "1:1"
     }
   })
```

## Working with Lists of Videos

You'll need to un-check the **Resource List** in order to allow gathering resources by list as we'll do in the next exercise.

![Resource by list restriction](https://res.cloudinary.com/cloudinary-training/image/upload/v1588373783/book/resource-by-list.png)

We're going to experiment with 3 ways to work with collections of videos using the Video Player:

 - Playlists
 - Autoplay on Scroll
 - Recommendations


 ## Exercise: Playlist

Add your cloud name to the `video-player/playlist/index.html` file. You'll find the cloud name specified in the script. Open in page in the browser to see how this playlist functions.  You should see a Video Player with a Playlist rendered on the right.

```javascript
 var cld = cloudinary.Cloudinary.new({
      cloud_name: 'cloudinary-training'
    })
```


![Playlist](https://res.cloudinary.com/cloudinary-training/image/upload/v1588374256/book/vp-playlist.png)

The HTML provides some options. There is an on the fly transformation to crop the video to the size of the container. The **playlist-data** will display information taken from data in the playlist itself.  This is data is available to provide more information about the playlist on the page.

```html
<div id="playlist-data"></div>
<div style="max-width:400px">
 	<video id="example-player" controls muted class="cld-video-player
      cld-video-player-skin-dark" data-cld-transformation='{ "width":
      400, "crop": "fill"}'>
 	</video>
</div>

```

Initialize the video player and add a **playListWidget**.  This is the list of videos you see on the right of the display.  The widget can be set in a horizontal or vertical orientation using the **direction** option. The number of items shown is can be set with the **total** option.  You can modify these options to see the effect.

```javascript
var player = cld.videoPlayer('example-player', {
  playlistWidget: {
    direction: 'vertical',
    total: 4
  }
})
```

We're using the `playerByTag` function to collect up all of the videos that have the **skiing** tag.  The **autoAdvance** options is set to false.  This causes the video to stop once it has played and allow the user to select which video in the playlist to play next.  The **repeat** function is set to true, so that it doesn't fall off of the playlist widget once it has finished playing.  

Once the playlistByTag function has completed, we can access data about the playlist in the promise success.  In this case, execute two chained functionsf `playlist().list()` to get a list of information about the playlist videos.  Then we extract the public id's, concatenate them and bind them to a the **playlist-data** element set up in HTML.

```javascript

player.playlistByTag('skiing', {
  autoAdvance: false,
  repeat: true
}).then(function (player) {
  console.log("player object",player)
  // we can add summary data from the playlist object in the player
  // to our webpage
  let divElem = document.querySelector("div#playlist-data");
  let list = player.playlist().list().map(source => {
    return source.publicId()
  }).join(', ');
  divElem.innerText = "Playlist: " + list
})

```

 ## Exercise: AutoPlay on Scroll 

Add your cloud name to the `video-player/autoplay/index.html` file. You'll find the cloud name specified in the script. Open in page in the browser to see how this autoplay on scroll functions.  You should see multiple video players rendered to the page.  As you scroll a video player into the viewport, it starts to play.

**Note:** Chrome and iOS won't autoplay unless the video attributes include `muted`.

```javascript
 var cld = cloudinary.Cloudinary.new({
      cloud_name: 'cloudinary-training'
    })
```

![autoplay on scroll](https://res.cloudinary.com/cloudinary-training/image/upload/v1588457451/book/vp-autoplay.png)

### Running multiple players on a page

In previous examples we've use the `id` attribute to identify the video player in JavaScript.  The video player provides a `videoPlayers` function.  This function allows you to specify a CSS class as a selector so that the player can be instantiated across all instances of this class on a page.  

In order to activate the "autoplay on scroll" functionality, we can set the `autoplayMode` to `on-scroll`.  We also set the `preload` option to `auto` so that the video will be loaded when the user scrolls to it.

```javascript
 const players = cld.videoPlayers('.cld-video-player', {
        autoplay: true,
        muted: true,
        loop: true,
        controls: true,
        autoplayMode: 'on-scroll',
        preload: 'auto'
      })
```


The `videoPlayers` function returns an array of players. In order to provide multiple sources to this array we create an array of sources which contain information about each video to be played on the page.  The code below shows the information provided for the first video in this example.  It contains `publicId` and an `info` object.  This information could be read from an external source.  When you hover over the video, the title and subtitle appear on top of the video.  The sources are positioned in the array in the order we want them to appear on the page.

```javascript
const sources = [
  {
    publicId: 'downhill',
    info: {
      title: 'Downhill',
      subtitle: 'Downhill skiing',
      description: 'Snow'
    }
  }
]
```
We can assign these video sources to the `players` array.

```javascript
players.forEach((player, index) => {
  player.source(sources[index])
})
```

 ## Exercise: Recommendations

Add your cloud name to the `video-player/recommendations/index.html` file. You'll find the cloud name specified in the script. Open in page in the browser to see how this autoplay on scroll functions.  In this example, when a video player finished running a set of thumbnail recommendations will be displayed on top of the video.

```javascript
const cld = cloudinary.Cloudinary.new({
  cloud_name: 'cloudinary-training'
});
```

![recommendations](https://res.cloudinary.com/cloudinary-training/image/upload/v1588458932/book/vp-recommendations.png)

### Setting up recommendations

We start by setting up sources similar to what we did with the autoplay on scroll example.  

```javascript
const source1 = {
  publicId: 'downhill',
  info: {
    title: 'Downhill',
    subtitle: 'Downhill skiing',
    description: 'Snow'
  }
};
```

Instead of collecting them in a array, we create arrays of recommendations for each of the sources.  These recommendations provide the information needed to set up the thumbnail recommendations.  These recommendations could have their origin in an external recommendation engine and fetched by the web application. 

```javascript
source1.recommendations = [source2, source3, source4];
source2.recommendations = [source1, source3, source4];
source3.recommendations = [source1, source2, source4];
source4.recommendations = [source1, source2, source3];
```

---
title: "Resources"
metaTitle: "Resources"
metaDescription: "Resources"
---
 
Video Player Reference  
https://cloudinary.com/documentation/video_player_api_reference  

Video Transformation Reference  
https://cloudinary.com/documentation/video_transformation_reference  

Helpful Codepen  
https://codepen.io/team/Cloudinary/project/full/XLYMQV/  

Video Player Studio  
https://studio.cloudinary.com/  

https://cloudinary.com/documentation/video_manipulation_and_delivery?query=cloudinary.video& c_query=Embedding%20videos%20in%20web%20pages#embedding_videos_in_web_pages  

Video options 
https://cloudinary.com/documentation/video_transformation_reference?query=video%20transformation%20ref&c_query=Video%20transformation%20reference
