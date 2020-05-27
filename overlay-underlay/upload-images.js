require('dotenv').config()
const cloudinary = require('cloudinary').v2

function uploadImage (fn) {
  console.log(fn)
  cloudinary.uploader
    .upload(fn, {
      use_filename: true,
      unique_filename: false,
      type: 'upload',
      overwrite: true,
      invalidate: true,
      fetch_format: 'auto'
    })
    .then(result => {
      const url = result.secure_url
      console.log(url)
    })
    .catch(error => console.error(error))
}

uploadImage('./assets/images/chalkboard.jpg')
uploadImage('./assets/images/shell.jpg')
uploadImage('./assets/images/gray-surface.jpg')
uploadImage('./assets/images/mask-green.png')
uploadImage('./assets/images/woman-standing.jpg')
uploadImage('./assets/images/logo-big.png')
