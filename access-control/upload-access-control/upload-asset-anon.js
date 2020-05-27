require('dotenv').config()
const cloudinary = require('cloudinary').v2
const open = require('open')
const moment = require('moment')

const addDays = days => {
  return moment()
    .add(days, 'days')
    .toISOString()
}
// start this 45 seconds later
const addSeconds = seconds => {
  console.log(new Date())
  return moment().add(seconds, 'seconds').toISOString()
}
// set to expire after 7 days

const enddate = addDays(7)
const startdate = addSeconds(45)
console.log('oneweekfromtoday', enddate)
console.log('45 seconds from now', startdate)

cloudinary.uploader
  .upload('./assets/images/koi.jpg', {
    public_id: 'koi',
    type: 'upload',
    overwrite: true,
    invalidate: true,
    access_control: [
      { access_type: 'anonymous', start: startdate, end: enddate }
    ]
  })
  .then(uploadResult => {
    console.log(uploadResult)
    const url = uploadResult.secure_url
    open(url)
  })
  .catch(error => console.error(error))
