require('dotenv').config()
const cloudinary = require('cloudinary').v2
const open = require('open')

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
      transformation: ['collage-transform']
    }
  ]
})

console.log(url)
open(url)
