import React, { useRef } from 'react';
import { AdvancedVideo } from '@cloudinary/react';
import { CloudinaryVideo } from '@cloudinary/url-gen';


const CloudinaryVideoElement = (props) => {
  const videoEl = useRef();
  const video = new CloudinaryVideo(props.publicId,{cloudName:props.cloudName,analytics:false});
  video.format('auto').quality('auto')
  return <AdvancedVideo cldVid={video} width='100%' ref={videoEl} controls />;
};
export default CloudinaryVideoElement;