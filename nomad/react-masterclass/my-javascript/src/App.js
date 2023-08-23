import { useEffect, useRef } from "react";

const useFadeIn = (duration = .5, delay = 0) => {
  const element = useRef();

  useEffect(() => {
    if (typeof duration !== 'number' || typeof delay !== 'number') {
      return;
    }

    if (element.current) {
      const { current } = element;
      current.style.transition = `opacity ${duration}s ease ${delay}s`;
      current.style.opacity = 1;
    }
  }, []);

  return {
    ref: element,
    style: {opacity: 0}
  }
};

const App = () => {
  const fadeInH1 = useFadeIn(2, 1);
  const fadeInP = useFadeIn(1, 3);

  return (
    <div className="App">
      <h1 {...fadeInH1}>Hello</h1>
      <p {...fadeInP}>I wanna go home.</p>
    </div>
  );
};

export default App;
