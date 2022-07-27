import React from "react";
import "./styles.css";
import CloudinaryVideoElement from "./video-element";
import VideoPlayer from "./video-player";
function App() {
 const cloudName = "cloudinary-training"
 const publicId = "rooster"
  return (
    <div className="App">
      <header className="App-header">
        <h2>Cloudinary Video</h2>
        <div className="container">
          <div>
            <h3>Cloudinary Video Element</h3>
            <CloudinaryVideoElement cloudName={cloudName}  publicId={publicId}/>
          </div>
          <div>
          <h3>Cloudinary Video Player (ABR)</h3>
            <VideoPlayer cloudName={cloudName} publicId={publicId} />
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;