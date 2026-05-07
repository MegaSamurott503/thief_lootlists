import { Platform } from 'react-native';

export const stylesArrow = {
  arrowGoTo: {
    marginVertical: (Platform.OS === 'web') ? 10 : 5,
  },
  arrowLeft: {
    marginRight: -0.5,
    height: (Platform.OS === 'web') ? 42 : 34,
    width: (Platform.OS === 'web') ? 21 : 17,
  },
  arrowRight: {
    marginLeft: -0.5,
    height: (Platform.OS === 'web') ? 42 : 34,
    width: (Platform.OS === 'web') ? 21 : 17,
    transform: [{rotateY: '180deg'}],
  },
}
