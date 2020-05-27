require('dotenv').config()
const cloudinary = require('cloudinary').v2

let url = cloudinary.url('zgsv1hmttc7kwiztp0gt', {
  sign_url: true,
  transformation: [
    { aspect_ratio: '16:9', crop: 'fill', gravity: 'auto' },
    {
      width: '1000',
      crop: 'scale'
    }
  ]
})
console.log(url)

url = cloudinary.url('zgsv1hmttc7kwiztp0gt', {
  sign_url: true,
  transformation: [
    { aspect_ratio: '16:9', crop: 'fill', gravity: 'auto' },
    {
      width: '788',
      crop: 'scale'
    }
  ]
})
console.log(url)

// this is a sample of setting up a url for repsonsive images manually
url = cloudinary.url('zgsv1hmttc7kwiztp0gt', {
  sign_url: true,
  transformation: [
    { aspect_ratio: '16:9', crop: 'fill', gravity: 'auto' },
    {
      width: '200',
      crop: 'scale'
    }
  ]
})
console.log(url)


