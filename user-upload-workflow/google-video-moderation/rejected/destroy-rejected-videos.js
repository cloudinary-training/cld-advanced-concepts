require('dotenv').config()
const cloudinary = require('cloudinary').v2

// clean up rejected videos
cloudinary.api
  .resources_by_moderation('google_video_moderation', 'rejected', {
    resource_type: 'video'
  })
  .then(result => {
    // delete anything that's rejected
    for (const video of result.resources) {
      cloudinary.uploader
        .destroy(video.public_id, {
          invalidate: true,
          resource_type: 'video'
        })
        .then(result => {
          console.log('destroying: ', video.public_id)
          console.log(result)
        })
        .catch(error => console.error(error))
    }

    console.log(result)
  })
  .catch(error => {
    console.log(error)
  })
