require('dotenv').config()
const cloudinary = require('cloudinary').v2

async function removeFolders(folder) {
  try {
    const result = await cloudinary.api.delete_folder(folder)
    return result
  } catch (error) {
    console.log(error)
  }
}

;['remote-images', 'remote-media', 'remote-media-secure'].forEach(item => {
  const result = removeFolders(item)
  console.log('success', result)
})
