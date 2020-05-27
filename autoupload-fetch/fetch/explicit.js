require('dotenv').config()
const cloudinary = require('cloudinary').v2
// const open = require('open')

// get a fresh copy of the image
// upload something else to oranges
cloudinary.uploader
  .explicit(
    'https://cloudinary-training.github.io/advanced-concepts/assets/images/oranges.jpg',
    {
      type: 'fetch',
      invalidate: true
    }
  )
  .then(result => {
    console.log('result', result)
  })
  .catch(error => console.log('error', error))
