require('dotenv').config()
const cloudinary = require('cloudinary').v2

function uploadImage (fn) {
  console.log(fn)
  cloudinary.uploader
    .upload(fn, {
      use_filename: true,
      unique_filename: false,
      type: 'upload',
      invalidate: true
    })
    .then(uploadResult => {
      const url = uploadResult.secure_url
      console.log(url)
    })
    .catch(error => console.error(error))
}

uploadImage('./assets/images/blackberry.jpg')
uploadImage('./assets/images/pineapple.jpg')
uploadImage('./assets/images/strawberry.jpg')
uploadImage('./assets-secure/grapes.jpg')
uploadImage('./assets/images/kiwi.jpg')
uploadImage('./assets-secure/cherries.jpg')
uploadImage('./assets/images/1px.png')