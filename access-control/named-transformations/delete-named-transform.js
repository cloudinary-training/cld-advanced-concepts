require('dotenv').config()
const cloudinary = require('cloudinary').v2

const name = 'auto-400-xform'
cloudinary.api
  .delete_transformation(`${name}`)
  .then(result => {
    console.log(result)
  })
  .catch(error => {
    console.log(error)
  })
