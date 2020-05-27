// upload a small video such as a customer might upload from an iphone
require('dotenv').config()
const cloudinary = require('cloudinary').v2

cloudinary.uploader.upload('./assets/images/cloudinary-logo.png', {
  public_id: 'video-logo',
  type: 'upload',
  overwrite: true,
  invalidate: true,
  resource_type: 'image'
})
  .then(result => {
    console.log(result)
  })
  .catch(error => {
    console.log(error)
  })
