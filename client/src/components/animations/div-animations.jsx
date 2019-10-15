import posed from 'react-pose';

const AnimatedFaceChartDiv = posed.div({
  visible: {
    opacity: 1,
    transition: {
      opacity: { ease: 'easeIn', duration: 1000 },
      default: { ease: 'easeOut', duration: 3500 },
    },
  },
  hidden: { opacity: 0 },
});

const StandardAnimatedDiv = posed.div({
  flip: {
    scale: 1,
    transition: {
      duration: 1000,
    },
  },
});

export { AnimatedFaceChartDiv, StandardAnimatedDiv };
