import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import styled from "styled-components";

function App() {
  const [value, setValue] = useState("");
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;

    // = event.currentTarget.value

    //왜 이렇게 쓰는가? 변수를 여러개 쓸땐 아래처럼 쓸 수도 있다
    const value = event.currentTarget.value;
    const tagName = event.currentTarget.tagName;
    const width = event.currentTarget.width;
    const id = event.currentTarget.id;

    const {
      currentTarget: {value, tagName, width, id}
    } = event;

    // 만약 event 안에 바로 있는 변수를 쓴다면
    const x = event.x
    const y = event.y

    const {x, y} = event;

    setValue(value);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Hello", value);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={value}
          onChange={onChange}
          type="text"
          placeholder="username"
        />
        <button>Log in</button>
      </form>
    </div>
  );
}

export default App;
