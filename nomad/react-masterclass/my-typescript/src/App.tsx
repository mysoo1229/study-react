import styled from "styled-components";
import { motion } from "framer-motion";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 100px;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  padding: 0 30px;
  box-sizing: border-box;
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h2`
  margin-bottom: 30px;
  font-size: 18px;
  font-weight: bold;
  color: #fff;
`;

const Box = styled(motion.div)`
  width: 100px;
  height: 100px;
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, .1), 0 10px 20px rgba(0, 0, 0, .06);
`;

const myVars = {
  start: {scale: 0},
  end: {scale: 1, rotateZ: 360, transition: {type: "spring", delay: .5}},
};

function App() {
  return (
      <Wrapper>
        <Item>
          <Title>Animation</Title>
          <Box
            variants={myVars}
            initial="start"
            animate="end"
          />
        </Item>
      </Wrapper>
  );
}

export default App;
