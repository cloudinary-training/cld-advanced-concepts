require('dotenv').config()
const cloudinary = require('cloudinary').v2
const open = require('open')

cloudinary.uploader
  .upload('./assets/images/baseball-cap.png', {
    public_id: 'baseball-cap',
    type: 'upload',
    overwrite: true,
    invalidate: true,
    resource_type: 'image',
    transformation: {
      fetch_format: 'auto',
      quality: 'auto'
    }
  })
  .then(result => {
    console.log(result)
    open(result.secure_url)
  })
  .catch(error => {
    console.log(error)
  })
