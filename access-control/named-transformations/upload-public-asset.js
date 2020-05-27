require('dotenv').config()
const cloudinary = require('cloudinary').v2
const open = require('open')

cloudinary.uploader.upload('./assets/images/shark.jpg', {
  public_id: 'shark',
  type: 'upload',
  overwrite: true,
  invalidate: true
})
  .then(uploadResult => {
    console.log(uploadResult)
    const url = uploadResult.secure_url
    open(url)
  })
  .catch(error => console.error(error))
