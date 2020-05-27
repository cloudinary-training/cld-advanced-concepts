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
uploadImage('./assets/images/big-glasses.jpg')
uploadImage('./assets/images/bird-close-up.jpg')
uploadImage('./assets/images/lion-head.jpg')
uploadImage('./assets/images/funny-cow.jpg')
