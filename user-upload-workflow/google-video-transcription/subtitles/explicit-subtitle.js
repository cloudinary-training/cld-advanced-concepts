require('dotenv').config()
const cloudinary = require('cloudinary').v2

const upOptions = {
  resource_type: "video",
  type: "upload",
  eager: [
    { raw_transformation: "b_black,co_yellow,g_north,l_subtitles:ul-video.srt,f_webm"},
    { raw_transformation: "b_black,co_yellow,g_north,l_subtitles:ul-video.srt,f_mp4"}, 
    { raw_transformation: "b_black,co_yellow,g_north,l_subtitles:ul-video.srt,f_ogg"},

  ],
  eager_async: true,
  eager_notification_url:
    "https://webhook.site/0b500683-d59a-499e-a275-234b14ac7f52",
  public_id: "ul-video",
  invalidate: true,
};

cloudinary.uploader
  .explicit('ul-video3', upOptions)
  .then(result => {
    console.log(JSON.stringify(result, null, 1))
  })
  .catch(error => console.error(error))
