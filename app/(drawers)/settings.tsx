import { useTheme } from '@react-navigation/native';
import {
  StyleSheet, Platform,
  Text, TouchableOpacity,
  View, ScrollView
} from 'react-native';
import { useContext } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from '@expo/vector-icons/Ionicons';

import { SectionHeader } from '@/components/sectionHeader';

import { SettingContext } from '@/constants/context';

// TODO: FIX: too much slowdown after opening too many screens!
// TODO: ^^ so figure out how to unload screens from stack?
/* **************** */
/*  SETTINGS SCREEN */
/* **************** */
// Screen for changing app settings.
// Contained in drawer navigator to separate from other screens.
export default function SettingsScreen() {
  // Access safe area context insets.
  const insets = useSafeAreaInsets();

  // Access theme colors.
  const { colors } = useTheme();

  // Fetch global setting states from context.
  const {scheme,
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
    getSpoilerEgg, setSpoilerEgg} =
    useContext(SettingContext);

  // Variables for checkbox icon formatting.
  const checkSize = 14;
  const checkColorOn = (getCurrentTheme === 'dark' ||
    (getCurrentTheme === 'default' && scheme === 'dark'))
    ? 'goldenrod' : 'olive';
  const checkColorOff = (getCurrentTheme === 'dark' ||
    (getCurrentTheme === 'default' && scheme === 'dark'))
    ? 'rgb(140,140,140)' : 'rgb(70,70,70)';

  function updateTheme(newTheme) {
    storeTheme(newTheme);
    setCurrentTheme(newTheme);
  };

  function updateDefDiff(toggleDiff) {
    if (toggleDiff === "default_normal") {
      storeDefDiff(toggleDiff, !getDefaultDiffN);
      setDefaultDiffN(!getDefaultDiffN);
    } else if (toggleDiff === "default_hard") {
      storeDefDiff(toggleDiff, !getDefaultDiffH);
      setDefaultDiffH(!getDefaultDiffH);
    } else if (toggleDiff === "default_expert") {
      storeDefDiff(toggleDiff, !getDefaultDiffX);
      setDefaultDiffX(!getDefaultDiffX);
    }
  };

  function updateLootSort(newSort) {
    storeLootSort(newSort);
    setLootSort(newSort);
  };

  function updateShowList(toggleList) {
    if (toggleList === "list_loot") {
      storeShowList(toggleList, !getShowListLoot);
      setShowListLoot(!getShowListLoot);
    } else if (toggleList === "list_item") {
      storeShowList(toggleList, !getShowListItem);
      setShowListItem(!getShowListItem);
    } else if (toggleList === "list_junk") {
      storeShowList(toggleList, !getShowListJunk);
      setShowListJunk(!getShowListJunk);
    } else if (toggleList === "list_secret") {
      storeShowList(toggleList, !getShowListSec);
      setShowListSec(!getShowListSec);
    }
  };

  function updateSpoilerSec(newSpoilerSec) {
    storeSpoilerSec(newSpoilerSec);
    setSpoilerSec(newSpoilerSec);
  };

  function updateSpoilerEgg(newSpoilerEgg) {
    storeSpoilerEgg(newSpoilerEgg);
    setSpoilerEgg(newSpoilerEgg);
  };

  // Send data to device storage.
  const storeTheme = async (newTheme) => {
    try {
      // Convert setting's state to string.
      //const jsonSetting = JSON.stringify(newTheme);
      await AsyncStorage.setItem(`@setting_theme`, newTheme);
      //alert(`Saved setting_theme as ${newTheme}`);
    } catch (e) {
      // Error: Saving the data failed.
      alert('Failed to save setting.');
    }
  };

  const storeDefDiff = async (toggleDiff, newDefDiff) => {
    try {
      // Convert setting's state to string.
      const jsonSetting = JSON.stringify(newDefDiff);
      await AsyncStorage.setItem(`@setting_${toggleDiff}`, jsonSetting);
      //alert(`Saved setting_${toggleDiff} as ${jsonSetting}`);
    } catch (e) {
      // Error: Saving the data failed.
      alert('Failed to save setting.');
    }
  };

  const storeLootSort = async (newSort) => {
    try {
      // Convert setting's state to string.
      //const jsonSetting = JSON.stringify(newSort);
      await AsyncStorage.setItem(`@setting_loot_sort`, newSort);
      //alert(`Saved setting_loot_sort as ${newSort}`);
    } catch (e) {
      // Error: Saving the data failed.
      alert('Failed to save setting.');
    }
  };

  const storeShowList = async (toggleList, newShowList) => {
    try {
      // Convert setting's state to string.
      const jsonSetting = JSON.stringify(newShowList);
      await AsyncStorage.setItem(`@setting_${toggleList}`, jsonSetting);
      //alert(`Saved setting_${toggleList} as ${jsonSetting}`);
    } catch (e) {
      // Error: Saving the data failed.
      alert('Failed to save setting.');
    }
  };

  const storeSpoilerSec = async (newSpoilerSec) => {
    try {
      // Convert setting's state to string.
      //const jsonSetting = JSON.stringify(newSpoilerSec);
      await AsyncStorage.setItem(`@setting_spoiler_sec`, newSpoilerSec);
      //alert(`Saved setting_theme as ${newSpoilerSec}`);
    } catch (e) {
      // Error: Saving the data failed.
      alert('Failed to save setting.');
    }
  };

  const storeSpoilerEgg = async (newSpoilerEgg) => {
    try {
      // Convert setting's state to string.
      //const jsonSetting = JSON.stringify(newSpoilerEgg);
      await AsyncStorage.setItem(`@setting_spoiler_egg`, newSpoilerEgg);
      //alert(`Saved setting_theme as ${newSpoilerEgg}`);
    } catch (e) {
      // Error: Saving the data failed.
      alert('Failed to save setting.');
    }
  };

  return (
    <View style={{ flex: 1, paddingBottom: insets.bottom }}>
      <ScrollView>
        <View style={styles.settingText}>
          <Text style={{color: colors.text}}>
            Settings Screen
          </Text>
          <Text style={{color: colors.text}}>
            WIP
          </Text>

          <SectionHeader headerName="Theme"/>
          <View style={styles.settingRow}>
            {/* Theme setting: system default. */}
            <TouchableOpacity
              // Change background color when toggled.
              style={[styles.settingButton,
                {backgroundColor: colors.backLight,
                borderColor: colors.border},
                getCurrentTheme !== "default" &&
                {backgroundColor: colors.backDark}
              ]}
              // Change the theme being used.
              onPress={() => updateTheme("default")}
            >
              {/* Change checkbox icon when toggled. */}
              <Ionicons
                name={getCurrentTheme === "default"
                  ? "checkbox" : "square-outline"}
                size={checkSize}
                color={getCurrentTheme === "default"
                  ? checkColorOn : checkColorOff}
              />
              <Text style={[
                styles.settingButtonText,
                {color: getCurrentTheme === "default"
                  ? colors.text : colors.textInvert}
              ]}>
                {` Default`}
              </Text>
            </TouchableOpacity>
            {/* Theme setting: light. */}
            <TouchableOpacity
              // Change background color when toggled.
              style={[styles.settingButton,
                {backgroundColor: colors.backLight,
                borderColor: colors.border},
                getCurrentTheme !== "light" &&
                {backgroundColor: colors.backDark}
              ]}
              // Change the theme being used.
              onPress={() => updateTheme("light")}
            >
              {/* Change checkbox icon when toggled. */}
              <Ionicons
                name={getCurrentTheme === "light"
                  ? "checkbox" : "square-outline"}
                size={checkSize}
                color={getCurrentTheme === "light"
                  ? checkColorOn : checkColorOff}
              />
              <Text style={[
                styles.settingButtonText,
                {color: getCurrentTheme === "light"
                  ? colors.text : colors.textInvert}
              ]}>
                {` Light`}
              </Text>
            </TouchableOpacity>
            {/* Theme setting: dark. */}
            <TouchableOpacity
              // Change background color when toggled.
              style={[styles.settingButton,
                {backgroundColor: colors.backLight,
                borderColor: colors.border},
                getCurrentTheme !== "dark" &&
                {backgroundColor: colors.backDark}
              ]}
              // Change the theme being used.
              onPress={() => updateTheme("dark")}
            >
              {/* Change checkbox icon when toggled. */}
              <Ionicons
                name={getCurrentTheme === "dark"
                  ? "checkbox" : "square-outline"}
                size={checkSize}
                color={getCurrentTheme === "dark"
                  ? checkColorOn : checkColorOff}
              />
              <Text style={[
                styles.settingButtonText,
                {color: getCurrentTheme === "dark"
                  ? colors.text : colors.textInvert}
              ]}>
                {` Dark`}
              </Text>
            </TouchableOpacity>
          </View>
          {/* Dynamic setting description. */}
          <View style={[
            styles.settingText,
            styles.settingSpace
          ]}>
            <Text style={{color: colors.text}}>
              {`This site will ` +
              ((getCurrentTheme === "light" || getCurrentTheme === "dark")
                ? `display in ` +
                  ((getCurrentTheme === "light")
                    ? `light mode.` : `dark mode.`)
                : '') +
              ((getCurrentTheme === "default")
                ? `use your device's default setting` : '')
              }
            </Text>
            <Text style={{color: colors.text}}>
              {((getCurrentTheme === "default")
                ? `for light/dark mode.` : ' ')
              }
            </Text>
          </View>

          <SectionHeader headerName="Default Difficulty Filters"/>
          <View style={styles.settingRow}>
            {/* DefDiff setting: normal difficulty. */}
            <TouchableOpacity
              // Change background color when toggled.
              style={[styles.settingButton,
                {backgroundColor: colors.backLight,
                borderColor: colors.border},
                getDefaultDiffN !== true &&
                {backgroundColor: colors.backDark}
              ]}
              // Toggle whether this difficulty is on by default.
              onPress={() => updateDefDiff("default_normal")}
            >
              {/* Change checkbox icon when toggled. */}
              <Ionicons
                name={getDefaultDiffN === true
                  ? "checkbox" : "square-outline"}
                size={checkSize}
                color={getDefaultDiffN === true
                  ? checkColorOn : checkColorOff}
              />
              <Text style={[
                styles.settingButtonText,
                {color: colors.locN}
              ]}>
                {` ■ Normal`}
              </Text>
            </TouchableOpacity>
            {/* DefDiff setting: hard difficulty. */}
            <TouchableOpacity
              // Change background color when toggled.
              style={[styles.settingButton,
                {backgroundColor: colors.backLight,
                borderColor: colors.border},
                getDefaultDiffH !== true &&
                {backgroundColor: colors.backDark}
              ]}
              // Toggle whether difficulty is on by default.
              onPress={() => updateDefDiff("default_hard")}
            >
              {/* Change checkbox icon when toggled. */}
              <Ionicons
                name={getDefaultDiffH === true
                  ? "checkbox" : "square-outline"}
                size={checkSize}
                color={getDefaultDiffH === true
                  ? checkColorOn : checkColorOff}
              />
              <Text style={[
                styles.settingButtonText,
                {color: colors.locH}
              ]}>
                {` ▲ Hard`}
              </Text>
            </TouchableOpacity>
            {/* DefDiff setting: expert difficulty. */}
            <TouchableOpacity
              // Change background color when toggled.
              style={[styles.settingButton,
                {backgroundColor: colors.backLight,
                borderColor: colors.border},
                getDefaultDiffX !== true &&
                {backgroundColor: colors.backDark}
              ]}
              // Toggle whether difficulty is on by default.
              onPress={() => updateDefDiff("default_expert")}
            >
              {/* Change checkbox icon when toggled. */}
              <Ionicons
                name={getDefaultDiffX === true
                  ? "checkbox" : "square-outline"}
                size={checkSize}
                color={getDefaultDiffX === true
                  ? checkColorOn : checkColorOff}
              />
              <Text style={[
                styles.settingButtonText,
                {color: colors.locX}
              ]}>
                {` ◆ Expert`}
              </Text>
            </TouchableOpacity>
          </View>
          {/* Dynamic setting description. */}
          <View style={[
            styles.settingText,
            styles.settingSpace
          ]}>
            <Text style={{color: colors.text}}>
              {`By default, lootlists will ` +
              ((!getDefaultDiffN && !getDefaultDiffH && !getDefaultDiffX)
                ? `not display any items.`
                : `display ` +
                  ((!getDefaultDiffN || !getDefaultDiffH || !getDefaultDiffX)
                    ? `only ` : '') +
                  `items`
              )}
            </Text>
            <Text style={{color: colors.text}}>
              {((!getDefaultDiffN && !getDefaultDiffH && !getDefaultDiffX)
                ? ' '
                : `present on ` +
                  (getDefaultDiffN && getDefaultDiffH && getDefaultDiffX
                    ? `any difficulty.`
                    : (getDefaultDiffN ? `Normal ` : '') +
                      (getDefaultDiffN && (getDefaultDiffH || getDefaultDiffX)
                        ? `and/or ` : '') +
                      (getDefaultDiffH ? `Hard ` : '') +
                      (getDefaultDiffH && getDefaultDiffX
                        ? `and/or ` : '') +
                      (getDefaultDiffX ? `Expert ` : '') +
                      ((getDefaultDiffN && getDefaultDiffH) ||
                        (getDefaultDiffN && getDefaultDiffX) ||
                        (getDefaultDiffH && getDefaultDiffX)
                        ? `difficulties.` : `difficulty.`)
              ))}
            </Text>
          </View>

          <SectionHeader headerName="Loot Sort"/>
          <View style={styles.settingRow}>
            {/* Sort setting: order found. */}
            <TouchableOpacity
              // Change background color when toggled.
              style={[styles.settingButton,
                {backgroundColor: colors.backLight,
                borderColor: colors.border},
                getLootSort !== "order" &&
                {backgroundColor: colors.backDark}
              ]}
              // Change the theme being used.
              onPress={() => updateLootSort("order")}
            >
              {/* Change checkbox icon when toggled. */}
              <Ionicons
                name={getLootSort === "order"
                  ? "checkbox" : "square-outline"}
                size={checkSize}
                color={getLootSort === "order"
                  ? checkColorOn : checkColorOff}
              />
              <Text style={[
                styles.settingButtonText,
                {color: getLootSort === "order"
                  ? colors.text : colors.textInvert}
              ]}>
                {` Order`}
              </Text>
            </TouchableOpacity>
            {/* Sort setting: type and value. */}
            <TouchableOpacity
              // Change background color when toggled.
              style={[styles.settingButton,
                {backgroundColor: colors.backLight,
                borderColor: colors.border},
                getLootSort !== "value" &&
                {backgroundColor: colors.backDark}
              ]}
              // Change the theme being used.
              onPress={() => updateLootSort("value")}
            >
              {/* Change checkbox icon when toggled. */}
              <Ionicons
                name={getLootSort === "value"
                  ? "checkbox" : "square-outline"}
                size={checkSize}
                color={getLootSort === "value"
                  ? checkColorOn : checkColorOff}
              />
              <Text style={[
                styles.settingButtonText,
                {color: getLootSort === "value"
                  ? colors.text : colors.textInvert}
              ]}>
                {` Value`}
              </Text>
            </TouchableOpacity>
          </View>
          {/* Dynamic setting description. */}
          <View style={[
            styles.settingText,
            styles.settingSpace
          ]}>
            <Text style={{color: colors.text}}>
              {`Each mission's loot section will be sorted`}
            </Text>
            <Text style={{color: colors.text}}>
              {(getLootSort === "order"
                ? `in the order they can be found` : '') +
              (getLootSort === "value"
                ? `by type and value, then in order` : '')
              }
            </Text>
            <Text style={{color: colors.text}}>
              {`(based on my preferred route through the mission` +
              (getLootSort === "order" ? `,` :
                (getLootSort === "value" ? `).` : ''))
              }
            </Text>
            <Text style={{color: colors.text}}>
              {(getLootSort === "order"
                ? `ordered using the Expert route if necessary).` : ' ')
              }
            </Text>
          </View>

          <SectionHeader headerName="Lootlist Sections"/>
          <View style={styles.settingRow}>
            {/* ShowList setting: loot section. */}
            <TouchableOpacity
              // Change background color when toggled.
              style={[styles.settingButton,
                {backgroundColor: colors.backLight,
                borderColor: colors.border},
                getShowListLoot !== true &&
                {backgroundColor: colors.backDark}
              ]}
              // Toggle whether this list section is shown.
              onPress={() => updateShowList("list_loot")}
            >
              {/* Change checkbox icon when toggled. */}
              <Ionicons
                name={getShowListLoot === true
                  ? "checkbox" : "square-outline"}
                size={checkSize}
                color={getShowListLoot === true
                  ? checkColorOn : checkColorOff}
              />
              <Text style={[
                styles.settingButtonText,
                {color: getShowListLoot === true
                  ? colors.text : colors.textInvert}
              ]}>
                {` Loot`}
              </Text>
            </TouchableOpacity>
            {/* ShowList setting: items section. */}
            <TouchableOpacity
              // Change background color when toggled.
              style={[styles.settingButton,
                {backgroundColor: colors.backLight,
                borderColor: colors.border},
                getShowListItem !== true &&
                {backgroundColor: colors.backDark}
              ]}
              // Toggle whether this list section is shown.
              onPress={() => updateShowList("list_item")}
            >
              {/* Change checkbox icon when toggled. */}
              <Ionicons
                name={getShowListItem === true
                  ? "checkbox" : "square-outline"}
                size={checkSize}
                color={getShowListItem === true
                  ? checkColorOn : checkColorOff}
              />
              <Text style={[
                styles.settingButtonText,
                {color: getShowListItem === true
                  ? colors.text : colors.textInvert}
              ]}>
                {` Items`}
              </Text>
            </TouchableOpacity>
            {/* ShowList setting: junk section. */}
            <TouchableOpacity
              // Change background color when toggled.
              style={[styles.settingButton,
                {backgroundColor: colors.backLight,
                borderColor: colors.border},
                getShowListJunk !== true &&
                {backgroundColor: colors.backDark}
              ]}
              // Toggle whether this list section is shown.
              onPress={() => updateShowList("list_junk")}
            >
              {/* Change checkbox icon when toggled. */}
              <Ionicons
                name={getShowListJunk === true
                  ? "checkbox" : "square-outline"}
                size={checkSize}
                color={getShowListJunk === true
                  ? checkColorOn : checkColorOff}
              />
              <Text style={[
                styles.settingButtonText,
                {color: getShowListJunk === true
                  ? colors.text : colors.textInvert}
              ]}>
                {` Junk`}
              </Text>
            </TouchableOpacity>
            {/* ShowList setting: secrets section. */}
            <TouchableOpacity
              // Change background color when toggled.
              style={[styles.settingButton,
                {backgroundColor: colors.backLight,
                borderColor: colors.border},
                getShowListSec !== true &&
                {backgroundColor: colors.backDark}
              ]}
              // Toggle whether this list section is shown.
              onPress={() => updateShowList("list_secret")}
            >
              {/* Change checkbox icon when toggled. */}
              <Ionicons
                name={getShowListSec === true
                  ? "checkbox" : "square-outline"}
                size={checkSize}
                color={getShowListSec === true
                  ? checkColorOn : checkColorOff}
              />
              <Text style={[
                styles.settingButtonText,
                {color: getShowListSec === true
                  ? colors.text : colors.textInvert}
              ]}>
                {` Secrets`}
              </Text>
            </TouchableOpacity>
          </View>
          {/* Dynamic setting description. */}
          <View style={[
            styles.settingText,
            styles.settingSpace
          ]}>
            <Text style={{color: colors.text}}>
              {`Lootlists will ` +
              ((!getShowListLoot && !getShowListItem && !getShowListJunk && !getShowListSec)
                ? `not ` : '') +
              `display ` +
              ((!getShowListLoot && !getShowListItem && !getShowListJunk && !getShowListSec)
                ? `any mission collectibles. `
                : `all of a mission's`
              )}
            </Text>
            <Text style={{color: colors.text}}>
              {(getShowListLoot ? `loot pickups` +
                (((getShowListItem && getShowListJunk) ||
                 (getShowListItem && getShowListSec) ||
                 (getShowListJunk && getShowListSec))
                ? `,` : '')
              : '') +
              ((getShowListLoot && getShowListItem)
                ? ` ` : '') +
              ((getShowListLoot && getShowListItem &&
                !getShowListJunk && !getShowListSec)
                ? `and ` : '') +
              (getShowListItem ? `inventory items` +
                (((getShowListLoot && getShowListJunk) ||
                 (getShowListLoot && getShowListSec) ||
                 (getShowListJunk && getShowListSec))
                ? `,` : '')
              : '') +
              (((getShowListLoot || getShowListItem) && getShowListJunk)
                ? ` ` : '') +
              (( (getShowListLoot || getShowListItem) &&
                getShowListJunk && !getShowListSec)
                ? `and ` : '') +
              (getShowListJunk ? `junk objects` +
                (((getShowListLoot && getShowListSec) ||
                 (getShowListItem && getShowListSec))
                ? `,` : '')
              : '') +
              (((getShowListLoot || getShowListItem || getShowListJunk) &&
                !(getShowListLoot && getShowListItem && getShowListJunk) &&
                getShowListSec)
                ? ` ` : '') +
              (( ((getShowListLoot || getShowListItem || getShowListJunk) &&
                  !(getShowListLoot && getShowListItem && getShowListJunk)) &&
                getShowListSec)
                ? `and ` : '') +
              ((!(getShowListLoot && getShowListItem && getShowListJunk) &&
                getShowListSec)
                ? `secrets` : '') +
              ( ((getShowListLoot && !getShowListItem &&
                  !getShowListJunk && !getShowListSec) ||
                (!getShowListLoot && getShowListItem &&
                  !getShowListJunk && !getShowListSec) ||
                (!getShowListLoot && !getShowListItem &&
                  getShowListJunk && !getShowListSec) ||
                (!getShowListLoot && !getShowListItem &&
                  !getShowListJunk && getShowListSec) )
                ? ` (where applicable).` : ''
              ) +
              (!(getShowListLoot || getShowListItem ||
                getShowListJunk || getShowListSec) ? ' ' : '')}
            </Text>
            <Text style={{color: colors.text}}>
              {((getShowListLoot && getShowListItem &&
                getShowListJunk && getShowListSec)
                ? `and secrets ` : '') +
              ( ((getShowListLoot && getShowListItem) ||
                (getShowListLoot && getShowListJunk) ||
                (getShowListLoot && getShowListSec) ||
                (getShowListItem && getShowListJunk) ||
                (getShowListItem && getShowListSec) ||
                (getShowListJunk && getShowListSec))
                ? `(where applicable).` : ' '
              )}
            </Text>
          </View>

          <SectionHeader headerName="Secret Spoiler Cover"/>
          <View style={styles.settingRow}>
            {/* Secret spoiler setting: no spoiler cover. */}
            <TouchableOpacity
              // Change background color when toggled.
              style={[styles.settingButton,
                {backgroundColor: colors.backLight,
                borderColor: colors.border},
                getSpoilerSec !== "none" &&
                {backgroundColor: colors.backDark}
              ]}
              // Change the spoiler cover being used.
              onPress={() => updateSpoilerSec("none")}
            >
              {/* Change checkbox icon when toggled. */}
              <Ionicons
                name={getSpoilerSec === "none"
                  ? "checkbox" : "square-outline"}
                size={checkSize}
                color={getSpoilerSec === "none"
                  ? checkColorOn : checkColorOff}
              />
              <Text style={[
                styles.settingButtonText,
                {color: getSpoilerSec === "none"
                  ? colors.text : colors.textInvert}
              ]}>
                {` None`}
              </Text>
            </TouchableOpacity>
            {/* Secret spoiler setting: hide precise location. */}
            <TouchableOpacity
              // Change background color when toggled.
              style={[styles.settingButton,
                {backgroundColor: colors.backLight,
                borderColor: colors.border},
                getSpoilerSec !== "partial" &&
                {backgroundColor: colors.backDark}
              ]}
              // Change the spoiler cover being used.
              onPress={() => updateSpoilerSec("partial")}
            >
              {/* Change checkbox icon when toggled. */}
              <Ionicons
                name={getSpoilerSec === "partial"
                  ? "checkbox" : "square-outline"}
                size={checkSize}
                color={getSpoilerSec === "partial"
                  ? checkColorOn : checkColorOff}
              />
              <Text style={[
                styles.settingButtonText,
                {color: getSpoilerSec === "partial"
                  ? colors.text : colors.textInvert}
              ]}>
                {` Hide Location`}
              </Text>
            </TouchableOpacity>
            {/* Secret spoiler setting: hide entire location. */}
            <TouchableOpacity
              // Change background color when toggled.
              style={[styles.settingButton,
                {backgroundColor: colors.backLight,
                borderColor: colors.border},
                getSpoilerSec !== "all" &&
                {backgroundColor: colors.backDark}
              ]}
              // Change the spoiler cover being used.
              onPress={() => updateSpoilerSec("all")}
            >
              {/* Change checkbox icon when toggled. */}
              <Ionicons
                name={getSpoilerSec === "all"
                  ? "checkbox" : "square-outline"}
                size={checkSize}
                color={getSpoilerSec === "all"
                  ? checkColorOn : checkColorOff}
              />
              <Text style={[
                styles.settingButtonText,
                {color: getSpoilerSec === "all"
                  ? colors.text : colors.textInvert}
              ]}>
                {` Hide All`}
              </Text>
            </TouchableOpacity>
          </View>
          {/* Dynamic setting description. */}
          <View style={[
            styles.settingText,
            styles.settingSpace
          ]}>
            <Text style={{color: colors.text}}>
              {`Secret items will ` +
              (getSpoilerSec === "partial"
                ? `show their general area,`
                : `have their locations`
              )}
            </Text>
            <Text style={{color: colors.text}}>
              {(getSpoilerSec === "none"
                ? `fully visible.`
                : (getSpoilerSec === "partial"
                  ? `but not precise location `
                  : (getSpoilerSec === "all"
                    ? `completely hidden ` : ''))) +
                (getSpoilerSec !== "none"
                  ? `(unless selected).` : ''
              )}
            </Text>
          </View>

          <SectionHeader headerName="Easter Egg Spoiler Cover"/>
          <View style={styles.settingRow}>
            {/* Easter egg spoiler setting: no spoiler cover. */}
            <TouchableOpacity
              // Change background color when toggled.
              style={[styles.settingButton,
                {backgroundColor: colors.backLight,
                borderColor: colors.border},
                getSpoilerEgg !== "none" &&
                {backgroundColor: colors.backDark}
              ]}
              // Change the spoiler cover being used.
              onPress={() => updateSpoilerEgg("none")}
            >
              {/* Change checkbox icon when toggled. */}
              <Ionicons
                name={getSpoilerEgg === "none"
                  ? "checkbox" : "square-outline"}
                size={checkSize}
                color={getSpoilerEgg === "none"
                  ? checkColorOn : checkColorOff}
              />
              <Text style={[
                styles.settingButtonText,
                {color: getSpoilerEgg === "none"
                  ? colors.text : colors.textInvert}
              ]}>
                {` None`}
              </Text>
            </TouchableOpacity>
            {/* Easter egg spoiler setting: hide precise location. */}
            <TouchableOpacity
              // Change background color when toggled.
              style={[styles.settingButton,
                {backgroundColor: colors.backLight,
                borderColor: colors.border},
                getSpoilerEgg !== "partial" &&
                {backgroundColor: colors.backDark}
              ]}
              // Change the spoiler cover being used.
              onPress={() => updateSpoilerEgg("partial")}
            >
              {/* Change checkbox icon when toggled. */}
              <Ionicons
                name={getSpoilerEgg === "partial"
                  ? "checkbox" : "square-outline"}
                size={checkSize}
                color={getSpoilerEgg === "partial"
                  ? checkColorOn : checkColorOff}
              />
              <Text style={[
                styles.settingButtonText,
                {color: getSpoilerEgg === "partial"
                  ? colors.text : colors.textInvert}
              ]}>
                {` Hide Location`}
              </Text>
            </TouchableOpacity>
            {/* Easter egg spoiler setting: hide entire location. */}
            <TouchableOpacity
              // Change background color when toggled.
              style={[styles.settingButton,
                {backgroundColor: colors.backLight,
                borderColor: colors.border},
                getSpoilerEgg !== "all" &&
                {backgroundColor: colors.backDark}
              ]}
              // Change the spoiler cover being used.
              onPress={() => updateSpoilerEgg("all")}
            >
              {/* Change checkbox icon when toggled. */}
              <Ionicons
                name={getSpoilerEgg === "all"
                  ? "checkbox" : "square-outline"}
                size={checkSize}
                color={getSpoilerEgg === "all"
                  ? checkColorOn : checkColorOff}
              />
              <Text style={[
                styles.settingButtonText,
                {color: getSpoilerEgg === "all"
                  ? colors.text : colors.textInvert}
              ]}>
                {` Hide All`}
              </Text>
            </TouchableOpacity>
          </View>
          {/* Dynamic setting description. */}
          <View style={[
            styles.settingText,
            styles.settingSpace
          ]}>
            <Text style={{color: colors.text}}>
              {`Easter Egg items will ` +
              (getSpoilerEgg === "partial"
                ? `show their general area,`
                : `have their locations`
              )}
            </Text>
            <Text style={{color: colors.text}}>
              {(getSpoilerEgg === "none"
                ? `fully visible.`
                : (getSpoilerEgg === "partial"
                  ? `but not precise location `
                  : (getSpoilerEgg === "all"
                    ? `completely hidden ` : ''))) +
                (getSpoilerEgg !== "none"
                  ? `(unless selected).` : ''
              )}
            </Text>
          </View>

        </View>
      </ScrollView>
    </View>
  );
}

// Define various styles here.
const styles = StyleSheet.create({
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    //alignItems: 'center',
    flexWrap: 'wrap',
  },
  settingText: {
    flex: 1,
    //justifyContent: 'center',
    alignItems: 'center',
  },
  settingSpace : {
    paddingBottom: (Platform.OS === 'web') ? 28 : 12,
  },
  settingButton: {
    backgroundColor: 'lightgray',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    marginHorizontal: 5,
    marginVertical: 5,
    paddingHorizontal: 4,
    paddingVertical: 2,
    minWidth: 105,
    minHeight: 27,
  },
  settingButtonFalse: {
    backgroundColor: 'darkgray',
  },
  settingButtonText: {
    fontSize: 12,
    fontWeight: 'bold',
  }
});
