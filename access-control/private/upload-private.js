require('dotenv').config()
const cloudinary = require('cloudinary').v2

// use upload API to upload a private asset

cloudinary.uploader.upload('./assets/images/goldfish.jpg', {
  public_id: 'goldfish',
  type: 'private',
  invalidate: true
})
  .then(uploadResult => {
    console.log(uploadResult)
  })
  .catch(error => console.error(error))

// look at response
