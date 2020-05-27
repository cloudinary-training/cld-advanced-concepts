require('dotenv').config()
const cloudinary = require('cloudinary').v2

cloudinary.api
  .create_upload_preset({
    name: 'sea-life-preset',
    use_filename: true,
    unique_filename: false,
    unsigned: false,
    transformation: [
      {
        width: 400,
        height: 300,
        crop: 'fit'
      },
      {
        fetched_format: 'auto',
        quality: 'auto'
      }
    ],
    tags: 'sea-life',
    allowed_formats: 'jpg'
  })
  .then(uploadResult => console.log(uploadResult))
  .catch(error => console.error(error))
