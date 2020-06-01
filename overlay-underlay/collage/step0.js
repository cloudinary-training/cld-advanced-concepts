// https://blog.fullstacktraining.com/creating-memes-with-cloudinary/
require('dotenv').config()
const cloudinary = require('cloudinary').v2
const open = require('open')

// add 1st image
const url = cloudinary.url('lion-head', {
  transformation: [
    {
      border: '3px_solid_white',
      crop: 'fill',
      width: 300,
      height: 300,
      gravity: 'center'
    },
    {
      quality: 'auto',
      fetch_format: 'auto'
    }
  ]
})

console.log(url)
open(url)
