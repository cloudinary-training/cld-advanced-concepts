require('dotenv').config()
const cloudinary = require('cloudinary').v2
const open = require('open')

const url = cloudinary.url('baseball-cap', {
  transformation: [
    {
      variables: [
        ['$horizontal', '500'],
        ['$correctx', '0.04'],
        ['$correcty', '0.1'],
        ['$logoscalar', '0.4'],
        ['$color', '!pink!']
      ]
    },
    {
      transformation: ['hat-transform']
    }
  ]
})

console.log(url)
open(url)
