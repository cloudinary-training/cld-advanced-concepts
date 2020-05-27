require('dotenv').config()
const cloudinary = require('cloudinary').v2
console.log(cloudinary.config().cloud_name)
const open = require('open')

const url = cloudinary.url('https://cloudinary-training.github.io/advanced-concepts/assets/images/strawberry.jpg',
  {
    type: 'fetch',
    width: 400,
    height: 400,
    crop: 'limit',
    radius: '30',
    effect: 'sharpen',
    quality: 'auto',
    fetch_format: 'auto'
  }
)
console.log(url)
open(url)
