require('dotenv').config()
const cloudinary = require('cloudinary').v2
const open = require('open')

const url = cloudinary.url('1px', {
  transformation: [
    {
      variables: [
        ['$imgw', '800'],
        ['$ftile', '$imgw / 3'],
        ['$tile', '$ftile to i'],
        ['$fontw', '$imgw / 4'],
        ['$img1', '!kiwi!'],
        ['$img2', '!blackberry!'],
        ['$img3', '!strawberry!'],
        ['$img4', '!pineapple!'],
        ['$img5', '!cherries!'],
        ['$img6', '!grapes!'],
        ['$title', '!Fruit!']
      ]
    },
    {
      width: '$tile * 3',
      height: '$tile * 2',
      crop: 'fill',
      quality: 'auto'
    },
   {
      overlay: '$img1',
      width: '$tile',
      crop: 'fill',
      gravity: 'auto',
      height: '$tile'
    },
    {
      flags: 'layer_apply',
      gravity: 'north_west',
      x: 0,
      y: 0
    },
    {
      overlay: '$img2',
      width: '$tile',
      crop: 'fill',
      gravity: 'auto',
      height: '$tile'
    },
    {
      flags: 'layer_apply',
      gravity: 'north_west',
      x: '$tile',
      y: '0'
    },
    {
      overlay: '$img3',
      width: '$tile',
      crop: 'fill',
      gravity: 'auto',
      height: '$tile'
    },
    {
      flags: 'layer_apply',
      gravity: 'north_west',
      x: '$tile * 2',
      y: '0'
    },

    {
      overlay: '$img4',
      width: '$tile',
      crop: 'fill',
      gravity: 'auto',
      height: '$tile'
    },
    {
      flags: 'layer_apply',
      gravity: 'north_west',
      x: 0,
      y: '$tile'
    },

    {
      overlay: '$img5',
      width: '$tile',
      crop: 'fill',
      gravity: 'auto',
      height: '$tile'
    },
    {
      flags: 'layer_apply',
      gravity: 'north_west',
      x: '$tile',
      y: '$tile'
    },
    {
      overlay: '$img6',
      width: '$tile',
      crop: 'fill',
      gravity: 'auto',
      height: '$tile'
    },
    {
      flags: 'layer_apply',
      gravity: 'north_west',
      x: '$tile * 2',
      y: '$tile'
    },

    {
      overlay: {
        font_family: 'Arial',
        font_size: 200,
        text: '%20%24%28title%29%20'
      },
      color: 'rgb:bada55',
      background: 'indigo',
      'font-weight': 'bold',
      gravity: 'center',
      width: '$fontw',
      dpr: 2.0
    },
    {border: '5px_solid_rgb:bada55'}
  ]
})
open(url)
