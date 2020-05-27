require('dotenv').config()
const cloudinary = require('cloudinary').v2
const open = require('open')
const url = cloudinary.url('shell', {
  transformation: [
    {
      width: '300',
      crop: 'scale',
      opacity: 60,
      background: 'rgb:ff2222'
    },
    {
      underlay: {
        font_family: 'Roboto',
        font_size: 50,
        font_weight: 'bold',
        text_align: 'center',
        line_spacing: 1,
        letter_spacing: 1,
        text: '   Fibonacci   %0ASpiral'
      },
      color: 'blue',
      background: 'yellow',
      gravity: 'south',
      width: 300,
      y: -50
    }
  ]
})
console.log(url)
open(url)
