require('dotenv').config()
const cloudinary = require('cloudinary').v2
// upload authenticated moderation
// get a list of approved and move out of moderation and set as public
cloudinary.api
  .resources_by_moderation('google_video_moderation', 'approved', {
    resource_type: 'video'
  })
  .then(result => {
    // move any approved videos out of moderation folder, and set as public
    for (const video of result.resources) {
      if (video.type === 'authenticated') {
        const newPublicId = video.public_id.substring(10) // removing 'moderated' folder name and slash

        console.log(
          'video.public_id',
          video.public_id,
          'newPublicID',
          newPublicId
        )
        cloudinary.uploader
          .rename(video.public_id, newPublicId, {
            resource_type: 'video',
            type: 'authenticated',
            to_type: 'upload',
            invalidate: true,
            overwrite: true
          })
          .then(result => {
            console.log(
              'new version url:',
              cloudinary.url(result.public_id, {
                resource_type: 'video',
                format: result.format
              })
            )
          })
          .catch(error => console.error(error))
      }
    }
  })
