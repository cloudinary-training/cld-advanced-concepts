require('dotenv').config()
const cloudinary = require('cloudinary').v2
const open = require('open')

const url = cloudinary.url('wave', {
  resource_type: 'video',

  transformation: [
    { width: 500, crop: 'scale' },
    {
      overlay: 'logo-big',
      width: 100,
      gravity: 'south_east',
      opacity: 50,
      effect: 'brightness:100'
    },
    {
      overlay: {
        font_family: 'Trade Winds',
        font_size: 30,
        text: '  Catch a wave  '
      },
      gravity: 'north_west',
      x: 25,
      y: 25
    }
  ]
})

console.log(url)
open(url)
