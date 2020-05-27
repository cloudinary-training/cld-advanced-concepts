require('dotenv').config()
const cloudinary = require('cloudinary').v2

// upload psd files with layers
function uploadPSD (filename) {
  cloudinary.uploader
    .upload(filename, {
      use_filename: true,
      unique_filename: false,
      type: 'upload',
      resource_type: 'image',
      overwrite: true,
      invalidate: true
    })
    .then(uploadResult => {
      console.log(uploadResult)
    })
    .catch(error => console.error(error))
}

const psdFiles = [
  'https://res.cloudinary.com/cloudinary-training/image/upload/strawberries.psd',
  'https://res.cloudinary.com/cloudinary-training/image/upload/cld-sample-psd.psd'
]

for (const fileName of psdFiles) {
  uploadPSD(fileName)
}
