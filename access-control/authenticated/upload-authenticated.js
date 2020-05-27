require('dotenv').config()
const cloudinary = require('cloudinary').v2

// use upload API to upload a private asset

cloudinary.uploader.upload('./assets/images/dolphin.jpg', {
  public_id: 'dolphin',
  type: 'authenticated',
  invalidate: true
})
  .then(uploadResult => {
    console.log(uploadResult)
    console.log(cloudinary.url(`${uploadResult.public_id}`, { secure: true }))
  })
  .catch(error => console.error(error))
