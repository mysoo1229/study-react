import { useEffect, useState } from "react";

function App() {
  const [counter, setValue] = useState(0);
  const onClick = () => setValue(prev => prev + 1);
  const [keyword, setKeyword] = useState("");
  const onChange = (event) => setKeyword(event.target.value);

  // console.log('i run all the time');

  useEffect(() => {
    console.log('i run only once (api)')
  }, []);

  useEffect(() => {
    if (keyword !== "") {
      console.log('i run when KEYWORD changes');
    }
  }, [keyword]);

  useEffect(() => {
    console.log('i run when COUNTER changes')
  }, [counter]);

  useEffect(() => {
    console.log('i run when KEYWORD & COUNTER changes')
  }, [keyword, counter]);

  return (
    <div>
      <input
        value={keyword}
        onChange={onChange}
        type="text"
        placeholder="Search here"
      />
      <h1>{counter}</h1>
      <button onClick={onClick}>Click me</button>
    </div>
  );
}

export default App;
