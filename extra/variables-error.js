require('dotenv').config()
const cloudinary = require('cloudinary').v2
const open = require('open')
// const url = cloudinary.url('sample', {
//   variables: [['$bcolor', '!red!']],
//   transformation: [
//     { if: 'fc_gt_0' },
//     { border: '5px_solid_$bcolor', height: 120, width: 120, crop: 'fill' },
//     { if: 'end' }
//   ]
// })

const url = cloudinary.url('sample', {
  transformation: [
    { variables: [['$bcolor', '!red!']] },
    { if: 'fc_gt_0' },
    { border: '5px_solid_$bcolor', height: 120, width: 120, crop: 'fill' },
    { if: 'end' }
  ]
})

open(url)
console.log(url)

const image = cloudinary.image('sample.jpg', {
  variables: [['$bcolor', '!red!']],
  transformation: [
    { if: 'fc_gt_0' },
    { border: '5px_solid_$bcolor', height: 120, width: 120, crop: 'fill' },
    { if: 'end' }
  ]
})
console.log(image)
