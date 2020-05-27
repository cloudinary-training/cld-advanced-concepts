// docs: https://cloudinary.com/documentation/upload_images#update_already_uploaded_images
// test public_id is dolphin which is authenticated

require('dotenv').config()
const cloudinary = require('cloudinary').v2
cloudinary.config()
const open = require('open')

// dolphin requires signing
// helper signature
const url = cloudinary.url('dolphin', {
  type: 'authenticated',
  secure: true,
  width: 300,
  height: 300,
  crop: 'limit',
  sign_url: true
})
console.log('cloudinary helper:', url)
open(url)
