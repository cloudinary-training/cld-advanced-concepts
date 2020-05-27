// https://res.cloudinary.com/tamas-demo/image/upload/
// q_auto,f_auto/

// bo_3px_solid_white,c_fill,w_300,h_300,g_face/
// l_text:Impact_60_stroke:LINKEDIN,co_white,g_south,y_10/

// bo_3px_solid_white,c_fill,l_big-glasses,w_300,h_300,x_300/
// l_text:Impact_60_stroke:FACEBOOK,co_white,g_south,x_150,y_10/

// bo_3px_solid_white,c_fill,l_funny-cow,w_300,h_300,x_-150,y_300/
// l_text:Impact_60_stroke:INSTAGRAM,co_white,g_south,x_-150,y_10/

// bo_3px_solid_white,c_fill,l_bird-close-up,w_300,h_300,x_150,y_150/
// l_text:Impact_60_stroke:TINDER,co_white,g_south,x_150,y_10/
// lion-head

// https://blog.fullstacktraining.com/creating-memes-with-cloudinary/
require('dotenv').config()
const cloudinary = require('cloudinary').v2
const open = require('open')

// add 1st image
const url = cloudinary.url('lion-head', {
  transformation: [
    {
      border: '3px_solid_white',
      crop: 'fill',
      width: 300,
      height: 300,
      gravity: 'center'
    },
    {
      quality: 'auto',
      fetch_format: 'auto'
    }
  ]
})

console.log(url)
open(url)
