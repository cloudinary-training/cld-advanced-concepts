require('dotenv').config()
const cloudinary = require('cloudinary').v2
const open = require('open')

// object aware cropping https://cloudinary.com/documentation/cloudinary_ai_content_analysis_addon#object_aware_cropping
// https://cloudinary.com/documentation/cloudinary_ai_content_analysis_addon#supported_objects_and_categories
// set flag "Object detection using introspection" (support can do this)
// choose a detection model like human-anatomy
// upload a base image where we want to find a hand

function upload() {
  cloudinary.uploader
    .upload(
      'https://images.pexels.com/photos/1701200/pexels-photo-1701200.jpeg',
      { detection: 'human-anatomy', public_id: 'male-dancer' }
    )
    .then(result => {
      console.log(JSON.stringify(result.info.detection, null, 2))
      //upload an overlay
      cloudinary.uploader
        .upload(
          'https://images.pexels.com/photos/47856/rolex-wrist-watch-clock-gmt-47856.jpeg',
          {
            public_id: 'watch',
            background_removal: 'cloudinary_ai',
            notification_url:
              'https://webhook.site/2d13ff62-ec06-4495-925f-f2e2ddfbb409'
          }
        )
        .then(result => {
          console.log(result)
          // open(result.secure_url)
          //res.cloudinary.com/pictures77/image/upload/c_fill,h_1200,w_900,g_left-hand/l_watch-no-bg,w_50,x_80,y_-490,a_-42/male-dancer
          // open(url)
        })
        .catch(error => {
          console.log(error)
        })
    })
    .catch(error => {
      console.log(error)
    })
}

function createTransformation() {
  const url = cloudinary.url('male-dancer', {
    transformation: [
      {
        gravity: 'left-hand',
        width: '900',
        height: '1200',
        crop: 'fill'
      },
      {
        overlay: 'watch',
        width: 50,
        x: 80,
        y: -490,
        angle: -42
      }
    ]
  })
  console.log(url)
}

//check webhooks before running createTransformation

upload();
// createTransformation()
// https://res.cloudinary.com/dtmvrjb50/image/upload/c_fill,g_left-hand,h_1200,w_900/a_-42,l_watch,w_50,x_80,y_-490/male-dancer

