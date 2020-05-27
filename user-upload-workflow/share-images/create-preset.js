require('dotenv').config()
const cloudinary = require('cloudinary').v2

cloudinary.api
  .create_upload_preset({
    name: 'photo-share',
    use_filename: true,
    unsigned: false,
    tags: 'photo-share',
    folder: 'photo-share',
    transformation: [
      {
        crop: 'fit',
        width: 400,
        height: 300
      },
      {
        overlay: 'logo-big',
        width: 100,
        gravity: 'south_east',
        opacity: 50
      },
      {
        quality: 'auto',
        fetch_format: 'auto',
        dpr: '2.0'
      }
    ]
  })
  .then(uploadResult => console.log(uploadResult))
  .catch(error => console.error(error))
