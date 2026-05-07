import { Drawer } from 'expo-router/drawer';

/* **************** */
/*   START SCREEN   */
/* **************** */
// Screen with nested drawer navigator.
// Contained in stack navigator to allow going back in stack.
// Drawer won't appear in other stack screens.
// Default screen when app is opened for the first time.
export default function DrawerLayout() {
  return (
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
  );
}
