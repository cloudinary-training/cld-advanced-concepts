require('dotenv').config()
const cloudinary = require('cloudinary').v2
const open = require('open')

const url = cloudinary.url('snowboarding', {
  resource_type: 'video',
  if: 'ar_gt_0.65_and_w_gt_1000',
  aspect_ratio: '0.65',
  height: 1000,
  crop: 'fill'
})
console.log(url)
open(url)
