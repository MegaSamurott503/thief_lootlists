import { DefaultTheme, DarkTheme } from '@react-navigation/native';
import { Platform } from 'react-native';

// Create custom themes here.
export const MyLightTheme = {
  ...DefaultTheme,
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    textInvert: 'lightgray',
    border: 'black',
    backLight: 'lightgray',
    backMed: 'darkgray',
    backDark: 'gray',
    findE: 'lime',
    findM: 'aqua',
    findH: 'plum',
    found: 'gold',
    locObj: 'dodgerblue',
    locN: 'green',
    locH: 'blue',
    locX: 'purple',
    locSecret: 'crimson',
    inputArea: 'rgb(242,242,242)',
    inputCheck: 'rgb(242,242,242)',
    inputBorder: 'dimgray',
    url: 'blue',
  },
}

export const MyDarkTheme = {
  ...DarkTheme,
  dark: true,
  colors: {
    ...DarkTheme.colors,
    primary: 'gold',
    background: 'rgb(50,50,50)',
    card: 'gray',
    //text: 'white',
    textInvert: 'rgb(170,170,170)',
    border: 'rgb(140,140,140)',
    backLight: 'dimgray',
    backMed: 'rgb(85,85,85)',
    backDark: 'rgb(70,70,70)',
    findE: 'green',
    findM: 'blue',
    findH: 'purple',
    found: 'olive',
    locObj: 'skyblue',
    locN: 'lime',
    locH: 'aqua',
    locX: 'rgb(220,180,220)',
    locSecret: 'lightsalmon',
    inputArea: 'rgb(85,85,85)',
    inputCheck: 'dimgray',
    inputBorder: 'gray',
    url: 'aqua',
  },
}
