require('dotenv').config()
const cloudinary = require('cloudinary').v2
const open = require('open')

const url = cloudinary.url('chalkboard', {
  transformation: [
    { width: '500', crop: 'scale' },
    {
      overlay: 'shell',
      crop: 'fit',
      gravity: 'north',
      width: 150,
      x: -70,
      y: 50,
      radius: 30
    },
    {
      overlay: {
        font_family: 'Trade Winds',
        font_size: 20,
        text: '  Fibonacci  '
      },
      color: '#DC7633',
      background: '#222',
      'font-weight': 'bold',
      effect: 'brightness:50',
      gravity: 'north',
      width: 150,
      x: 90,
      y: 75
    },
    { fetch_format: 'auto', quality: 'auto' }
  ]
})

console.log(url)
open(url)
