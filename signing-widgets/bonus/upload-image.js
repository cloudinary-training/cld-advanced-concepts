// this is accessing the asset as if running from the root
// if you want to run from this directory, change the location of the image
// to ../../assets/images/tiger-lilly.jpg

require('dotenv').config()
const cloudinary = require('cloudinary').v2

cloudinary.uploader
  .upload('./assets/images/tiger-lilly.jpg', {
    public_id: 'tiger-lilly',
    type: 'authenticated',
    overwrite: true,
    invalidate: true
  })
  .then(result => {
    const url = result.secure_url
    console.log(url)
  })
  .catch(error => console.error(error))
