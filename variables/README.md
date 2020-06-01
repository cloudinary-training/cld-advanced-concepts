---
title: "Objectives"
metaTitle: "Objectives"
metaDescription: "Objectives"
---

Variables allow us to abstract instructions in transformations so we can turn our transformations into templates.

- Introduce the syntax of Cloudinary Variables and Expressions
- Expressions: Use operators to produce values based on variables
- Named Transformations: Use named transformations with variables to “cleanup” the URL and make it more useful with SEO
- Overlays and Layer Apply: Look at producing a template for a complex transformation by using variables---
title: "Syntax and Expressions"
metaTitle: "Syntax and Expressions"
metaDescription: "Syntax and Expressions"
--- 

The table below shows you that you can declare variables with different data types such as number, floating point, and string.  The declaration always starts with `$` followed by an alphanumeric variable name.  The value is assigned by placing an `_` (underscore) after the variable name and then the value.  If the value is a string it is enclosed in `!` (explanation point).

## Variable Syntax
![variable syntax](https://res.cloudinary.com/cloudinary-training/image/upload/v1588703230/book/variable-syntax.png)

You can also create variables based on context (metadata) values.  This is dependent on creating these key:value pairs for your assets.  You can also create lists using the `!` (explanation point) around each value and separating values with and `_` (underscore).

## Operator Syntax

The set of operators that you can use to create expressions using arithmetic and list searching is shown in the table as it would appear in a URL and in code.  The math operators are standard math operators that you would see in any programming language.  There is an additional pair of list operators that allow you to search lists.  

![operator syntax](https://res.cloudinary.com/cloudinary-training/image/upload/v1588709935/book/operator-syntax.png)

Expressions are built in the URL by concatenating variables with operators separated by an `_` underscore.  For example if we declare a variable `x` and set it to 3, and we want to create an expression that multiplies by 3 it will look like this in a url: `$x_3/$x_mul_3`.  The result of this expression is `9`.

Expressions use operator precedence as you would expect in any programming language.  For example, if we create an expression with two variables and use multiplication and addition in the expression, the multiplication will occur first: `$x_3,$y_2/$x_add_$y_mul_2` will evaluate to `7`.  

## Intrinsic Values  

We've seen how to create user defined variables.  There are also variables that are defined by the system.  They usually refer to properties of assets.  Here are a couple of these variables and what they represent. 

- iw - initial width
- ih - initial height
- fc - face count (image only)
- du - duration (video only)
- ar - aspect ratio

Let's calculate the perimeter of an image. What value is produced if initial width is 300 and initial height is 200?  What would the expression for perimeter of the original asset look like?  What is the result? If you calculated `1000`, you're correct.

```bash
iw_mul_2_add_ih_mul_2

```
## Math Quiz

What’s happening here:

```bash
$small_150,$big_2_mul_$small/c_fill,w_$big,h_$small_add_20
```

What is the value of big?  hint: 150 * 2
What will be the calculated width of this asset?  hint: 150 * 2
What will be the calculated height of this asset? hint: 150 + 20


---
title: "Baseball Cap"
metaTitle: "Baseball Cap"
metaDescription: "Baseball Cap"
---

Let's look into a use case to see how we can take make use of variables to fulfill project requirements.

## Exercise: Baseball cap with variable size and color

### Imagine a scenario like this:

Adding logos to coffee cups online has proven successful!  
Now, your product manager wants to add them to baseball caps.    
The designer needs **5 different sized images** from 100 to 500 pixels square.    
You are given an image of a black hat that is at an angle so when placing the image on the hat it **must be placed off center** to look realistic.
You will only need to apply one image logo, for now, but you must be able to produce the hat in **multiple colors**.  

The original image you are given looks like this:  

![starting black hat](https://res.cloudinary.com/cloudinary-training/image/upload/v1588711158/book/variables-starting-hat.png)

### Work through transformation steps

We're going to break this problem down in to step to see how we can meet these requirements.  

![black hat transform](https://res.cloudinary.com/cloudinary-training/image/upload/v1588711824/book/black-hat-transform.gif)


Upload images for hat and logo by executing these 2 scripts:   

```
node variables/image-overlay/upload-baseball-cap.js
node variables/image-overlay/upload-logo-big.js
```

Next we're going to execute a total of 6 scripts.  Each script provides a transformation that moves us closer to the fulfilling all the requirements.  

 
Walk through steps 0-5 to create overlay using proportion calculations with variables.  You'll find these step by step scripts in `variables/image-overlay/step0-5.

#### Step 0
In this starting step we are just opening up the original black cap in the browser.  

```javascript
const url = cloudinary.url('baseball-cap', {})
open(url)

```

#### Step 1
In this step we provide a color variable and set the color to **white**.  This will make it easier to see the outline of the cap in the browser.  We're using the `replace_color` effect which searches for a match to `111111` with a 30% accuracy.  This should find black and then replace with the value of our color variable.

We also provide a chained transformation to auto quality and format.  Since we're going to use an image overlay to add the logo, we add a `dpr` value. Increasing **Device Pixel Ratio** can help get better pixel alignment when using overlays.

```javascript
const url = cloudinary.url('baseball-cap', {
  transformation: [
    {
      variables: [
        ['$color', '!ffffff!']
      ]
    },
    {
      effect: 'replace_color:$color:30:111111'
    },
    {
      dpr: '2.0',
      fetch_format: 'auto',
      quality: 'auto'
    }
  ]
})

```

#### Step 2
Because the requirements call for a 500x500 cropped image as well as allowing for 4 other size, we add variables for vertical and horizontal corresponding to height and width.  We then apply the crop in a chained transformation.  Note that we chain the "auto everything" last because some of the instructions for choosing file format are handled at the CDN. 

```javascript
const url = cloudinary.url('baseball-cap', {
  transformation: [
    {
      variables: [
        ['$vertical', '500'],
        ['$horizontal', '500'],
        ['$color', '!ffffff!']
      ]
    },
    { height: '$vertical', width: '$horizontal', crop: 'fit' },
    {
      effect: 'replace_color:$color:30:111111'
    },
    {
      dpr: '2.0',
      fetch_format: 'auto',
      quality: 'auto'
    }
  ]
})

```

#### Step 3
Now we add the logo. We're using the default gravity center and providing a variable for the logo width, `$logow`.  We need the width of the logo to be variable in order to match the variable width of the hat itself. 

```javascript
const url = cloudinary.url('baseball-cap', {
  transformation: [
    {
      variables: [
        ['$vertical', '500'],
        ['$horizontal', '500'],
        ['$color', '!ffffff!'],
        ['$logow', '200']
      ]
    },
    { height: '$vertical', width: '$horizontal', crop: 'fit' },
    {
      effect: 'replace_color:$color:30:111111'
    },
    {
      overlay: 'logo-big',
      crop: 'scale',
      width: '$logow',
      gravity: 'center'
    },
    {
      dpr: '2.0',
      fetch_format: 'auto',
      quality: 'auto'
    }
  ]
})

```

#### Step 4
This is a "refactoring" step.  This means that we've can look at reducing the number of variables as we start to see patterns in how they are used.  For example since the cap is a square, we really only need 1 dimension.  We can also create a variable `$logoscalar` which creates a proportional factor for scaling the overlay relative to the base image.

We also address the requirement for off-setting the logo from the center since cap is at an angle.  We've changed the gravity to **north** (top center of base image) and provide positioning values for x and y based on a x and y correction factors.  This places the logo a little to the right of center so that it matches the angle that the cap is facing.


```javascript
const url = cloudinary.url('baseball-cap', {
  transformation: [
    {
      variables: [
        ['$horizontal', 500],
        ['$correctx', '0.04'],
        ['$correcty', '0.1'],
        ['$logoscalar', '0.4'],
        ['$color', '!ffffff!']
      ]
    },
    {
      effect: 'replace_color:$color:30:111111'
    },
    { width: '$horizontal', crop: 'scale' },
    {
      overlay: 'logo-big',
      crop: 'fit',
      gravity: 'north',
      width: '$horizontal * $logoscalar',
      x: '$horizontal * $correctx',
      y: '$horizontal * $correcty'
    },
    {
      dpr: '2.0',
      fetch_format: 'auto',
      quality: 'auto'
    }
  ]
})

```

#### Step 5
All that changes in this final step is that the color is passed in from an external variable.  This fulfills the requirement that the color be allowed to vary.  You can imagine that the logo could be variable too if that was required.

```javascript
const color = 'lightblue'
const url = cloudinary.url('baseball-cap', {
  transformation: [
    {
      variables: [
        ['$horizontal', 500],
        ['$correctx', '0.04'],
        ['$correcty', '0.1'],
        ['$logoscalar', '0.4'],
        ['$color', `!${color}!`]
      ]
    },
    {
      effect: 'replace_color:$color:30:111111'
    },
    { width: '$horizontal', crop: 'scale' },
    {
      overlay: 'logo-big',
      crop: 'fit',
      gravity: 'north',
      width: '$horizontal * $logoscalar',
      x: '$horizontal * $correctx',
      y: '$horizontal * $correcty'
    },
    {
      dpr: '2.0',
      fetch_format: 'auto',
      quality: 'auto'
    }
  ]
})

```

### Make images of different sizes

The final requirement we'll address is creating the image in different sizes. Since we have variables for size and color we can supply these with external variables.  The code below initializes and external color with a hex value.  The we create an array of [100 ... 500], which represents the sizes.  As we iterate through the array we push objects onto a result array that contains sizes and transformation strings.

```javascript
// pick a color
const color = 'ffc0cb'

// generate a range of widths
const urls = []
// generate a range of 5 widths 100,...,500
const range = [...Array(5).keys()].map(item => {
  return (item + 1) * 100
})

// generate an array of URLs
for (const width of range) {
  urls.push({
    width: width,
    url: cloudinary.url('baseball-cap', {
      transformation: [
        {
          variables: [
            ['$horizontal', width],
            ['$correctx', '0.04'],
            ['$logoscalar', '0.4'],
            ['$color', `!${color}!`]
          ]
        },
        {
          effect: 'replace_color:$color:30:111111'
        },
        { width: '$horizontal', crop: 'scale' },
        {
          overlay: 'logo-big',
          crop: 'fit',
          gravity: 'north',
          width: '$horizontal * $logoscalar',
          x: '$horizontal * $correctx',
          y: '$horizontal * 0.1'
        },
        {
          dpr: '2.0',
          fetch_format: 'auto',
          quality: 'auto'
        }
      ]
    })
  })
}
```
Once the set of 5 transformations is complete, we save them to a file that we can hand off to a designer or web developer for approval.

```javascript
const fs = require('fs')
try {
  fs.writeFileSync(
    path.join(`${__dirname}/urls.json`),
    JSON.stringify(urls, null, 1)
  )
} catch (err) {
  console.error(err)
}
```
We also open them for inspection here.  

```javascript
urls.forEach(item => open(item.url))
```

After running this code, you should find a **urls.json** file in the `variables/image-overlay` directory.

To see a comparison of the hats at different sizes, replace the **cloudinary-training** transformations strings in `variables/image-overlay/index.html` and open it in the browser.

![baseball cap in many sizes](https://res.cloudinary.com/cloudinary-training/image/upload/v1588716339/book/baseball-cap-sizes.png)
---
title: "Named Transformations"
metaTitle: "Named Transformations"
metaDescription: "Named Transformations"
---

Now imagine that you get a call from Marketing...

The hats look OK but the URLs are impossible for our SEO.  
Can you do anything to make the URLs prettier? hint: Yes 

Let's look at using variables with Named Transformations.

## Exercise: Create a Named Transformation

To create a named transformation that uses variables, just pass in the transformation without the predefined variables.

```javascript
cloudinary.api
  .create_transformation('hat-transform', {
    transformation: [
      { effect: 'replace_color:$color:30:111111' },
      { width: '$horizontal', crop: 'scale' },
      {
        overlay: 'logo-big',
        crop: 'fit',
        gravity: 'north',
        width: '$horizontal * $logoscalar',
        x: '$horizontal * $correctx',
        y: '$horizontal * $correcty'
      },
      {
        dpr: '2.0',
        fetch_format: 'auto',
        quality: 'auto'
      }
    ]
  })
  .then(result => {
    console.log(result)
  })
  .catch(error => {
    console.log(error)
  })

```

## Exercise: Use named transformation

Once we have a named transformation, you an call it with whatever variables you want. 

```javascript
require('dotenv').config()
const cloudinary = require('cloudinary').v2
const open = require('open')

const url = cloudinary.url('baseball-cap', {
  transformation: [
    {
      variables: [
        ['$horizontal', '500'],
        ['$correctx', '0.04'],
        ['$correcty', '0.1'],
        ['$logoscalar', '0.4'],
        ['$color', '!pink!']
      ]
    },
    {
      transformation: ['hat-transform']
    }
  ]
})

```

When you compare the URL, you will see that the named transformation is much "cleaner" than the original and this can help with SEO. It's also good for security in that you're not exposing as much about your assets and how they are derived.

#### Without named transformation

```bash
https://res.cloudinary.com/pictures77/image/upload/$horizontal_500,$correctx_0.04,$correcty_0.1,$logoscalar_0.4,$color_!pink!/e_replace_color:$color:30:111111/c_scale,w_$horizontal/c_fit,g_north,l_logo-big,w_$horizontal_mul_$logoscalar,x_$horizontal_mul_$correctx,y_$horizontal_mul_$correcty/dpr_2.0,f_auto,q_auto/baseball-cap
```

#### With named transformation

```bash
https://res.cloudinary.com/pictures77/image/upload/$horizontal_500,$correctx_0.04,$correcty_0.1,$logoscalar_0.4,$color_!pink!/t_hat-transform/baseball-cap
```
---
title: "Art template"
metaTitle: "Art template"
metaDescription: "Art template"
---

Please look at the blog about creating a 3D effect by Sam Brace and Daniel Mendoza: 
https://cloudinary.com/blog/turning_a_flat_image_into_a_three_dimensional_canvas_with_cloudinary
There are step by step instructions for creating an effect that looks like an artwork has been mounted on a backing board.
This is such a nice and useful effect that our engineer decided that it would be useful to make the effect available for any picture, so he used variables.

![art blog](https://res.cloudinary.com/cloudinary-training/image/upload/v1588722076/book/art-blog.png)

## Exercise: Mount Art Template

Start by uploading some images to be mounted as art. 

```bash
node variables/art/mount-upload-art.js
```

Next render the images using the template.

```bash
variables/art/mount-art.js
```



The blog contains a  detailed explanation of the way in which the 3D effect was obtained.
When you develop a complex transformation and want to apply it to many images, you can first make use of variables and then create a named transformation that applies them.

Let's look at what this complex transformations is doing.  The variables `$w` and `$h` set up the height and width of the image.  The variable `$dp` creates the depth effect by creating a 20 pixel slice on the right side and on the bottom. The slices are taken from an opaque overlay. These are changed into a new non-rectangular shape by using the distort effect.  They are overlaid in such a way as to extend the dimensions of the canvas on the right and bottom.

The `flags: 'layer_apply'` option indicates that the transformation should only be applied to the slice.  The 2 angle options `hflip` and `vflip` are used to change the orientation of the 20px slices.  The **flipped** 20px slices is what gives this the 3-D look.  The right hand slice, `east`, gets a horizontal flip and the bottom slice, `south`, gets a vertical flip.

The use of variables makes turns this into a template that can be used for multiple images.  

**Challenge:** Create a named transformation for the mounted art effect.

```javascript
function mountArt(publicId) {
  const url = cloudinary.url(publicId, {
    transformation: [
      {
        variables: [
          ['$w', '700'],
          ['$h', '500'],
          ['$dp', '20'],
          ['$wadp', '$w + $dp'],
          ['$hadp', '$h + $dp']
        ]
      },
      { width: '$w', height: '$h', crop: 'fill' },
      {
        width: '$w',
        height: '$h',
        overlay: publicId,
        opacity: 60,
        border: '1px_solid_rgb:FFFFFF',
        crop: 'fill'
      },
      { width: '$dp', height: '$h', gravity: 'east', crop: 'crop' },
      { angle: 'hflip' },
      { effect: 'distort:0:0:$dp:$dp:$dp:$hadp:0:$h' },
      { x: '$dp * -1', gravity: 'north_east', flags: 'layer_apply' },
      {
        width: '$w',
        height: '$h',
        overlay: publicId,
        opacity: 60,
        border: '1px_solid_rgb:FFFFFF',
        crop: 'fill'
      },
      { width: '$w', height: '$dp', gravity: 'south', crop: 'crop' },
      { angle: 'vflip' },
      { effect: 'distort:0:0:$w:0:$wadp:$dp:$dp:$dp' },
      { gravity: 'south', flags: 'layer_apply' },
      { quality: 'auto', fetch_format: 'auto' }
    ]
  })
}
```


![art skier](https://res.cloudinary.com/cloudinary-training/image/upload/v1588723018/book/art-skiier.png)

![art modern](https://res.cloudinary.com/cloudinary-training/image/upload/v1588723151/book/art-modern.png)---
title: "Resources"
metaTitle: "Resources"
metaDescription: "Resources"
---

Variables  
https://cloudinary.com/documentation/user_defined_variables
