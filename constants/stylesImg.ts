import { Platform } from 'react-native';

export const stylesImg = {
  imgStyle: {
    marginTop: (Platform.OS === 'web') ? 4 : 2,
    width: (Platform.OS === 'web') ? 64 : 40,
    height: (Platform.OS === 'web') ? 64 : 40,
  },
  imgLootIcon: {
    width: (Platform.OS === 'web') ? 15 : 10,
    height: (Platform.OS === 'web') ? 15 : 10,
  },
  imgLootIconBig: {
    width: (Platform.OS === 'web') ? 18 : 14,
    height: (Platform.OS === 'web') ? 18 : 14,
  },
}
