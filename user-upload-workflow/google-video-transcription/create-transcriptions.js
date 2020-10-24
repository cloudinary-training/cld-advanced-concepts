require('dotenv').config()
const cloudinary = require('cloudinary').v2

cloudinary.uploader
  .upload('./assets/video/UnderwritersLaboratoryPsa.mp4', {
    resource_type: 'video',
    public_id: 'ul-video',
    raw_convert: 'google_speech:srt:vtt',
    duration: '16',
    notification_url:
      'https://webhook.site/0b500683-d59a-499e-a275-234b14ac7f52'
  })
  .then(result => console.log(JSON.stringify(result, null, 1)))
  .catch(error => console.log(error))
