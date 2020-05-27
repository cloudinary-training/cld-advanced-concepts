require('dotenv').config()
const cloudinary = require('cloudinary').v2

// similar to checking the DAM Google Video Rejected Queue
cloudinary.api
  .resources_by_moderation('google_video_moderation', 'rejected', {
    resource_type: 'video'
  })
  .then(result => {
    console.log(JSON.stringify(result, null, 1))
  })
  .catch(error => {
    console.log(error)
  })
