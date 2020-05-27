require('dotenv').config()
const cloudinary = require('cloudinary').v2

cloudinary.uploader
  .upload('./assets/images/image-from-tv.jpg', {
    type: 'upload',
    public_id: 'image-from-tv-1',
    quality_analysis: true,
    invalidate: true
  })
  .then(uploadResult => {
    console.log(uploadResult)
    if (uploadResult.quality_analysis.focus < 0.7) {
      cloudinary.uploader.explicit(uploadResult.public_id, {
        type: 'upload',
        moderation: 'manual'
      })
    }
  })
  .catch(error => console.error(error))
