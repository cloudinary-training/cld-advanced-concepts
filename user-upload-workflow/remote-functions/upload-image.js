require('dotenv').config()
const cloudinary = require('cloudinary').v2

cloudinary.uploader
  .upload('./assets/images/shell.jpg', {
    public_id: 'shell',
    overwrite: true,
    invalidate: true
  })
  .then(result => {
    const url = result.secure_url
    console.log(url)
  })
  .catch(error => console.error(error))
