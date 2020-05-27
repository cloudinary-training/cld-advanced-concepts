require('dotenv').config()
const cloudinary = require('cloudinary').v2
const open = require('open')

// open(
//   'https://res.cloudinary.com/cloudinary-training/image/upload/strawberries.jpg'
// )
// open(
//   'https://res.cloudinary.com/cloudinary-training/image/upload/strawberries.png'
// )

const url = cloudinary.url('strawberries', {
  transformation: [
    {
      variables: [['$img', 'current:public_id']]
    },
    {
      page: '3-3',
      width: '500'
    },
    {
      underlay: {
        public_id: '$img'
      },
      page: '2-2',
      width: '500',
      effect: 'colorize:50',
      color: 'red'
    },
    { fetch_format: 'jpg', secure_url: true }
  ]
})
console.log(url)
open(url)

// Cloudinary::Api.create_transformation("shadow_color","$img_current:public_id/pg_3-3,w_500/u_$img,pg_2-2,e_colorize:50,co_red,w_500/f_jpg")
