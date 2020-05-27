require('dotenv').config()
const cloudinary = require('cloudinary').v2

cloudinary.api
  .list_streaming_profiles()
  .then(result => console.log(result))
  .catch(error => console.log(error))
