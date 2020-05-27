require('dotenv').config()
const cloudinary = require('cloudinary').v2
const open = require('open')

const url = cloudinary.url(
  'https://cdn.pixabay.com/photo/2020/03/06/13/43/mockingbird-4907104_1280.jpg',
  { type: 'fetch', sign_url: true }
)
console.log(url)
open(url)
