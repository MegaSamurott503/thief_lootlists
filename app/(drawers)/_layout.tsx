import { ThemeProvider } from '@react-navigation/native';
import { Drawer } from 'expo-router/drawer';
import { useColorScheme } from 'react-native';
import { useContext } from 'react';

import { MyLightTheme, MyDarkTheme } from '@/constants/themeColors';
import { SettingContext } from '@/constants/context';

/* **************** */
/*   START SCREEN   */
/* **************** */
// Screen with nested drawer navigator.
// Contained in stack navigator to allow going back in stack.
// Drawer won't appear in other stack screens.
// Default screen when app is opened for the first time.
export default function DrawerLayout() {
  // Get the system's default color scheme.
  const scheme = useColorScheme();

  // Fetch global setting states from context.
  const {device,
    getCurrentTheme, setCurrentTheme} = useContext(SettingContext);

  return (
    // Wrap app root in 'ThemeProvider' to use light/dark themes.
    <ThemeProvider
      value={getCurrentTheme === 'default' && scheme === 'dark'
        ? MyDarkTheme
        : getCurrentTheme === 'dark'
          ? MyDarkTheme
          : MyLightTheme}
    >
      <Drawer>
        <Drawer.Screen
          name="(tabs)"
          options={{
            //drawerLabel: 'Lootlists',
            title: 'Lootlists',
          }}
        />
        {/*<Drawer.Screen
          name="map"
          options={{
            drawerLabel: 'City Map',
            title: 'City Map',
          }}
        />*/}
        <Drawer.Screen
          name="settings"
          options={{
            //drawerLabel: 'Settings',
            title: 'Settings',
          }}
        />
        <Drawer.Screen
          name="about"
          options={{
            //drawerLabel: 'About This App',
            title: 'About This App',
          }}
        />
      </Drawer>
    </ThemeProvider>
  );
}
