require('dotenv').config()
const cloudinary = require('cloudinary').v2
const open = require('open')

const url = cloudinary.url('sample.jpg', {
  transformation: [
    { if: 'w_lte_400' },
    { height: 220, width: 180, crop: 'fill' },
    { effect: 'red' },
    { if: 'else' },
    { if: 'w_eq_864' },
    { height: 190, width: 300, crop: 'fill' },
    { if: 'else' },
    { effect: 'cartoonify' },
    { if: 'end' },

    { height: 190, width: 300, crop: 'fill' },
    { effect: 'oil_paint' },
    { if: 'end' }
  ]
})

open(url)
