import posed from 'react-pose';

const AnimatedFaceDiv = posed.li({
  flip: {
    scale: 1,
    transition: {
      delay: 300,
      duration: 2500,
    },
  },
});

const AnimatedUserButton = posed.li({
  flip: {
    scale: 1,
    transition: {
      duration: 1000,
    },
  },
});

export {
  AnimatedFaceDiv,
  AnimatedUserButton,
};
