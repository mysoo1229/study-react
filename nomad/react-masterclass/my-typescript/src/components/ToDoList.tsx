import React from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { toDoState } from "../atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

const Container = styled.div`
  padding: 20px;
`
const H1 = styled.h1`
  margin-bottom: 20px;
  font-size: 26px;
`;

const ResultList = styled.ul`
  margin-top: 30px;
`;

function ToDoList() {
  const toDos = useRecoilValue(toDoState);

  return (
    <Container>
      <H1>To-Dos</H1>
      <CreateToDo />
      <ResultList>
        {toDos.map(toDo => (
          <ToDo
            key={toDo.id}  
            {...toDo}
          />
        ))}
      </ResultList>
    </Container>
  );
}

export default ToDoList;
