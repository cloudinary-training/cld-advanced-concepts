require('dotenv').config()
const crypto = require('crypto')
const cloudinary = require('cloudinary').v2
const apiSecret = cloudinary.config().api_secret
const cloudname = cloudinary.config().cloud_name
const username = process.env.USER_NAME

const signmedialib = () => {
  const timestamp = new Date().getTime()
  const strtosign = `cloud_name=${cloudname}&timestamp=${timestamp}&username=${username}${apiSecret}`
  const signature = crypto
    .createHash('sha256')
    .update(strtosign)
    .digest('hex')
  return { signature, timestamp }
}

module.exports = {
  signmedialib
}
