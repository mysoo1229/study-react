import React from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { toDoSelector, toDoState } from "../atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

const Container = styled.div`
  padding: 20px;
`
const H1 = styled.h1`
  margin-bottom: 20px;
  font-size: 26px;
`;
const H2 = styled.h2`
  margin-top: 20px;
  font-size: 22px;
`;

const ResultList = styled.ul`
  margin-top: 30px;
`;

function ToDoList() {
  // const toDos = useRecoilValue(toDoState);
  // const selectorOutput = useRecoilValue(toDoSelector);
  // console.log(selectorOutput);

  const [toDo, doing, done] = useRecoilValue(toDoSelector)

  return (
    <Container>
      <H1>To-Dos</H1>
      <CreateToDo />
      <H2>To Do</H2>
      <ResultList>
        {toDo.map(toDo => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </ResultList>
      <H2>Doing</H2>
      <ResultList>
        {doing.map(toDo => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </ResultList>
      <H2>DONE</H2>
      <ResultList>
        {done.map(toDo => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </ResultList>
    </Container>
  );
}

export default ToDoList;
