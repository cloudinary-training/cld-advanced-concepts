require('dotenv').config()
const cloudinary = require('cloudinary').v2

async function uploadVideoFile (filename) {
  try {
    const result = await cloudinary.uploader.upload(filename, {
      use_filename: true,
      tags: 'skiing',
      unique_filename: false,
      type: 'upload',
      overwrite: true,
      invalidate: true,
      resource_type: 'video',
      async: false,
      eager: {
        crop: 'fill',
        width: 300,
        gravity: 'auto',
        aspect_ratio: '1:1'
      }
    })
    console.log('uploaded', result.public_id)
    console.log(result)
  } catch (error) {
    console.log('upload error:', error)
  }
}

const files = ['./assets/video/ski-lift.mp4',
  './assets/video/downhill.mp4',
  './assets/video/hike-up.mp4',
  './assets/video/snowboarding.mp4']

for (const file of files) {
  uploadVideoFile(file)
}
