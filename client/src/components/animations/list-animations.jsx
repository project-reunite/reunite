import posed from 'react-pose';

const FaceItem = posed.li({
  flip: {
    scale: 1,
    transition: {
      delay: 500,
      duration: 2500,
    },
  },
});

const UserItem = posed.li({
  flip: {
    scale: 1,
    transition: {
      duration: 1000,
    },
  },
});

export {
  FaceItem,
  UserItem,
};
