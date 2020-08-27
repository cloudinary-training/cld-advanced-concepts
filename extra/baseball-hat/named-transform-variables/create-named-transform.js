require('dotenv').config()
const cloudinary = require('cloudinary').v2

cloudinary.api
  .create_transformation('hat-transform', {
    transformation: [
      { effect: 'replace_color:$color:30:111111' },
      { width: '$horizontal', crop: 'scale' },
      {
        overlay: 'logo-big',
        crop: 'fit',
        gravity: 'north',
        width: '$horizontal * $logoscalar',
        x: '$horizontal * $correctx',
        y: '$horizontal * $correcty'
      },
      {
        dpr: '2.0',
        fetch_format: 'auto',
        quality: 'auto'
      }
    ]
  })
  .then(result => {
    console.log(result)
  })
  .catch(error => {
    console.log(error)
  })
