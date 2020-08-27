require('dotenv').config()
const cloudinary = require('cloudinary').v2

const width = 800
const numberOfTilesAcross = 3
const height = 2*Math.ceil(width/numberOfTilesAcross)

cloudinary.api
  .create_upload_preset({
    name: 'video-truncate',
    use_filename: true,
    unique_filename: false,
    unsigned: false,
    transformation: [
      {
        height: `${height}`,
        crop: 'fill',
        duration: 5
      }
    ]
  })
  .then(uploadResult => console.log(uploadResult))
  .catch(error => console.error(error))
