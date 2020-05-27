require('dotenv').config()
const cloudinary = require('cloudinary').v2
const open = require('open')

const url = cloudinary.url('dolphin', {
  type: 'authenticated',
  secure: true,
  width: 300,
  height: 300,
  quality: 'auto',
  fetch_format: 'auto',
  crop: 'limit',
  sign_url: true
})
console.log(url)
open(url)
