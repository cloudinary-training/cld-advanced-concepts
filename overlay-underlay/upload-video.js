// upload a small video such as a customer might upload from an iphone
require('dotenv').config()
const cloudinary = require('cloudinary').v2

cloudinary.uploader
  .upload('./assets/video/wave.mp4', {
    public_id: 'wave',
    type: 'upload',
    overwrite: true,
    invalidate: true,
    resource_type: 'video',
    aysnc: false,
    eager: {
      fetch_format: 'auto',
      quality: 'auto'
    }
  })
  .then(result => {
    console.log('wave response')
    console.log(result)
  })
  .catch(error => {
    console.log('wave error')
    console.log(error)
  })
