require('dotenv').config()
const cloudinary = require('cloudinary').v2

const open = require('open')

const url = cloudinary.url('shell', {
  sign_url: true,
  transformation: [
    {
      custom_function: {
        function_type: 'remote',
        source: 'https://secure-caverns-90265.herokuapp.com/api/file'
      }
    },
    { border: '15px_solid_coral' }
  ]
})
console.log(url)
open(url)
