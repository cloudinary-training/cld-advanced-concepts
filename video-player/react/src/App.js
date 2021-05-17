import React from "react";
import "./styles.css";
import VideoTag from "./VideoTag";
import VideoPlayer from "./VideoPlayer";
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h2>Cloudinary Video</h2>
        <div className="container">
          <div>
            <h3>Cloudinary React Video</h3>
            <VideoTag cloudName="cloudinary-training" />
          </div>
          <div>
          <h3>Cloudinary Video Player</h3>
            <VideoPlayer cloudName="cloudinary-training" />
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
