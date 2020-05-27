require('dotenv').config()
const cloudinary = require('cloudinary').v2
cloudinary.config({ secure: true })
const open = require('open')

const url = cloudinary.url('ul-video.vtt', {
  resource_type: 'raw'
})
console.log(url)
open(url)
