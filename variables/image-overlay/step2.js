// upload a small video such as a customer might upload from an iphone
require('dotenv').config()

const cloudinary = require('cloudinary').v2
const open = require('open')

const url = cloudinary.url('baseball-cap', {
  transformation: [
    {
      variables: [
        ['$vertical', '500'],
        ['$horizontal', '500'],
        ['$color', '!ffffff!']
      ]
    },
    { height: '$vertical', width: '$horizontal', crop: 'fit' },
    {
      effect: 'replace_color:$color:30:111111'
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
