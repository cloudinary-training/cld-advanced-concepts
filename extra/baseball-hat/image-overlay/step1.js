require('dotenv').config()

const cloudinary = require('cloudinary').v2
const open = require('open')

const url = cloudinary.url('baseball-cap', {
  transformation: [
    {
      variables: [
        ['$color', '!ffffff!']
      ]
    },
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

open(url)
