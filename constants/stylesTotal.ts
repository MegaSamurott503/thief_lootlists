import { Platform } from 'react-native';

export const stylesTotal = {
  tableRowBox: {
    //backgroundColor: 'lightgray',
    borderWidth: 1,
    //justifyContent: 'center',
    //alignItems: 'flex-end',
    width: (Platform.OS === 'web') ? 100 : 66,
  },
  tableRowText: {
    fontSize: (Platform.OS === 'web') ? 13 : 8,
    textAlign: 'right',
  },
  totalBackground: {
    flex: 1,
    justifyContent: 'center',
    padding: (Platform.OS === 'web') ? 4 : 2,
  },
  totalBackgroundWeb: {
    width: '100%',
    height: '100%',
  }
}
