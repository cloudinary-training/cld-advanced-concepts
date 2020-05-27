require('dotenv').config()
const cloudinary = require('cloudinary').v2
const open = require('open')

function addCCWatermark (publicId) {
  return cloudinary.url(publicId, {
    transformation: [
      { width: '300', height: '400', crop: 'fill_pad', background: 'white', gravity: 'auto' },
      { if: 'ctx:!license!_eq_!cc!' },
      {
        overlay: 'cc0',
        height: 50,
        gravity: 'north_east',
        opacity: 50
      },
      { if: 'else' },
      {
        overlay: 'ccby',
        width: 100,
        gravity: 'north_east',
        opacity: 75,
        effect: 'brightness:100'
      },
      { if: 'end' }
    ]
  })
}
let url = addCCWatermark('fishing-boat')
console.log(url)
open(url)
url = addCCWatermark('clear-river')
console.log(url)
open(url)

// Cannot find matching if_end for if_else
