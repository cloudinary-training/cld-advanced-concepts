require('dotenv').config()
const cloudinary = require('cloudinary').v2
const open = require('open')

// create an auto-upload url with transformations
const url = cloudinary.url(cloudinary.url('remote-images/kiwi.jpg'))
console.log(url)
open(url)

// check DAM to see that you've created derived assets due to preset
