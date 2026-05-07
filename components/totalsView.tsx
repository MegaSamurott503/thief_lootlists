import { useTheme } from '@react-navigation/native';
import {
  StyleSheet, Platform,
  Image, ImageBackground,
  Text, TextInput,
  View, ScrollView,
  useWindowDimensions
} from 'react-native';
import { memo, useEffect, useState, useContext } from 'react';

import { GoalView } from '@/components/goalView';

import { stylesList } from '@/constants/stylesList';
import { stylesTotal } from '@/constants/stylesTotal';
import { stylesImg } from '@/constants/stylesImg';
import {
  bgDefaultLight, bgDefaultDark,
  bgFoundLight, bgFoundDark,
  bgFoundLightS, bgFoundDarkS,
  iconGold, iconGems, iconGoods, iconSpecial
} from '@/constants/imgUI';
import {
  SettingContext, FoundContext, CarryoverContext
} from '@/constants/context';

// TODO: make TextInput still visible on mobile (maybe via modal?)
/* **************** */
/*   TOTALS VIEW    */
/* **************** */
// Custom view component of the mission's loot values & requirements.
// Wrap in a memo to avoid unnecessary re-renders.
export const TotalsView = memo(function TotalsView(props) {
  // Access window size.
  const { height, width } = useWindowDimensions();

  // Access theme colors.
  const { colors } = useTheme();

  // Fetch FoundLoot and FoundPocket states from context.
  const {accumLoot, accumPiece, accumPocket} = useContext(FoundContext);

  // Fetch CarryLoot and CarryFound states from context.
  const {getCarryLoot, setCarryLoot,
        getCarryFoundN, setCarryFoundN,
        getCarryFoundH, setCarryFoundH,
        getCarryFoundX, setCarryFoundX} =
    useContext(CarryoverContext);

  // Fetch global setting states from context.
  const {scheme, getCurrentTheme, setCurrentTheme} =
    useContext(SettingContext);

  // FoundLoot: tracks the values of loot selected by the user.
  // Each nested array is for Normal, Hard, & Expert difficulty.
  // Each index in an array is for gold, gems, goods, special, and total.
  const [getFoundLoot, setFoundLoot] =
    useState([[0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]]);

  // FoundPiece: tracks the pieces of loot selected by the user.
  // Each index in the array is for Normal, Hard, & Expert difficulty.
  const [getFoundPiece, setFoundPiece] = useState([0,0,0]);

  // FoundPocket: tracks the pickpockets selected by the user.
  // Each index in the array is for Normal, Hard, & Expert difficulty.
  const [getFoundPocket, setFoundPocket] = useState([0,0,0]);

  // Share: tracks if any difficulties have the same loot total.
  // [ N+H, H+X, N+X ]
  // Used to determine which total table headers to show.
  const [getShareNH, setShareNH] = useState(false);
  const [getShareHX, setShareHX] = useState(false);
  const [getShareNX, setShareNX] = useState(false);

  // Goal: tracks if any difficulties have the same loot goal.
  // [ N+H, H+X, N+X ]
  // Used to determine which goal table headers to show.
  const [getGoalNH, setGoalNH] = useState(false);
  const [getGoalHX, setGoalHX] = useState(false);
  const [getGoalNX, setGoalNX] = useState(false);

  // Pocket: tracks if any difficulties have the same pickpockets.
  // [ N+H, H+X, N+X ]
  // Used to determine which pickpocket table headers to show.
  const [getPocketNH, setPocketNH] = useState(false);
  const [getPocketHX, setPocketHX] = useState(false);
  const [getPocketNX, setPocketNX] = useState(false);

  // Read data from device storage.
  /*const readFoundLoot = async () => {
    try {
      const jsonArray = await AsyncStorage.getItem(`@myloot_${props.title}`);
      // Convert item's state from string to boolean.
      const parseArray = JSON.parse(jsonArray);
      if (parseArray !== null) {
        setFoundLoot(parseArray);
        //alert(`Loaded myloot_${props.title} as ${parseArray}`);
      }
    } catch (e) {
      // Error: Reading the data failed.
      alert('Failed to read loot array.');
    }
  };
  const readFoundPocket = async () => {
    try {
      const jsonArray = await AsyncStorage.getItem(`@mypocket_${props.title}`);
      // Convert item's state from string to boolean.
      const parseArray = JSON.parse(jsonArray);
      if (parseArray !== null) {
        setFoundPocket(parseArray);
        //alert(`Loaded mypocket_${props.title} as ${parseArray}`);
      }
    } catch (e) {
      // Error: Reading the data failed.
      alert('Failed to read pocket array.');
    }
  };*/

  // Function to limit the TextInput to numeric characters.
  function onlyNumeric(over) {
    // Failsafe so an empty input doesn't cause errors.
    if (over === '') {
      over = '0';
    }
    // Use a regex to remove any characters that aren't numbers.
    over = over.replace(/[^0-9]/g, '');
    // Use a regex to remove any leading zeros.
    over = over.replace(/^0+/, '');
    setCarryLoot(over);
  };

  useEffect(() => {
    // When component renders, check its last saved data.
    //readFoundLoot();
    //readFoundPocket();

    // Do Normal and Hard have the same loot totals?
    if (props.totals && props.lootChanges) {
      if (props.lootChanges[0] === props.lootChanges[1]) {
          //props.totals[0][0] === props.totals[1][0] &&
          //props.totals[0][1] === props.totals[1][1] &&
          //props.totals[0][2] === props.totals[1][2] &&
          //props.totals[0][3] === props.totals[1][3] &&
          //props.totals[0][4] === props.totals[1][4]) {
        setShareNH(true);
        // Do Normal and Hard have the same loot goal?
        setGoalNH(true);
        if (props.goal1) {
          if (props.goal1.total &&
          props.goal1.total[0] !== props.goal1.total[1]) {
            setGoalNH(false);
          }
          if (props.goal1.gold &&
          props.goal1.gold[0] !== props.goal1.gold[1]) {
            setGoalNH(false);
          }
          if (props.goal1.gems &&
          props.goal1.gems[0] !== props.goal1.gems[1]) {
            setGoalNH(false);
          }
          if (props.goal1.goods &&
          props.goal1.goods[0] !== props.goal1.goods[1]) {
            setGoalNH(false);
          }
          if (props.goal1.special &&
          props.goal1.special[0] !== props.goal1.special[1]) {
            setGoalNH(false);
          }
        }
        if (props.goal2) {
          if (props.goal2.total &&
          props.goal2.total[0] !== props.goal2.total[1]) {
            setGoalNH(false);
          }
          if (props.goal2.gold &&
          props.goal2.gold[0] !== props.goal2.gold[1]) {
            setGoalNH(false);
          }
          if (props.goal2.gems &&
          props.goal2.gems[0] !== props.goal2.gems[1]) {
            setGoalNH(false);
          }
          if (props.goal2.goods &&
          props.goal2.goods[0] !== props.goal2.goods[1]) {
            setGoalNH(false);
          }
          if (props.goal2.special &&
          props.goal2.special[0] !== props.goal2.special[1]) {
            setGoalNH(false);
          }
        }
      }
      // Do Hard and Expert have the same loot totals?
      if (props.lootChanges[1] === props.lootChanges[2]) {
          //props.totals[1][0] === props.totals[2][0] &&
          //props.totals[1][1] === props.totals[2][1] &&
          //props.totals[1][2] === props.totals[2][2] &&
          //props.totals[1][3] === props.totals[2][3] &&
          //props.totals[1][4] === props.totals[2][4]) {
        setShareHX(true);
        // Do Hard and Expert have the same loot goal?
        setGoalHX(true);
        if (props.goal1) {
          if (props.goal1.total &&
          props.goal1.total[1] !== props.goal1.total[2]) {
            setGoalHX(false);
          }
          if (props.goal1.gold &&
          props.goal1.gold[1] !== props.goal1.gold[2]) {
            setGoalHX(false);
          }
          if (props.goal1.gems &&
          props.goal1.gems[1] !== props.goal1.gems[2]) {
            setGoalHX(false);
          }
          if (props.goal1.goods &&
          props.goal1.goods[1] !== props.goal1.goods[2]) {
            setGoalHX(false);
          }
          if (props.goal1.special &&
          props.goal1.special[1] !== props.goal1.special[2]) {
            setGoalHX(false);
          }
        }
        if (props.goal2) {
          if (props.goal2.total &&
          props.goal2.total[1] !== props.goal2.total[2]) {
            setGoalHX(false);
          }
          if (props.goal2.gold &&
          props.goal2.gold[1] !== props.goal2.gold[2]) {
            setGoalHX(false);
          }
          if (props.goal2.gems &&
          props.goal2.gems[1] !== props.goal2.gems[2]) {
            setGoalHX(false);
          }
          if (props.goal2.goods &&
          props.goal2.goods[1] !== props.goal2.goods[2]) {
            setGoalHX(false);
          }
          if (props.goal2.special &&
          props.goal2.special[1] !== props.goal2.special[2]) {
            setGoalHX(false);
          }
        }
      }
      // Do Normal and Expert have the same loot totals?
      if (props.lootChanges[0] === props.lootChanges[2]) {
          //props.totals[0][0] === props.totals[2][0] &&
          //props.totals[0][1] === props.totals[2][1] &&
          //props.totals[0][2] === props.totals[2][2] &&
          //props.totals[0][3] === props.totals[2][3] &&
          //props.totals[0][4] === props.totals[2][4]) {
        setShareNX(true);
        // Do Normal and Expert have the same loot goal?
        setGoalNX(true);
        if (props.goal1) {
          if (props.goal1.total &&
          props.goal1.total[0] !== props.goal1.total[2]) {
            setGoalNX(false);
          }
          if (props.goal1.gold &&
          props.goal1.gold[0] !== props.goal1.gold[2]) {
            setGoalNX(false);
          }
          if (props.goal1.gems &&
          props.goal1.gems[0] !== props.goal1.gems[2]) {
            setGoalNX(false);
          }
          if (props.goal1.goods &&
          props.goal1.goods[0] !== props.goal1.goods[2]) {
            setGoalNX(false);
          }
          if (props.goal1.special &&
          props.goal1.special[0] !== props.goal1.special[2]) {
            setGoalNX(false);
          }
        }
        if (props.goal2) {
          if (props.goal2.total &&
          props.goal2.total[0] !== props.goal2.total[2]) {
            setGoalNX(false);
          }
          if (props.goal2.gold &&
          props.goal2.gold[0] !== props.goal2.gold[2]) {
            setGoalNX(false);
          }
          if (props.goal2.gems &&
          props.goal2.gems[0] !== props.goal2.gems[2]) {
            setGoalNX(false);
          }
          if (props.goal2.goods &&
          props.goal2.goods[0] !== props.goal2.goods[2]) {
            setGoalNX(false);
          }
          if (props.goal2.special &&
          props.goal2.special[0] !== props.goal2.special[2]) {
            setGoalNX(false);
          }
        }
      }
    }

    if (props.pocketCount && props.pocketChanges) {
      // Do Normal and Hard have the same pickpockets?
      if (props.pocketChanges[0] === props.pocketChanges[1]) {
        setPocketNH(true);
      }
      // Do Hard and Expert have the same pickpockets?
      if (props.pocketChanges[1] === props.pocketChanges[2]) {
        setPocketHX(true);
      }
      // Do Normal and Expert have the same pickpockets?
      if (props.pocketChanges[0] === props.pocketChanges[2]) {
        setPocketNX(true);
      }
    }

    // If navigating directly from previous mission,
    // retain that mission's found loot total, if needed.
    if (props.carriedLoot) {
      setCarryLoot(props.carriedLoot.toString());
    }

    // Create an interval to force the found totals to update.
    const updateMe = setInterval(() => {
      setFoundLoot(accumLoot.current);
      setFoundPiece(accumPiece.current);
      setFoundPocket(accumPocket.current);
    // Delay how often the interval updates.
    // 200 milliseconds = five times per second.
    }, 200);

    // Clear the interval when the component unmounts.
    return () => clearInterval(updateMe);
  }, []);

  return (
    <View style={[styles.totalBorder, {borderColor: colors.border}]}>
      <ScrollView
        style={{
          flexGrow: (Platform.OS === 'web') ? 0 : 1,
          height: (!props.totals && !props.pocketCount) ? '0%' :
            (Platform.OS === 'web') ? height*0.33 : '25%'
        }}
        contentContainerStyle={styles.totalView}
      >
        {/* If loot carries over from the previous mission,
            allow user to input the total loot they found. */}
        {props.totals && props.carryLoot &&
          <View style={styles.carryView}>
            <Text style={[styles.carryText, {color: colors.text}]}>
              {`Enter previous loot: `}
            </Text>
            <TextInput
              style={[
                styles.carryInput,
                {color: colors.text,
                borderColor: colors.inputBorder}
              ]}
              inputMode='numeric'
              maxLength={5}
              onChangeText={over => onlyNumeric(over)}
              value={getCarryLoot}
              // Show carryover loot found in the previous mission.
              defaultValue={getCarryLoot.toString()}
            />
          </View>
        }
        {/* If this mission has loot,
            display a table showing totals for each loot value. */}
        {(props.totals &&
         (Math.max(...props.totals[0]) > 0 ||
          Math.max(...props.totals[1]) > 0 ||
          Math.max(...props.totals[2]) > 0) ) &&
          <View style={styles.spacedView}>
            <View style={styles.tableHeader}>
              <View style={[
                styles.tableHeadBox,
                styles.sizeRowStart,
                {backgroundColor: colors.backDark,
                borderColor: colors.border}
              ]}>
                <Text style={styles.tableHeadText}>
                  Loot Totals
                  </Text>
              </View>
              {/* Column headers for gold / gems / goods / special / total. */}
              <View style={[
                styles.tableHeadBox,
                {width: (Platform.OS !== 'web')
                        ? (width < 400) ? 48 : 66
                        : (width < 626) ? 60 : 100,
                backgroundColor: colors.backDark,
                borderColor: colors.border}
              ]}>
                <Image
                  source={iconGold}
                  style={stylesImg.imgLootIcon}
                />
              </View>
              <View style={[
                styles.tableHeadBox,
                {width: (Platform.OS !== 'web')
                        ? (width < 400) ? 48 : 66
                        : (width < 626) ? 60 : 100,
                backgroundColor: colors.backDark,
                borderColor: colors.border}
              ]}>
                <Image
                  source={iconGems}
                  style={stylesImg.imgLootIcon}
                />
              </View>
              <View style={[
                styles.tableHeadBox,
                {width: (Platform.OS !== 'web')
                        ? (width < 400) ? 48 : 66
                        : (width < 626) ? 60 : 100,
                backgroundColor: colors.backDark,
                borderColor: colors.border}
              ]}>
                <Image
                  source={iconGoods}
                  style={stylesImg.imgLootIcon}
                />
              </View>
              {(props.totals[0][3] > 0 ||
                props.totals[1][3] > 0 ||
                props.totals[2][3] > 0) &&
                <View style={[
                  styles.tableHeadBox,
                  {width: (Platform.OS !== 'web')
                          ? (width < 400) ? 48 : 66
                          : (width < 626) ? 60 : 100,
                  backgroundColor: colors.backDark,
                  borderColor: colors.border}
                ]}>
                  <Image
                    source={iconSpecial}
                    style={stylesImg.imgLootIcon}
                  />
                </View>
              }
              <View style={[
                styles.tableHeadBox,
                {width: (Platform.OS !== 'web')
                        ? (width < 400) ? 48 : 66
                        : (width < 626) ? 60 : 100,
                backgroundColor: colors.backDark,
                borderColor: colors.border}
              ]}>
                <Text style={styles.tableHeadText}>Total</Text>
              </View>
              {/* Extra column if loot carries over. */}
              {props.carryLoot &&
                <View style={[
                  styles.tableHeadBox,
                  {width: (Platform.OS !== 'web')
                          ? (width < 400) ? 48 : 66
                          : (width < 626) ? 60 : 100,
                  backgroundColor: colors.backDark,
                  borderColor: colors.border}
                ]}>
                  <Text style={[
                    styles.tableHeadText,
                    {fontSize: (Platform.OS !== 'web') ? 8 :
                            (width < 626) ? 10 : 14}
                  ]}>+ Carryover</Text>
                </View>
              }
            </View>
            {props.totals.map((outerKey, a) => (
              <View key={`outer_${a}`}>
                {/* Default row: All, N+H, N+X, or N */}
                {/* Second row: H+X or H */}
                {/* Third row: X */}
                {((a === 0) ||
                  (a === 1 && !getShareNH) ||
                  (a === 2 && !getShareHX && !getShareNX)) &&
                  <View style={styles.tableRow}>
                    {Math.max(...outerKey) > 0 &&
                      <>
                        <View style={[
                          styles.tableRowStart,
                          styles.sizeRowStart,
                          {backgroundColor: colors.backMed,
                          borderColor: colors.border}
                        ]}>
                          {/* All difficulties have the same total. */}
                          {a === 0 &&
                            getShareNH && getShareHX && getShareNX &&
                            <Text style={[
                              stylesTotal.tableRowText, {color: colors.text}
                            ]}>
                              All
                            </Text>
                          }
                          {/* Normal and Hard have the same total. */}
                          {a === 0 &&
                            getShareNH && !getShareHX && !getShareNX &&
                            <Text style={[
                              stylesTotal.tableRowText, {color: colors.text}
                            ]}>
                              <Text style={[
                                stylesList.locCount, {color: colors.locN}
                              ]}>
                                {props.diffNames[0]}
                              </Text>/
                              <Text style={[
                                stylesList.locCount, {color: colors.locH}
                              ]}>
                                {props.diffNames[1]}
                              </Text>
                            </Text>
                          }
                          {/* Hard and Expert have the same total. */}
                          {a === 1 &&
                            !getShareNH && getShareHX && !getShareNX &&
                            <Text style={[
                              stylesTotal.tableRowText, {color: colors.text}
                            ]}>
                              <Text style={[
                                stylesList.locCount, {color: colors.locH}
                              ]}>
                                {props.diffNames[1]}
                              </Text>/
                              <Text style={[
                                stylesList.locCount, {color: colors.locX}
                              ]}>
                                {props.diffNames[2]}
                              </Text>
                            </Text>
                          }
                          {/* Normal and Expert have the same total. */}
                          {a === 0 &&
                            !getShareNH && !getShareHX && getShareNX &&
                            <Text style={[
                              stylesTotal.tableRowText, {color: colors.text}
                            ]}>
                              <Text style={[
                                stylesList.locCount, {color: colors.locN}
                              ]}>
                                {props.diffNames[0]}
                              </Text>/
                              <Text style={[
                                stylesList.locCount, {color: colors.locX}
                              ]}>
                                {props.diffNames[2]}
                              </Text>
                            </Text>
                          }
                          {/* Normal has a different total. */}
                          {a === 0 && !getShareNH && !getShareNX &&
                            <Text style={stylesTotal.tableRowText}>
                              <Text style={[
                                stylesList.locCount, {color: colors.locN}
                              ]}>
                                {props.diffNames[0]}
                              </Text>
                            </Text>
                          }
                          {/* Hard has a different total. */}
                          {a === 1 && !getShareNH && !getShareHX &&
                            <Text style={stylesTotal.tableRowText}>
                              <Text style={[
                                stylesList.locCount, {color: colors.locH}
                              ]}>
                                {props.diffNames[1]}
                              </Text>
                            </Text>
                          }
                          {/* Expert has a different total. */}
                          {a === 2 && !getShareHX && !getShareNX &&
                            <Text style={stylesTotal.tableRowText}>
                              <Text style={[
                                stylesList.locCount, {color: colors.locX}
                              ]}>
                                {props.diffNames[2]}
                              </Text>
                            </Text>
                          }
                        </View>
                        {/* Display found loot value & max loot value. */}
                        {outerKey.map((innerKey, b) => (
                          <View key={`inner_${b}`}>
                            {((b !== 3) || (b === 3 && innerKey > 0)) &&
                              <View
                                style={[stylesTotal.tableRowBox,
                                  {width: (Platform.OS !== 'web')
                                          ? (width < 400) ? 48 : 66
                                          : (width < 626) ? 60 : 100,
                                  borderColor: colors.border}
                              ]}>
                                <ImageBackground
                                  source={(getCurrentTheme === 'dark' ||
                                    (getCurrentTheme === 'default' && scheme === 'dark'))
                                    ? ((getFoundLoot[a][b] >= innerKey)
                                      ? ((Platform.OS === 'web' && width < 626)
                                        ? bgFoundDarkS : bgFoundDark)
                                      : bgDefaultDark)
                                    : ((getFoundLoot[a][b] >= innerKey)
                                      ? ((Platform.OS === 'web' && width < 626)
                                        ? bgFoundLightS : bgFoundLight)
                                      : bgDefaultLight)}
                                  resizeMode="cover"
                                  style={[
                                    stylesTotal.totalBackground,
                                    (Platform.OS === 'web') ? stylesTotal.totalBackgroundWeb : ''
                                  ]}
                                >
                                  <Text style={[
                                    stylesTotal.tableRowText, {color: colors.text}
                                  ]}>
                                    {getFoundLoot[a][b]}
                                    {((Platform.OS !== 'web' && width < 400) ||
                                      (Platform.OS === 'web' && width < 626)) &&
                                      "\n"
                                    }
                                    {" / "}
                                    {innerKey}
                                  </Text>
                                </ImageBackground>
                              </View>
                            }
                          </View>
                        ))}
                        {/* Carryover loot box if input is empty. */}
                        {props.carryLoot && getCarryLoot === '' &&
                          <View style={[stylesTotal.tableRowBox,
                            {width: (Platform.OS !== 'web')
                                    ? (width < 400) ? 48 : 66
                                    : (width < 626) ? 60 : 100,
                            borderColor: colors.border}
                          ]}>
                            <ImageBackground
                              source={(getCurrentTheme === 'dark' ||
                                (getCurrentTheme === 'default' && scheme === 'dark'))
                                ? ((getFoundLoot[a][4] >= props.totals[a][4])
                                  ? ((Platform.OS === 'web' && width < 626)
                                    ? bgFoundDarkS : bgFoundDark)
                                  : bgDefaultDark)
                                : ((getFoundLoot[a][4] >= props.totals[a][4])
                                  ? ((Platform.OS === 'web' && width < 626)
                                    ? bgFoundLightS : bgFoundLight)
                                  : bgDefaultLight)}
                              resizeMode="cover"
                              style={[
                                stylesTotal.totalBackground,
                                (Platform.OS === 'web') ? stylesTotal.totalBackgroundWeb : ''
                              ]}
                            >
                              <Text style={[
                                stylesTotal.tableRowText, {color: colors.text}
                              ]}>
                                {getFoundLoot[a][4]}
                                {((Platform.OS !== 'web' && width < 400) ||
                                  (Platform.OS === 'web' && width < 626)) &&
                                  "\n"
                                }
                                {" / "}
                                {props.totals[a][4]}
                              </Text>
                            </ImageBackground>
                          </View>
                        }
                        {/* Carryover loot box if input is given. */}
                        {props.carryLoot && getCarryLoot !== '' &&
                          <View style={[stylesTotal.tableRowBox,
                            {width: (Platform.OS !== 'web')
                                    ? (width < 400) ? 48 : 66
                                    : (width < 626) ? 60 : 100,
                            borderColor: colors.border},
                            (parseInt(getCarryLoot) + getFoundLoot[a][4]) >=
                            (parseInt(getCarryLoot) + props.totals[a][4]) &&
                            {backgroundColor: colors.found}
                          ]}>
                            <ImageBackground
                              source={(getCurrentTheme === 'dark' ||
                                (getCurrentTheme === 'default' && scheme === 'dark'))
                                ? ( (((a === 0 && getCarryFoundN) ||
                                      (a === 1 && getCarryFoundH) ||
                                      (a === 2 && getCarryFoundX)) &&
                                  (parseInt(getCarryLoot) + getFoundLoot[a][4]) >=
                                  (parseInt(getCarryLoot) + props.totals[a][4]))
                                  ? ((Platform.OS === 'web' && width < 626)
                                    ? bgFoundDarkS : bgFoundDark)
                                  : bgDefaultDark)
                                : ( (((a === 0 && getCarryFoundN) ||
                                      (a === 1 && getCarryFoundH) ||
                                      (a === 2 && getCarryFoundX)) &&
                                  (parseInt(getCarryLoot) + getFoundLoot[a][4]) >=
                                  (parseInt(getCarryLoot) + props.totals[a][4]))
                                  ? ((Platform.OS === 'web' && width < 626)
                                    ? bgFoundLightS : bgFoundLight)
                                  : bgDefaultLight)}
                              resizeMode="cover"
                              style={[
                                stylesTotal.totalBackground,
                                (Platform.OS === 'web') ? stylesTotal.totalBackgroundWeb : ''
                              ]}
                            >
                              <Text style={[
                                stylesTotal.tableRowText, {color: colors.text}
                              ]}>
                                {((a === 0 && getCarryFoundN) ||
                                  (a === 1 && getCarryFoundH) ||
                                  (a === 2 && getCarryFoundX)) &&
                                  parseInt(getCarryLoot) + getFoundLoot[a][4]}
                                {!((a === 0 && getCarryFoundN) ||
                                   (a === 1 && getCarryFoundH) ||
                                   (a === 2 && getCarryFoundX)) &&
                                  getFoundLoot[a][4]}
                                {((Platform.OS !== 'web' && width < 400) ||
                                  (Platform.OS === 'web' && width < 626)) &&
                                  "\n"
                                }
                                {" / "}
                                {parseInt(getCarryLoot) + props.totals[a][4]}
                              </Text>
                            </ImageBackground>
                          </View>
                        }
                      </>
                    }
                  </View>
                }
              </View>
            ))}
          </View>
        }

        {/* If this mission has loot,
            display a table of loot piece counts. */}
        {(props.totals && props.lootCount &&
         (Math.max(...props.lootCount) > 0) ) &&
          <View style={styles.spacedView}>
            <View style={styles.tableHeader}>
              <View style={[
                styles.tableHeadBox,
                styles.sizeRowStart,
                {backgroundColor: colors.backDark,
                borderColor: colors.border}
              ]}>
                <Text style={styles.tableHeadText}>Loot Pieces</Text>
              </View>
              {/* Column header. */}
              <View style={[
                styles.tableHeadBox,
                styles.pieceRowBox,
                {backgroundColor: colors.backDark,
                borderColor: colors.border}
              ]}>
                <Text style={styles.tableHeadText}>Total</Text>
              </View>
            </View>
            {props.lootCount.map((pieceKey, e) => (
              <View key={`piece_${e}`}>
                {/* Default row: All, N+H, N+X, or N */}
                {/* Second row: H+X or H */}
                {/* Third row: X */}
                {((e === 0) ||
                  (e === 1 && !getShareNH) ||
                  (e === 2 && !getShareHX && !getShareNX)) &&
                  <View style={styles.tableRow}>
                    {pieceKey > 0 &&
                      <>
                        <View style={[
                          styles.tableRowStart,
                          styles.sizeRowStart,
                          {backgroundColor: colors.backMed,
                          borderColor: colors.border}
                        ]}>
                          {/* All difficulties have the same loot. */}
                          {e === 0 &&
                            getShareNH && getShareHX && getShareNX &&
                            <Text style={[
                              stylesTotal.tableRowText, {color: colors.text}
                            ]}>
                              All
                            </Text>
                          }
                          {/* Normal and Hard have the same loot. */}
                          {e === 0 &&
                            getShareNH && !getShareHX && !getShareNX &&
                            <Text style={[
                              stylesTotal.tableRowText, {color: colors.text}
                            ]}>
                              <Text style={[
                                stylesList.locCount, {color: colors.locN}
                              ]}>
                                {props.diffNames[0]}
                              </Text>/
                              <Text style={[
                                stylesList.locCount, {color: colors.locH}
                              ]}>
                                {props.diffNames[1]}
                              </Text>
                            </Text>
                          }
                          {/* Hard and Expert have the same loot. */}
                          {e === 1 &&
                            !getShareNH && getShareHX && !getShareNX &&
                            <Text style={[
                              stylesTotal.tableRowText, {color: colors.text}
                            ]}>
                              <Text style={[
                                stylesList.locCount, {color: colors.locH}
                              ]}>
                                {props.diffNames[1]}
                              </Text>/
                              <Text style={[
                                stylesList.locCount, {color: colors.locX}
                              ]}>
                                {props.diffNames[2]}
                              </Text>
                            </Text>
                          }
                          {/* Normal and Expert have the same loot. */}
                          {e === 0 &&
                            !getShareNH && !getShareHX && getShareNX &&
                            <Text style={[
                              stylesTotal.tableRowText, {color: colors.text}
                            ]}>
                              <Text style={[
                                stylesList.locCount, {color: colors.locN}
                              ]}>
                                {props.diffNames[0]}
                              </Text>/
                              <Text style={[
                                stylesList.locCount, {color: colors.locX}
                              ]}>
                                {props.diffNames[2]}
                              </Text>
                            </Text>
                          }
                          {/* Normal has different loot. */}
                          {e === 0 && !getShareNH && !getShareNX &&
                            <Text style={stylesTotal.tableRowText}>
                              <Text style={[
                                stylesList.locCount, {color: colors.locN}
                              ]}>
                                {props.diffNames[0]}
                              </Text>
                            </Text>
                          }
                          {/* Hard has different loot. */}
                          {e === 1 && !getShareNH && !getShareHX &&
                            <Text style={stylesTotal.tableRowText}>
                              <Text style={[
                                stylesList.locCount, {color: colors.locH}
                              ]}>
                                {props.diffNames[1]}
                              </Text>
                            </Text>
                          }
                          {/* Expert has different loot. */}
                          {e === 2 && !getShareHX && !getShareNX &&
                            <Text style={stylesTotal.tableRowText}>
                              <Text style={[
                                stylesList.locCount, {color: colors.locX}
                              ]}>
                                {props.diffNames[2]}
                              </Text>
                            </Text>
                          }
                        </View>
                        {/* Display found loot pieces & max loot pieces. */}
                        <View style={[
                          stylesTotal.tableRowBox,
                          styles.pieceRowBox,
                          {borderColor: colors.border}
                        ]}>
                          <ImageBackground
                            source={(getCurrentTheme === 'dark' ||
                              (getCurrentTheme === 'default' && scheme === 'dark'))
                              ? ((getFoundPiece[e] >= props.lootCount[e])
                                ? ((Platform.OS === 'web' && width < 626)
                                  ? bgFoundDarkS : bgFoundDark)
                                : bgDefaultDark)
                              : ((getFoundPiece[e] >= props.lootCount[e])
                                ? ((Platform.OS === 'web' && width < 626)
                                  ? bgFoundLightS : bgFoundLight)
                                : bgDefaultLight)}
                            resizeMode="cover"
                            style={[
                              stylesTotal.totalBackground,
                              (Platform.OS === 'web') ? stylesTotal.totalBackgroundWeb : ''
                            ]}
                          >
                            <Text style={[stylesTotal.tableRowText, {color: colors.text}]}>
                              {getFoundPiece[e]}{" / "}{props.lootCount[e]}
                            </Text>
                          </ImageBackground>
                        </View>
                      </>
                    }
                  </View>
                }
              </View>
            ))}
          </View>
        }

        {/* If this mission has a loot goal,
            display a table of loot goals. */}
        {( (props.goal1 && props.goal1.total &&
            Math.max(...props.goal1.total) > 0) ||
           (props.goal2 && props.goal2.total &&
            Math.max(...props.goal2.total) > 0) ) &&
          <View style={styles.spacedView}>
            <View style={styles.tableHeader}>
              <View style={[
                styles.tableHeadBox,
                styles.sizeRowStart,
                {backgroundColor: colors.backDark,
                borderColor: colors.border}
              ]}>
                <Text style={styles.tableHeadText}>Loot Goals</Text>
              </View>
              {/* Column for the first loot goal. */}
              {props.goal1 && props.goal1.total &&
                Math.max(...props.goal1.total) > 0 &&
                <View style={[
                  styles.tableHeadBox,
                  {width: (Platform.OS !== 'web')
                          ? (width < 400) ? 48 : 66
                          : (width < 626) ? 60 : 100,
                  backgroundColor: colors.backDark,
                  borderColor: colors.border}
                ]}>
                  {/* Is this loot goal optional or a bonus? */}
                  {props.goal1.info !== "optional" &&
                   props.goal1.info !== "bonus" &&
                    <Text style={styles.tableHeadText}>Required</Text>
                  }
                  {props.goal1.info === "optional" &&
                    <Text style={styles.tableHeadText}>(Optional)</Text>
                  }
                  {props.goal1.info === "bonus" &&
                    <Text style={styles.tableHeadText}>(Bonus)</Text>
                  }
                </View>
              }
              {/* Column for the first goal's gold minimum. */}
              {props.goal1 && props.goal1.gold &&
                Math.max(...props.goal1.gold) > 0 &&
                <View style={[
                  styles.tableHeadBox,
                  {width: (Platform.OS !== 'web')
                          ? (width < 400) ? 48 : 66
                          : (width < 626) ? 60 : 100,
                  backgroundColor: colors.backDark,
                  borderColor: colors.border}
                ]}>
                  <Image
                    source={iconGold}
                    style={stylesImg.imgLootIcon}
                  />
                </View>
              }
              {/* Column for the first goal's gems minimum. */}
              {props.goal1 && props.goal1.gems &&
                Math.max(...props.goal1.gems) > 0 &&
                <View style={[
                  styles.tableHeadBox,
                  {width: (Platform.OS !== 'web')
                          ? (width < 400) ? 48 : 66
                          : (width < 626) ? 60 : 100,
                  backgroundColor: colors.backDark,
                  borderColor: colors.border}
                ]}>
                  <Image
                    source={iconGems}
                    style={stylesImg.imgLootIcon}
                  />
                </View>
              }
              {/* Column for the first goal's goods minimum. */}
              {props.goal1 && props.goal1.goods &&
                Math.max(...props.goal1.goods) > 0 &&
                <View style={[
                  styles.tableHeadBox,
                  {width: (Platform.OS !== 'web')
                          ? (width < 400) ? 48 : 66
                          : (width < 626) ? 60 : 100,
                  backgroundColor: colors.backDark,
                  borderColor: colors.border}
                ]}>
                  <Image
                    source={iconGoods}
                    style={stylesImg.imgLootIcon}
                  />
                </View>
              }
              {/* Column for the first goal's special minimum. */}
              {props.goal1 && props.goal1.special &&
                Math.max(...props.goal1.special) > 0 &&
                <View style={[
                  styles.tableHeadBox,
                  {width: (Platform.OS !== 'web')
                          ? (width < 400) ? 48 : 66
                          : (width < 626) ? 60 : 100,
                  backgroundColor: colors.backDark,
                  borderColor: colors.border}
                ]}>
                  <Image
                    source={iconSpecial}
                    style={stylesImg.imgLootIcon}
                  />
                </View>
              }
              {/* Column for the second loot goal. */}
              {props.goal2 && props.goal2.total &&
                Math.max(...props.goal2.total) > 0 &&
                <View style={[
                  styles.tableHeadBox,
                  {width: (Platform.OS !== 'web')
                          ? (width < 400) ? 48 : 66
                          : (width < 626) ? 60 : 100,
                  backgroundColor: colors.backDark,
                  borderColor: colors.border}
                ]}>
                  {/* Is this loot goal optional or a bonus? */}
                  {props.goal2.info !== "optional" &&
                   props.goal2.info !== "bonus" &&
                    <Text style={styles.tableHeadText}>Required</Text>
                  }
                  {props.goal2.info === "optional" &&
                    <Text style={styles.tableHeadText}>(Optional)</Text>
                  }
                  {props.goal2.info === "bonus" &&
                    <Text style={styles.tableHeadText}>(Bonus)</Text>
                  }
                </View>
              }
              {/* Column for the second goal's gold minimum. */}
              {props.goal2 && props.goal2.gold &&
                Math.max(...props.goal2.gold) > 0 &&
                <View style={[
                  styles.tableHeadBox,
                  {width: (Platform.OS !== 'web')
                          ? (width < 400) ? 48 : 66
                          : (width < 626) ? 60 : 100,
                  backgroundColor: colors.backDark,
                  borderColor: colors.border}
                ]}>
                  <Image
                    source={iconGold}
                    style={stylesImg.imgLootIcon}
                  />
                </View>
              }
              {/* Column for the second goal's gems minimum. */}
              {props.goal2 && props.goal2.gems &&
                Math.max(...props.goal2.gems) > 0 &&
                <View style={[
                  styles.tableHeadBox,
                  {width: (Platform.OS !== 'web')
                          ? (width < 400) ? 48 : 66
                          : (width < 626) ? 60 : 100,
                  backgroundColor: colors.backDark,
                  borderColor: colors.border}
                ]}>
                  <Image
                    source={iconGems}
                    style={stylesImg.imgLootIcon}
                  />
                </View>
              }
              {/* Column for the second goal's goods minimum. */}
              {props.goal2 && props.goal2.goods &&
                Math.max(...props.goal2.goods) > 0 &&
                <View style={[
                  styles.tableHeadBox,
                  {width: (Platform.OS !== 'web')
                          ? (width < 400) ? 48 : 66
                          : (width < 626) ? 60 : 100,
                  backgroundColor: colors.backDark,
                  borderColor: colors.border}
                ]}>
                  <Image
                    source={iconGoods}
                    style={stylesImg.imgLootIcon}
                  />
                </View>
              }
              {/* Column for the second goal's special minimum. */}
              {props.goal2 && props.goal2.special &&
                Math.max(...props.goal2.special) > 0 &&
                <View style={[
                  styles.tableHeadBox,
                  {width: (Platform.OS !== 'web')
                          ? (width < 400) ? 48 : 66
                          : (width < 626) ? 60 : 100,
                  backgroundColor: colors.backDark,
                  borderColor: colors.border}
                ]}>
                  <Image
                    source={iconSpecial}
                    style={stylesImg.imgLootIcon}
                  />
                </View>
              }
            </View>
            {props.goal1.total.map((goalKey, g) => (
              <View key={`total_${g}`}>
                {/* Default row: All, N+H, N+X, or N */}
                {/* Second row: H+X or H */}
                {/* Third row: X */}
                {((g === 0) ||
                  (g === 1 && !getGoalNH) ||
                  (g === 2 && !getGoalHX && !getGoalNX)) &&
                  <View style={styles.tableRow}>
                    {/* Make sure difficulty level has a loot goal. */}
                    {/* Edge case for a gold/gems/goods minimum
                        but not a total minimum. */}
                    {(goalKey !== 0 ||
                      (goalKey === 0 &&
                        ((props.goal1.gold && props.goal1.gold[g] !== 0) ||
                        (props.goal1.gems && props.goal1.gems[g] !== 0) ||
                        (props.goal1.goods && props.goal1.goods[g] !== 0))
                      )
                    ) &&
                      <>
                        <View style={[
                          styles.tableRowStart,
                          styles.sizeRowStart,
                          {backgroundColor: colors.backMed,
                          borderColor: colors.border}
                        ]}>
                          {/* All difficulties have the same goal. */}
                          {g === 0 &&
                            getGoalNH && getGoalHX && getGoalNX &&
                            <Text style={[
                              stylesTotal.tableRowText, {color: colors.text}
                            ]}>
                              All
                            </Text>
                          }
                          {/* Normal and Hard have the same goal. */}
                          {g === 0 &&
                            getGoalNH && !getGoalHX && !getGoalNX &&
                            <Text style={[
                              stylesTotal.tableRowText, {color: colors.text}
                            ]}>
                              <Text style={[
                                stylesList.locCount, {color: colors.locN}
                              ]}>
                                {props.diffNames[0]}
                              </Text>/
                              <Text style={[
                                stylesList.locCount, {color: colors.locH}
                              ]}>
                                {props.diffNames[1]}
                              </Text>
                            </Text>
                          }
                          {/* Hard and Expert have the same goal. */}
                          {g === 1 &&
                            !getGoalNH && getGoalHX && !getGoalNX &&
                            <Text style={[
                              stylesTotal.tableRowText, {color: colors.text}
                            ]}>
                              <Text style={[
                                stylesList.locCount, {color: colors.locH}
                              ]}>
                                {props.diffNames[1]}
                              </Text>/
                              <Text style={[
                                stylesList.locCount, {color: colors.locX}
                              ]}>
                                {props.diffNames[2]}
                              </Text>
                            </Text>
                          }
                          {/* Normal and Expert have the same goal. */}
                          {g === 0 &&
                            !getGoalNH && !getGoalHX && getGoalNX &&
                            <Text style={[
                              stylesTotal.tableRowText, {color: colors.text}
                            ]}>
                              <Text style={[
                                stylesList.locCount, {color: colors.locN}
                              ]}>
                                {props.diffNames[0]}
                              </Text>/
                              <Text style={[
                                stylesList.locCount, {color: colors.locX}
                              ]}>
                                {props.diffNames[2]}
                              </Text>
                            </Text>
                          }
                          {/* Normal has a different goal. */}
                          {g === 0 && !getGoalNH && !getGoalNX &&
                            <Text style={stylesTotal.tableRowText}>
                              <Text style={[
                                stylesList.locCount, {color: colors.locN}
                              ]}>
                                {props.diffNames[0]}
                              </Text>
                            </Text>
                          }
                          {/* Hard has a different goal. */}
                          {g === 1 && !getGoalNH && !getGoalHX &&
                            <Text style={stylesTotal.tableRowText}>
                              <Text style={[
                                stylesList.locCount, {color: colors.locH}
                              ]}>
                                {props.diffNames[1]}
                              </Text>
                            </Text>
                          }
                          {/* Expert has a different goal. */}
                          {g === 2 && !getGoalHX && !getGoalNX &&
                            <Text style={stylesTotal.tableRowText}>
                              <Text style={[
                                stylesList.locCount, {color: colors.locX}
                              ]}>
                                {props.diffNames[2]}
                              </Text>
                            </Text>
                          }
                        </View>
                        {/* Display found loot & loot goal. */}
                        <GoalView
                          goalLoot={goalKey}
                          totalLoot={props.totals[g][4]}
                          foundLoot={getFoundLoot[g][4]}
                        />
                        {/* Is there a minimum gold requirement? */}
                        {props.goal1.gold &&
                          Math.max(...props.goal1.gold) > 0 &&
                          <GoalView
                            goalLoot={props.goal1.gold[g]}
                            totalLoot={props.totals[g][0]}
                            foundLoot={getFoundLoot[g][0]}
                          />
                        }
                        {/* Is there a minimum gems requirement? */}
                        {props.goal1.gems &&
                          Math.max(...props.goal1.gems) > 0 &&
                          <GoalView
                            goalLoot={props.goal1.gems[g]}
                            totalLoot={props.totals[g][1]}
                            foundLoot={getFoundLoot[g][1]}
                          />
                        }
                        {/* Is there a minimum goods requirement? */}
                        {props.goal1.goods &&
                          Math.max(...props.goal1.goods) > 0 &&
                          <GoalView
                            goalLoot={props.goal1.goods[g]}
                            totalLoot={props.totals[g][2]}
                            foundLoot={getFoundLoot[g][2]}
                          />
                        }
                        {/* Is there a minimum special requirement? */}
                        {props.goal1.special &&
                          Math.max(...props.goal1.special) > 0 &&
                          <GoalView
                            goalLoot={props.goal1.special[g]}
                            totalLoot={props.totals[g][3]}
                            foundLoot={getFoundLoot[g][3]}
                          />
                        }
                        {/* Is there a second loot goal? */}
                        {props.goal2 && props.goal2.total &&
                          Math.max(...props.goal2.total) > 0 &&
                          <>
                            <GoalView
                              goalLoot={props.goal2.total[g]}
                              totalLoot={props.totals[g][4]}
                              foundLoot={getFoundLoot[g][4]}
                            />
                            {/* Is there a minimum gold requirement? */}
                            {props.goal2 && props.goal2.gold &&
                              Math.max(...props.goal2.gold) > 0 &&
                              <GoalView
                                goalLoot={props.goal2.gold[g]}
                                totalLoot={props.totals[g][0]}
                                foundLoot={getFoundLoot[g][0]}
                              />
                            }
                            {/* Is there a minimum gems requirement? */}
                            {props.goal2 && props.goal2.gems &&
                              Math.max(...props.goal2.gems) > 0 &&
                              <GoalView
                                goalLoot={props.goal2.gems[g]}
                                totalLoot={props.totals[g][1]}
                                foundLoot={getFoundLoot[g][1]}
                              />
                            }
                            {/* Is there a minimum goods requirement? */}
                            {props.goal2 && props.goal2.goods &&
                              Math.max(...props.goal2.goods) > 0 &&
                              <GoalView
                                goalLoot={props.goal2.goods[g]}
                                totalLoot={props.totals[g][2]}
                                foundLoot={getFoundLoot[g][2]}
                              />
                            }
                            {/* Is there a minimum special requirement? */}
                            {props.goal2 && props.goal2.special &&
                              Math.max(...props.goal2.special) > 0 &&
                              <GoalView
                                goalLoot={props.goal2.special[g]}
                                totalLoot={props.totals[g][3]}
                                foundLoot={getFoundLoot[g][3]}
                              />
                            }
                          </>
                        }
                      </>
                    }
                  </View>
                }
              </View>
            ))}
          </View>
        }

        {/* If this mission has pickpockets,
            display a table of pickpocket counts. */}
        {(props.pocketCount &&
         (Math.max(...props.pocketCount) > 0) ) &&
          <View style={styles.spacedView}>
            <View style={styles.tableHeader}>
              <View style={[
                styles.tableHeadBox,
                styles.sizeRowStart,
                {backgroundColor: colors.backDark,
                borderColor: colors.border}
              ]}>
                <Text style={styles.tableHeadText}>Pickpockets</Text>
              </View>
              {/* Column header. */}
              <View style={[
                styles.tableHeadBox,
                styles.pocketRowBox,
                {backgroundColor: colors.backDark,
                borderColor: colors.border}
              ]}>
                <Text style={styles.tableHeadText}>Total</Text>
              </View>
            </View>
            {props.pocketCount.map((pickKey, c) => (
              <View key={`pocket_${c}`}>
                {/* Default row: All, N+H, N+X, or N */}
                {/* Second row: H+X or H */}
                {/* Third row: X */}
                {((c === 0) ||
                  (c === 1 && !getPocketNH) ||
                  (c === 2 && !getPocketHX && !getPocketNX)) &&
                  <View style={styles.tableRow}>
                    {pickKey > 0 &&
                      <>
                        <View style={[
                          styles.tableRowStart,
                          styles.sizeRowStart,
                          {backgroundColor: colors.backMed,
                          borderColor: colors.border}
                        ]}>
                          {/* All difficulties have the same pickpockets. */}
                          {c === 0 &&
                            getPocketNH && getPocketHX && getPocketNX &&
                            <Text style={[
                              stylesTotal.tableRowText, {color: colors.text}
                            ]}>
                              All
                            </Text>
                          }
                          {/* Normal and Hard have the same pickpockets. */}
                          {c === 0 &&
                            getPocketNH && !getPocketHX && !getPocketNX &&
                            <Text style={[
                              stylesTotal.tableRowText, {color: colors.text}
                            ]}>
                              <Text style={[
                                stylesList.locCount, {color: colors.locN}
                              ]}>
                                {props.diffNames[0]}
                              </Text>/
                              <Text style={[
                                stylesList.locCount, {color: colors.locH}
                              ]}>
                                {props.diffNames[1]}
                              </Text>
                            </Text>
                          }
                          {/* Hard and Expert have the same pickpockets. */}
                          {c === 1 &&
                            !getPocketNH && getPocketHX && !getPocketNX &&
                            <Text style={[
                              stylesTotal.tableRowText, {color: colors.text}
                            ]}>
                              <Text style={[
                                stylesList.locCount, {color: colors.locH}
                              ]}>
                                {props.diffNames[1]}
                              </Text>/
                              <Text style={[
                                stylesList.locCount, {color: colors.locX}
                              ]}>
                                {props.diffNames[2]}
                              </Text>
                            </Text>
                          }
                          {/* Normal and Expert have the same pickpockets. */}
                          {c === 0 &&
                            !getPocketNH && !getPocketHX && getPocketNX &&
                            <Text style={[
                              stylesTotal.tableRowText, {color: colors.text}
                            ]}>
                              <Text style={[
                                stylesList.locCount, {color: colors.locN}
                              ]}>
                                {props.diffNames[0]}
                              </Text>/
                              <Text style={[
                                stylesList.locCount, {color: colors.locX}
                              ]}>
                                {props.diffNames[2]}
                              </Text>
                            </Text>
                          }
                          {/* Normal has different pickpockets. */}
                          {c === 0 && !getPocketNH && !getPocketNX &&
                            <Text style={stylesTotal.tableRowText}>
                              <Text style={[
                                stylesList.locCount, {color: colors.locN}
                              ]}>
                                {props.diffNames[0]}
                              </Text>
                            </Text>
                          }
                          {/* Hard has different pickpockets. */}
                          {c === 1 && !getPocketNH && !getPocketHX &&
                            <Text style={stylesTotal.tableRowText}>
                              <Text style={[
                                stylesList.locCount, {color: colors.locH}
                              ]}>
                                {props.diffNames[1]}
                              </Text>
                            </Text>
                          }
                          {/* Expert has different pickpockets. */}
                          {c === 2 && !getPocketHX && !getPocketNX &&
                            <Text style={stylesTotal.tableRowText}>
                              <Text style={[
                                stylesList.locCount, {color: colors.locX}
                              ]}>
                                {props.diffNames[2]}
                              </Text>
                            </Text>
                          }
                        </View>
                        {/* Display found pickpockets & max pickpockets. */}
                        <View style={[
                          stylesTotal.tableRowBox,
                          styles.pocketRowBox,
                          {borderColor: colors.border}
                        ]}>
                          <ImageBackground
                            source={(getCurrentTheme === 'dark' ||
                              (getCurrentTheme === 'default' && scheme === 'dark'))
                              ? ((getFoundPocket[c] >= props.pocketCount[c])
                                ? ((Platform.OS === 'web' && width < 626)
                                  ? bgFoundDarkS : bgFoundDark)
                                : bgDefaultDark)
                              : ((getFoundPocket[c] >= props.pocketCount[c])
                                ? ((Platform.OS === 'web' && width < 626)
                                  ? bgFoundLightS : bgFoundLight)
                                : bgDefaultLight)}
                            resizeMode="cover"
                            style={[
                              stylesTotal.totalBackground,
                              (Platform.OS === 'web') ? stylesTotal.totalBackgroundWeb : ''
                            ]}
                          >
                            <Text style={[stylesTotal.tableRowText, {color: colors.text}]}>
                              {getFoundPocket[c]}{" / "}{props.pocketCount[c]}
                            </Text>
                          </ImageBackground>
                        </View>
                      </>
                    }
                  </View>
                }
              </View>
            ))}
          </View>
        }
      </ScrollView>
    </View>
  );
});

// Define various styles here.
const styles = StyleSheet.create({
  totalBorder: {
    borderTopWidth: 3,
  },
  totalView: {
    marginHorizontal: (Platform.OS === 'web') ? 10 : 5,
    marginBottom: 5,
  },
  carryView: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 5,
  },
  carryText: {
    fontSize: (Platform.OS === 'web') ? 15 : 12,
  },
  carryInput: {
    borderWidth: 1,
    paddingHorizontal: 5,
    paddingVertical: 0,
    width: 50,
    height: 22,
    fontSize: 12,
  },
  spacedView: {
    marginVertical: (Platform.OS === 'web') ? 8 : 5,
  },
  tableHeader: {
    flexDirection: 'row',
  },
  tableHeadBox: {
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: (Platform.OS === 'web') ? 100 : 70,
    padding: 2,
  },
  tableHeadText: {
    color: 'white',
    fontSize: (Platform.OS === 'web') ? 13 : 8,
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableRowStart: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    padding: (Platform.OS === 'web') ? 4 : 2,
  },
  sizeRowStart: {
    width: (Platform.OS === 'web') ? 100 : 70,
  },
  pieceRowBox: {
    width: (Platform.OS === 'web') ? 80 : 50,
  },
  pocketRowBox: {
    width: (Platform.OS === 'web') ? 60 : 40,
  },
});
