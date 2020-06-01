---
title: "Objectives"
metaTitle: "Objectives"
metaDescription: "Objectives"
---

## Intro

Access control is the first module in this course because the concepts and mechanics of adding access control will be referenced throughout the course.

Cloudinary assets are public by default.

We’re going to learn how to restrict access to assets per asset, both original and transformations. 

After restricting access, we’ll learn how to allow access to specific assets using signed URLs, the Admin API Named transformations, and Explicit Eager transformation.

- Delivery Types:
  - **Upload:** Default public access delivery
  - **Private:** Disallow access to original asset
  - **Authenticated:** Disallow access to original assets and any transformations created from original asset
- Upload API **access_control**: option for time limited access
**Strict Transformations:** security setting to disallow any public transformations and only allow access to pre-generated transformations using eager Upload API, Admin API or DAM
- Signed Delivery: generating a signature for a URL to allow access when access was previously denied
- Review Use Cases: for using the different types of access control

## Options Summary 

The table below shows compares the types of control offered by the different options will be using in this module.

![Access control options](https://res.cloudinary.com/cloudinary-training/image/upload/v1589909005/book/control-options.png)
---
title: "Private"
metaTitle: "Private"
metaDescription: "Private"
---

## Private

By setting the deliver type to `private`, we are restricting access to the **original** asset.  It is still possible to create public transformations.  Assets can be images, video or raw resource types.

We'll see that we can provide access by **signing** the URL.

## Exercise: Upload Private Asset

Execute the script below to upload an asset with a **private** delivery type.

```bash
node access-control/private/upload-private.js
```
The script adds a `type:private` options to the upload.

```javascript
cloudinary.uploader.upload('./assets/images/goldfish.jpg', {
  public_id: 'goldfish',
  type: 'private',
  invalidate: true
})

```

Look at the secure url in the response. Notice the signature. What happens if the signature is removed?  

See the response below for example.  Your signature won't be the same as the response below, because it will use your API Secret to sign the public id and any transformations. 

```javascript
{
  public_id: 'goldfish',
  version: 1584376364,
  signature: '1402a1760efec0162f6e3dba2ad1b2da43e5e879',
  width: 3740,
  height: 2200,
  format: 'jpg',
  resource_type: 'image',
  created_at: '2020-03-16T16:32:44Z',
  tags: [],
  bytes: 331987,
  type: 'private',
  etag: 'edee76a4a3fc6e5c4094eed24dd75dbc',
  placeholder: false,
  url: 'http://res.cloudinary.com/pictures77/image/private/s--TGo7W8ew--/v1584376364/goldfish.jpg',
  secure_url: 'https://res.cloudinary.com/pictures77/image/private/s--TGo7W8ew--/v1584376364/goldfish.jpg',
  access_mode: 'public',
  overwritten: true,
  original_filename: 'goldfish'
}

```

## Exercise: Transform private asset

Execute the script below to apply a transformation to the asset just uploaded.

```bash
node access-control/private/private-transformation.js

```

In this script we're applying cropping transformations and `f_auto`, `q_auto`.  Note that the `secure: true` option, gives us an encrypted request with `https`.  Private assets don't restrict the ability to add transformations to an asset.  

```javascript
const url = cloudinary.url('goldfish', {
  type: 'private',
  secure: true,
  width: 300,
  height: 300,
  quality: 'auto',
  fetch_format: 'auto',
  crop: 'limit'
})
console.log(url)
open(url)
```

**Aside:** you can add `a_0` to create a transformation that looks like the original: if you’re trying to enforce a watermark this could undo that. We’ll see a couple of ways to control for this when we look at the `authenticated` access type and the `enable strict transformations` security setting.


---
title: "Authenticated"
metaTitle: "Authenticated"
metaDescription: "Authenticated"
---

## Authenticated

By setting the deliver type to `authenticated`, we are restricting access to the **original** asset and the ability to make any transformations on the asset. Assets can be images, video or raw resource types. Access to the original asset and on the fly transformations can be achieved by signing the URL.

## Exercise: Upload Authenticated Asset

Execute the script below to upload an asset with a **authenticated** delivery type.

```bash
node access-control/authenticated/upload-authenticated.js
```
The script adds a `type:authenticated` options to the upload.

```javascript
cloudinary.uploader.upload('./assets/images/dolphin.jpg', {
  public_id: 'dolphin',
  type: 'authenticated',
  invalidate: true
})

```

Look at the secure url in the response.  

See the response below for example.  Your signature won't be the same as the response below, because it will use your API Secret to sign the public id and any transformations. 

```javascript
{
  public_id: 'dolphin',
  version: 1584376639,
  signature: '348dc2042f0ac1fdf75ad0d06e924f73c2082f5e',
  width: 2352,
  height: 1568,
  format: 'jpg',
  resource_type: 'image',
  created_at: '2020-03-16T16:37:19Z',
  tags: [],
  bytes: 103603,
  type: 'authenticated',
  etag: '78b1b379a53c282c9ccaa94694669c75',
  placeholder: false,
  url: 'http://res.cloudinary.com/pictures77/image/authenticated/s--1YD6WCo_--/v1584376639/dolphin.jpg',
  secure_url: 'https://res.cloudinary.com/pictures77/image/authenticated/s--1YD6WCo_--/v1584376639/dolphin.jpg',
  access_mode: 'public',
  overwritten: true,
  original_filename: 'dolphin'
}

```

## Exercise: Transform authenticated asset

Execute the script below to apply a transformation to the asset just uploaded.

```bash
node access-control/authenticated/authenticated-transformation.js

```

We are cropping the image as we did with the private asset.  What allows this to work is that we're signing the URL by adding the `sign_url:true` option to the request.  What happens if you comment out this option?


```javascript
const url = cloudinary.url('dolphin', {
  type: 'authenticated',
  secure: true,
  width: 300,
  height: 300,
  quality: 'auto',
  fetch_format: 'auto',
  crop: 'limit',
  sign_url: true
})

```

## Identifying Delivery Type 

The image below shows the private and authenticated images we have uploaded as they appear in the Media Library.  Notice the icons help us to identify the delivery type.

![media library private vs auth](https://res.cloudinary.com/cloudinary-training/image/upload/v1589912721/book/control-private-vs-auth-ml.png)

If you've been taking note of the URLs generated you should also see that the delivery mode is shown in the URL after the `cloud_name\<resource_type>`.  You'll see upload for public assets.

- res.cloudinary.com/cloudinary-training/image/**upload**/
- res.cloudinary.com/cloudinary-training/image/**private**/
- res.cloudinary.com/cloudinary-training/image/**authenticated**/

## Signature and Transformation

You can click on the link below to see a video that focuses on how changing the transformation input in the ML Transformations page effects the value of the signature.
 
 [![Signature Depends on Transform](https://res.cloudinary.com/cloudinary-training/image/upload/v1589918918/book/ac-signature-depends-on-transform.png)](https://res.cloudinary.com/cloudinary-training/video/upload/v1584564630/video-for-training/authenticated-tranform-signature.mp4)---
title: "Access Control"
metaTitle: "Access Control"
metaDescription: "Access Control"
---

## Time Release of Asset

What if you are not releasing your product until the weekend, but you want it staged on the CDN before then?

Using the `anonymous` **access_type**, you can supply start and end dates, or just one of them to control public access to the asset.

## Exercise: Access Control Anonymous

Execute the script below to upload an asset with a **private** delivery type.

```bash
node access-control/upload-access-control/upload-asset-anon.js
```
The script below contains some date calculation functions using the **moment** library.  Both function returns the date as an `ISOString` which contains timezone set at 0 and looks like this `"2020-05-19T20:22:27.792Z"`.  The `addDays` accepts number of days to offset the current date and the `addSeconds` accepts the number of seconds to offset the current Date.
A pair of start and end dates are calculated and handed of to the Upload API using  the access control option.  This will have the effect of making the asset only available between start and end date.

```javascript
access_control: [
  { access_type: 'anonymous', start: startdate, end: enddate }
]
```
 
 Execute the upload script:

 ```bash
node access-control/upload-access-control/upload-asset-anon.js
 ```

The example is set up so that it won't be available until 45 seconds after it is uploaded.  Then it will only be available for 1 week after uploading. 

```javascript
const addDays = days => {
  return moment()
    .add(days, 'days')
    .toISOString()
}
// start this 45 seconds later
const addSeconds = seconds => {
  console.log(new Date())
  return moment().add(seconds, 'seconds').toISOString()
}
// set to expire after 7 days

const enddate = addDays(7)
const startdate = addSeconds(45)
console.log('oneweekfromtoday', enddate)
console.log('45 seconds from now', startdate)

cloudinary.uploader
  .upload('./assets/images/koi.jpg', {
    public_id: 'koi',
    type: 'upload',
    overwrite: true,
    invalidate: true,
    access_control: [
      { access_type: 'anonymous', start: startdate, end: enddate }
    ]
  })

```
The response will verify this access control timing.

```javascript
2020-03-24T00:16:11.085Z
oneweekfromtoday 2020-03-31T00:16:11.083Z
30 seconds from now 2020-03-24T00:16:56.089Z
{
  public_id: 'koi-1',
  version: 1585008972,
  signature: '6a77fcc2976cf523189a046cf71d59a16ec3ce0b',
  width: 5184,
  height: 3456,
  format: 'jpg',
  resource_type: 'image',
  created_at: '2020-03-24T00:16:12Z',
  tags: [],
  bytes: 229072,
  type: 'upload',
  etag: '94b56aab4ec55d49cb0a33e3f29c9cbb',
  placeholder: false,
  url: 'http://res.cloudinary.com/pictures77/image/upload/v1585008972/koi-1.jpg',
  secure_url: 'https://res.cloudinary.com/pictures77/image/upload/v1585008972/koi-1.jpg',
  access_mode: 'public',
  access_control: [
    {
      access_type: 'anonymous',
      start: '2020-03-24T00:16:56Z',
      end: '2020-03-31T00:16:11Z'
    }
  ],
  original_filename: 'koi'
}
```

You can see that there is a set start and end time for this asset to be available.

![access control by time](https://res.cloudinary.com/cloudinary-training/image/upload/v1589920499/book/ac-ac-restricted-time.png)


**Note:** if you’re doing date calculations in JavaScript, use the moment library to avoid the effects of local timezone.
---
title: "Strict Transformations"
metaTitle: "Strict Transformations"
metaDescription: "Strict Transformations"
---

## Disabling Transformations

We've seen how we can disable transformations per asset by assigning them the `authenticated` delivery type. We can change a security setting in the DAM that will allow us to lock down the ability to create on-the-fly transformations.
This lock down applies to all assets regardless of their delivery mode.  

## Exercise: Enable Strict Transformations

Modify Security Settings to enable Strict Transformation - don’t forget to save! Notice that there are separate options for enabling strict transformations on image and video.  

![enable strict transformations](https://res.cloudinary.com/cloudinary-training/image/upload/v1589920875/book/ac-strict-transform-enable.png)


### Additional Options for Enabling Strict Transformations 

There is also an option to allow certain domains to make transformations when strict transformations are enabled.

![enable referrer domain for strict transformations](https://res.cloudinary.com/cloudinary-training/image/upload/v1589921072/book/ac-strict-transform-referrer.png)

## Exercise: Using Strict Transformations Enabled

```bash
node access-control/strict-transformations/upload-post-strict-and-access-original.js
```

In the code below we are using delivery type **upload** which provides public access to both the original and the transform.  However, notice the 3 cases as we work with the resulting secure URL:

1. no transformation: status 200 in browser as original image is rendered in the browser and format extension is not included in URL
2. append original format file extension: status 200 as original image is as original image is rendered in the browser with its original format as a file extension included in the URL
3. add the angle 0 transformation: status 404 as we attempt to add a transformation when transformations are not allowed


```javascript
cloudinary.uploader
  .upload('./assets/images/jellyfish.jpg', {
    public_id: 'jellyfish',
    type: 'upload',
    overwrite: true,
    invalidate: true
  })
  .then(uploadResult => {
    console.log(uploadResult)
    console.log('secure url', uploadResult.secure_url)
    // Consider 4 cases:
    // 1. no transformation and no auth error
    open(uploadResult.secure_url)

    // format included
    let url = cloudinary.url(`${uploadResult.public_id}`, {
      format: `${uploadResult.format}`
    })
    console.log('format included:', url)
    // 2. original format included in Cloudinary URL config - no transformation
    // no auth error
    open(url)

    // no format - just public id
    url = cloudinary.url(`${uploadResult.public_id}`, {})
    console.log('cloudinary url:', url)
    // 3. should not work 404
    open(url)

    // 4. transformation
    url = cloudinary.url(`${uploadResult.public_id}`, { angle: 0 })
    console.log('cloudinary url:', url)
    // expect fail 'resource not found' 404
    open(url)
  })

```



---
title: "Signed URLs"
metaTitle: "Signed URLs"
metaDescription: "Signed URLs"
---

## Providing access to restricted assets
We've learned 4 ways to "lock down" access to original and transformed images:

1. **private** delivery type restricts access to the original asset
2. **authenticated** delivery type restricts access to both the original asset and any transformations of that asset
3. **access control** option using a start and stop times limits access to a time period
4. enabling the **strict transformation** setting restricts the creation of on the fly transformations for the entire cloud account

Now that we know how to restrict access, let explore ways to open up access to our restricted assets and transformations.  

## What is "signing"?

In the image below the signature of the URL is highlighted in red.

![Signature in URL](https://res.cloudinary.com/cloudinary-training/image/upload/v1590515313/book/signed-url.png)

When we learned to restrict access to original assets we discussed "signing" the URL and mentioned that we use the API_SECRET to sign it.  We saw that the signed url contained a section of its path with some characters that were delimited by `s--` and `--`.  The characters between those delimiters are a the calculated signature.  We'll  more about creating signatures in the **Signing URLs** module.  

Because the signature requires the **API_SECRET**, which is only available to people who have the credentials to see it, Cloudinary can be sure that a properly signed URL is OK to deliver.  When a request for a signed URL is made to Cloudinary, it is verified by matching it to a signature that is calculated using the same calculation used to create the signature.

The signature is created using a cryptographic digest of a string that includes the public id, any transformations and the API_SECRET.  You can hand code this signature or include the option `sign_url: true` in your URL helper function.

## "Hand Coded"

We'll start by writing our own code for a signature.

```bash
node access-control/signature/hand-code.js
```

In the code below, we use a couple of external libraries from npmjs.org to help with the signing.  The `crypto` library provides the `sha1` encryption algorithm.  The `urlsafe-base64` converts the digested bits into a binary format that we can add to a URL.  We're just following the process that the Cloudinary back end is using to create the signature.

1. get the public id string
2. get the transformation string
3. concatenate the transformation and public id with a `/` and the api secret to create the string to sign
4. apply the crypto hash algorithm, digest and slice off the first 8 characters
5. URL base64 encode the characters and then concatenate within `s--` and `--` delimiters
6. Add the signature to the URL right after the delivery type

```javascript
// extract signing information fron env
const cloudname = cloudinary.config().cloud_name
const secret = cloudinary.config().api_secret

const crypto = require('crypto')
const URLSafeBase64 = require('urlsafe-base64')

// dolphin is authenticated
// hand coded signature
const transformation = 'c_limit,h_400,w_400'
const publicId = 'dolphin'

const toSign = [transformation, publicId].join('/') + secret

const s = URLSafeBase64.encode(
  crypto
    .createHash('sha1')
    .update(toSign)
    .digest()
).slice(0, 8)

const signature = 's--' + s + '--'
const url = [
  `https://res.cloudinary.com/${cloudname}/image/authenticated`,
  signature,
  transformation,
  publicId
].join('/')
```

## Sign with URL Helper

Using the URL helper function option `sign_url:true`, we can easily sign any URL from ndoe.js.

```bash
node access-control/signature/cloudinary_url_helper_signed.js
```
In the example below, we are using the **dolphin** asset that we uploaded in the **authenticated** section.  By signing the URL, we can access the original and in this case add transformations.

```javascript
const url = cloudinary.url('dolphin', {
  type: 'authenticated',
  secure: true,
  width: 300,
  height: 300,
  crop: 'limit',
  sign_url: true
})
```---
title: "Named Transformations"
metaTitle: "Named Transformations"
metaDescription: "Named Transformations"
---

## "Allow for Strict"

The "Allow for Strict" option is automatically set to true in a named transformations.  

## Exercise: 

For this exercise, you want to have the enabled flag on for Strict Transformations.

Upload a public asset

```bash
node node access-control/named-transformations/upload-public-asset.js
```
Notice that we're uploading a public asset, but we still have **Strict Transformations enabled**, so we can't apply transformations even to public assets.

```javascript
cloudinary.uploader.upload('./assets/images/shark.jpg', {
  public_id: 'shark',
  type: 'upload',
  overwrite: true,
  invalidate: true
})
.then(uploadResult => {
  console.log(uploadResult)
  const url = uploadResult.secure_url
  open(url)
})

```

Now we're going to look at the effect of using named transformations when we have disabled transformations.  To do this we're going to create a new named transformation.

We'll start by deleting the named transformation if it exists. If you try to create a new named transformation when it already exists, you'll get a status 409 **Transformation with that name already exists** message.

```bash
node access-control/named-transformations/delete-named-transform.js
```
The name of the transformations is **auto-400-xform**.  If it doesn't exist we'll get a message informing us of that.

```javascript
const name = 'auto-400-xform'
cloudinary.api
  .delete_transformation(`${name}`)
  .then(result => {
    console.log(result)
  })
```

Create a new named transformation

```bash
node node access-control/named-transformation/create-named-transform.js
```
Notice that we haven't set the allow to `allow_for_strict`.  It is set by default for named transformations.

```javascript
cloudinary.api
  .create_transformation('auto-400-xform', {
    width: 400,
    height: 400,
    crop: 'limit'
  })

```

List named transformations and look for the `allowed_for_strict` option to be set to true.  You can toggle this option on and off based on your use cases.  For this module, we want to leave it on as it will help us to create transformations while we have the enabled flag on for Strict Transformations.

```bash
node access-control/named-transformation/list-named-transform.js
```

We can list up to 500 transformations.  We log the named ones.

```javascript
cloudinary.api
  .transformations({ max_results: 500 })
  .then(result => {
    for (const transform of result.transformations) {
      if (transform.named === true) {
        console.log(transform)
      }
    }
  })
```
You'll see the named transformation we just created has the **allowed_for_strict** options set to true.

```javscript
{
  name: 't_auto-400-xform',
  allowed_for_strict: true,
  used: true,
  named: true
}

```

Now, let's use the named transformation to create a transformation.

```bash
node access-control/named-transformation/url-named-transform.js
```
We're applying this to a public image below.  Try substituting our authenticated image `dolphin` for `shark` in the code below and you'll see that the named transformation can be applied to any image regardless of delivery type.

```javascript
const url = cloudinary.url('shark',
  {
    transformation: ['auto-400-xform']

  })
```
Notice that a `t_` is pre-pended to the assigned named of the transformation when added to the URL.

![named transformation with pre-pended t_](https://res.cloudinary.com/cloudinary-training/image/upload/v1590518664/book/named-t-prepend.png)

## Media Library Named Transformations

The animation below shows you how to access the named transformations in the DAM.  You can see that there is a red/green toggle that represents the `allow_for_strict` mode.

![Allow for Strict in DAM](https://res.cloudinary.com/cloudinary-training/image/upload/v1590518022/book/console-transforms-allow_xvnsxz.gif)

You can clearly see the difference between named transformations with the allowed_for_strict on an off in the DAM.

![allow for strict in DAM toggle](https://res.cloudinary.com/cloudinary-training/image/upload/v1590518399/book/named-transform-allowed-toggle.png)


## What if we want to add f_auto,q_auto?

The use case here is that we have a named transformation that provides cropping and effects, but we also want to add optimizations like `f_auto` and `q_auto` to the URL, but these count as transformations which are not allowed.  They also are options which can't be added to a named transformation.  This is because they are handled on the CDN before Cloudinary processes the URL.  How can we add these transformation?

We can set the `allow_for_strict` in code.

```bash
node access-control/named-transformations/add-f-auto-q-auto.js
```

In the code below, we're doing it by applying a string that includes both the named transformation and the `f_auto,q_auto` optimizations using the `transformation option.

```javscript
cloudinary.api
  .update_transformation('t_auto-400-xform/f_auto,q_auto', {
    allowed_for_strict: true
  })
  .then(updateResult => {
    console.log(updateResult)
    const url = cloudinary.url('shark', {
      transformation: ['auto-400-xform/f_auto,q_auto']
    })
    console.log(url)
    open(url)
  })
```

## Strict Transformations Disabled

Don't forget to disable strict transformations as you continue through to the next section!
---
title: "Explicit Eager"
metaTitle: "Explicit Eager"
metaDescription: "Explicit Eager"
---

**Note:** This module assumes you have strict transformations enabled.

![enable strict transformations](https://res.cloudinary.com/cloudinary-training/image/upload/v1589920875/book/ac-strict-transform-enable.png)

## Explicit Upload

Eager Transformations are a best practice in a multi-tenant system. You get better performance by having something already in place to be served. Explicit method is for already uploaded assets. 

1. Explicit method is for already uploaded assets.  
2. Eager transformations can be synchronous or asynchronous with a notification URL and we can issue invalidate to clear CDN cache.

## Exercise: Create eager transformation

Start by uploading a new public image.

```bash
node access-control/explicit-eager/upload-public-asset.js
```

```javascript
cloudinary.uploader.upload('./assets/images/killer-whale.jpg', {
  public_id: 'killer-whale',
  type: 'upload',
  overwrite: true,
  invalidate: true
})
```
We won't be able to create on the fly transformations with this image because the Strict Transformations flag is enabled.  Instead we'll use the explicit function of the Upload API SDK to "update" the asset with an eager transformation.


```bash
node access-control/explicit-eager/explicit-eager-upload-transform.js
```

Once this script is complete there will be a derived image ready for access on the CDN.  We can open the secure URL for this derived image by accessing it from the response's eager array of eager transformations.

```javascript
cloudinary.uploader.explicit('killer-whale',
  {
    type: 'upload',
    eager: [{
      width: 300,
      height: 300,
      quality: 'auto',
      crop: 'limit',
      invalidate: true
    }]
  })
  .then(result => {
    console.log('result', result)
    // look at the transformed url
    const transformUrl = result.eager[0].secure_url
    console.log('transform url:', transformUrl)
    open(transformUrl)
  })
```
 The above transformation was applied to a public asset. What if you want to use the explicit/eager transformation with an authenticated asset?  Change the public id from **killer-whale** to **dolphin** which we uploaded earlier as authenticated.  Also change the type to `authenticated`.  Does the explicit eager transformation still work?

```javascript

cloudinary.uploader.explicit('dolphin',
  {
    type: 'authenticated',
    eager: [{
      width: 300,
      height: 300,
      quality: 'auto',
      crop: 'limit',
      invalidate: true
    }]
  })

 ```

It works and a signature is automatically added by the URL helper.

![authenticated asset and strict transformation with explicit eager](https://res.cloudinary.com/cloudinary-training/image/upload/v1590525384/book/autheticated-transfrom-explicit-eager.png)

## Strict Transformations Disabled

Don't forget to disable strict transformations as you continue through to the next section!


 ---
title: "Use Cases"
metaTitle: "Use Cases"
metaDescription: "Use Cases"
---

We'll review the use cases for each of the access control methods we've discussed.  First it's good to point out that all of these methods are available to customers with a free account.  If you have a paid account, this can open the way for some additional access control methods including using cookies and tokens. 

## Cookies and Tokens

The chart below compares features offered by each of the three major access control methods: signing, tokens and cookies.  Using access tokens requires a private CDN and using cookies requires a CNAME.  If you are interested in using cookies or tokens, contact support@cloudinary.com to get help setting it up.

![tokens and cookies](https://res.cloudinary.com/cloudinary-training/image/upload/v1590525707/book/ac-cookies-tokens.png)

## Review Use Cases

The chart below summarizes the access control methods that you have learned to implement in this module.  The `access_control` option is the only one of the methods available to customers with free plans that want to control access by time. 

The **private** is intended for customers who don't want the original image accessed.  This could in a situations where all assets should be served as watermarked.  However, if you want to enforce watermarking, you would need to upload the asset as **authenticated**, or a user could add the `a0` transformations and see the asset as it would appear in its original state.

Enabling the **strict transformations** flag is useful for preventing non-user traffic from creating transformations. It is often used in work flows or build processes for creating transformations.  We know that we can still create transforms using **named transformations** or **eager explicit** transformations even with strict enabled.

![use cases](https://res.cloudinary.com/cloudinary-training/image/upload/v1590526046/book/ac-review-use-cases.png)

## Strict Transformations Disabled

Don't forget to disable strict transformations as you continue through to the next section!---
title: "Resources"
metaTitle: "Resources"
metaDescription: "Resources"
---


Docs on access control   
https://cloudinary.com/documentation/control_access_to_media

Eager upload strict transforms 
https://cloudinary.com/documentation/upload_images#eager_transformations

Explicit Method of Upload API  
https://cloudinary.com/documentation/image_upload_api_reference#explicit_method

Signed Delivery  
https://cloudinary.com/documentation/advanced_url_delivery_options#generating_delivery_url_signatures

Admin Transformation API  
https://cloudinary.com/documentation/admin_api#transformations

API Reference  
https://cloudinary.com/documentation/image_upload_api_reference