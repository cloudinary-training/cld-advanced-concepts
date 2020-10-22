require('dotenv').config()
const cloudinary = require('cloudinary').v2
const open = require('open')

const url = cloudinary.url('1px', {
  transformation: [
    {
      variables: [
        ['$imgw', '800'],
        ['$ftile', '$imgw / 3'],
        ['$tile', '$ftile to i'],
        ['$fontw', '$imgw / 4'],
        ['$img1', '!kiwi!'],
        ['$img2', '!blackberry!'],
        ['$img3', '!strawberry!'],
        ['$img4', '!pineapple!'],
        ['$img5', '!cherries!'],
        ['$img6', '!grapes!'],
        ['$title', '!Fruit!']
      ]
    },
    {
      transformation: [
        'grid-maker',
        {quality: 'auto', fetch_format: 'auto' }
      ]
    }
  ]
})

console.log(url)
open(url)

// https://res.cloudinary.com/sep-2020-test/image/upload/$imgw_800,$ftile_$imgw_div_3,$tile_$ftile_to_i,$fontw_$imgw_div_4,$img1_!kiwi!,$img2_!blackberry!,$img3_!strawberry!,$img4_!pineapple!,$img5_!cherries!,$img6_!grapes!,$title_!Fruit!/t_grid-maker/c_scale,dpr_auto,w_auto/1px