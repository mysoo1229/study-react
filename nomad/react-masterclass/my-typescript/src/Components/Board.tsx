import { Droppable } from "react-beautiful-dnd";
import DraggableCard from "./DraggableCard";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { ITodo } from "../atoms";

const BoardWrap = styled.div`
  padding: 10px;
  border-radius: 12px;
  background-color: ${(props) => props.theme.boardColor};
`;

const Title = styled.h2`
  margin: 10px 0 15px;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
`;

interface IAreaProps {
  isDraggingOver: boolean;
  isDraggingFrom: boolean;
}

const Area = styled.div<IAreaProps>`
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-height: 56px;
  padding: 4px;
  border-radius: 10px;
  background-color: ${(props) => props.isDraggingOver ? "#ccc" : props.isDraggingFrom ? "#999" : "transparent"};
`;

const Form = styled.form`
  width: 100%;

  input {
    width: 100%;
  }
`;

interface IBoardProps {
  toDos: ITodo[];
  boardId: string;
}

interface IForm {
  toDo: string;
}

function Board({ toDos, boardId }: IBoardProps) {
  const { register, setValue, handleSubmit } = useForm<IForm>();
  const onValid = (data: IForm) => {
    console.log(data);
    setValue("toDo", "");
  };

  return (
    <BoardWrap>
      <Title>{boardId}</Title>
      <Form onSubmit={handleSubmit(onValid)}>
        <input
          {...register("toDo", { required: true })}
          type="text"
          placeholder={`Add task on ${boardId}`}
        />
      </Form>
      <Droppable droppableId={boardId}>
        {(magic, snapshot) => (
          <Area
            ref={magic.innerRef}
            {...magic.droppableProps}
            isDraggingOver={snapshot.isDraggingOver}
            isDraggingFrom={Boolean(snapshot.draggingFromThisWith)}
          >
            {toDos.map((toDo, index) => (
              <DraggableCard
                key={toDo.id}
                toDoId={toDo.id}
                toDoText={toDo.text}
                index={index}
              />
            ))}
            {magic. placeholder}
          </Area>
        )}
      </Droppable>
    </BoardWrap>
  )
}

export default Board;
