require('dotenv').config()
const cloudinary = require('cloudinary').v2
const open = require('open')

const url = cloudinary.url('shell', {
  resource_type: 'image',
  transformation: [
    {
      variables: [['$w', '500']]
    },
    {
      transformation: [
        {
          if: 'w_lt_$w',
          overlay: {
            font_family: 'Arial',
            font_size: 100,
            text: 'width < $(w)'
          },
          width: 400,
          gravity: 'north_east',
          x: 10,
          y: 10
        },
        {
          if: 'else',
          overlay: {
            font_family: 'Arial',
            font_size: 100,
            text: 'width >= $(w)'
          },
          background: 'yellow',
          color: 'black',
          radius: 10,
          opacity: 50,
          width: 400,
          gravity: 'north_east',
          x: 10,
          y: 10
        }
      ]
    }
  ]
})
console.log(url)
open(url)
