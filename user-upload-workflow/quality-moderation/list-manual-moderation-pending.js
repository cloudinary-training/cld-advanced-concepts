require('dotenv').config()
const cloudinary = require('cloudinary').v2

// similar to checking the DAM Google Video Rejected Queue
cloudinary.api
  .resources_by_moderation('manual', 'pending', {
    resource_type: 'image'
  })
  .then(result => {
    console.log(result)
  })
  .catch(error => {
    console.log(error)
  })
