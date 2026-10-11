import { Platform } from 'react-native';

export const stylesImg = {
  imgStyle: (width) => ({
    marginTop: (width > 449) ? 4 : 2,
    width: (width > 449) ? 64 : 40,
    height: (width > 449) ? 64 : 40,
  }),
  imgLootIcon: (width) => ({
    width: (width > 449) ? 15 : 10,
    height: (width > 449) ? 15 : 10,
  }),
  imgLootIconBig: (width) => ({
    width: (width > 449) ? 18 : 14,
    height: (width > 449) ? 18 : 14,
  }),
}
