require('dotenv').config()
const cloudinary = require('cloudinary').v2

const upOptions =
{
  resource_type: 'video',
  eager: [
    { streaming_profile: 'hd', format: 'm3u8' },
    { streaming_profile: 'hd', format: 'mpd' }],
  eager_async: true,
  eager_notification_url: 'https://webhook.site/17a3d46c-5d18-46b0-ab6c-94b12d7f645c',
  public_id: 'whale',
  invalidate: true
}
cloudinary.uploader.upload('./assets/video/humpbackwhale_singing.webm.360p.vp9.webm', upOptions)
  .then(result => {
    console.log(result)
  })
  .catch(error => {
    console.log(error)
  })
