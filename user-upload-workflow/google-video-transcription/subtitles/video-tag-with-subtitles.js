require('dotenv').config()
const cloudinary = require('cloudinary').v2

const video = cloudinary.video('ul-video', {
  overlay: {
    public_id: 'subtitles:ul-video.srt'
  },
  controls: true,
  background: 'black',
  color: 'yellow',
  gravity: 'north'
})

console.log(video)
