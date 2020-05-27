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
  { public_id: 'close-up-stop', resource_type: 'video' },
  { public_id: 'downhill', resource_type: 'video' },
  { public_id: 'hike-up', resource_type: 'video' },
  { public_id: 'hot-tub', resource_type: 'video' },
  { public_id: 'humpbackwhale_singing.webm.360p.vp9', resource_type: 'video' },
  { public_id: 'rooster', resource_type: 'video' },
  { public_id: 'rooster', resource_type: 'video' },
  { public_id: 'ski-lift', resource_type: 'video' },
  { public_id: 'sledding', resource_type: 'video' },
  { public_id: 'UnderwritersLaboratoryPsa', resource_type: 'video' },
  { public_id: 'wave', resource_type: 'video' }
]

for (const asset of assets) {
  destroyAsset(asset)
}
