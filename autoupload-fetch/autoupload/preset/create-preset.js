require('dotenv').config()
const cloudinary = require('cloudinary').v2

cloudinary.api
  .create_upload_preset({
    name: 'remote-images',
    use_filename: true,
    unique_filename: false,
    unsigned: false,
    context: 'source=github',
    eager: {
      transformation: [
        {
          crop: 'thumb',
          height: '300',
          width: '300'
        },
        {
          gravity: 'auto',
          fetch_format: 'auto'
        }
      ]
    }
  })
  .then(uploadResult => console.log(uploadResult))
  .catch(error => console.error(error))
