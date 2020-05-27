require('dotenv').config()
const cloudinary = require('cloudinary').v2

const data = {
  sku: 's0001',
  category: 'shoes',
  description: 'Yellow Shoes',
  image: './assets/images/yellow-shoes.jpg',
  imageId: 'yellow-shoes',
  sale: true
}

cloudinary.uploader
  .upload(data.image, {
    public_id: data.imageId,
    context: `description=${data.description} ${
      data.sale ? 'on sale' : ''
    } | sku=${data.sku} | alt=${data.description}`,
    tags: data.category,
    background_removal: 'cloudinary_ai',
    notification_url:
      'https://webhook.site/5e96159b-630d-4fbe-91ed-d3f2807aedca',
    transformation: [{ height: 200, width: 200, crop: 'thumb' }]
  })
  .then(uploadResult => {
    console.log(JSON.stringify(uploadResult, null, 1))
  })
  .catch(error => console.error(error))
