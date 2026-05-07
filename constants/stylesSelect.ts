import { Platform } from 'react-native';

export const stylesSelect = {
  selectMeBox: {
    borderRadius: 5,
    //width: (Platform.OS === 'web') ? 425 : '80%',
    marginHorizontal: (Platform.OS === 'web') ? 10 : 5,
    marginVertical: 5,
  },
  selectMeDropdown: {
    borderRadius: 5,
    //width: (Platform.OS === 'web') ? 425 : '80%',
    marginHorizontal: (Platform.OS === 'web') ? 10 : 5,
    marginVertical: 5,
  },
  selectMeListItem: {
    alignItems: 'center',
    marginHorizontal: -5,
    height: 30,
  },
  selectMeListText: {
    fontSize: (Platform.OS === 'web') ? 15 : 10,
  },
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
