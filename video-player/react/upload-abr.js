require('dotenv').config()
const cloudinary = require('cloudinary').v2

// create dash/vp9 (chrome/ff), hls/h265(apple), hls/h264 (universal) custom profiles
const upOptions = {
    resource_type: "video",
    type: "upload",
    eager: [
        {
            streaming_profile: "full_hd_wifi",
            format: "m3u8",
        },
        {
            streaming_profile: "full_hd_wifi_h265",
            format: "m3u8",
        },
        {
            streaming_profile: "full_hd_wifi_vp9",
            format: "mpd",
        },
    ],
    eager_async: true,
    eager_notification_url:
        "https://webhook.site/4088592a-f25f-485b-adcb-3b321881e87b",
    invalidate: true
}
cloudinary.uploader
    .explicit('rooster', upOptions)
    .then(result => {
        console.log(result)
    })
    .catch(error => {
        console.log(error)
    })
