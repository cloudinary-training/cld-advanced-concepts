const express = require('express')
const router = express.Router()
const signature = require('../modules/signml')

// cloudinary credentials
const cloudinary = require('cloudinary').v2
const apiKey = cloudinary.config().api_key
const cloudName = cloudinary.config().cloud_name

router.get('/', function (req, res, next) {
  const sig = signature.signmedialib()
  res.render('ml', {
    title: 'Media Library Signed',
    timestamp: sig.timestamp,
    signature: sig.signature,
    username: process.env.USER_NAME,
    apikey: apiKey,
    cloudname: cloudName
  })
})
module.exports = router
