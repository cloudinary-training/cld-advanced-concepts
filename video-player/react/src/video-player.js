import '../node_modules/cloudinary-video-player/dist/cld-video-player.min.css';
import React, { useRef, useEffect, useState } from 'react'

const VideoPlayer = ( props) => {
    console.log(props.cloudName, props.publicId)
    // debugger
  const videoEl = useRef();
  const [cloud] = useState(props.cloudName);
  const [id] = useState(props.publicId);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const scriptTag = document.createElement('script');
    scriptTag.src = 'https://unpkg.com/cloudinary-video-player@1.9.5/dist/cld-video-player.min.js';
    scriptTag.addEventListener('load', () => setLoaded(true));
    document.body.appendChild(scriptTag);
  }, []);

  useEffect(() => {
    if (!loaded) return;

    const videoPlayer = window.cloudinary.videoPlayer(videoEl.current, {
      cloud_name: cloud,
      muted: true,
      controls: true,
      width: '100%',
    });
    videoPlayer.source(id, {
      sourceTypes: ['dash', 'hls','mp4'],
    });
    }, [loaded,cloud,id]);

  return (
    <div className='mb-5 native-video-container'>
      <video
        className='cld-video-player cld-fluid'
        ref={videoEl}
        id='video-player'
      />
    </div>
  );
};
export default VideoPlayer;