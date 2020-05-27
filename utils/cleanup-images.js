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
    .catch(error => {
      console.log('failed: ', asset.public_id)
      console.error(error)
    })
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
  { public_id: 'art-creative-graffiti', resource_type: 'image' },
  { public_id: 'banana', resource_type: 'image' },
  { public_id: 'baseball-cap', resource_type: 'image' },
  { public_id: 'big-glasses', resource_type: 'image' },
  { public_id: 'bird-close-up', resource_type: 'image' },
  { public_id: 'black-purse-1', resource_type: 'image' },
  { public_id: 'black-purse-2', resource_type: 'image' },
  { public_id: 'blackberry', resource_type: 'image' },
  { public_id: 'blue-chair', resource_type: 'image' },
  { public_id: 'blurry-image', resource_type: 'image' },
  { public_id: 'cc0', resource_type: 'image' },
  { public_id: 'jellyfish', resource_type: 'image' },
  { public_id: 'koi', resource_type: 'image' },
  { public_id: 'dolphin', resource_type: 'image', type: 'authenticated' },
  { public_id: 'goldfish', resource_type: 'image', type: 'private' },
  { public_id: 'killer-whale', resource_type: 'image' },
  { public_id: 'shark', resource_type: 'image' },
  { public_id: 'cc0', resource_type: 'image' },
  { public_id: 'ccby', resource_type: 'image' },
  { public_id: 'ccbynd', resource_type: 'image' },
  { public_id: 'ccbysa', resource_type: 'image' },
  { public_id: 'chalkboard', resource_type: 'image' },
  { public_id: 'clear-river', resource_type: 'image' },
  { public_id: 'cloudinary-logo', resource_type: 'image' },
  { public_id: 'dolphin', resource_type: 'image' },
  { public_id: 'fishing-boat', resource_type: 'image' },
  { public_id: 'forest-reflection', resource_type: 'image' },
  { public_id: 'funny-cow', resource_type: 'image' },
  { public_id: 'goldfish', resource_type: 'image' },
  { public_id: 'gray-surface', resource_type: 'image' },
  { public_id: 'image-from-tv', resource_type: 'image' },
  { public_id: 'jellyfish', resource_type: 'image' },
  { public_id: 'killer-whale', resource_type: 'image' },
  { public_id: 'kiwi', resource_type: 'image' },
  { public_id: 'koi', resource_type: 'image' },
  { public_id: 'lion-head', resource_type: 'image' },
  { public_id: 'logo-big', resource_type: 'image' },
  { public_id: 'mask-green', resource_type: 'image' },
  { public_id: 'modern-art', resource_type: 'image' },
  { public_id: 'orange', resource_type: 'image' },
  { public_id: 'pineapple', resource_type: 'image' },
  { public_id: 'sample', resource_type: 'image' },
  { public_id: 'shark', resource_type: 'image' },
  { public_id: 'shell', resource_type: 'image' },
  { public_id: 'snowboard', resource_type: 'image' },
  { public_id: 'special-fish', resource_type: 'image' },
  { public_id: 'strawberry', resource_type: 'image' },
  { public_id: 'tiger-lilly', resource_type: 'image' },
  { public_id: 'yellow-shoes', resource_type: 'image' }
]

for (const asset of assets) {
  destroyAsset(asset)
}
