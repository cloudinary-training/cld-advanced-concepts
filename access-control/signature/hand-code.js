// docs: https://cloudinary.com/documentation/upload_images#update_already_uploaded_images
// test public_id is dolphin which is authenticated
require('dotenv').config()
const cloudinary = require('cloudinary').v2

// extract signing information from env
const cloudname = cloudinary.config().cloud_name
const secret = cloudinary.config().api_secret

const crypto = require('crypto')
const URLSafeBase64 = require('urlsafe-base64')
const open = require('open')

// dolphin is authenticated
// hand coded signature
const transformation = 'c_limit,h_400,w_400'
const publicId = 'dolphin'

const toSign = [transformation, publicId].join('/') + secret

const s = URLSafeBase64.encode(
  crypto
    .createHash('sha1')
    .update(toSign)
    .digest()
).slice(0, 8)

const signature = 's--' + s + '--'
const url = [
  `https://res.cloudinary.com/${cloudname}/image/authenticated`,
  signature,
  transformation,
  publicId
].join('/')
console.log('hand code:', url)
open(url)
