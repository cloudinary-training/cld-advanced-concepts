require('dotenv').config()
const cloudinary = require('cloudinary').v2

const assets = [
  './assets/images/dolphin.jpg',
  './assets/images/goldfish.jpg',
  './assets/images/koi.jpg',
  './assets/images/shark.jpg',
  './assets/images/killer-whale.jpg'
]
for (const asset of assets) {
  cloudinary.uploader
    .upload(asset, {
      upload_preset: 'sea-life-preset'
    })
    .then(uploadResult => console.log(uploadResult))
    .catch(error => console.error(error))
}
