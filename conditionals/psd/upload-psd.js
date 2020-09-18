require('dotenv').config()
const cloudinary = require('cloudinary').v2

// upload psd files with layers
cloudinary.uploader
  .upload(
    './assets/raw/PSDtemplate.psd',
    {
      use_filename: true,
      unique_filename: false,
      type: 'upload',
      resource_type: 'image',
      overwrite: true,
      invalidate: true
    }
  )
  .then(uploadResult => {
    console.log(uploadResult)
  })
  .catch(error => console.error(error))
