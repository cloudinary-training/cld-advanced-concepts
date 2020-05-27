require('dotenv').config()
const cloudinary = require('cloudinary').v2

// license value gets added as tag and context
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
    .then(uploadResult => {
      const url = uploadResult.secure_url
      console.log(url)
    })
    .catch(error => console.error(error))
}

uploadImage('./assets/images/cc0.png')
uploadImage('./assets/images/ccby.png')
