import { useEffect, useRef, useState } from "react";

const useClick = (onClick) => {
  const element = useRef();
  useEffect(() => {
    if (typeof onClick !== "function") {
      return;
    }

    if (element.current) {
      element.current.addEventListener("click", onClick);
    }
    return () => { //when component will unmount, you have clean up
      if (element.current) {
        element.current.removeEventListener("click", onClick);
      }
    };
  }, []);
  return element;
};

const App = () => {
  const sayHello = () => console.log('hello');
  const heading = useClick(sayHello);

  return (
    <div className="App">
      <h1 ref={heading}>Hi</h1>
    </div>
  );
}

export default App;
