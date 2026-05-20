import {
  ThemeProvider, useTheme } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { Platform, useColorScheme } from 'react-native';
import { useEffect, useState } from 'react';
import { useFonts } from 'expo-font';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { MyLightTheme, MyDarkTheme } from '@/constants/themeColors';
import { SettingContext } from '@/constants/context';

// The root of the app.
export default function RootLayout() {
  // Get the system's default color scheme.
  const scheme = useColorScheme();

  // Load custom fonts here.
  const [fontsLoaded] = useFonts({
    'Thief': require('@/assets/fonts/THIEF.ttf'),
  });

  // CurrentTheme: tracks the currently selected color theme.
  const [getCurrentTheme, setCurrentTheme] = useState('default');

  // DefaultDiff: tracks which difficulty filters are on by default.
  const [getDefaultDiffN, setDefaultDiffN] = useState(true);
  const [getDefaultDiffH, setDefaultDiffH] = useState(true);
  const [getDefaultDiffX, setDefaultDiffX] = useState(true);

  // LootSort: tracks how to sort the loot in a mission's list.
  const [getLootSort, setLootSort] = useState('order');

  // ShowList: tracks which list sections are currently selected.
  const [getShowListLoot, setShowListLoot] = useState(true);
  const [getShowListItem, setShowListItem] = useState(true);
  const [getShowListJunk, setShowListJunk] = useState(true);
  const [getShowListSec, setShowListSec] = useState(true);

  // Spoiler: tracks how much of spoiler locations to hide.
  const [getSpoilerSec, setSpoilerSec] = useState('none');
  const [getSpoilerEgg, setSpoilerEgg] = useState('partial');

  // Read settings from device storage.
  const readAllSettings = async () => {
    try {
      // Use 'multiGet' to read multiple values at once.
      //const jsonValues = await AsyncStorage.multiGet([`@setting_${id}`]);
      const jsonValues = await AsyncStorage.multiGet(
        [`@setting_theme`, `@setting_default_normal`,
        `@setting_default_hard`, `@setting_default_expert`,
        `@setting_loot_sort`,
        `@setting_list_loot`, `@setting_list_item`,
        `@setting_list_junk`, `@setting_list_secret`,
        `@setting_spoiler_sec`, `@setting_spoiler_egg`]
      );
      // [0] is 'setting_theme'
      if (jsonValues[0][1] !== null) {
        setCurrentTheme(jsonValues[0][1]);
      }
      // [1] is 'setting_default_normal'
      if (jsonValues[1][1] === "false") {
        setDefaultDiffN(false);
      } else {
        setDefaultDiffN(true);
      }
      // [2] is 'setting_default_hard'
      if (jsonValues[2][1] === "false") {
        setDefaultDiffH(false);
      } else {
        setDefaultDiffH(true);
      }
      // [3] is 'setting_default_expert'
      if (jsonValues[3][1] === "false") {
        setDefaultDiffX(false);
      } else {
        setDefaultDiffX(true);
      }
      // [4] is 'setting_loot_sort'
      if (jsonValues[4][1] !== null) {
        setLootSort(jsonValues[4][1]);
      }
      // [5] is 'setting_list_loot'
      if (jsonValues[5][1] === "false") {
        setShowListLoot(false);
      } else {
        setShowListLoot(true);
      }
      // [6] is 'setting_list_item'
      if (jsonValues[6][1] === "false") {
        setShowListItem(false);
      } else {
        setShowListItem(true);
      }
      // [7] is 'setting_list_junk'
      if (jsonValues[7][1] === "false") {
        setShowListJunk(false);
      } else {
        setShowListJunk(true);
      }
      // [8] is 'setting_list_secret'
      if (jsonValues[8][1] === "false") {
        setShowListSec(false);
      } else {
        setShowListSec(true);
      }
      // [9] is 'setting_spoiler_sec'
      if (jsonValues[9][1] !== null) {
        setSpoilerSec(jsonValues[9][1]);
      }
      // [10] is 'setting_spoiler_egg'
      if (jsonValues[10][1] !== null) {
        setSpoilerEgg(jsonValues[10][1]);
      }
      //alert(`Loaded settings as ${jsonValues}`);
    } catch (e) {
      // Error: Reading the data failed.
      alert('Failed to read settings.');
    }
  };

  // Access theme colors.
  const { colors } = useTheme();

  useEffect(() => {
    // When app renders, check its last saved settings.
    readAllSettings();

  }, []);

  return (
    // Wrap app root in providers to utilize context.
    <SettingContext.Provider value={
      {scheme,
      getCurrentTheme, setCurrentTheme,
      getDefaultDiffN, setDefaultDiffN,
      getDefaultDiffH, setDefaultDiffH,
      getDefaultDiffX, setDefaultDiffX,
      getLootSort, setLootSort,
      getShowListLoot, setShowListLoot,
      getShowListItem, setShowListItem,
      getShowListJunk, setShowListJunk,
      getShowListSec, setShowListSec,
      getSpoilerSec, setSpoilerSec,
      getSpoilerEgg, setSpoilerEgg}
    }>
      {/* Wrap app root in 'ThemeProvider' to use light/dark themes. */}
      <ThemeProvider
        value={scheme === 'dark'
          ? getCurrentTheme !== 'light'
            ? MyDarkTheme
            : MyLightTheme
          : getCurrentTheme !== 'dark'
            ? MyLightTheme
            : MyDarkTheme}
        //value={scheme === 'dark' ? MyDarkTheme : DefaultTheme}
        //value={DefaultTheme}
      >
        <Stack>
          <Stack.Screen
            name="(drawers)"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="list/[missionName]"
            options={{headerShown: (Platform.OS === 'web') ? false : true}}
          />
        </Stack>
      </ThemeProvider>
    </SettingContext.Provider>
  );
}
