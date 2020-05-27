require('dotenv').config()
const cloudinary = require('cloudinary').v2

// license value gets added as tag and context
const uploadImage = async filename => {
  console.log(filename)
  try {
    const response = await cloudinary.uploader.upload(filename, {
      upload_preset: 'photo-share'
    })
    const publicId = response.public_id
    console.log(`uploaded: ${publicId}`)
    return response.public_id
  } catch (error) {
    console.log('uploadImage error', JSON.stringify(error, null, 1))
    throw new Error(error)
  }
}

const photos = ['./assets/images/dolphin.jpg', './assets/images/goldfish.jpg']
for (const photo of photos) {
  uploadImage(photo)
}
