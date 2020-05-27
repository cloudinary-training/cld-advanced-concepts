require('dotenv').config()
const cloudinary = require('cloudinary').v2
const open = require('open')

cloudinary.uploader
  .upload('./assets/raw/BLKCHCRY.TTF', {
    resource_type: 'raw', // Custom fonts must be upload as 'raw'
    type: 'authenticated', // Custom fonts must be upload as 'authenticated'
    public_id: 'BLKCHCRY.ttf'
  })
  .then(result => {
    console.log(result)
    const url = cloudinary.url('shell', {
      transformation: [
        {
          width: '300',
          crop: 'scale'
        },
        {
          overlay: {
            font_family: 'BLKCHCRY.ttf',
            font_size: 75,
            text: 'Spiral'
          },
          color: 'black',
          gravity: 'south',
          y: 30
        }
      ]
    })
    console.log(url)
    open(url)
  })
  .catch(error => console.log(error))
