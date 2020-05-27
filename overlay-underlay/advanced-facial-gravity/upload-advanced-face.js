require('dotenv').config()
const cloudinary = require('cloudinary').v2

// upload image with a face

cloudinary.uploader
  .upload('./assets/images/woman-standing.jpg', {
    detection: 'adv_face'
  })
  .then(result => {
    console.log(JSON.stringify(result.info.detection.adv_face, null, 1))
  })
  .catch(error => console.error(error))
