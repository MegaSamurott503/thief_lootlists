import { Platform } from 'react-native';

export const stylesTotal = {
  tableRowBox: (width) => ({
    //backgroundColor: 'lightgray',
    borderWidth: 1,
    //justifyContent: 'center',
    //alignItems: 'flex-end',
    width: (width > 617) ? 100 : 60,
  }),
  tableRowText: (width) => ({
    fontSize: (width > 617) ? 13 : 8,
    textAlign: 'right',
  }),
  tableHeadColumn: (width) => ({
    width: (width > 626) ? 100
        : (width > 399) ? 60 : 48,
  }),
  totalBackground: (width) => ({
    flex: 1,
    justifyContent: 'center',
    padding: (width > 617) ? 4 : 2,
  }),
  totalBackgroundWeb: {
    width: '100%',
    height: '100%',
  }
}
