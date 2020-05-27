require('dotenv').config()
const cloudinary = require('cloudinary').v2
const open = require('open')

cloudinary.uploader
  .upload(
    'https://cloudinary-training.github.io/advanced-concepts/assets/images/cc0.png',
    {
      public_id: 'cc0',
      type: 'upload'
    }
  )
  .then(uploadResult => {
    console.log(uploadResult)
    const url = uploadResult.secure_url
    open(url)
  })
  .catch(error => console.error(error))
