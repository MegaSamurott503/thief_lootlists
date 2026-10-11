import { Platform } from 'react-native';

export const stylesArrow = {
  arrowGoTo: (width) => ({
    marginVertical: (width > 617) ? 10 : 5,
  }),
  arrowLeft: (width) => ({
    marginRight: -0.5,
    height: (width > 617) ? 42 : 34,
    width: (width > 617) ? 21 : 17,
  }),
  arrowRight: (width) => ({
    marginLeft: -0.5,
    height: (width > 617) ? 42 : 34,
    width: (width > 617) ? 21 : 17,
    transform: [{rotateY: '180deg'}],
  }),
}
