import { useEffect, useState } from "react";

function App() {
  const [number1, setNumber1] = useState(0);
  const [number2, setNumber2] = useState(0);
  const sayHello = () => console.log('hello');
  // useEffect(sayHello, [number1]); //number1이 바뀔때만 executed
  useEffect(sayHello, []); //맨 처음에 render했을때만 executed

  return (
    <div className="App">
      <button onClick={() => setNumber1(number1 + 1)}>{number1}</button>
      <button onClick={() => setNumber2(number2 + 1)}>{number2}</button>
    </div>
  );
}

export default App;
