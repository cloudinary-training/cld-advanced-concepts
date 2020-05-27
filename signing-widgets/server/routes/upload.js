const express = require('express')
const router = express.Router()
const signature = require('../modules/signupload')

// cloudinary credentials
const cloudinary = require('cloudinary').v2
const apiKey = cloudinary.config().api_key
const cloudName = cloudinary.config().cloud_name

router.get('/', function (req, res, next) {
  const sig = signature.signupload()
  res.render('upload', {
    title: 'Signed Upload',
    timestamp: sig.timestamp,
    signature: sig.signature,
    apikey: apiKey,
    cloudname: cloudName
  })
})
module.exports = router
