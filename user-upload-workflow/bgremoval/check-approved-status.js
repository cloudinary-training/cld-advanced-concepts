require('dotenv').config()
const cloudinary = require('cloudinary').v2

cloudinary.api
  .resources_by_moderation('manual', 'approved', {
    resource_type: 'image'
  })
  .then(result => {
    if (result.resources.length > 0) {
      for (const img of result.resources) {
        // create image tag with alt attribute to use once moderation is complete
        cloudinary.api
          .resource(img.public_id)
          .then(result => {
            // console.log(result)
            console.log(cloudinary.image(result.public_id, { alt: result.context.custom.alt }))
          })
          .catch(error => {
            console.log(error)
          })
      }
    } else {
      console.log('no images approved')
    }
  })
  .catch(error => {
    console.log(error)
  })
