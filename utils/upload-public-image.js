require('dotenv').config()
const cloudinary = require('cloudinary').v2

function uploadImage (uri) {
  console.log(uri)
  cloudinary.uploader.upload(uri, {
    use_filename: true,
    unique_filename: false,
    type: 'upload',
    overwrite: true
  })
    .then(uploadResult => {
      console.log(uploadResult)
      const url = uploadResult.secure_url
      console.log(url)
    })
    .catch(error => console.error(error))
}

const uri = process.argv && process.argv.length > 1 && process.argv[2]
console.log(uri)
uploadImage(uri)
