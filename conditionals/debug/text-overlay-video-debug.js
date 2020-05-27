require('dotenv').config()
const cloudinary = require('cloudinary').v2
const open = require('open')

const url = cloudinary.url('snowboarding', {
  resource_type: 'video',
  transformation: [
    {
      variables: [['$w', '400']]
    },
    {
      transformation: [
        {
          if: 'w_lt_$w',
          overlay: {
            font_family: 'Arial',
            font_size: 45,
            text: 'width < 400'
          },
          width: 150,
          gravity: 'north_east',
          x: 10,
          y: 10
        },
        {
          if: 'else',
          overlay: {
            font_family: 'Arial',
            font_size: 45,
            text: 'width >= 400'
          },
          background: 'yellow',
          color: 'black',
          radius: 10,
          opacity: 50,
          width: 150,
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
