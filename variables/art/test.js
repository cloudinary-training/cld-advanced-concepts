require('dotenv').config()
const cloudinary = require('cloudinary').v2
const open = require('open')

const publicId = 'mtrainier'
const url = cloudinary.url(publicId, {
  transformation: [
    {
      variables: [
        ['$w', '700'],
        ['$h', '500'],
        ['$dp', '20'],
        ['$wadp', '$w + $dp'],
        ['$hadp', '$h + $dp']
      ]
    },
    { width: '$w', height: '$h', crop: 'fill' },
    {
      width: '$w',
      height: '$h',
      overlay: publicId,
      opacity: 60,
      border: '1px_solid_rgb:FFFFFF',
      crop: 'fill'
    },
    { width: '$dp', height: '$h', gravity: 'east', crop: 'crop' },
    { angle: 'hflip' },
    { effect: 'distort:0:0:$dp:$dp:$dp:$hadp:0:$h' },
    { x: '$dp * -1', gravity: 'north_east', flags: 'layer_apply' },
    {
      width: '$w',
      height: '$h',
      overlay: publicId,
      opacity: 60,
      border: '1px_solid_rgb:FFFFFF',
      crop: 'fill'
    },
    { width: '$w', height: '$dp', gravity: 'south', crop: 'crop' },
    { angle: 'vflip' },
    { effect: 'distort:0:0:$w:0:$wadp:$dp:$dp:$dp' },
    { gravity: 'south', flags: 'layer_apply' },
    { quality: 'auto', fetch_format: 'auto' }
  ]
})
console.log(url)
open(url)

// x-cld-error: Variable $w is used before being assigned
// https://cloudinary.com/blog/turning_a_flat_image_into_a_three_dimensional_canvas_with_cloudinary
