require('dotenv').config()
const cloudinary = require('cloudinary').v2
const open = require('open')

function uploadImage (image) {
  cloudinary.uploader
    .upload(image, {
      use_filename: true,
      unique_filename: false,
      type: 'upload',
      overwrite: true
    })
    .then(uploadResult => {
      console.log(uploadResult)
      const url = uploadResult.secure_url
      console.log(url)
      open(url)
    })
    .catch(error => console.error(error))
}

uploadImage('./assets/images/snowboard.jpg')
uploadImage('./assets/images/modern-art.jpg')

