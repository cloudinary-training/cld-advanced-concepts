require('dotenv').config()
const cloudinary = require('cloudinary').v2
const open = require('open')

const url = cloudinary.url('shark',
  {
    transformation: ['auto-400-xform']

  })
console.log(url)
open(url)
