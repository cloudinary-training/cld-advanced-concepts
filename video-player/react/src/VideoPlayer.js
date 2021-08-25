import React, { useEffect } from "react";
import { Cloudinary } from "cloudinary-core";
import "cloudinary-video-player/dist/cld-video-player.light.min";
import "cloudinary-video-player/dist/cld-video-player.light.min.css";

function VideoPlayer(props) {
  const cloudinary = new Cloudinary({
    cloud_name: props.cloudName,
    secure: true,
  });
  const videoPlayerInit = () => {
    cloudinary.videoPlayer(document.querySelector(".fn-video"), {
      publicId: "rooster",
      fluid: true,
      autoplay: false,
      muted: true,
      controls: true,
      transformation: [
        { width: 320, crop: 'fit' },
        {
          overlay: 'video-logo',
          format: 'png',
          width: 100,
          effect: "replace_color:white",
          gravity: 'north_east',
          x: 5,
          y: 5
        }
      ]
    });
  
  
  };
  useEffect(() => {
    return (videoPlayerInit());
  });
  return (
      <video className="fn-video" />
  );
}

export default VideoPlayer;
