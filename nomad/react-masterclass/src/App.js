import styled, { keyframes } from "styled-components";

const Wrapper = styled.div`
  display: flex;
`;

const rotationAnimation = keyframes`
  0% {
    transform: rotate(0deg);
    border-radius: 0;
  }

  50% {
    border-radius: 100px;
  }

  0% {
    transform: rotate(360deg);
    border-radius: 0;
  }
`;

const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 200px;
  background: tomato;
  animation: ${rotationAnimation} 1s linear infinite;

  span {
    font-size: 36px;

    &:hover {
      font-size: 60px;
    }
  }
`;

function App() {
  return (
    <Wrapper>
      <Box>
        <span>🤮</span>
      </Box>
    </Wrapper>
  );
}

export default App;
