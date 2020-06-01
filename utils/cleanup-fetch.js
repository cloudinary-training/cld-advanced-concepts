require('dotenv').config()
const cloudinary = require('cloudinary').v2

function destroyAsset(asset) {
  console.log('destroy asset', asset.public_id)
  const type = `${asset.type ? asset.type : 'upload'}`
  console.log('type', type)
  cloudinary.uploader
    .destroy(asset.public_id, {
      invalidate: true,
      type: type,
      resource_type: asset.resource_type
    })
    .then(result => {
      console.log('removing: ', asset.public_id)
      console.log(result)
    })
    .catch(error => console.error(error))
}

function deletePublicIds(publicIds) {
  cloudinary.api
    .delete_resources(publicIds)
    .then(result => {
      console.log(result)
    })
    .catch(error => console.error(error))
}

const assets = [
  {
    public_id:
      'https://cloudinary-training.github.io/cld-advanced-concepts/assets/images/oranges.jpg',
    resource_type: 'image',
    type: 'fetch'
  },
  {
    public_id:
      'https://cloudinary-training.github.io/cld-advanced-concepts/assets/images/cc0.png',
    resource_type: 'image',
    type: 'fetch'
  },
  {
    public_id:
      'https://cloudinary-training.github.io/cld-advanced-concepts/assets/images/strawberry.png',
    resource_type: 'image',
    type: 'fetch'
  }
]


for (const asset of assets) {
  destroyAsset(asset)
}

