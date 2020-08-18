require('dotenv').config()
const cloudinary = require('cloudinary').v2

const url = cloudinary.url('law-and-order', {
  transformation: [
    {
      variables: [
        ['$img1', '!sherlock!'],
        ['$img2', '!prime-suspect!'],
        ['$img3', '!longmeyer!']
      ]
    },
    {
      border: '3px_solid_white',
      crop: 'fill',
      width: 300,
      height: 300,
      gravity: 'center'
    },
    {
      overlay: '$img1',
      border: '3px_solid_white',
      crop: 'fill',
      width: 300,
      height: 300,
      x: 300
    },
    {
      overlay: '$img2',
      border: '3px_solid_white',
      crop: 'fill',
      width: 300,
      height: 300,
      x: -150,
      y: 300
    },
    {
      overlay: '$img3',
      border: '3px_solid_white',
      crop: 'fill',
      width: 300,
      height: 300,
      x: 150,
      y: 150
    },
    {
      quality: 'auto',
      fetch_format: 'auto'
    }
  ]
})
console.log(url)