import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Card = styled.div<{isDragging: boolean}>`
  padding: 16px 12px;
  border-radius: 8px;
  background-color: ${(props) => props.isDragging ? "#66cc69" : props.theme.cardColor};
`;

interface IDraggableCardProps {
  toDo: string;
  index: number;
}

function DraggableCard({ toDo, index }: IDraggableCardProps) {
  return (
    <Draggable draggableId={toDo} index={index}>
      {(magic, snapshot) => (
        <Card
          ref={magic.innerRef}
          {...magic.draggableProps}
          {...magic.dragHandleProps}
          isDragging={snapshot.isDragging}
        >
          {toDo}
        </Card>
      )}
    </Draggable>
  )
}

// //memo = don't rerender if the props didn't change
export default React.memo(DraggableCard);
