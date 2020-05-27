require('dotenv').config()
const cloudinary = require('cloudinary').v2

// create dash/vp9 (chrome/ff), hls/h265(apple), hls/h264 (universal) custom profiles
const upOptions = {
  resource_type: 'video',
  eager: [
    { streaming_profile: 'training_hd_vp9', format: 'mpd' },
    { streaming_profile: 'training_hd_h264', format: 'm3u8' },
    { streaming_profile: 'training_hd_h265', format: 'm3u8' }
  ],
  eager_async: true,
  eager_notification_url:
    'https://webhook.site/17a3d46c-5d18-46b0-ab6c-94b12d7f645c',
  public_id: 'whale',
  invalidate: true
}
cloudinary.uploader
  .upload('./assets/video/humpbackwhale_singing.webm.360p.vp9.webm', upOptions)
  .then(result => {
    console.log(result)
  })
  .catch(error => {
    console.log(error)
  })
