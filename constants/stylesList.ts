import { Platform } from 'react-native';

export const stylesList = {
  listEntry: (width) => ({
    flexDirection: 'row',
    marginHorizontal: (width > 449) ? 10 : 5,
    alignItems: 'stretch',
  }),
  lootRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  lootText: (width) => ({
    fontSize: (width > 449) ? 12 : 8,
    marginLeft: (width > 449) ? 3 : 2,
  }),
  findBackground: {
    flex: 1,
    justifyContent: 'center',
    padding: 2,
  },
  findBackgroundWeb: {
    height: '100%',
    width: '100%',
  },
  locText: (width) => ({
    //fontFamily: 'BlueHighway',
    fontSize: (width > 449) ? 12 : 7,
    //fontSize: (width > 449) ? 12 : (width > 389) ? 9 : width*0.019,
  }),
  locCount: {
    fontWeight: 'bold',
  },
  locPick: {
    fontStyle: 'italic',
  },
  locBox: {
    // No overline. Too high up to make box shape.
    textDecorationLine: 'underline',
    //borderWidth: 1,
    //marginHorizontal: 0,
  },
  locNoGet: {
    textDecorationLine: 'line-through',
  },
  locBoxNoGet: {
    textDecorationLine: 'underline line-through',
  },
}
