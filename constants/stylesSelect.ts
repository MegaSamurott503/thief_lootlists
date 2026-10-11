import { Platform } from 'react-native';

export const stylesSelect = {
  selectMeBox: (width) => ({
    borderRadius: 5,
    //width: (Platform.OS === 'web') ? 425 : '80%',
    marginHorizontal: (width > 449) ? 10 : 5,
    marginVertical: 5,
  }),
  selectMeDropdown: (width) => ({
    borderRadius: 5,
    //width: (Platform.OS === 'web') ? 425 : '80%',
    marginHorizontal: (width > 449) ? 10 : 5,
    marginVertical: 5,
  }),
  selectMeListItem: {
    alignItems: 'center',
    marginHorizontal: -5,
    height: 30,
  },
  selectMeListText: (width) => ({
    fontSize: (width > 449) ? 15 : 10,
  }),
  selectMeBadge: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    margin: -5,
    paddingHorizontal: 5,
  },
  selectMeBadgeText: {
    fontSize: 10,
  },
}
