# Variables in Transformations

Use variables in your transformations.

## Running the code

All node.js scripts should be run out the root directory.  Use an HTTP server to open the HTML files.

## How to run scripts for Grid
Add your CLOUDINARY_URL to the root .env file.
From the root run these script to upload and ultimately create a named transformation that 
accepts variables.

### Variable Image Creation for Grid

```javascript
 node variables/grid/upload-image-for-grid.js
 node variables/grid/grid-variable-images.js
 node variables/grid/create-named-transformation.js
 node variables/grid/use-named-transformations.js
```
### Serving the image responsively for Grid image

When you are able to successfully create a named transformation, you can experiment with
serving the image responsively using the index.html in your browser.

