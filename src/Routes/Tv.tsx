import { useQuery } from "react-query";
import {
  getTvAiring,
  getTvLatest,
  getTvPopular,
  getTvTopRated,
  IGetTvResult,
  IGetTvLatestResult,
} from "../api";
import styled from "styled-components";
import { makeImagePath } from "../utils";
import { motion, AnimatePresence, useViewportScroll } from "framer-motion";
import { useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";

const Wrapper = styled.div`
  background: black;
  padding-bottom: 200px;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Banner = styled.div<{ bgPhoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgPhoto});
  background-size: cover;
`;

const Title = styled.h2`
  font-size: 68px;
  margin-bottom: 20px;
`;

const Overview = styled.p`
  font-size: 30px;
  width: 50%;
`;
const Slider = styled.div`
  position: relative;
  top: -100px;
`;
const Row = styled(motion.div)`
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  width: 100%;
`;

const Box = styled(motion.div)<{ bgPhoto: string }>`
  background-color: white;
  background-image: url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: center center;
  height: 200px;
  color: red;
  position: relative;
  cursor: pointer;

  font-size: 66px;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

const Info = styled(motion.div)`
  padding: 20px;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;
  h4 {
    text-align: center;
    font-size: 18px;
  }
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

const BigTv = styled(motion.div)`
  position: absolute;
  width: 40vw;
  height: 80vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 15px;
  overflow: hidden;
  background-color: ${(props) => props.theme.black.lighter};
`;

const BigName = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  padding: 20px;
  font-size: 46px;
  position: relative;
  top: -80px;
`;

const BigOverview = styled.p`
  padding: 20px;
  position: relative;
  top: -80px;
  color: ${(props) => props.theme.white.lighter};
`;

const BigCover = styled.div`
  width: 100%;
  background-size: cover;
  background-position: center center;
  height: 400px;
`;
const rowVariants = {
  hidden: {
    x: window.outerWidth + 5,
  },
  visible: {
    x: 0,
  },
  exit: {
    x: -window.outerWidth - 5,
  },
};

const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    y: -80,
    transition: {
      delay: 0.5,
      duaration: 0.1,
      type: "tween",
    },
  },
};

const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duaration: 0.1,
      type: "tween",
    },
  },
};

const offset = 6;

function Tv() {
  const history = useHistory();
  const bigTvMatch = useRouteMatch<{ tvId: string }>("/tv/:tvId");
  const { scrollY } = useViewportScroll();
  const { data: airData, isLoading: airingLoading } = useQuery<IGetTvResult>(
    ["TvAiring", "airingToday"],
    getTvAiring
  );
  const { data: populaData, isLoading: popularLoading } =
    useQuery<IGetTvResult>(["TvPopular", "poPular"], getTvPopular);
  const { data: topRatedData, isLoading: topRatedLoading } =
    useQuery<IGetTvResult>(["TvTopRated", "topRated"], getTvTopRated);
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  console.log(index);
  const incraseIndex = () => {
    if (airData) {
      if (leaving) return;
      toggleLeaving();
      const totalTv = airData.results.length - 1;
      const maxIndex = Math.floor(totalTv / offset) - 1;
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    } else if (populaData) {
      if (leaving) return;
      toggleLeaving();
      const totalTv = populaData.results.length - 1;
      const maxIndex = Math.floor(totalTv / offset) - 1;
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    } else if (topRatedData) {
      if (leaving) return;
      toggleLeaving();
      const totalTv = topRatedData.results.length - 1;
      const maxIndex = Math.floor(totalTv / offset) - 1;
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };
  console.log(incraseIndex);
  const toggleLeaving = () => setLeaving((prev) => !prev);
  const onBoxClicked = (tvId: number) => {
    history.push(`/tv/${tvId}`);
  };
  const onOverlayClicked = () => history.push("/tv");

  const clickedAiringTv =
    bigTvMatch?.params.tvId &&
    airData?.results.find((tv) => tv.id === +bigTvMatch.params.tvId);

  const clickedPopulaTv =
    bigTvMatch?.params.tvId &&
    populaData?.results.find((tv) => tv.id === +bigTvMatch.params.tvId);

  const clickedTopRatedTv =
    bigTvMatch?.params.tvId &&
    topRatedData?.results.find((tv) => tv.id === +bigTvMatch.params.tvId);

  const loading = airingLoading || popularLoading || topRatedLoading;
  return (
    <Wrapper>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            bgPhoto={makeImagePath(
              airData?.results[1].backdrop_path ||
                populaData?.results[1].backdrop_path ||
                topRatedData?.results[1].backdrop_path ||
                ""
            )}
            onClick={incraseIndex}
          >
            <Title>
              {airData?.results[0].name ||
                populaData?.results[0].name ||
                topRatedData?.results[0].name}
            </Title>
            <Overview>{airData?.results[0].overview}</Overview>
          </Banner>
          <Slider>
            <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
              <Row
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ type: "tween", duration: 1 }}
                key={index}
              >
                {airData?.results
                  .slice(0)
                  .slice(offset * index, offset * index + offset)
                  .map((tv) => (
                    <Box
                      layoutId={tv.id + ""}
                      key={tv.id}
                      whileHover="hover"
                      initial="normal"
                      variants={boxVariants}
                      onClick={() => onBoxClicked(tv.id)}
                      bgPhoto={makeImagePath(tv.backdrop_path, "w500")}
                    >
                      <Info variants={infoVariants}>
                        <h4>{tv.name}</h4>
                      </Info>
                    </Box>
                  ))}

                {populaData?.results
                  .slice(0)
                  .slice(offset * index, offset * index + offset)
                  .map((tv1) => (
                    <Box
                      layoutId={tv1.id + ""}
                      key={tv1.id}
                      whileHover="hover"
                      initial="normal"
                      variants={boxVariants}
                      onClick={() => onBoxClicked(tv1.id)}
                      bgPhoto={makeImagePath(tv1.backdrop_path, "w500")}
                    >
                      <Info variants={infoVariants}>
                        <h4>{tv1.name}</h4>
                      </Info>
                    </Box>
                  ))}
                {topRatedData?.results
                  .slice(0)
                  .slice(offset * index, offset * index + offset)
                  .map((tv2) => (
                    <Box
                      layoutId={tv2.id + ""}
                      key={tv2.id}
                      whileHover="hover"
                      initial="normal"
                      variants={boxVariants}
                      onClick={() => onBoxClicked(tv2.id)}
                      bgPhoto={makeImagePath(tv2.backdrop_path, "w500")}
                    >
                      <Info variants={infoVariants}>
                        <h4>{tv2.name}</h4>
                      </Info>
                    </Box>
                  ))}
              </Row>
            </AnimatePresence>
          </Slider>

          <AnimatePresence>
            {bigTvMatch ? (
              <>
                <Overlay
                  onClick={onOverlayClicked}
                  exit={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                />
                <BigTv
                  style={{ top: scrollY.get() + 100 }}
                  layoutId={bigTvMatch.params.tvId}
                >
                  {(clickedAiringTv && (
                    <>
                      <BigCover
                        style={{
                          backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                            clickedAiringTv.backdrop_path,
                            "w500"
                          )})`,
                        }}
                      />
                      <BigName>{clickedAiringTv.name}</BigName>
                      <BigOverview>{clickedAiringTv.overview}</BigOverview>
                    </>
                  )) ||
                    (clickedPopulaTv && (
                      <>
                        <BigCover
                          style={{
                            backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                              clickedPopulaTv.backdrop_path,
                              "w500"
                            )})`,
                          }}
                        />
                        <BigName>{clickedPopulaTv.name}</BigName>
                        <BigOverview>{clickedPopulaTv.overview}</BigOverview>
                      </>
                    )) ||
                    (clickedTopRatedTv && (
                      <>
                        <BigCover
                          style={{
                            backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                              clickedTopRatedTv.backdrop_path,
                              "w500"
                            )})`,
                          }}
                        />
                        <BigName>{clickedTopRatedTv.name}</BigName>
                        <BigOverview>{clickedTopRatedTv.overview}</BigOverview>
                      </>
                    ))}
                </BigTv>
              </>
            ) : null}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
}
export default Tv;
