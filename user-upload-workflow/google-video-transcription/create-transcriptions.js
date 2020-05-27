require('dotenv').config()
const cloudinary = require('cloudinary').v2

cloudinary.uploader
  .upload('./assets/video/UnderwritersLaboratoryPsa.mp4', {
    resource_type: 'video',
    public_id: 'ul-video',
    raw_convert: 'google_speech:srt:vtt',
    notification_url:
      'https://webhook.site/17a3d46c-5d18-46b0-ab6c-94b12d7f645c'
  })
  .then(result => console.log(JSON.stringify(result, null, 1)))
  .catch(error => console.log(error))
