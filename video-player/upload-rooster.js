require('dotenv').config()
const cloudinary = require('cloudinary').v2

cloudinary.uploader.upload('./assets/video/rooster.mov', {
  public_id: 'rooster',
  type: 'upload',
  overwrite: true,
  invalidate: true,
  resource_type: 'video'
})
  .then(result => {
    console.log('rooster response')
    console.log(result)
  })
  .catch(error => {
    console.log('rooster error')
    console.log(error)
  })
