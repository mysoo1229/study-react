import { useState } from "react";

const useInput = (initialVlaue, validator) => {
  const [value, setValue] = useState(initialVlaue);
  const onChange = event => {
    const {
      target: { value }
    } = event;

    let willUpdate = true;

    if (typeof validator === 'function') {
      willUpdate = validator(value);
    }

    if (willUpdate) {
      setValue(value);
    }
  }
  return { value, onChange };
};

function App() {
  // const maxLength = (value) => value.length < 10;
  const maxLength = (value) => !value.includes("@");
  const name = useInput("Ms.", maxLength);
  return (
    <div className="App">
      <h1>Hooks</h1>
      <input placeholder="Name" {...name} />
    </div>
  );
}

export default App;
