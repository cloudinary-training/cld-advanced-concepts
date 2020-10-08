require('dotenv').config()
const cloudinary = require('cloudinary').v2

cloudinary.uploader.upload(
  'https://d2v9y0dukr6mq2.cloudfront.net/video/preview/EVNRHlVTlilwodq1m/videoblocks-aerial-drone-shot-flying-down-highway-into-utah-past-state-border-sign_hcbvusr4m__SB_PM.mp4',
  {
    resource_type: 'video',
    public_id: 'nature004',
    tags: 'nature',
    eager_async: 'true',
    eager: [
      {
        format: 'm3u8',
        width: 960,
        height: 540,
        crop: 'limit',
        video_codec: 'h264:main:3.1',
        bit_rate: '3500k'
      }
    ],
    crop: 'fill',
    quality: 'auto',
    folder: 'Cloudinary-Partner-Training'
  }
)
.then(result => {
  console.log(result)
})
.catch(error => {
  console.log(error)
})

// secure_url: 'https://res.cloudinary.com/sep-2020-test/video/upload/br_3500k,c_limit,h_540,vc_h264:main:3.1,w_960/v1602181019/Cloudinary-Partner-Training/nature004.m3u8'