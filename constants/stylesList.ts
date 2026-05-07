import { Platform } from 'react-native';

export const stylesList = {
  listEntry: {
    flexDirection: 'row',
    marginHorizontal: (Platform.OS === 'web') ? 10 : 5,
    alignItems: 'stretch',
  },
  lootRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  lootText: {
    fontSize: (Platform.OS === 'web') ? 12 : 8,
    marginLeft: (Platform.OS === 'web') ? 3 : 2,
  },
  findBackground: {
    flex: 1,
    justifyContent: 'center',
    padding: 2,
  },
  findBackgroundWeb: {
    height: '100%',
    width: '100%',
  },
  locText: {
    //fontFamily: 'BlueHighway',
    //fontSize: (Platform.OS === 'web') ? 12 : 8,
  },
  locCount: {
    fontWeight: 'bold',
  },
  locPick: {
    fontStyle: 'italic',
  },
  locBox: {
    textDecorationLine: 'underline',
  },
  locNoGet: {
    textDecorationLine: 'line-through',
  },
  locBoxNoGet: {
    textDecorationLine: 'underline line-through',
  },
}
