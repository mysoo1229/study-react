import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { todoState } from "./atoms";
import Board from "./Components/Board";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  max-width: 680px;
  margin: 0 auto;
  padding: 30px 20px;
`;

const Boards = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  align-items: flex-start;
  width: 100%;
`;

function App() {
  const [toDos, setToDos] = useRecoilState(todoState);

  const onDragEnd = (info: DropResult) => {
    const { destination, draggableId, source } = info;

    if (!destination) return;

    if (destination?.droppableId === source.droppableId) {
      //same board
      setToDos((allBoards) => {
        const boardCopy = [...allBoards[source.droppableId]]; //copying source array only
        const taskObject = boardCopy[source.index];
        boardCopy.splice(source.index, 1);
        boardCopy.splice(destination?.index, 0, taskObject);

        return {
          ...allBoards,
          [source.droppableId]: boardCopy //upadating that key
        };
      });
    }

    if (destination.droppableId !== source.droppableId) {
      //cross board
      setToDos((allBoards) => {
        const sourceBoard = [...allBoards[source.droppableId]];
        const taskObject = sourceBoard[source.index];
        const destinationBoard = [...allBoards[destination.droppableId]]; //copying source array only
        sourceBoard.splice(source.index, 1);
        destinationBoard.splice(destination.index, 0, taskObject);

        return {
          ...allBoards,
          [source.droppableId]: sourceBoard,
          [destination.droppableId]: destinationBoard,
        };
      });
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          {Object.keys(toDos).map((boardId) => (
            <Board boardId={boardId} key={boardId} toDos={toDos[boardId]} />
          ))}
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}

export default App;
