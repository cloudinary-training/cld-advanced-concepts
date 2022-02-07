require('dotenv').config()
const cloudinary = require('cloudinary').v2
const open = require('open')

// use cld url helper to create a transformation
// do not need to sign to create transformation with private

const url = cloudinary.url('goldfish', {
  type: 'private',
  secure: true,
  width: 300,
  height: 300,
  quality: 'auto',
  fetch_format: 'auto',
  crop: 'limit'
})
console.log(url)
open(url)
