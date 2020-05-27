require('dotenv').config()
const cloudinary = require('cloudinary').v2
const open = require('open')

// supply the tag shared by images to be animated
cloudinary.uploader
  .multi('sea-life', { delay: 2000 })
  .then(result => {
    console.log(result)
    open(result.secure_url)
  })
  .catch(error => {
    console.log(error)
  })
