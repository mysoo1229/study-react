import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { Categories, categoryState, toDoSelector, toDoState } from "../atoms";
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
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);

  const onInput = (event:React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };
  
  console.log(toDos);

  return (
    <Container>
      <H1>To-Dos</H1>
      <select onInput={onInput} value={category}>
        <option value={Categories.TO_DO}>To Do</option>
        <option value={Categories.DOING}>Doing</option>
        <option value={Categories.DONE}>Done</option>
      </select>
      <CreateToDo />
      <ResultList>
        {toDos?.map((todo => <ToDo key={todo.id} {...todo} />))}
      </ResultList>
    </Container>
  );
}

export default ToDoList;
