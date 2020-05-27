require('dotenv').config()
const cloudinary = require('cloudinary').v2
const open = require('open')

// Strict transformations enabled
// explicit method using eager parameter to create a transformation
// running default synchronous eager
cloudinary.uploader.explicit('killer-whale',
  {
    type: 'upload',
    eager: [{
      width: 300,
      height: 300,
      quality: 'auto',
      crop: 'limit',
      invalidate: true
    }]
  })
  .then(result => {
    console.log('result', result)
    // look at the transformed url
    const transformUrl = result.eager[0].secure_url
    console.log('transform url:', transformUrl)
    open(transformUrl)
  })
  .catch(error => console.log('error', error))
