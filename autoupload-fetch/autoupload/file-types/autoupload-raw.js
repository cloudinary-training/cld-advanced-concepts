require('dotenv').config()
const cloudinary = require('cloudinary').v2
const open = require('open')

const url = cloudinary.url('remote-media/raw/data.json', {
  resource_type: 'raw',
  secure: true
})
console.log(url)
open(url, { app: ['google chrome', '--incognito'] }) // bypass browser cache
