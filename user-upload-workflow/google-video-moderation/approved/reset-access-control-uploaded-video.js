require('dotenv').config()
const cloudinary = require('cloudinary').v2
// upload token access and moderation
// check to see that video is available before moderation and it is restricted
// get a list of approved and remove token and look at video without version

cloudinary.api
  .resources_by_moderation('google_video_moderation', 'approved', {
    resource_type: 'video'
  })
  .then(result => {
    // remove tokens from approved videos
    for (const video of result.resources) {
      cloudinary.api
        .update(video.public_id, {
          resource_type: 'video',
          access_control: [{ access_type: 'anonymous' }],
          invalidate: true
        })
        .then(result => {
          // console.log()
          // console.log('removing token access control: ', result.public_id)
          // url
          console.log(
            'no version url:',
            cloudinary.url(result.public_id, {
              resource_type: 'video',
              format: result.format
            })
          )
          // console.log(result)
        })
        .catch(error => console.error(error))
    }
    console.log(result)
  })
  .catch(error => {
    console.log(error)
  })
