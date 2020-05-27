require('dotenv').config()
const cloudinary = require('cloudinary').v2

// if you want to test a large video, download the video here: https://archive.org/details/bacteria_friend_and_foe
// and upload to your github account and push to the cloud

const upOptions = {
  resource_type: 'video',
  eager: [
    { streaming_profile: 'hd', format: 'm3u8' },
    { streaming_profile: 'hd', format: 'mpd' }],
  eager_async: true,
  eager_notification_url: 'https://webhook.site/49bd713a-f6e8-4c43-95d9-955d27f4acf4',
  public_id: 'bacteria',
  invalidate: true
}
cloudinary.uploader.upload('https://res.cloudinary.com/cloudinary-training/video/upload/v1584917583/video-for-training/bacteria_friend_and_foe_512kb.mp4', upOptions)
  .then(result => {
    console.log(result)
  })
  .then(error => {
    console.log(error)
  })
