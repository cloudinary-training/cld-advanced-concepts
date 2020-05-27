require('dotenv').config()
const cloudinary = require('cloudinary').v2
const open = require('open')

const url = cloudinary.url('remote-media/video/rooster.mp4', {
  resource_type: 'video',
  secure: true
})

console.log(url)
open(url)
