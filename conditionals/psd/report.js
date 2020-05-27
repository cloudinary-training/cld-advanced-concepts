require('dotenv').config()
const cloudinary = require('cloudinary').v2
const open = require('open')

function report(publicId) {
  const url = cloudinary.url(publicId, {
    transformation: [
      {
        variables: [
          ['$img', 'current:public_id'],
          ['$pagecount', 'pc'],
          ['$currentpage', 'cp']
        ]
      },
      { width: 400, opacity: '10' },
      { if: 'pc_gte_5' },
      {
        transformation: [
          {
            overlay: {
              font_family: 'Arial',
              font_size: 30,
              text: 'current layer: %24%28currentpage%29'
            },
            gravity: 'north_west',
            color: 'red',
            x: '20',
            y: '20',
            width: '100'
          },
          {
            overlay: '%24img',
            page: '5-5',
            width: 100,
            gravity: 'north_east'
          },
          {
            overlay: '%24img',
            page: '3-3',
            width: 100,
            gravity: 'south_east'
          },
          {
            overlay: {
              font_family: 'Arial',
              font_size: 30,
              text: 'total layers in PSD: %24%28pagecount%29'
            },
            gravity: 'north_west',
            color: 'black',
            x: '20',
            y: '40',
            width: '100'
          },
          {
            overlay: {
              font_family: 'Arial',
              font_size: 30,
              text: 'upper right: layer 2'
            },
            gravity: 'north_west',
            color: 'black',
            x: '20',
            y: '60',
            width: '100'
          },
          {
            overlay: {
              font_family: 'Arial',
              font_size: 30,
              text: 'bottom right: layer 3'
            },
            gravity: 'north_west',
            color: 'black',
            x: '20',
            y: '80',
            width: '100'
          }
        ]
      },
      { if: 'end' },

      { if: 'else' },
      {
        overlay: {
          font_family: 'Arial',
          font_size: 30,
          color: 'black',
          text: 'page count < than 5'
        },
        gravity: 'north_west',
        x: '20',
        y: '20',
        width: '100'
      },
      {
        overlay: {
          font_family: 'Arial',
          font_size: 30,
          color: 'black',
          text: 'total layers in PSD: %24%28pagecount%29'
        },
        gravity: 'north_west',
        x: '20',
        y: '40',
        width: '100'
      },
      { if: 'end' },

      { page: '1' },
      { secure_url: true, fetch_format: 'jpg' }
    ]
  })
  return url
}
const urlStrawberries = report('strawberries')
console.log(urlStrawberries)
open(urlStrawberries)

const urlCldSample = report('cld-sample-psd')
console.log(urlCldSample)
open(urlCldSample)

