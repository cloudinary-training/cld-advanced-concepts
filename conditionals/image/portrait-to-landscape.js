require('dotenv').config()
const cloudinary = require('cloudinary').v2
const open = require('open')
cloudinary.uploader
  .upload('./assets/images/woman-standing.jpg')
  .then(result => {
    const url = cloudinary.url(result.public_id, {
      transformation: [
        { variables: [['$wide', '300']] },
        { if: 'ar_lt_1.0' },
        {
          aspect_ratio: '1.5',
          width: '$wide',
          crop: 'fill',
          gravity: 'face',
          effect: 'grayscale'
        },
        { effect: 'tint:50:green:yellow' },
        { if: 'end' }
      ]
    })
    console.log(url)
    open(url)
  })
  .catch(error => console.log(error))
