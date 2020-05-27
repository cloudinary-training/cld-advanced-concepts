document.addEventListener('DOMContentLoaded', async () => {
  const response = await fetch('/api/signml')
  const data = await response.json()

  const options = {
    cloud_name: data.cloudname,
    api_key: data.apikey,
    username: data.username,
    timestamp: data.timestamp,
    signature: data.signature,
    button_class: 'ml-btn',
    button_caption: 'Open Media Library',
    insert_transformation: true
  }

  const insertHandler = data => {
    data.assets.forEach(asset =>
      console.log('Inserted asset:', JSON.stringify(asset, null, 1))
    )
  }
  window.cloudinary.createMediaLibrary(
    options,
    insertHandler,
    '#ml-button'
  )
})
