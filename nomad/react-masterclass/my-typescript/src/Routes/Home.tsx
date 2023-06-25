import { useQuery } from "react-query";
import styled from "styled-components";
import { getMovies, IGetMoviesResult } from "../api";
import { makeImagePath } from "../utils";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useHistory, useRouteMatch } from "react-router";

const Wrapper = styled.div`
  overflow-x: hidden;
  padding-bottom: 200px;
`;

const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20vh;
`;

const Banner = styled.div<{ bgphoto: string }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  padding: 60px;
  background-image: linear-gradient(to right, rgba(0, 0, 0, .5), rgba(0, 0, 0 , 0)), url(${props => props.bgphoto});
  background-size: cover;
`;

const Title = styled.h2`
  font-size: 60px;
  font-weight: bold;
`;

const Overview = styled.p`
  width: 55%;
  margin-top: 20px;
  font-size: 18px;
  line-height: 1.3;
`;

const Slider = styled.div`
  position: relative;
  top: -100px;
`;

const Row = styled(motion.div)`
  display: grid;
  position: absolute;
  grid-template-columns: repeat(6, 1fr);
  gap: 10px;
  width: 100%;
`;

const Box = styled(motion.div)<{ bgphoto: string }>`
  height: 200px;
  background: url(${(props) => props.bgphoto}) no-repeat center / cover;
  cursor: pointer;

  &:first-child {
    transform-origin: center left;
  }

  &:last-child {
    transform-origin: center right;
  }
`;

const Info = styled(motion.div)`
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 16px 20px;
  background-color: ${props => props.theme.black.lighter};
  opacity: 0;

  h4 {
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    height: 48px;
    font-size: 18px;
    line-height: 24px;
  }
`;

const rowVariants = {
  hidden: {
    x: window.innerWidth,
  },
  visible: {
    x: 0,
  },
  exit: {
    x: -window.innerWidth,
  },
}

const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    y: -50,
    scale: 1.3,
    transition: {
      type: "tween",
      duration: .2,
      delay: .3,
    },
  }
}

const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      type: "tween",
      duration: .2,
      delay: .3,
    },
  },
};

const offset = 6;

function Home() {
  const { data, isLoading } = useQuery<IGetMoviesResult>(
    ["movies", "nowPlaying"],
    getMovies
  );

  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const increaseIndex = () => {
    if (data) {
      if (leaving) return;

      const totalMovies = data?.results.length - 1; // -1인 이유는 한개는 메인에 써서
      const maxIndex = Math.floor(totalMovies / offset) - 1;

      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
      toggleLeaving();
    }
  };
  const toggleLeaving = () => setLeaving((prev) => !prev);

  const history = useHistory();
  const bigMovieMatch = useRouteMatch<{movieId: string}>("/movies/:movieId");
  const onBoxClick = (movieId: number) => {
    history.push(`/movies/${movieId}`);
  };

  console.log(bigMovieMatch);

  return (
    <Wrapper>
      { isLoading ? (
        <Loader>Loading</Loader>
      ) : (
        <>
          <Banner onClick={increaseIndex} bgphoto={makeImagePath(data?.results[0].backdrop_path || "")}>
            <Title>{data?.results[0].title}</Title>
            <Overview>{data?.results[0].overview}</Overview>
          </Banner>
          <Slider>
            <AnimatePresence
              initial={false}
              onExitComplete={toggleLeaving}
            >
              <Row
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{type: "tween", duration: 1}}
                key={index}
              >
                {data?.results
                  .slice(1)
                  .slice(offset*index, offset*index + offset)
                  .map((movie) => (
                    <Box
                      key={movie.id}
                      layoutId={movie.id + ""}
                      variants={boxVariants}
                      initial="normal"
                      whileHover="hover"
                      transition={{type: "tween"}}
                      bgphoto={makeImagePath(movie.backdrop_path, "w500")}
                      onClick={() => onBoxClick(movie.id)}
                    >
                      <Info variants={infoVariants}>
                        <h4>{movie.title}</h4>
                      </Info>
                    </Box>
                ))}
              </Row>
            </AnimatePresence>
          </Slider>
          <AnimatePresence>
            {bigMovieMatch ? (
              <motion.div
                layoutId={bigMovieMatch.params.movieId}
                style={{ position: "fixed",width: "40vw", height: "60vh", backgroundColor:"white", top: 50, right: 0, left: 0, margin: "0 auto"}}
              /> ) : null}
          </AnimatePresence>
        </>
      )}
    </Wrapper>  
  );
}

export default Home;
