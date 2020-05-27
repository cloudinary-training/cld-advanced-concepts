require('dotenv').config()
const cloudinary = require('cloudinary').v2

// function to process public id and description
function setUpModeration(publicId, description) {
  console.log(`args:  ${publicId}, ${description}`)
  // create transformation that includes moderation
  cloudinary.uploader
    .explicit(publicId, {
      type: 'upload',
      moderation: 'manual'
    })
    .then(result => {
      console.log(JSON.stringify(result, null, 1))
    })
    .catch(error => {
      console.log(error)
    })
}

// main
// data used to create original image
const data = {
  sku: 's0001',
  category: 'shoes',
  description: 'Yellow Shoes',
  image: './assets/images/yellow-shoes.jpg',
  imageId: 'yellow-shoes',
  sale: true
}

setUpModeration(data.imageId, data.description)
