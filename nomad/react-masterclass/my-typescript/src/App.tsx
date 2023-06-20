import styled from "styled-components";
import { AnimatePresence, motion, useMotionValue, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";

const Wrapper = styled(motion.div)`
  width: 100%;
  height: 300vh;
  background: linear-gradient(90deg rgb(102, 204, 150),rgb(70, 146, 255));
`;

const flexDefault = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const List = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  padding: 0 30px;
  box-sizing: border-box;
`;

const Item = styled(flexDefault)`
  justify-content: center;
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

const Svg = styled.svg`
  width: 100px;
  height: 100px;

  path {
    stroke: #fff;
    stroke-width: 16;
  }
`;

const InnerWrap = styled(flexDefault)`
  margin: 100px 0 200px;
  height: 200px;
  
  button {
    margin-bottom: 20px;
  }
`;

const SliderWrap = styled(flexDefault)`
  justify-content: center;

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 28px;
  }
`;

const SlideViewport = styled.div`
  display: flex;
  margin: 20px 0;
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

const svgVar = {
  start: {pathLength: 0, fill: "rgba(255, 255, 255, 0"},
  end: {pathLength: 1, fill: "rgba(255, 255, 255, 1"},
}

const boxVar4 = {
  initial: {
    opacity: 0,
    scale: 0,
  },
  visible: {
    opacity: 1,
    scale: 1,
    rotateZ: 360,
  },
  leaving: {
    opacity: 0,
    y: 30,
  },
}

const slideVar = {
  entry: (backward: boolean) => {
    return {
      x: backward ? -200 : 200,
      opacity: 0,
      scale: 0,
      transition: {
        type: "tween",
        duration: .3,
      }
    }
  },
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (backward: boolean) => {
    return {
      x: backward ? 200 : -200,
      opacity: 0,
      scale: 0,
      transition: {
        type: "tween",
        duration: .3,
      }
    }
  }
}

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
  const scrollSize = useTransform(scrollYProgress, [0, .3], [1, .1]);

  const [showing, setShowing] = useState(false);
  const toggleShowing = () => setShowing((prev) => !prev);

  const [visible, setVisible] = useState(1);
  const [backward, setBackward] = useState(false);
  const nextPlease = () => {
    setBackward(false);
    setVisible((prev) => (prev === 10 ? 10 : prev + 1));
  };
  const prevPlease = () => {
    setBackward(true);
    setVisible((prev) => (prev === 1 ? 1 : prev - 1));
  };

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
          <Box style={{ x, rotateZ, scale: scrollSize }} drag="x" dragSnapToOrigin />
        </Item>

        <Item>
          <Title>Svg</Title>
          <Svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="-10 0 660 512">
            <motion.path
              variants={svgVar}
              initial="start"
              animate="end"
              transition={{
                default: {duration: 2},
                fill: {duration: 2, delay: 2},
              }}
              d="M0 336c0 79.5 64.5 144 144 144H512c70.7 0 128-57.3 128-128c0-61.9-44-113.6-102.4-125.4c4.1-10.7 6.4-22.4 6.4-34.6c0-53-43-96-96-96c-19.7 0-38.1 6-53.3 16.2C367 64.2 315.3 32 256 32C167.6 32 96 103.6 96 192c0 2.7 .1 5.4 .2 8.1C40.2 219.8 0 273.2 0 336z"
            />
          </Svg>
        </Item>
      </List>

      <InnerWrap>
        <Title>Animate on Show/Hide</Title>
        <button onClick={toggleShowing}>Click</button>
        <AnimatePresence>
          {showing ? (
            <Box
              variants={boxVar4}
              initial="initial"
              animate="visible"
              exit="leaving"
            />
          ) : null}
        </AnimatePresence>
      </InnerWrap>

      <SliderWrap>
        <Title>Slider</Title>
        <button onClick={prevPlease}>prev</button>
        <SlideViewport>
          <AnimatePresence mode="wait" custom={backward}>
              <Box
                custom={backward}
                variants={slideVar}
                initial="entry"
                animate="center"
                exit="exit"
                key={visible}
              >
                {visible}
              </Box>
          </AnimatePresence>
        </SlideViewport>
        <button onClick={nextPlease}>next</button>
      </SliderWrap>
    </Wrapper>
  );
}

export default App;
