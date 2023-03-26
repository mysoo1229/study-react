import React from 'react';
import styled from "styled-components";

interface ContainerProps {
  bgColor: string;
  borderColor: string;
}

const Container = styled.div<ContainerProps>`
  width: 200px;
  height: 200px;
  border-radius: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.bgColor};
  border: 4px solid ${(props) => props.borderColor};
`;

interface CircleProps {
  bgColor: string;
  borderColor?: string;
  text?: string;
}

function Circle({ bgColor, borderColor, text = "default text"}: CircleProps) {
  return (
    <Container
      bgColor={bgColor}
      borderColor={borderColor || bgColor}
    >
      {text}
    </Container>
  );
};

export default Circle;



interface PlayerShape {
  name: string;
  age: number
}

const sayHello = (playerObj: PlayerShape) => `Hello ${playerObj.name} you are ${playerObj.age} years old`;

sayHello({name:"kyk", age:35});
