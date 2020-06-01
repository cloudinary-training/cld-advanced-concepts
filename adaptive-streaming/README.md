---
title: "Objectives"
metaTitle: "Objectives"
metaDescription: "Objectives"
---

What is adaptive streaming? Why use it? How can you tell if a site is using it?  We'll get the answers in this module and see how to create a custom streaming profile with fallback so that it behaves optimally in all browsers.

We'll be using the Cloudinary Video Player to help serve videos with Streaming Profiles.


1. Upload a video so that uses adaptive bitrate streaming
2. Create and use Streaming Profiles 
3. Use Eager Transformation to apply Streaming Profile
4. Using the Video Player Widget: HLS, Dash, Fallback Examples
---
title: "Concepts and Terminology"
metaTitle: "Concepts and Terminology"
metaDescription: "Concepts and Terminology"
---

## What is Adaptive Streaming

Large videos or videos served over a slow network can have negative effects for the viewer, such as buffering and poor quality especially at small screen sizes. Most video plays at 24-30 frames per second so the Internet must deliver that to keep from buffering

The word "Adaptive" helps to understand another problem that is harder to see: networks throughput can vary overtime and because networks are switched, the topology can result in varied throughputs from origin to destination.  Therefore pushing a lot of data from origin to destination may require adapting to changing network conditions.

In the past this problem might have been solved at the TCP layer of the network, but now we have an HTTP, Layer 7, solution.  This means we don't have to build any complex infrastructure to achieve a better streaming experience.  We'll see that the large file is chunked and a list of the chunks is sent to the browser.  The browser can then use XHR to ask for these chunks in the correct order.  Meanwhile the chunks can be sent to the browser before they are needed.

In this module, we'll learn how to create stream profiles that produce different format dimensions.  We'll see that different browser translate different codecs and we can build this in to the profiles so that the webpage can offer up instructions for fallback as the video is served in different browsers.

## Formats

There are two formats used for Adaptive Streaming:

- **HLS**: **H**TTP **L**ive **S**treaming Developed by **Apple**
- **MPEG-DASH**: **D**ynamic **A**daptive **S**treaming over **H**TTP International standard

It's useful at this point to become familiar with the file types that will be delivered to the browser for each of these streaming formats.  The table below introduces the two formats and the file types they rely on.  You'll see these file types when you look at the Network tab in Dev tools.  When using Safari look for `.ts` (chunked audio/video) and `.m3u8` files for the `hls` format.  When using Chrome look for `.mp4dv` (chunked video), `.md4da` (chunked audio), and `.mpd` files DASH.  Using JavaScript either browser any browser can support either type, since the file types can be read in with XHR and served through a video player.

![streaming formats](https://res.cloudinary.com/cloudinary-training/image/upload/v1590767588/book/as-streaming-formats.png)

### Note: Adaptive Streaming with localhost

In this module we’ll be configuring code to implement adaptive streaming. We’ll use the browser and the network tab to look at the effects of adding adaptive streaming. 

There are some issues using Adaptive Streaming from localhost.  You can get around these problems by one of these methods:
- run code incognito
- run from a server on the Internet
  -push your HTML files to your GitHub repo (if you’ve forked or duplicated) and use gh-pages (GitHub pages) to serve from your account.github.io server
- use the Cloudinary training server: https://cloudinary-training.github.io/advanced-concepts/adaptive-streaming




---
title: "Streaming Profiles"
metaTitle: "Streaming Profiles"
metaDescription: "Streaming Profiles"
---

Let's learn to identify adaptive streaming in the browser.  We'll using the Cloudinary Video player to serve HLS files.  HLS will not normally be supported in Chrome but as you examine the network tab in Chrome Dev tools, you'll see the HLS files and the fact that they are being loaded into the app with XHR.

## Exercise: Examine Adaptive Streaming in Network 

If you want to deploy to your own gh-pages server or run incognito to try this out, you can upload the video with adaptive streaming profiles. Notice that this is setup with  eager transformations.  This is a best practice so that when your users request these videos the formats will be ready.

```bash
node adaptive-streaming/prepare/upload-eager-transform.js
```
This upload uses Cloudinary provided streaming profiles for dash and HLS.

```javascript
const upOptions =
{
  resource_type: 'video',
  eager: [
    { streaming_profile: 'hd', format: 'm3u8' },
    { streaming_profile: 'hd', format: 'mpd' }],
  eager_async: true,
  eager_notification_url: 'https://webhook.site/17a3d46c-5d18-46b0-ab6c-94b12d7f645c',
  public_id: 'whale',
  invalidate: true
}
cloudinary.uploader.upload('./assets/video/humpbackwhale_singing.webm.360p.vp9.webm', upOptions)
  .then(result => {
    console.log(result)
  })
  .catch(error => {
    console.log(error)
  })

```

The HTML code below is using the Cloudinary **demo** cloud as context for public ids.  You can substitute your own cloud name to serve videos from your cloud.

You're seeing some new options for the video player here.  We are specify source types and listing a single type as `hls`.  We've chosen a profile provided by Cloudinary, `full_hd`.  This profile specifies transformations for different sized devices.

```javascript
 player.source('rafting', {
  sourceTypes: ['hls'],
  transformation: { streaming_profile: 'full_hd' }
})
```

You can list out the definition of a streaming profile using the SDK Admin API `cloudinary.api.get_streaming_profile` function.  You'll see an array of transformations that define video codec, bitrate, and cropping.  For any sized device this profile will provide information on how chunk and serve the files.


```javascript
{
    "transformation": [
     {
      "width": 320,
      "height": 240,
      "video_codec": "h264:baseline:3.0",
      "bit_rate": "192k",
      "crop": "limit"
     }
    ]
   },
```

```html
<html>
  <head>
    <link
      href="https://unpkg.com/cloudinary-video-player/dist/cld-video-player.min.css"
      rel="stylesheet"
    />
    <script
      src="https://unpkg.com/cloudinary-core/cloudinary-core-shrinkwrap.min.js"
      type="text/javascript"
    ></script>
    <script
      src="https://unpkg.com/cloudinary-video-player/dist/cld-video-player.min.js"
      type="text/javascript"
    ></script>
    <title>Adpative Streaming Example</title>
    <link rel="icon" href="../assets/favicon.png" type="image/png">
  </head>
  <body>
    <video id="hls-player" controls class="cld-video-player"></video>
    <script>
      var cld = cloudinary.Cloudinary.new({ cloud_name: 'demo' })
      var player = cld.videoPlayer('hls-player')
      
      player.source('rafting', {
        sourceTypes: ['hls'],
        transformation: { streaming_profile: 'full_hd' }
      })  
    </script>
  </body>
</html>
```
### Look at the Network in Dev Tools

Can you run this video in Chrome?  Can you run this video in Safari? When you get the video running, you should be able to identify the manifest files and the chunked audio and video. 

![hls in Safari](https://res.cloudinary.com/cloudinary-training/image/upload/v1590798988/book/as-hls-safari.png)

You'll see 2 manifest files with the `.m3u8` files. If you click **preview** in the network tab with the first `.m3u8` which is the manifest master, you'll see the available bitrates.

![hls manifest master](https://res.cloudinary.com/cloudinary-training/image/upload/v1590799230/book/hls-manifest-master.png)

The second manifest file can be previewed and here you'll see references to the chunked video files as `.ts`.  These files correspond to the files that you can see loaded into the browser.
![manifest chunks](https://res.cloudinary.com/cloudinary-training/image/upload/v1590799618/book/hls-manifest-chunks.png)

### DASH

You can change the source type in the JavaScript from **hls** to **dash** and open the file in Chrome.  

```javascript
 player.source('rafting', {
  sourceTypes: ['dash'],
  transformation: { streaming_profile: 'full_hd' }
})
```

In Chrome dev tools you'll see that DASH has just one manifest, but that there are two types of chunked files, one for video and one for audio.

![dash manifest](https://res.cloudinary.com/cloudinary-training/image/upload/v1590800002/book/dash-intro.png)

You'll also see XHR is used to read the chunked files.

![dash with XHR](https://res.cloudinary.com/cloudinary-training/image/upload/v1590800124/book/dash-xhr.png)


### Analysis

We should be able to answer these questions now:
- Is the training video using adaptive streaming?
- Which format is it using? HLS or Dash?  
- Did the files start downloading when we loaded the page or when we started playing the video?



---
title: "Fallback"
metaTitle: "Fallback"
metaDescription: "Fallback"
---

We're going to look at a real world example now and create a custom streaming profile that will allow the video player to run a video in any browser.

The chart below shows the optimal codec and format for each browser with a fallback that should work in any browsr.

- Chrome: DASH, VP9
- Safari: HLS, h265
- Universal: HLS and mpd, h264 


![formats, codecs, and browsers](https://res.cloudinary.com/cloudinary-training/image/upload/v1590800382/book/codec-brower-adpative-formats.png)

## Exercise: Look at Existing Profiles

It will be useful to list and read profiles provided by Cloudinary.  We'll see the `full-hd` profile that we used earlier.

```bash
node adaptive-streaming/fallback/list-streaming-profiles.js
```

```javascript
cloudinary.api
  .list_streaming_profiles()
```

With this list we can use it as a template to build a custom profile.

The next step is the output an existing profile.

```bash
node adaptive-streaming/fallback/details-predefined-hd-profile.js
```

```javascript

cloudinary.api
  .get_streaming_profile('hd')
  .then(result => console.log(JSON.stringify(result, null, 1)))
```

## Exercise: Create 3 Custom Profiles

We're going to create 3 custom profiles to match the 3 options in discussed above

- h264 see adaptive-streaming/fallback/create-custom-profile-h264.js
- h265 see adaptive-streaming/fallback/create-custom-profile-h265.js
- vp9 see adaptive-streaming/fallback/create-custom-profile-vp9.js

What we've done is copy the `hd` profile transformations and modified the codecs.

Now we can upload the video with our new custom profiles.

```bash
node adaptive-streaming/fallback/prepare.js
```
As we did above with the Cloudinary profile, we upload with our 3 new profile.

```javascript
// create dash/vp9 (chrome/ff), hls/h265(apple), hls/h264 (universal) custom profiles
const upOptions = {
  resource_type: 'video',
  eager: [
    { streaming_profile: 'training_hd_vp9', format: 'mpd' },
    { streaming_profile: 'training_hd_h264', format: 'm3u8' },
    { streaming_profile: 'training_hd_h265', format: 'm3u8' }
  ],
  eager_async: true,
  eager_notification_url:
    'https://webhook.site/17a3d46c-5d18-46b0-ab6c-94b12d7f645c',
  public_id: 'whale',
  invalidate: true
}
cloudinary.uploader
  .upload('./assets/video/humpbackwhale_singing.webm.360p.vp9.webm', upOptions)
  .then(result => {
    console.log(result)
  })
  .catch(error => {
    console.log(error)
  })
```
The webhooks response allows us to see the creation of the **m3u8** and **mpd** files.

![webhooks](https://res.cloudinary.com/cloudinary-training/image/upload/v1590801961/book/as-webhooks.png)

Once the processing is complete, we can go to the Media Library and click through transformations for the video to find derived assets and we should see a list of transformations that support the streaming profiles created.

![derived from streaming profiles](https://res.cloudinary.com/cloudinary-training/image/upload/v1590802044/book/as-derived-videos.png)

## Exercise: Use Fallback

Now we can use the Video Player to load all 3 custom profiles and stream in any browser.

Look at the javscript code in **adaptive-streaming/fallback/index.html**.  You can see all 3 `sourceTypes` and the browser will choose the first one it can use.  You can see that the final fallback is mp4 which is not using any adaptive streaming.

You can try this out on the Cloudinary training server if you are not using gh-pages or Chrome incognito mode:

https://cloudinary-training.github.io/advanced-concepts/adaptive-streaming/fallback/index.html



```javascript
    const sources = {
      publicId: "whale",
      sourceTypes: ["dash/vp9", "hls/h265", "hls/h264", "mp4"],
      sourceTransformation: {
        "dash/vp9": [
          {
            streaming_profile: "training_hd_vp9"
          }
        ],
        "hls/h265": [
          {
            streaming_profile: "training_hd_h265"
          }
        ],
        "hls/h264": [
          {
            streaming_profile: "training_hd_h264"
          }
        ],
        "mp4": [
          {
            raw_transformation: "q_auto"
          }
        ]
      }
    };
    const player = cld.videoPlayer("example-player")
    player.source(sources);

```
Try this out in all browsers and confirm they are using adaptive streaming and that they are all able to stream the video.

![fallback in different browsers](https://res.cloudinary.com/cloudinary-training/image/upload/v1590802568/book/as-fallback.png)

## Exercise: DASH only

What happens if we leave out the streaming profile for HLS?  Look at the **adaptive-streaming/fallback/dash-only.html** web page.  Open it in the different browsers.  Is there fallback to `mp4`?

```javscript
sourceTypes: ["dash/vp9","mp4"],

```


---
title: "Pros and Cons"
metaTitle: "Pros and Cons"
metaDescription: "Pros and Cons"
---

Should we use adaptive streaming?

The criteria for making this decision are laid out in the table below.  If you are serving large video, you should use adaptive streaming to avoid buffering.  Large videos are those in excess of 60MB or > 30 seconds.  If you serving to mobile devices, an want good quality, you should consider using adaptive streaming.  If you are using a video player, this can enhance the service and make good service available for all browsers.

There is a cost to creating transformations for the different profiles you want to support, but it can be justified in the name of providing a quality video experience.

![what to use](https://res.cloudinary.com/cloudinary-training/image/upload/v1590802811/book/as-what-to-use.png)

---
title: "HLS in Chrome"
metaTitle: "HLS in Chrome"
metaDescription: "HLS in Chrome"
---

We've talked about using a video player to render adaptive profiles.  Devices and browsers can render these adaptive formats natively, without a video player, by using extensions. 

You request the URL below in Safari and natively stream HLS.

https://res.cloudinary.com/cloudinary-training/video/upload/sp_hd/whale.m3u8?_s=vp-1.3.4

If you want to be able to stream in Chrome for testing, you can install an extension.

https://chrome.google.com/webstore/detail/play-hls-m3u8/ckblfoghkjhaclegefojbgllenffajdc/related?hl=en

---
title: "Resources"
metaTitle: "Resources"
metaDescription: "Resources"
---

Adaptive Streaming

https://cloudinary.com/documentation/video_player_hls_dash