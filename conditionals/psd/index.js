require('dotenv').config()
const cloudinary = require('cloudinary').v2
const open = require('open')

function generateVaction(vacay) {
  const url = cloudinary.url('PSDtemplate', {
    transformation: [
      {
        variables: [['$vacay', `!${vacay}!`]]
      },
      {
        transformation: [
          { if: '$vacay_eq_!beach!' },
          { page: '2;8;10' },
          { width: 300, crop: 'scale' },

          { if: 'else' },
          { if: '$vacay_eq_!vegas!' },
          { page: '3;5;7;9' },
          { width: 300, crop: 'scale' },

          
          { if: 'else' },
          { if: '$vacay_eq_!mountains!' },
          { page: '4;8;11' },
          { width: 300, crop: 'scale' },

          { if: 'else' },
          { page: '10' },
          { width: 300, crop: 'scale' },
          { if: 'end' },

          { if: 'end' },
          { if: 'end' },
          { if: 'end' },

          {
            overlay: {
              font_family: 'Arial',
              font_size: 30,
              text: '%20%24%28vacay%29%20'
            },
            width: 50,
            color: 'orange',
            background: 'blue',
            gravity: 'north_west',
            x: 10,
            y: 20,
            dpr: 2.0
          },
          { secure_url: true, fetch_format: 'jpg' }
        ]
      }
    ]
  })
  console.log(url)
  open(url)
}

generateVaction('beach')
generateVaction('vegas')
generateVaction('mountains')
generateVaction('')
