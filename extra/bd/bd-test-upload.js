require('dotenv').config()
const cloudinary = require('cloudinary').v2

cloudinary.uploader.upload("./assets/video/hike-up.mp4", 
{resource_type: "video",
eager: [
{ streaming_profile: 'training_hd_vp9', format: 'mpd' },
{ streaming_profile: 'training_hd_h264', format: 'm3u8' },
{ streaming_profile: 'training_hd_h265', format: 'm3u8' }
],
eager_async: true,
public_id: "hikeupx",
overwrite: true}
);