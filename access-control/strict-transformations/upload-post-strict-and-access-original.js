// upload a file after enabling Strict Transformations
// access via secure_url and cloudinary.url - no signing
require('dotenv').config()
const cloudinary = require('cloudinary').v2
const open = require('open')

// use upload API to upload a public asset

cloudinary.uploader
  .upload('./assets/images/jellyfish.jpg', {
    public_id: 'jellyfish',
    type: 'upload',
    overwrite: true,
    invalidate: true
  })
  .then(uploadResult => {
    console.log(uploadResult)
    console.log('secure url', uploadResult.secure_url)
    // Consider 4 cases:
    // 1. no transformation and no auth error
    open(uploadResult.secure_url)

    // format included
    let url = cloudinary.url(`${uploadResult.public_id}`, {
      format: `${uploadResult.format}`
    })
    console.log('format included:', url)
    // 2. original format included in Cloudinary URL config - no transformation
    // no auth error
    open(url)

    // no format - just public id
    url = cloudinary.url(`${uploadResult.public_id}`, {})
    console.log('cloudinary url:', url)
    // 3. should not work 404
    open(url)

    // 4. transformation
    url = cloudinary.url(`${uploadResult.public_id}`, { angle: 0 })
    console.log('cloudinary url:', url)
    // expect fail 'resource not found' 404
    open(url)
  })
  .catch(error => console.error(error))
