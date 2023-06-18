import styled from "styled-components";
import { motion, useMotionValue, useMotionValueEvent, useScroll, useTransform, useViewportScroll } from "framer-motion";
import { useRef } from "react";

const Wrapper = styled(motion.div)`
  width: 100%;
  height: 300vh;
  background: linear-gradient(90deg rgb(102, 204, 150),rgb(70, 146, 255));
`;

const List = styled.div`
  position: fixed;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
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

const BoxWrap = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, .2);
  overflow: hidden;
`;

const BoxSmall = styled(Box)`
  width: 50px;
  height: 50px;
  border-radius: 16px;
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

const boxVar3 = {
  hover: {scale: 1.5, rotateZ: 90},
  tap: {scale:1, borderRadius: "100px"},
};

function App() {
  const boxWrapRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const rotateZ = useTransform(x, [-800, 800], [-360, 360]);
  const gradient = useTransform(
    x,
    [-600, 0, 600],
    [
      'linear-gradient(90deg,rgb(159, 96, 218),rgb(234, 107, 141))',
      'linear-gradient(90deg,rgb(102, 204, 150),rgb(70, 146, 255))',
      'linear-gradient(90deg,rgb(239, 201, 119),rgb(137, 237, 117))',
    ]
  );

  const { scrollYProgress } = useScroll();

  return (
    <Wrapper style={{ background: gradient }}>
      <List>
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

        <Item>
          <Title>Gestures (Click!)</Title>
          <Box variants={boxVar3} whileHover="hover" whileTap="tap" />
        </Item>

        <Item>
          <Title>Drag</Title>
          <BoxWrap ref={boxWrapRef}>
            <BoxSmall
              drag
              // dragSnapToOrigin 중심으로 돌아옴
              // dragElastic={1} 마우스를 얼마나 빨리 따라오는지 - 1은 바로 따라옴 0은 안따라옴
              dragConstraints={boxWrapRef}
            />
          </BoxWrap>
        </Item>

        <Item>
          <Title>Motion Value (Scroll!)</Title>
          <Box style={{ x, rotateZ, scale: scrollYProgress }} drag="x" dragSnapToOrigin />
        </Item>
      </List>
    </Wrapper>
  );
}

export default App;
