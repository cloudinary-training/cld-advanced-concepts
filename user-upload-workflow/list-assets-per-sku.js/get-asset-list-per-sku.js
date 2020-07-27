require('dotenv').config()
// const  = require('cloudinary').v2
const open = require('open')

const data = {
  sku: 'sku12345'
}
const api = `https://res.cloudinary.com/cloudinary-training/image/list/${data.sku}.json`
console.log(api)
open(api)
