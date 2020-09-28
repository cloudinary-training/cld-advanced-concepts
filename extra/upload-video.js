require('dotenv').config()
const cloudinary = require('cloudinary').v2

//sample code for using google video tagging
// upload psd files with layers
cloudinary.uploader
  .upload('./assets/video/elephants.mp4', {
    use_filename: true,
    unique_filename: false,
    type: 'upload',
    resource_type: 'video',
    invalidate: true,
    categorization: 'google_video_tagging',
    auto_tagging: 0.6,
    notification_url: 'https://webhook.site/0b500683-d59a-499e-a275-234b14ac7f52'
  })
  .then(uploadResult => {
    console.log(JSON.stringify(null, 2, uploadResult))
  })
  .catch(error => console.error(error))
