const express = require('express')
const router = express.Router()
const signature = require('../modules/signml')

const cloudinary = require('cloudinary').v2
const cloudName = cloudinary.config().cloud_name
const apiKey = cloudinary.config().api_key
const username = process.env.USER_NAME

// using this API should require authentication
router.get('/', function (req, res, next) {
  const sig = signature.signmedialib()
  res.json({
    signature: sig.signature,
    timestamp: sig.timestamp,
    cloudname: cloudName,
    apikey: apiKey,
    username: username
  })
})
module.exports = router
