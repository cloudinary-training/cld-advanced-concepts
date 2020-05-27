require('dotenv').config()
const cloudinary = require('cloudinary').v2

cloudinary.api
  .create_streaming_profile('training_hd_h265', {
    display_name: 'Custom training h265',
    representations: [
      {
        transformation: [
          {
            width: 320,
            height: 240,
            video_codec: 'h265',
            bit_rate: '192k',
            crop: 'limit'
          }
        ]
      },
      {
        transformation: [
          {
            width: 480,
            height: 270,
            video_codec: 'h265',
            bit_rate: '800k',
            crop: 'limit'
          }
        ]
      },
      {
        transformation: [
          {
            width: 640,
            height: 360,
            video_codec: 'h265',
            bit_rate: '2m',
            crop: 'limit'
          }
        ]
      },
      {
        transformation: [
          {
            width: 960,
            height: 540,
            video_codec: 'h265',
            bit_rate: '3500k',
            crop: 'limit'
          }
        ]
      },
      {
        transformation: [
          {
            width: 1280,
            height: 720,
            video_codec: 'h265',
            bit_rate: '5500k',
            crop: 'limit'
          }
        ]
      }
    ]
  })
  .then(result => {
    console.log(result)
  })
  .catch(error => console.log(error))
