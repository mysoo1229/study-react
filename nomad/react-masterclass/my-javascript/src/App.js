import { useRef } from "react";

const useFullscrean = (callback) => {
  const element = useRef();

  const enterFullscreen = () => {
    if (element.current) {
      element.current.requestFullscreen();

      if (callback && typeof callback === "function") {
        callback(true);
      }
    }
  };

  const exitFullscreen = () => {
    document.exitFullscreen();

    if (callback && typeof callback === "function") {
      callback(false);
    }
  };

  return { element, enterFullscreen, exitFullscreen};
};

const App = () => {
  const onFullscreen = (isFull) => {
    console.log(isFull ? "full" : "small");
  }
  const { element, enterFullscreen, exitFullscreen } = useFullscrean(onFullscreen);

  return (
    <div className="App">
      <div ref={element}>
        <img src="http://trimg.interpark.com/g/r/d/0/2023/5/22/20a3abd5752bc4901a1830a29f860920.jpg" alt="" />
        <button onClick={exitFullscreen}>Exit Fullscreen</button>
      </div>
      <button onClick={enterFullscreen}>EnterFullscreen</button>
    </div>
  );
};

export default App;
