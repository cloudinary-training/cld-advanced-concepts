require('dotenv').config()
const cloudinary = require('cloudinary').v2
const open = require('open')

cloudinary.uploader.upload('./assets/images/logo-big.png', {
  public_id: 'logo-big',
  type: 'upload',
  overwrite: true,
  invalidate: true,
  resource_type: 'image'
})
  .then(result => {
    console.log(result)
    open(result.secure_url)
  })
  .catch(error => {
    console.log(error)
  })
