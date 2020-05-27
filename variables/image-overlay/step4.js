// upload a small video such as a customer might upload from an iphone
require('dotenv').config()

const cloudinary = require('cloudinary').v2
const open = require('open')

const url = cloudinary.url('baseball-cap', {
  transformation: [
    {
      variables: [
        ['$horizontal', 500],
        ['$correctx', '0.04'],
        ['$correcty', '0.1'],
        ['$logoscalar', '0.4'],
        ['$color', '!ffffff!']
      ]
    },
    {
      effect: 'replace_color:$color:30:111111'
    },
    { width: '$horizontal', crop: 'scale' },
    {
      overlay: 'logo-big',
      crop: 'fit',
      gravity: 'north',
      width: '$horizontal * $logoscalar',
      x: '$horizontal * $correctx',
      y: '$horizontal * $correcty'
    },
    {
      dpr: '2.0',
      fetch_format: 'auto',
      quality: 'auto'
    }
  ]
})
console.log(url)
open(url)
