import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { categoryState, toDoSelector, toDoState } from "../atoms";
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
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);

  const onInput = (event:React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value);
  };

  console.log(category);

  return (
    <Container>
      <H1>To-Dos</H1>
      <select onInput={onInput} value={category}>
        <option value="TO_DO">To Do</option>
        <option value="DOING">Doing</option>
        <option value="DONE">Done</option>
      </select>
      <CreateToDo />
      {/*category === "TO_DO" && toDo.map((aToDo => <ToDo key={aToDo.id} {...aToDo} />))}
      {category === "DOING" && doing.map((aToDo => <ToDo key={aToDo.id} {...aToDo} />))}
      {category === "DONE" && done.map((aToDo => <ToDo key={aToDo.id} {...aToDo} />))*/}

      {toDos?.map((todo => <ToDo key={todo.id} {...todo} />))}
    </Container>
  );
}

export default ToDoList;
