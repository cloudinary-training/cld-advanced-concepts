require('dotenv').config()
const cloudinary = require('cloudinary').v2
const open = require('open')

// main layer is shell
const url = cloudinary.url('shell', {
  transformation: [
    { width: '200', crop: 'scale' },
    // gray surface is under shell
    {
      underlay: {
        public_id: 'gray-surface'
      },
      width: 450
    },
    // Fibonacci text is over shell
    {
      overlay: {
        font_family: 'Arial',
        font_size: 20,
        text: '  Fibonacci  '
      },
      gravity: 'east',
      x: 25,
      y: 100
    },
    // Explore is over shell
    {
      overlay: {
        font_family: 'Arial',
        font_size: 20,
        text: '  Explore  '
      },
      gravity: 'west',
      x: 25,
      y: -100
    }
  ]
})

console.log(url)
open(url)

