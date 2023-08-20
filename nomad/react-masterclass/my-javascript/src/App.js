import { useState } from "react";

const useInput = (initialVlaue) => {
  const [value, setValue] = useState(initialVlaue);
  const onChange = event => {
    const {
      target: { value }
    } = event;
    setValue(value);
  }
  return { value, onChange };
};

function App() {
  const name = useInput("Ms.");
  return (
    <div className="App">
      <h1>Hooks</h1>
      {/* <input placeholder="Name" value={name.value} onChange={namer.onChange} /> */}
      <input placeholder="Name" {...name} />
    </div>
  );
}

export default App;
