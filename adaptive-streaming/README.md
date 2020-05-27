# Adaptive Bitrate Streaming

## Links to use for testing streaming
You can test streaming after you have run the preparation steps which will upload and carry out transformations to create streaming profiles.  

You will have some problems testing from localhost because, depending on browser, there may be
 some XHR that will fail.  The intention is that you setup the html with your prepared videos, checkin to github and then access in the browser using github.io. 

 [Instructions for setting up a project github.io](https://help.github.com/en/github/working-with-github-pages/about-github-pages)  

### Change the server domain to your github.io account: 
#### HLS  
${process.env.ASSET_SOURCE_BASE}/adaptive-streaming/stream/whale-stream-hls.html
#### DASH
${process.env.ASSET_SOURCE_BASE}/adaptive-streaming/stream/whale-stream-dash.html
#### FALLBACK
${process.env.ASSET_SOURCE_BASE}/adaptive-streaming/stream/abs-fallback.html

#### Changing the order of sources
${process.env.ASSET_SOURCE_BASE}/adaptive-streaming/stream/abs-stream-fallback-dash-first.html
${process.env.ASSET_SOURCE_BASE}/adaptive-streaming/stream/abs-stream-fallback-hls-first.html

### Cloudinary Video Player

Using the Cloudinary Video player in your client allows you to take advantage of adaptive bitrate streaming.  



## helpful code
[Code pen with sample video code](https://codepen.io/team/Cloudinary/project/full/XLYMQV/)
[Code pen with Adpative Streaming](https://codepen.io/team/Cloudinary/project/full/XLYMQV/)

`npm install lodash cloudinary-core cloudinary-video-player dashjs videojs-contrib-dash`


**Note:** The video player does not require the full Cloudinary core library. You can use the "shrinkwrap" version. 

This code uses CDN sources for JavaScript and CSS client code.

### add to HTML head 

```html 
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
    integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
<link href="https://unpkg.com/cloudinary-video-player/dist/cld-video-player.min.css" rel="stylesheet">
<link href="./css/style.css" rel="stylesheet">
```

### add to HTML body  

```html
<script type="text/javascript"
      src="https://cdnjs.cloudflare.com/ajax/libs/cloudinary-core/2.3.0/cloudinary-core-shrinkwrap.js">
   </script>
<script type="text/javascript" src="https://unpkg.com/cloudinary-video-player/dist/cld-video-player.min.js">
   </script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/dashjs/2.6.3/dash.all.min.js">
    </script>
<script type="text/javascript"
      src="https://cdnjs.cloudflare.com/ajax/libs/videojs-contrib-dash/2.9.2/videojs-dash.min.js">
   </script>

```



<link href="https://unpkg.com/cloudinary-video-player@1.3.3/dist/cld-video-player.min.css" 
   rel="stylesheet">
<script src="https://unpkg.com/cloudinary-core@2.6.3/cloudinary-core-shrinkwrap.min.js" 
   type="text/javascript"></script>
<script src="https://unpkg.com/cloudinary-video-player@1.3.3/dist/cld-video-player.min.js" 
   type="text/javascript"></script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/dashjs/3.0.0/dash.all.min.js" type="text/javascript"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/videojs-contrib-dash/2.9.2/videojs-dash.min.js" 
    type="text/javascript">  
</script>

[Streaming Profile](https://cloudinary.com/documentation/video_manipulation_and_delivery#predefined_streaming_profiles)

## Asset Attributions
[Video: Humpback whale singing from Wikimedia Commons](https://upload.wikimedia.org/wikipedia/commons/transcoded/7/74/Humpbackwhale_singing.webm/Humpbackwhale_singing.webm.360p.vp9.webm)

[Video: Bacteria Friend and Foe](https://archive.org/details/bacteria_friend_and_foe)