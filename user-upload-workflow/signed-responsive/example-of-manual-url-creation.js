require('dotenv').config()
const cloudinary = require('cloudinary').v2

// this is a sample of setting up a url for repsonsive images manually


let url = cloudinary.url('blue-chair', {
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

url = cloudinary.url('blue-chair', {
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

url = cloudinary.url('blue-chair', {
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


