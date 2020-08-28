require('dotenv').config()
const cloudinary = require('cloudinary').v2
const open = require('open')

const url = cloudinary.url('PSDtemplate', {
  transformation: [
    { page: '4;8;11' },
    { width: 300, crop: 'scale' },

    { secure_url: true, fetch_format: 'jpg' }
  ]
})

open(url)
