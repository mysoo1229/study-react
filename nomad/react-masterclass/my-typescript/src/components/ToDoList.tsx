import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { atom, useRecoilState } from "recoil";
import styled from "styled-components";

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

interface IUseForm {
  toDo: string;
};

interface IToDo {
  id: number;
  text: string;
  category: "TO_DO" | "DOING" | "DONE";
}

const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
});

function ToDoList() {
  const [toDos, setToDos] = useRecoilState(toDoState);

  // const toDos = useRecoilValue(toDoState); //get atom value
  // const setToDos = useSetRecoilState(toDoState); //update atom value (modifier)

  const { register, handleSubmit, setValue } = useForm<IUseForm>();

  const handleValid = ({toDo}: IUseForm) => {
    setToDos(oldToDos => [
      { id: Date.now(), text: toDo, category: "TO_DO" },
      ...oldToDos
    ]);
    setValue("toDo", "");
  };

  return (
    <Container>
      <H1>To-Dos</H1>
      <form onSubmit={handleSubmit(handleValid)}>
        <input
          {...register("toDo", {
            required: "Please write a To Do",
          })}
          placeholder="Write a to do"
        />
        <button>Add</button>
      </form>
      <ResultList>
        {toDos.map(toDo => (
          <li key={toDo.id}>{toDo.text}</li>
        ))}
      </ResultList>
    </Container>
  );
}

export default ToDoList;
