---
title: "Objectives"
metaTitle: "Objectives"
metaDescription: "Objectives"
---

In this module we explore two ways to retrieve, upload, transform and deliver remote assets that don't use the Upload API: Auto-Upload and Fetch.  We'll compare them and suggest appropriate use cases for each.

## Objectives

- Use Fetch and Auto-upload to load remote assets into the Cloudinary cloud
- **Fetch**: Delivery type for images that relies on  accessing remote URL directly
- **Auto-Upload**: Map a remote website to a Cloudinary directory so that requests for assets of any resource type will result in those assets being uploaded to Cloudinary and will maintain their original directory structure
- Configure Fetch and Auto-Upload in the Cloud settings, including whitelisting remote servers for this kind of access
- Configure an upload preset that applies to an Auto-Upload configured directory so that all instructions in the preset are applied to all assets uploaded to that directory
- Compare Use Cases for Auto-Upload and Fetch

## Architecture

As we start accessing remote servers to upload assets, we need to look at the architecture we're working with in this course.  Most of the assets that we will be accessing remotely will be coming from a **github.io** server that is the published versions of the repository we are working with in this course.

If you look at the `/assets` directory in this repository, you'll find the images, videos and raw files that we'll be uploading to Cloudinary.  You'll find all of the assets served online at https://cloudinary-training.github.io/cld-advanced-concepts/assets/...

![course architecture]()

When you upload assets, you've been uploading from the local `/assets` directory.  For this module, you'll be accessing assets from the **cloudinary-training.github.io** server.

## Delivery Type Upload

We know that we can upload remote assets using the Upload API.  In this module, we are not using the Upload API for either Fetch or Auto-Upload.  As you work through the exercises, remember that the Upload API allows you to upload remote assets, but think about the reasons that would lead you to use Fetch and Auto-Upload instead of the Upload API.  At the end we'll summarize the use cases.

As a reminder this is what the code for the Upload API would look like when uploading remote assets:

```javascript
cloudinary.uploader.upload( 'https://cloudinary-training.github.io/cld-advanced-concepts/assets/images/cc0.png',
   {
     public_id: 'cc0',
     type: 'upload'
   }
 )

```


---
title: "Fetch"
metaTitle: "Fetch"
metaDescription: "Fetch"
---

We'll start with the Fetch method of uploading remote images.  Fetch is limited to uploading images and can't be used for video or raw files.

## Exercise: Configure Fetch

**Fetch** is a delivery type like **upload**.  It is disabled by default.  When you enable it, it is possbile for anyone who knows your cloud name to load remote images into your cloud.  For that reason, as we enable Fetch, we'll also whitelist the source servers from which we will allow fetched images to be sourced from.

1. Open Settings in the DAM: Security
2. Locate “Restricted media types”
3. Uncheck “Fetched URL” to allow fetch to be used in Cloudinary requests


The **Fetched URL** setting is disabled by default.  Go to Settings in the DAM and enable it by unchecking the box.

![uncheck Fetched URL](https://res.cloudinary.com/cloudinary-training/image/upload/v1590600048/book/fetch-setting.png)

4. Locate “Allowed fetch domains:” and add the web server location of our course repo which contains media assets: **cloudinary-training.github.io**

Use the **github.io** server URL that can server up our course repository as a source for remote assets.  These assets are the same as the ones in your code repo under the assets directory.

You can add other domains as well such as https://images.pexels.com and https://images.unsplash.com which offer public domain images for further testing and experimentation.


![Fetch Whitelisted Servers](https://res.cloudinary.com/cloudinary-training/image/upload/v1590600399/book/fetch-whitelist.png)

## Exercise: Fetch with SDK

### Upload with Fetch

```bash
node autoupload-fetch/fetch/fetch-create.js
```

Requesting this URL will upload an image to your cloud.

```javascript
const url = cloudinary.url(
  'https://cloudinary-training.github.io/cld-advanced-concepts/assets/images/oranges.jpg',
  { type: 'fetch' }
)
```
Notice that **fetch** is positioned in the URL where we see **upload**, **private** or **authenticated** as it is a deliver type.  Following the delivery type, we see the full URL to the remote image.

```bash
res.cloudinary.com/pictures77/image/fetch/
https://cloudinary-training.github.io/cld-advanced-concepts/assets/images/oranges.jpg
```

### Fetched image in the DAM

You can see in the image below that the image is availabe in the root of the DAM.  The public ID is the full URL to the original image.  Even though there are `/` in the public id, for fetched images this does not mean they are in a directory in the cloud.  You can also see that the icon for the type is a **link**.

![fetched asset in DAM](https://res.cloudinary.com/cloudinary-training/image/upload/v1590603690/book/fetch-dam.png)

## Exercise: Fetch with Transformation

When you add a transformation to a fetch type, the original asset associated with the Fetch URL will be loaded into the DAM and a derived asset with the transformation can be found under **View Dervived Images** in the DAM.  When you request the transformed image, it will load faster.


```bash
node autoupload-fetch/fetch/fetch-transform.js
```

```javascript
const url = cloudinary.url('https://cloudinary-training.github.io/cld-advanced-concepts/assets/images/strawberry.jpg',
  {
    type: 'fetch',
    width: 400,
    height: 400,
    crop: 'limit',
    radius: '30',
    effect: 'sharpen',
    quality: 'auto',
    fetch_format: 'auto'
  }
)
```
Navigate to the image's transformation and click on View Derived Image to see this.

![fetch derived images](https://res.cloudinary.com/cloudinary-training/image/upload/v1590606608/book/fetch-derived-images.png)


## Fetch just 1 image

You can restrict **Fetched URLs** and still request a fetch image if you sign the URL.  To try this out, you can go back and check the box in settings to restrict Fetched URLs.  Then execute the code below in which the URL is signed.

```bash
node autoupload-fetch/fetch/fetch-create-signed.js 
```

```javascript
const url = cloudinary.url(
  'https://cdn.pixabay.com/photo/2020/03/06/13/43/mockingbird-4907104_1280.jpg',
  { type: 'fetch', sign_url: true }
)
```

## Notes

Here are some considerations when using the Fetch delivery type:

- Assets are image only
- Source of truth is the remote server
- Fetched objects are not backed up even if you have backup turned on
- Paid accounts can set up weekly (or periodic) removal from Cloudinary CDN
- Free accounts get one removal after 7 days - default cache invalidate
- First time you request may take a couple seconds
- Upload and create derived image transformations on the fly
- Future requests are cached and load quickly

Overall, Fetch does not attempt to maintain any file structure associated with the original asset.  The path to the original asset just becomes part of the string making up the public id.  Fetch is also transient, in that if the original asset image changes, you would need to fetch it again to pick up the change.  This is what we mean in saying it is not the "source of truth".






---
title: "Auto-Upload"
metaTitle: "Auto-Upload"
metaDescription: "Auto-Upload"
---

As you work through configuration and execution of Auto-Upload, notice how it is designed in a way to make Cloudinary the "source of truth". 

## Exercise: Configure Auto-Upload

You can set up multiple mappings between external assets and a local Cloudinary directory.  You can maintain the folder structure underneath the path mapped to the Cloudinary directory.  For example, in this repo, there are 3 directories below the `/assets` directory: `images`, `video`, and `raw`.  There is also a directory named `assets-secure` which is supposed to simulate images that you wouldn't want publicly shared.  

### Mapping a Cloudinary directory to a remote server path

1. Open Settings: **Upload** 

2. Locate **Auto Upload Mapping**

3. Choose a name for a local folder in your Cloudinary account: **remote-media**. 

4. Enter a URL (can include path) to map to your Cloudinary Folder https://cloudinary-training.github.io/advanced-concepts/assets/ .  Notice the name doesn't match the remote name `/assets`.  You can make it match if you want to.

You mapping should look like this:

![remote-media mapping](https://res.cloudinary.com/cloudinary-training/image/upload/v1590610481/book/autoupload-remote-media-mapping.png)

5.  Save the settings

In summary, we've designated a Cloudinary directory named `remote-assets` to map to the `assets` directory of our online repo server.  The `remote-media` folder won't be created until you request something from it.


```bash
node utoupload-fetch/autoupload/create-upload-url.js

```
When we open the URL created in the script below, we'll automatically create the `remote-media` directory
with an images subdirectory containing the pineapple image.

```javascript
const url = cloudinary.url('remote-media/images/pineapple.jpg')
open(url)
```

The URL should look like the one below.  The remote-media is positioned just as the directory structure in the Media Library shows it.

```bash
http://res.cloudinary.com/cloudinary-training/image/upload/v1/remote-media/images/pineapple.jpg
```

![remote media with image directory](https://res.cloudinary.com/cloudinary-training/image/upload/v1590610846/book/auto-upload-remote-media.png)

## Exercise: Raw Auto-Upload

In this exercise, we're uploading JSON.  The `raw` subdirectory is uploaded and the data is of type JSON.

```bash
node autoupload-fetch/autoupload/file-types/autoupload-raw.js 
```

```javascript
const url = cloudinary.url('remote-media/raw/data.json', {
  resource_type: 'raw',
  secure: true
})

```

![auto-upload raw](https://res.cloudinary.com/cloudinary-training/image/upload/v1590611060/book/autoupload-raw.png)

## Exercise: Video Auto-Upload

Now we're going to upload a video. 

```bash
node autoupload-fetch/autoupload/file-types/autoupload-video.js
```
We'll see that this video has been uploaded to the `video` directory underneath `remote-media`.

```javascript
const url = cloudinary.url('remote-media/video/rooster.mp4', {
  resource_type: 'video',
  secure: true
})
```

We can see some differences between Fetch and Auto-Upload:
1. Auto-Upload can be used to upload all resource types and Fetch can only be used to upload images
2. With Auto-Upload the original asset's directory structure can be maintained if the mapping is done in such a way as to reference to a higher level directory.  
3. Auto-Upload images use standard delivery types where Fetched images use the **Fetch** delivery type.

## Exercise: Auto-Upload Secure Images

We can use the restrictive delivery types with Auto-Upload.  We'll see how to upload with a `private` delivery mode here but `authenticated` could be setup in the same way.

Just to keep assets logically separate, we're going to create a new mapping called `remote-media-secure` that is mapped to the `assets-secure` directory.

1. Open Settings: **Upload** 
2. Locate **Auto Upload Mapping**
3. Click on the link to **Add another mapping**
4. Choose a name for a local folder in your Cloudinary account: **remote-media-secure**
5. Enter a URL to map to your Cloudinary Folder https://cloudinary-training.github.io/cld-advanced-concepts/assets-secure/`

![auto-upload private](https://res.cloudinary.com/cloudinary-training/image/upload/v1590611710/book/auto-upload-private.png)

Now we can execute the script that will upload images as private by setting the option `type: 'private'`.  When this URL is opened a new directory named `remote-media-secure` will be created the uploaded image will be private.

```bash
node autoupload-fetch/autoupload/autoupload-type-private.js
```

```javascript
const url = cloudinary.url('remote-media-secure/cherries.jpg',
  {
    type: 'private',
    secure: true,
    resource_type: 'image',
    sign_url: true
  })
open(url)
```

![auto-upload private in DAM](https://res.cloudinary.com/cloudinary-training/image/upload/v1590612055/book/auto-upload-private-dam.png)


---
title: "Auto-Upload Preset"
metaTitle: "Auto-Upload Preset"
metaDescription: "Auto-Upload Preset"
---

## Exercise: Auto-Upload with Preset

Presets are very useful for automating work-flow.  The same instruction set can be executed on all uploaded asset that use the same preset.  You can configure an upload preset for Auto-Upload assets.  

We're going to create a new mapping that creates an image only directory and then we're going to create an upload preset that applies instructions to all images in that directory.  We'll start by creating a new mapping, which will result in a new directory in Cloudinary.  This new directory will be called `remote-images`.  Notice that we are drilling down to the `assets/images` directory on the remote server.

1. Open Settings: **Upload** 
2. Locate **Auto Upload Mapping**
3. Click on the link to **Add another mapping**
4. Choose a name for a local folder in your Cloudinary account: **remote-images**
5. Enter a URL to map to your Cloudinary Folder https://cloudinary-training.github.io/cld-advanced-concepts/assets/images`

You can execute this script to create the preset.

```bash
node autoupload-fetch/autoupload/preset/create-preset.js
```
You can see that we are going to use the filename as the public id.  We're providing a key/value pair for context that will show up in the metadata section of the Media Library for any asset using this preset.  We're also created a derived transformation eagerly.

```javascript
cloudinary.api
  .create_upload_preset({
    name: 'remote-images',
    use_filename: true,
    unique_filename: false,
    unsigned: false,
    context: 'source=github',
    eager: {
      transformation: [
        {
          crop: 'thumb',
          height: '300',
          width: '300'
        },
        {
          gravity: 'auto',
          fetch_format: 'auto'
        }
      ]
    }
  })
```
Notice that in green, it says that it will be used by `remote-images` Auto-Upload Mapping.  **If you want to add a preset to an Auto_Upload, just name the preset the same name as the mapped directory.**

[auto-upload preset](https://res.cloudinary.com/cloudinary-training/image/upload/v1590612353/book/auto-upload-preset.png)

Now we'll use the preset in an upload

```bash
node autoupload-fetch/autoupload/preset/autoupload-image-after-creating-preset
```

```javascript
const url = cloudinary.url(cloudinary.url('remote-images/kiwi.jpg'))
open(url)
```

![auto upload preset effect](https://res.cloudinary.com/cloudinary-training/image/upload/v1590612795/book/autoupload-preset-effects.png)
---
title: "Auto-Upload vs. Fetch"
metaTitle: "Auto-Upload vs. Fetch"
metaDescription: "Auto-Upload vs. Fetch"
---

## Source of Truth

We've been configuring and using Fetch and Auto-Upload.  We noted some differences between the two.  The term "source of truth" describes one of the differences.  While both methods will upload to the Cloudinary database, and be served form the CDN, the Auto-Upload can represent source of truth in that it can maintain directory structure of the origin and it won't be cleared from the CDN.

Looking at the image below, we see that the Fetched imaged will always live in the root of the project, whereas the Auto-Uploaded image can live in a directory below the mapped directory corresponding to its location on the source server.  

Auto-Upload is often used for migration of assets onto Cloudinary.

![auto-upload source of truth](https://res.cloudinary.com/cloudinary-training/image/upload/v1590613271/book/source-of-truth.png)

  |   | Auto-Upload  | Fetch  | 
  |:-:|:-:|:-:|
| Retrieved Images | Cloudinary provides full management functionalities (like "upload" type). All features available.|Managed by user, Cloudinary provides manipulation and delivery only|
|Transformations|Can create multiple versions of the same image using Eager-Transformations, or apply Incoming-Transformation.|On-the-fly transformations only|
|Upload Presets|Automatically apply pre-defined actions to apply to uploaded files (upload-preset is named as the mapped folder)|N/A|
|SEO-Friendly URLs|Shortened URLs, hide the origin|Long (verbose) URLs, can’t hide the origin|
|Access Permissions to originals|Restrict access to originals by utilizing private images|N/A|
|Image Availability|Full storage management, backups, revisions|Cloudinary provides caching only|
|Handling Consistency|Identical treatment of newly-uploaded and old - maintain folder structure with or without the mapping|N/A|
|Auto Refreshing|Requires explicitly deleting/overriding existing resource|Automatic refresh policy is available on paid plans|
|Use Case|Lazy Migration|No migration - maintain existing source of truth|
|Asset Types|Image, video, raw|Image only|





---
title: "Resources"
metaTitle: "Resources"
metaDescription: "Resources"
---

Auto-Upload and Fetch  

https://support.cloudinary.com/hc/en-us/articles/211869909-What-are-the-differences-between-Auto-Upload-and-Fetch-

