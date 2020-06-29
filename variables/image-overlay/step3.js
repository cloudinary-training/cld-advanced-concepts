require('dotenv').config()

const cloudinary = require('cloudinary').v2
const open = require('open')

const url = cloudinary.url('baseball-cap', {
  transformation: [
    {
      variables: [
        ['$vertical', '500'],
        ['$horizontal', '500'],
        ['$color', '!ffffff!'],
        ['$logow', '200']
      ]
    },
    { height: '$vertical', width: '$horizontal', crop: 'fit' },
    {
      effect: 'replace_color:$color:30:111111'
    },
    {
      overlay: 'logo-big',
      crop: 'scale',
      width: '$logow',
      gravity: 'center'
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
