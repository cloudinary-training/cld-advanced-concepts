require('dotenv').config()
const cloudinary = require('cloudinary').v2

// license value gets added as tag and context
function uploadImage (fn, license) {
  console.log(fn)
  cloudinary.uploader
    .upload(fn, {
      use_filename: true,
      unique_filename: false,
      type: 'upload',
      overwrite: true,
      invalidate: true,
      fetch_format: 'auto',
      tags: license
    })
    .then(uploadResult => {
      const url = uploadResult.secure_url
      console.log(url)
      cloudinary.uploader
        .add_context(`license=${license}`, uploadResult.public_id)
        .then(result => console.log(result))
        .catch(error => console.log(error))
    })
    .catch(error => console.error(error))
}

uploadImage('./assets/images/fishing-boat.jpg', 'cc')
uploadImage('./assets/images/clear-river.jpg', 'ccby')
