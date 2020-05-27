require('dotenv').config()
const cloudinary = require('cloudinary').v2


// const name = 'br_2m,c_limit,h_360,vc_h265,w_640/m4s'
// const name = 'br_800k,c_limit,h_270,vc_h265,w_480/m4s'

// const name = 'br_3500k,c_limit,h_540,vc_h265,w_960/m4s'
// const name = 'br_192k,c_limit,h_240,vc_h265,w_320/m4s'
// const name = 'br_5500k,c_limit,h_720,vc_h265,w_1280/m4s'
cloudinary.api
  .transformations()
  .then(result => {
    console.log(result)
    for (const xform of result.transformations) {
      if (xform.name.substring(xform.name.length - 1) === '/m4s') {
        cloudinary.api
          .delete_transformation(`${xform.name}`)
          .then(result => {
            console.log('removing transformation:', result)
          })
          .catch(error => {
            console.log(error)
          })
      } else {
        console.log('no delete')
      }
    }
  })
  .catch(error => {
    console.log(error)
  })
