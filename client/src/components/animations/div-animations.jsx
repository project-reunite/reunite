import posed from 'react-pose';

const AnimatedFaceChartDiv = posed.div({
  visible: {
    opacity: 1,
    transition: {
      opacity: { ease: 'easeIn', duration: 1500 },
      default: { ease: 'easeOut', duration: 3500 },
    },
  },
  hidden: { opacity: 0 },
});

const AnimatedDiv = posed.div({
  flip: {
    scale: 1,
    transition: {
      duration: 1000,
    },
  },
});

export {
  AnimatedFaceChartDiv,
  AnimatedDiv,
};
