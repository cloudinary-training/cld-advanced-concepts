require('dotenv').config()
const cloudinary = require('cloudinary').v2
const open = require('open')

function mountArt(publicId) {
  const url = cloudinary.url(publicId, {
    transformation: [
      {
        variables: [
          ['$w', '700'],
          ['$h', '500'],
          ['$dp', '20'],
          ['$wadp', '$w + $dp'],
          ['$hadp', '$h + $dp']
        ]
      },
      { width: '$w', height: '$h', crop: 'fill' },
      {
        width: '$w',
        height: '$h',
        overlay: publicId,
        opacity: 60,
        border: '1px_solid_rgb:FFFFFF',
        crop: 'fill'
      },
      { width: '$dp', height: '$h', gravity: 'east', crop: 'crop' },
      { angle: 'hflip' },
      { effect: 'distort:0:0:$dp:$dp:$dp:$hadp:0:$h' },
      { x: '$dp * -1', gravity: 'north_east', flags: 'layer_apply' },
      {
        width: '$w',
        height: '$h',
        overlay: publicId,
        opacity: 60,
        border: '1px_solid_rgb:FFFFFF',
        crop: 'fill'
      },
      { width: '$w', height: '$dp', gravity: 'south', crop: 'crop' },
      { angle: 'vflip' },
      { effect: 'distort:0:0:$w:0:$wadp:$dp:$dp:$dp' },
      { gravity: 'south', flags: 'layer_apply' },
      { quality: 'auto', fetch_format: 'auto' }
    ]
  })
  open(url)
}

const art = ['modern-art', 'snowboard']
for (const publicId of art) {
  mountArt(publicId)
}

// https://res.cloudinary.com/cloudinary-training/image/upload/$w_300,$h_500,$depth_10,$wadp_$w_add_$depth,$hadp_$h_add_$depth/w_$w,h_$h,c_fill/w_$w,h_$h,c_fill,l_modern-art,o_60,bo_1px_solid_rgb:FFFFFF/w_$depth,h_$h,c_crop,g_east/a_hflip/e_distort:0:0:$depth:$depth:$depth:$hadp:0:$h/x_$depth_mul_-1,g_north_east,fl_layer_apply/w_$w,h_$h,c_fill,l_modern-art,o_60,bo_1px_solid_rgb:FFFFFF/w_$w,h_$depth,c_crop,g_south/a_vflip/e_distort:0:0:$w:0:$wadp:$depth:$depth:$depth/g_south,fl_layer_apply/f_auto,q_auto/modern-art.jpg
