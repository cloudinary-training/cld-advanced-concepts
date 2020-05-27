require('dotenv').config()
const cloudinary = require('cloudinary').v2

cloudinary.uploader.destroy('killer-whale', { invalidate: true })
  .then(result => console.log('result', result))
  .catch(error => console.log('error', error))
