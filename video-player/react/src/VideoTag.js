import React from 'react'
import { Video, Transformation, CloudinaryContext } from 'cloudinary-react'
function VideoTag(props) {
  const cloudName = props.cloudName;
  return (
    <CloudinaryContext cloudName={cloudName}>
      <Video publicId="rooster" width="320" crop="fit" controls muted>
        <Transformation
          overlay="text:arial_100_bold:Rooster"
          color="yellow"
          gravity="north_east"
          y="20"
        />
      </Video>
    </CloudinaryContext>
  )
}

export default VideoTag
