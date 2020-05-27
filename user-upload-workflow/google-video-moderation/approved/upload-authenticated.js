require('dotenv').config()
const cloudinary = require('cloudinary').v2
// use upload API to upload an authenticated asset
cloudinary.uploader
  .upload('./assets/video/elephants.mp4', {
    folder: 'moderated',
    use_filename: true,
    unique_filename: false,
    resource_type: 'video',
    type: 'authenticated',
    moderation: 'google_video_moderation:possible',
    notification_url:
      'https://webhook.site/17a3d46c-5d18-46b0-ab6c-94b12d7f645c',
    invalidate: true
  })
  .then(uploadResult => {
    console.log(uploadResult)
  })
  .catch(error => console.error(error))
