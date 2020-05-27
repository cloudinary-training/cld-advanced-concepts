require('dotenv').config()
const cloudinary = require('cloudinary').v2

cloudinary.api
  .get_streaming_profile('hd')
  .then(result => console.log(JSON.stringify(result, null, 1)))
  .catch(error => console.log.log(error))
