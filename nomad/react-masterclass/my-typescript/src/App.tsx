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

const BoxTranparent = styled(Box)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  padding: 5px;
  background: rgba(255, 255, 255, .2);
`;

const Circle = styled(motion.div)`
  width: 35px;
  height: 35px;
  place-self: center;
  background: #fff;
  border-radius: 50%;
  box-shadow: 0 2px 3px rgba(0, 0, 0, .1), 0 10px 20px rgba(0, 0, 0, .06);
`;

const boxVar1 = {
  start: {scale: 0},
  end: {scale: 1, rotateZ: 360, transition: {type: "spring", delay: .5}},
};

const boxVar2 = {
  start: {
    opacity: 0,
    scale: .5
  },
  end: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      duration: .5,
      bounce: .5,
      delayChildren: .5,
      staggerChildren: .15,
    }
  },
};

const circleVar = {
  start: {opacity: 0, y: 10},
  end: {opacity: 1, y: 0, transition: {duration: .2}},
};

function App() {
  return (
      <Wrapper>
        <Item>
          <Title>Animation</Title>
          <Box variants={boxVar1} initial="start" animate="end" />
        </Item>

        <Item>
          <Title>Variant</Title>
          <BoxTranparent variants={boxVar2} initial="start" animate="end">
            {/* <Circle initial="start" animate="end" /> this is default */}
            <Circle variants={circleVar} />
            <Circle variants={circleVar} />
            <Circle variants={circleVar} />
            <Circle variants={circleVar} />
          </BoxTranparent>
        </Item>
      </Wrapper>
  );
}

export default App;
