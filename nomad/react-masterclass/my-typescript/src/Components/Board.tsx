import { Droppable } from "react-beautiful-dnd";
import DraggableCard from "./DraggableCard";
import styled from "styled-components";
import { useRef } from "react";

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

interface IBoardProps {
  toDos: string[];
  boardId: string;
}

function Board({ toDos, boardId }: IBoardProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const onClick = () => {
    inputRef.current?.focus();
    setTimeout(() => {
      inputRef.current?.blur()
    }, 3000);
  };

  return (
    <BoardWrap>
      <Title>{boardId}</Title>
      <input ref={inputRef} placeholder="grab me" />
      <button onClick={onClick}>Click</button>
      <Droppable droppableId={boardId}>
        {(magic, snapshot) => (
          <Area
            ref={magic.innerRef}
            {...magic.droppableProps}
            isDraggingOver={snapshot.isDraggingOver}
            isDraggingFrom={Boolean(snapshot.draggingFromThisWith)}
          >
            {toDos.map((toDo, index) => (
              <DraggableCard key={toDo} toDo={toDo} index={index} />
            ))}
            {magic. placeholder}
          </Area>
        )}
      </Droppable>
    </BoardWrap>
  )
}

export default Board;
