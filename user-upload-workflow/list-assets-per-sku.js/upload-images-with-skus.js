require('dotenv').config()
const cloudinary = require('cloudinary').v2
const open = require('open')

// upload the same asset (same sku) with 2 views
const data = {
  description: 'Black Zebra Purse',
  sku: 'sku12345',
  assets: [
    './assets/images/black-purse-1.jpg',
    './assets/images/black-purse-2.jpg'
  ]
}
for (const asset of data.assets) {
  cloudinary.uploader
    .upload(asset, {
      use_filename: true,
      unique_filename: false,
      tags: data.sku
    })
    .then(uploadResult => {
      console.log(uploadResult)
      open(uploadResult.secure_url)
    })
    .catch(error => console.error(error))
}
