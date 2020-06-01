require('dotenv').config()
const cloudinary = require('cloudinary').v2
const open = require('open')

const url = cloudinary.url(
  'https://cloudinary-training.github.io/cld-advanced-concepts/assets/images/oranges.jpg',
  { type: 'fetch' }
)
console.log(url)
open(url)
