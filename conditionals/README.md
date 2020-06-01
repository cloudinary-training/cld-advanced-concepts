---
title: "Objectives"
metaTitle: "Objectives"
metaDescription: "Objectives"
---

Conditionals allow us to direct the use of transformations based on the results of logical expressions.

- Syntax of Conditionals for building logical expressions
- Identify Intrinsic Properties of Images and Video
- Logical Expressions use IF, IF/END and IF/ELSE/END
- Use Intrinsic properties of  Assets to make to make decisions about how to apply transforms
  - Width
  - Aspect Ratio
  - Tags
  - Context
  - Image Layers

In this module we'll look at how conditionals can help with these use cases: 

- “Debugging”: text overlay informs you of the result of your logical expression
- Responsive Images and Video: you need a portrait **aspect ratio** so test intrinsic width and aspect ratio
- Watermark: Apply video and text overlays to video base by testing a value in a **tag**
- Overlay Image based on **context** (metadata): value to apply overlay based on context value for asset license
- Overlay text and image based on **PSD** layer count




---
title: "Upload"
metaTitle: "Upload"
metaDescription: "Upload"
---

## Upload

If you are using this module out of sequence, you'll need to upload assets for the exercise.  The video upload will upload 4 short videos used in the **video-player** module,  and the image upload uploads the files used in the **underlay-overlay** module.

### Upload Video

```bash
node video-player/upload-video-collection.js
```

### Upload Images

```bash
node overlay-underlay/upload-images.js
```



---
title: "Syntax"
metaTitle: "Syntax"
metaDescription: "Syntax"
---

Before addressing use cases, let's look at the syntax for working with conditionals.

## Comparison Operators

The logical operators provide tests for equality and *in/not in* list or set of strings.

![logical operators](https://res.cloudinary.com/cloudinary-training/image/upload/v1589228208/book/conditional-logic-ops.png)

## Boolean Operators

The boolean operators allow you to create boolean expressions testing multiple values.  Operator precedence follows what is done in conventional programming languages, so that **AND** is processed before **OR**.

![boolean expressions](https://res.cloudinary.com/cloudinary-training/image/upload/v1589229786/book/conditional-boolean-ops.png)

## Built in values: Image

Cloudinary provides built in values based on image properties that can be tested for using comparison operators.

![built in values based on asset properties](https://res.cloudinary.com/cloudinary-training/image/upload/v1589230126/book/conditional-builtin-image.png)

## Build in values: Video

Cloudinary provides built in values base on video properties that can be be tested for using comparison operators.

## User Defined Variables

In addition to the built in properties that are available based on asset, specifics you can define your own variables as described in the **Variables** modules.  User Defined variables can be used for testing in logical expressions or overlaying.   

If you want to use a built in variables in a text overlay, you need to assign it to a user defined variable first.  For example in the following code, we're assigning the `public_id` to a user defined variable `$img`. 

```javascript
 variables: [
  ['$img', 'current:public_id'],
]
```

Remember when creating user defined variable that they cannot contain underscore `_`.

---
title: "IF"
metaTitle: "IF"
metaDescription: "IF"
---

## Intuition 

The **if** presents a conditional expression. We'll talk more about when to use **end** with **if**, but you can rely on our understanding of conventional C-syntax languages that allow you to write an **if** statement without an **end** when you are only executing one command when the expression is TRUE.

### No END needed
```javascript
if (test) log(‘ok’)
else log (‘not ok’)
```

When you need to execute multiple expressions you provide a curly brace to crate a block.  An END can be thought of as finishing a block of expressions that all get exectuted as a result of meeting a condition.

### END needed

```javascript
if (test) {
  let greeting = ‘hi’ + test
  log(greeting)
else {
  log (‘not ok’)
}
```

## Example

### General

```
if_<property>_<operator>_<value>,<transformation>/
```

### Specific

```
if_w_gt_1000,w_500/
```

## Exercise: Responsive Video Aspect Ratio 

Use case: If you have a standard video with a 16:9 display aspect ratio and you want to serve it to a mobile device, you can test aspect ratio and width to decide whether to transform.

For example, the original size of the video is 1280 x 720 which is an aspect ratio of ~1.78. We only want to transform if the aspect ratio is greater than 0.65 and the width is greater than 1000.

```javascript
if: 'ar_gt_0.65_and_w_gt_1000',

```

Execute the following to test this out:

```bash
node conditionals/video/conditional-ar.js
``` 

The full code for this includes a transformation that sets the aspect ratio and width.

```javascript
const url = cloudinary.url('snowboarding', {
  resource_type: 'video',
  if: 'ar_gt_0.65_and_w_gt_1000',
  aspect_ratio: '0.65',
  height: 1000,
  crop: 'fill'
})
```

![landscape to portrait with video](https://res.cloudinary.com/cloudinary-training/image/upload/v1589231856/book/conditional-video-ar.png)

---
title: "IF END"
metaTitle: "IF END"
metaDescription: "IF END"
---

When you want to execute a chained transformation based on a conditional IF, you need to add an END to signal it's completion.

## Example

### General

```bash
if_<property>_<operator>_<value>/
    <chained transformation>/
if_end

```

### Specific

```bash
if_w_gte_1000/
    w_400/
    ar_1:1/
if_end
```  

## Exercise: Landscape to Portrait Image

Execute the following:

```bash
node conditionals/image/portrait-to-landscape
```
This code will upload a landscape image and the set up a transformation that uses a variable.  If the image's aspect
ration is less than 1, meaning that it is in portrait mode, it will convert it to landscape mode by changing the aspect ratio to 1.5 and apply the variables width.  It will also add a duo-tone effect in a chained transformation.  Both transformations, the cropping and the special effect will only occur on images in portrait mode.

This code shows the chained transformation that ends with **END**. 

```javascript
 const url = cloudinary.url(result.public_id, {
      transformation: [
        { variables: [['$wide', '300']] },
        { if: 'ar_lt_1.0' },
        {
          aspect_ratio: '1.5',
          width: '$wide',
          crop: 'fill',
          gravity: 'face',
          effect: 'grayscale'
        },
        { effect: 'tint:50:green:yellow' },
        { if: 'end' }
      ]
    })

```



### Original
![portrait image](https://res.cloudinary.com/cloudinary-training/image/upload/w_300/book/conditionals-portrait-image.png)

### Transformed

![landscape image](https://res.cloudinary.com/cloudinary-training/image/upload/w_300/book/conditionals-landscape.png)

## Exercise: Chained Transformation after Conditional END

In this next case we provide a conditional and then follow it with more transformations.  All of the images will get the transformations specified before the **IF** after the **END** applied to them; only the transformations that have the tag **skiing** will get the logo overlay

 The net effect to the user is that videos tagged with **skiing** will have a Cloudinary logo and the words **Snow Fun** in an overlay.  All videos will be cropped to `500px` and their duration set to `5 seconds`. 


```bash
node conditionals/video/conditional-overlay-transform

```

```javascript
const url = cloudinary.url('snowboarding', {
  resource_type: 'video',
  transformation: [
    { width: 500, crop: 'scale' },
    { if: '!skiing!_in_tags' },
    {
      overlay: 'logo-big',
      width: 100,
      gravity: 'north_east',
      opacity: 50,
      effect: 'brightness:100'
    },
    {
      overlay: { font_family: 'arial', font_size: 15, text: 'Snow%20Fun' },
      gravity: 'north_east',
      y: 10,
      x: 105
    },
    { if: 'end' },
    { duration: '5' }
  ]
})

```

### Video with Overlay and 5 second duration

![overlay and duration](https://res.cloudinary.com/cloudinary-training/image/upload/v1589234049/book/conditional-if-end.png)
---
title: "IF ELSE"
metaTitle: "IF ELSE"
metaDescription: "IF ELSE"
---

We can satisfy 2 mutually exclusive conditions by add the **ELSE** transformation.  

## Exercise: Overlay image based on context values

**Use case:** We can test a context value and modify our transformation instructions based on that value.  In this case, we're uploading two images with a value specified for creative commons licensing: **cc** indicates Creative Commons licensing for public domain and **ccby** indicates that you must add attribution added to their context.

Start by uploading the images with a license tag specifying a creative commons license. 

```bash
node conditionals/image/upload-cc-logos.js 
node conditionals/image/upload-images.js
```

Next, execute the transformations.  You should open two windows. 

```bash
node conditionals/image/conditional-overlay-transform.js
```

The image below show an asset tagged with the **ccby** license in the DAM.

![ccby license in context](https://res.cloudinary.com/cloudinary-training/image/upload/v1589236687/book/conditionals-license-in-context.png)

In the code we test for the **cc** license and overlay an **open source** logo if specified; otherwise, we display the **ccby** logo overlay.  Both images are cropped the same way, and the overlays are added with chained transformations after cropping.

```javacript
 return cloudinary.url(publicId, {
    transformation: [
      { width: '300', height: '400', crop: 'fill_pad', background: 'white', gravity: 'auto' },
      { if: 'ctx:!license!_eq_!cc!' },
      {
        overlay: 'cc0',
        height: 50,
        gravity: 'north_east',
        opacity: 50
      },
      { if: 'else' },
      {
        overlay: 'ccby',
        width: 100,
        gravity: 'north_east',
        opacity: 75,
        effect: 'brightness:100'
      },
      { if: 'end' }
    ]
  })
}

```

Here are the transformed images side by side.

![creative commons license images](https://res.cloudinary.com/cloudinary-training/image/upload/v1589237272/book/conditionals-context-overlay.png)



---
title: "Complex"
metaTitle: "Complex"
metaDescription: "Complex"
---

## PSD: Photo Shop Document

PSDs can have **layers**.  This means multiple images applied on top of each other to create composite image.  The image you see below has 4 layers and layer 1 references the image as a whole, so altogether 5 layers.  

![strawberries: 5 layers](https://res.cloudinary.com/cloudinary-training/image/upload/v1588790651/strawberries.png)

The **layers** are referenced as **pages** in Cloudinary code and URLs.  In the earlier table that described built in variables, we saw `pg` for referencing a page by page number, `cp` for referencing current page,  and `pc` for referencing page count.

Let's see how we can use conditionals and layer to create a new images built with the layers. 


## Exercise: Upload and view layers

We can upload PSDs as images. You can't render a PSD file in the browser, by you can change the extension to **jpg** or **png** to render in the browser. Execute the following code to upload the images:

```bash
node conditionals/psd/upload-images.js
```

Open this code in the editor and the browser. Examine the URLs used to render each layer.

![rendering indivdual layers for 2 PSDs](https://cloudinary-training.github.io/cld-advanced-concepts/conditionals/psd/)


## Exercise: Conditional Based on PSD Layers

Lets write a program that checks to see if there are **greater than or equal** to 5 layers in a PSD.  If there are, we'll report on it and arrange layers 3 and 5 on the right side of the page.  If not, we'll report that the number of layers is less than 3 and how many layers there are.  As mentioned earlier, we'll need to reference the built in variables with user defined variables in order to apply the strings as overlays.  


![flow chart](https://res.cloudinary.com/cloudinary-training/image/upload/v1589238288/book/conditionals-flow-chart.png)  


You can execute the script that applies the conditional transformation described above.

```bash 
node conditionals/psd/report.js

```

The code shows the assignment of built in values to user defined variables.  The the base layer is copped and given a very low opacity to provide a background.  Next we test for **page count >= 5**.  Then we apply image and text overlays given the number of layers we have to work with.  The **report** function is run on 2 images, one with 5 layers and one with 2 layers.  

There is also a self-referencing variable `$img` which references the `public_id` of the base image.  This can be used to extract the layers of the PSD.

```
function report(publicId) {
  const url = cloudinary.url(publicId, {
    transformation: [
      {
        variables: [
          ['$img', 'current:public_id'],
          ['$pagecount', 'pc'],
          ['$currentpage', 'cp']
        ]
      },
      { width: 400, opacity: '10' },
      { if: 'pc_gte_5' },
      {
        transformation: [
          {
            overlay: {
              font_family: 'Arial',
              font_size: 30,
              text: 'current layer: %24%28currentpage%29'
            },
            gravity: 'north_west',
            color: 'red',
            x: '20',
            y: '20',
            width: '100'
          },
          {
            overlay: '%24img',
            page: '5-5',
            width: 100,
            gravity: 'north_east'
          },
          {
            overlay: '% ',
            page: '3-3',
            width: 100,
            gravity: 'south_east'
          },
          {
            overlay: {
              font_family: 'Arial',
              font_size: 30,
              text: 'total layers in PSD: %24%28pagecount%29'
            },
            gravity: 'north_west',
            color: 'black',
            x: '20',
            y: '40',
            width: '100'
          },
          {
            overlay: {
              font_family: 'Arial',
              font_size: 30,
              text: 'upper right: layer 2'
            },
            gravity: 'north_west',
            color: 'black',
            x: '20',
            y: '60',
            width: '100'
          },
          {
            overlay: {
              font_family: 'Arial',
              font_size: 30,
              text: 'bottom right: layer 3'
            },
            gravity: 'north_west',
            color: 'black',
            x: '20',
            y: '80',
            width: '100'
          }
        ]
      },
      { if: 'end' },

      { if: 'else' },
      {
        overlay: {
          font_family: 'Arial',
          font_size: 30,
          color: 'black',
          text: 'page count < than 5'
        },
        gravity: 'north_west',
        x: '20',
        y: '20',
        width: '100'
      },
      {
        overlay: {
          font_family: 'Arial',
          font_size: 30,
          color: 'black',
          text: 'total layers in PSD: %24%28pagecount%29'
        },
        gravity: 'north_west',
        x: '20',
        y: '40',
        width: '100'
      },
      { if: 'end' },

      { page: '1' },
      { secure_url: true, fetch_format: 'jpg' }
    ]
  })
  return url
}
const urlStrawberries = report('strawberries')
console.log(urlStrawberries)
open(urlStrawberries)

const urlCldSample = report('cld-sample-psd')
console.log(urlCldSample)
open(urlCldSample)

```




![2 PSDs with different layer counts](https://res.cloudinary.com/cloudinary-training/image/upload/v1589239860/book/conditionals-psd.png)---
title: "Resources"
metaTitle: "Resources"
metaDescription: "Resources"
---

Video Conditional Expressions  
https://cloudinary.com/documentation/video_conditional_expressions

Image Conditional Transformations   
https://cloudinary.com/documentation/conditional_transformations