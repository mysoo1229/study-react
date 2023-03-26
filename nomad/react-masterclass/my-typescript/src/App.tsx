import React from 'react';
import ReactDOM from 'react-dom/client';
import styled from "styled-components";
import Circle from './Circle';

function App() {
  return (
    <div>
      <Circle bgColor="teal" borderColor="yellow" />
      <Circle bgColor="tomato" text="i'm here" />
    </div>
  );
}

export default App;
