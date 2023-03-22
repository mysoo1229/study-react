import styled, { keyframes } from "styled-components";

const Wrapper = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
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

const Emoji = styled.span`
  font-size: 36px;
`;

const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 200px;
  background: tomato;
  animation: ${rotationAnimation} 1s linear infinite;

  ${Emoji} {
    &:hover {
      font-size: 60px;
    }
  }
`;

function App() {
  return (
    <Wrapper>
      <Box>
        <Emoji as="p">😵‍💫</Emoji>
      </Box>
      <Emoji>🤮</Emoji>
    </Wrapper>
  );
}

export default App;
