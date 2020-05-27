require('dotenv').config()
const cloudinary = require('cloudinary').v2
const open = require('open')

cloudinary.uploader.upload('./assets/images/killer-whale.jpg', {
  public_id: 'killer-whale',
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
