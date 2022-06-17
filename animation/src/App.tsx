import styled from "styled-components";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Box = styled(motion.div)`
  width: 200px;
  height: 200px;
  border-radius: 40px;
  background-color: rgba(255, 255, 255, 1);
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

function App() {
  const x = useMotionValue(0);
  const scale = useTransform(x, [-800, 0, 800], [2, 1, 0.1]);
  // useEffect(() => {
  //   //x.onChange(() => console.log(x.get()));
  //   scale.onChange(() => console.log(scale.get()));
  // }, [x]);
  // console.log(x);
  return (
    <Wrapper>
      <Box style={{ x, scale }} drag="x" dragSnapToOrigin />
    </Wrapper>
  );
}

export default App;

// motionValue 는 에니메이션값의 상태와 속도를 추적해줌 ( div를 추적해줌 )
// useTransform 은 값을하나받음
//이 코드에서는 x의 제한값(-800~800)과 원하는 출력값을 받음
