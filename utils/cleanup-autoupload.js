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
  { public_id: 'remote-media/images/pineapple', resource_type: 'image' },
  { public_id: 'remote-media/images/dolphin', resource_type: 'image' },
  { public_id: 'remote-media/raw/data.json', resource_type: 'raw' },
  { public_id: 'remote-media/video/rooster', resource_type: 'video' },
  { public_id: 'remote-images/kiwi', resource_type: 'image' },
  { public_id: 'remote-media-secure/cherries', resource_type: 'image', type:'private' }
]

for (const asset of assets) {
  destroyAsset(asset)
}
