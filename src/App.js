import { useState, useRef } from "react";
import "./App.css";
import CountdownTime from "./components/Countdown/Countdown";
import ramadan from "../src/assets/ramadan.mp4";
import song from "../src/assets/song.mp3";
import Footer from "./components/Footer/Footer";
import Loader from "./components/Loader/Loader";

function App() {
  const vidRef = useRef(null);
  const audRef = useRef(null);
  const showRef = useRef(null);
  const [mode, setMode] = useState("Play/Pause");
  const handlePlayVideo = () => {
    vidRef.current.play();
    audRef.current.play();
    setMode("Pause");
  };

  const handlePauseVideo = () => {
    vidRef.current.pause();
    audRef.current.pause();
    setMode("Play");
  };

  const handleToggleVideo = () =>
    vidRef.current.paused ? handlePlayVideo() : handlePauseVideo();

  return (
    <div className="App">
      <Loader showRef={showRef} />
      <div className="Content" ref={showRef}>
        <video
          ref={vidRef}
          src={ramadan}
          type="video/mp4"
          autoPlay
          muted
          loop
          id="myVideo"
        ></video>
        <audio
          ref={audRef}
          controls
          src={song}
          type="audio/mpeg"
          autoPlay
          loop
          id="song"
        ></audio>
        <div className="content">
          <CountdownTime handleToggleVideo={handleToggleVideo} mode={mode} />
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default App;
