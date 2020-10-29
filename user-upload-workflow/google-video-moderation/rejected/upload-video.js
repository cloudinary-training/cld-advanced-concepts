require('dotenv').config()
const cloudinary = require('cloudinary').v2

// using add on Google AI Video Moderation
// Google cloud video intelligence
cloudinary.uploader
  .upload('./assets/video/hot-tub.mp4', {
    resource_type: 'video',
    public_id: 'hot-tub',
    access_control: [{ access_type: 'token' }],
    moderation: 'google_video_moderation:possible',
    notification_url:
      'https://webhook.site/0b500683-d59a-499e-a275-234b14ac7f52'
  })
  .then(result => {
    console.log(result)
    console.log(result.moderation.repsonse)
  })
  .catch(error => console.log(error))
