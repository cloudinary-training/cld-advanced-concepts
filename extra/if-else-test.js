require('dotenv').config()
const cloudinary = require('cloudinary').v2

const url = cloudinary.url('blue-chair', {
  transformation: [
    { if: 'ils_gt_0.5', width: 120, height: 150, crop: 'pad' },
    { if: 'else', width: 120, height: 150, crop: 'fill' }
  ]
})

const url =cloudinary.image('sample', {
  transformation: [
    { if: 'ils_gt_0.5', width: 120, height: 150, crop: 'pad' },
    { if: 'else', width: 120, height: 150, crop: 'fill' }
  ]
})
console.log(url)
