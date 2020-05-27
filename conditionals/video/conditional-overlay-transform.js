require('dotenv').config()
const cloudinary = require('cloudinary').v2
const open = require('open')

const url = cloudinary.url('snowboarding', {
  resource_type: 'video',
  transformation: [
    { width: 500, crop: 'scale' },
    { if: '!skiing!_in_tags' },
    {
      overlay: 'logo-big',
      width: 100,
      gravity: 'north_east',
      opacity: 50,
      effect: 'brightness:100'
    },
    {
      overlay: { font_family: 'arial', font_size: 15, text: 'Snow%20Fun' },
      gravity: 'north_east',
      y: 10,
      x: 105
    },
    { if: 'end' },
    { duration: '5' }
  ]
})
console.log(url)
open(url)
