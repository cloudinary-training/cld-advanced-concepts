require('dotenv').config()
const cloudinary = require('cloudinary').v2

const video = cloudinary.video('rooster.mp4', {
  transformation: [
    {
      if: 'w_gt_400',
      overlay: 'sample',
      width: 150,
      gravity: 'north_east',
      x: 10,
      y: 10
    },
    { width: 400, crop: 'limit' }
  ]
})
console.log(video)
