import { useTheme } from '@react-navigation/native';
import {
  StyleSheet, Platform,
  Image, ImageBackground,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View, Modal,
  useWindowDimensions
} from 'react-native';
import { memo, useEffect, useState, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { LootIconPicker } from '@/components/lootIconPicker';
import { FindMeArea } from '@/components/findMeArea';
import { FindMePrecise } from '@/components/findMePrecise';

import { stylesList } from '@/constants/stylesList';
import { stylesImg } from '@/constants/stylesImg';
import { stylesModal } from '@/constants/stylesModal';
import {
  bgDefaultLight, bgDefaultDark,
  bgFoundLightT, bgFoundDarkT
} from '@/constants/imgUI';
import {
  SettingContext, FilterContext
} from '@/constants/context';

/* **************** */
/*   SECRET ENTRY   */
/* **************** */
// Custom view component of a secret, its trigger, and its rewards.
// Wrap in a memo to avoid unnecessary re-renders.
export const SecretEntry = memo(function SecretEntry(props) {
  // Use defaults to avoid errors if some props are undefined.
  const {
    findLink = [],
    getLinkedFind = props.getLinkedFind,
    setLinkedFind = props.setLinkedFind
  } = props;

  // Access window size.
  const { height, width } = useWindowDimensions();

  // Access theme colors.
  const { colors } = useTheme();

  // SecFound: tracks if this secret is selected as 'found'.
  // Used to change location's background color.
  const [getSecFound, setSecFound] = useState(false);

  // ShowModal: tracks the modal's visibility.
  // Used to show or hide the modal with an enlarged secret image.
  // If multiple triggers, integer determines which image to show.
  const [getShowModal, setShowModal] = useState(-1);

  // Fetch FilterDiff states from context.
  const {getFilterDiffN, setFilterDiffN,
        getFilterDiffH, setFilterDiffH,
        getFilterDiffX, setFilterDiffX,
        getFilterModeA, setFilterModeA,
        getFilterModeB, setFilterModeB,
        getFilterModeC, setFilterModeC,
        getFilterArea, setFilterArea} =
    useContext(FilterContext);

  // Fetch global setting states from context.
  const {scheme, device,
    getCurrentTheme, setCurrentTheme} =
    useContext(SettingContext);

  // Arrays to store data from this entry's triggers.
  // Used to completely hide this entry's box
  // depending on the filters applied.
  const whatsMyDiff = [];
  const whatsMyMode = [];
  const whatsMyLoc = [];

  // Iterate through all of this entry's triggers
  // and add their relevant data to the 'whatsMy' arrays.
  props.triggers && props.triggers.forEach((eachTrig) => {
    if (eachTrig.findDiff) {
      whatsMyDiff.push(eachTrig.findDiff);
    }
    if (eachTrig.findMode) {
      whatsMyMode.push(eachTrig.findMode);
    }
    if (eachTrig.findArea) {
      whatsMyLoc.push(eachTrig.findArea)
    }
  });

  // Send data to device storage.
  const storeSecFound = async (newSecFound, newSecID) => {
    try {
      // Convert secret's state from boolean to string.
      const jsonSecret = JSON.stringify(newSecFound);
      await AsyncStorage.setItem(`@secret_${newSecID}`, jsonSecret);
      //alert(`Saved secret_${props.id} as ${jsonSecret}`);
    } catch (e) {
      // Error: Saving the data failed.
      //alert('Failed to save value.');
    }
  };

  // Read data from device storage.
  const readSecFound = async () => {
    try {
      const jsonSecret = await AsyncStorage.getItem(`@secret_${props.id}`);
      // Convert secret's state from string to boolean.
      const parseSecret = JSON.parse(jsonSecret);
      if (parseSecret !== null) {
        setSecFound(parseSecret);
        //alert(`Loaded secret_${props.id} as ${parseSecret}`);
      }
    } catch (e) {
      // Error: Reading the data failed.
      alert('Failed to read value.');
    }
  };

  function triggerMe(type) {
    let newSecFound = true;
    newSecFound = triggerSwitch(getSecFound, type);

    setSecFound(newSecFound);
    // Send this data to storage.
    storeSecFound(newSecFound, props.id);

    // If linked to another secret, trigger that secret, too.
    if (props.findLink) {
      setLinkedFind(props.findLink);
      storeSecFound(newSecFound, props.findLink[0].id);
      //alert(`Triggered secret_${props.findLink[0].id}`);
    }
  };

  // Switch statement to set secret as 'found' / 'not found'.
  function triggerSwitch(toggle, type) {
    switch(type) {
      // 'On' sets this secret as 'found'.
      case "on":
        return true;
      // 'Off' sets this secret as 'not found'.
      case "off":
        return false;
      // 'Opposite' inverts this secret's status.
      case "opposite":
        return !toggle;
      // If no case specified, don't change secret's status.
      default:
        return toggle;
    }
  }

  useEffect(() => {
    // When component renders, check its last saved data.
    readSecFound();

    if (props.getLinkedFind) {
      // If 'Clear All' button has been pressed,
      // toggle this secret as 'not found'.
      if (props.getLinkedFind === "reset") {
        triggerMe("off");
        props.setLinkedFind();
      }
    }

  }, [props.getLinkedFind]);

  return (
    <>
      {(
      // If all triggers are exclusive to certain difficulties,
      // hide this entry if those difficulty filters are disabled.
        (getFilterDiffN &&
          whatsMyDiff.some(trig => trig[0] !== 0) ) ||
        (getFilterDiffH &&
          whatsMyDiff.some(trig => trig[1] !== 0) ) ||
        (getFilterDiffX &&
          whatsMyDiff.some(trig => trig[2] !== 0) )
      ) &&
      // If all triggers are exclusive to certain game modes,
      // hide this entry if those game mode filters are disabled.
      ( !whatsMyMode.length ||
        (getFilterModeA &&
          whatsMyMode.some(trig => trig[0] !== 0) ) ||
        (getFilterModeB &&
          whatsMyMode.some(trig => trig[1] !== 0) ) ||
        (getFilterModeC &&
          whatsMyMode.some(trig => trig[2] !== 0) )
      ) &&
      // If area filter has one or more areas selected,
      // hide this entry if all of this entry's areas are not selected.
      ( !getFilterArea.length ||
        whatsMyLoc.some(loc =>
          getFilterArea.includes(props.areas[loc].value))
      ) &&
        <>
          <View style={[
            stylesList.listEntry,
            styles.secretSplit
          ]}>
            <View style={[
              styles.secretTrigList,
              device === 'phone' && {width: '72%'},
              device !== 'phone' && {
                width: (width > 794) ? 590 : '77.5%'
              }
            ]}>
              {/* Map out each entry in secret trigger sub-array. */}
              {props.triggers && props.triggers.map((trigKey, trigIndex) => (
                <View
                  key={trigKey.id}
                  style={styles.secretTrig}
                >
                  {(
                  // If exclusive to certain difficulties,
                  // hide this trigger if those difficulty filters are disabled.
                    (getFilterDiffN &&
                      trigKey.findDiff && trigKey.findDiff[0] !== 0) ||
                    (getFilterDiffH &&
                      trigKey.findDiff && trigKey.findDiff[1] !== 0) ||
                    (getFilterDiffX &&
                      trigKey.findDiff && trigKey.findDiff[2] !== 0)
                  ) &&
                  // If exclusive to certain game modes,
                  // hide this trigger if those game mode filters are disabled.
                  ( (getFilterModeA &&
                      trigKey.findMode && trigKey.findMode[0] !== 0) ||
                    (getFilterModeB &&
                      trigKey.findMode && trigKey.findMode[1] !== 0) ||
                    (getFilterModeC &&
                      trigKey.findMode && trigKey.findMode[2] !== 0) ||
                    !trigKey.findMode
                  ) &&
                  // If area filter has one or more areas selected,
                  // hide this trigger if this trigger's area is not selected.
                  ( !getFilterArea.length ||
                    getFilterArea.includes(props.areas[trigKey.findArea].value)
                  ) &&
                    <>
                      <View style={[
                        styles.secretTrigID,
                        device === 'phone' && {width: '27%'},
                        device !== 'phone' && {
                          width: (width > 794) ? 140 : '24%'
                        },
                        {backgroundColor: colors.backMed,
                        borderColor: colors.border},
                        props.triggers.length === 1 && styles.secretTrigOne,
                        trigIndex === 0 && styles.secretTrigTop(device),
                        trigIndex !== 0 && styles.secretTrigMid,
                        trigIndex === props.triggers.length - 1 &&
                          props.triggers.length > 1 &&
                          styles.secretTrigBot(device)
                      ]}>
                        {/* Secret's number and image go here. */}
                        {trigIndex === 0 &&
                          <Text style={[
                            styles.secretNum(device),
                            {color: colors.text}
                          ]}>
                            {props.number}
                          </Text>
                        }
                        <TouchableWithoutFeedback
                          onPress={() => setShowModal(trigIndex)}
                        >
                          <Image
                            source={props.img[trigIndex]}
                            style={[
                              styles.imgSecret,
                              device === 'phone' && {width: 70, height: 70},
                              device !== 'phone' && {
                                width: (width > 794) ? 128 : width*0.16,
                                height: (width > 794) ? 128 : width*0.16,
                              },
                            ]}
                          />
                        </TouchableWithoutFeedback>
                        {/* Modal to show bigger secret image. */}
                        <Modal
                          animationType='fade'
                          transparent={true}
                          statusBarTranslucent={true}
                          visible={getShowModal === trigIndex}
                          onRequestClose={() => setShowModal(-1)}
                        >
                          {/* Semi-transparent background.
                              Tap the background to hide the modal. */}
                          <TouchableOpacity
                            style={stylesModal.modalView}
                            activeOpacity={1}
                            onPressOut={() => setShowModal(-1)}
                          >
                            {/* Pop-up box containing the image. */}
                            <TouchableWithoutFeedback>
                              <View style={[
                                styles.secretModal(device),
                                {backgroundColor: colors.backMed,
                                borderColor: colors.border}
                              ]}>
                                <Image
                                  source={props.img[getShowModal]}
                                  style={styles.imgSecretBig(device)}
                                />
                              </View>
                            </TouchableWithoutFeedback>
                          </TouchableOpacity>
                        </Modal>
                      </View>
                      <TouchableOpacity
                        style={[
                          styles.secretLoc,
                          device === 'phone' && {width: '38%'},
                          device !== 'phone' && {
                            width: (width > 794) ? 150 : '25%'
                          },
                          {borderColor: colors.border}
                        ]}
                        // Toggle whether this secret is selected or not.
                        onPress={() => triggerMe("opposite")}
                      >
                        <ImageBackground
                          source={(getCurrentTheme === 'dark' ||
                            (getCurrentTheme === 'default' && scheme === 'dark'))
                            ? (getSecFound
                              ? bgFoundDarkT : bgDefaultDark)
                            : (getSecFound
                              ? bgFoundLightT : bgDefaultLight)}
                          resizeMode="cover"
                          style={[
                            stylesList.findBackground,
                            (device !== 'phone') ? stylesList.findBackgroundWeb : ''
                          ]}
                        >
                          {/* Secret's location goes here. */}
                          <FindMeArea
                            findArea={props.areas[trigKey.findArea].value}
                            findCount={trigKey.findDiff}
                            findObj={trigKey.findObj}
                          />
                          <FindMePrecise
                            findNarrow={trigKey.findNarrow}
                          />
                        </ImageBackground>
                      </TouchableOpacity>
                      <View style={[
                        styles.secretMethod,
                        device === 'phone' && {width: '35%'},
                        device !== 'phone' && {
                          width: (width > 794) ? 300 : '51%'
                        },
                        {backgroundColor: colors.backLight,
                        borderColor: colors.border}
                      ]}>
                        {/* Secret's trigger goes here. */}
                        <Text style={[
                          styles.secretText(device),
                          {color: colors.text}
                        ]}>
                          {trigKey.method}
                        </Text>
                      </View>
                    </>
                  }
                </View>
              ))}
            </View>
            <View style={[
              styles.secretRewardList,
              device === 'phone' && {width: '28%'},
              device !== 'phone' && {
                width: (width > 794) ? 174 : '22.5%'
              }
            ]}>
              {/* Map out each entry in secret reward sub-array. */}
              {props.rewards && props.rewards.map((rewKey, rewIndex) => (
                <View
                  key={rewKey.id}
                  style={styles.secretRewardFlex}
                >
                  {(
                  // If exclusive to certain difficulties,
                  // hide this box if those difficulty filters are disabled.
                    (getFilterDiffN &&
                      rewKey.findCount && rewKey.findCount[0] !== 0) ||
                    (getFilterDiffH &&
                      rewKey.findCount && rewKey.findCount[1] !== 0) ||
                    (getFilterDiffX &&
                      rewKey.findCount && rewKey.findCount[2] !== 0)
                  ) &&
                    <View style={[
                      styles.secretReward,
                      {backgroundColor: colors.backLight,
                      borderColor: colors.border}
                    ]}>
                      {/*!rewKey.rewardLoot && !rewKey.rewardItem &&
                        <Text style={styles.secretRewardText}>WIP</Text>
                      */}
                      {/* Is this reward a new route? */}
                      {rewKey.rewardRoute &&
                        <>
                          <Text style={[
                            styles.secretRewardText(device),
                            styles.secretRewardOther,
                            {color: colors.text}
                          ]}>
                            A new route between
                          </Text>
                          {rewKey.rewardRoute.map((routeKey, routeIndex) => (
                            <Text
                              key={`route_${routeIndex}`}
                              style={[
                                styles.secretRewardText(device),
                                styles.secretRewardOther,
                                {color: colors.text}
                            ]}>
                              {/* Print 'and' before
                                  final destination in list. */}
                              {routeIndex === rewKey.rewardRoute.length -1 &&
                                <Text>and </Text>
                              }
                              {/* Print each destination. */}
                              {routeKey}
                              {/* Print comma after each destination
                                  if list has at least 3 destinations. */}
                              {routeIndex !== rewKey.rewardRoute.length - 1 &&
                                rewKey.rewardRoute.length > 2 &&
                                <Text>,</Text>
                              }
                            </Text>
                          ))}
                        </>
                      }
                      {/* Is this reward a loot item? */}
                      {rewKey.rewardLoot &&
                        <>
                          <Text style={[
                            styles.secretRewardText(device),
                            {color: colors.text}
                          ]}>
                            <FindMeArea
                              value={rewKey.value}
                              findArea={rewKey.rewardLoot}
                              findCount={rewKey.findCount}
                              secret={true}
                            />
                            {':'}
                          </Text>
                          {/* Loot item's value goes here. */}
                          <View style={stylesList.lootRow}>
                            {rewKey.value && rewKey.value[0] > 0 &&
                              <>
                                <LootIconPicker cat={props.lootCats[0]} />
                                <Text style={[
                                  stylesList.lootText,
                                  {color: colors.text}
                                ]}>
                                  {`${rewKey.value[0]} `}
                                </Text>
                              </>
                            }
                            {rewKey.value && rewKey.value[1] > 0 &&
                              <>
                                <LootIconPicker cat={props.lootCats[1]} />
                                <Text style={[
                                  stylesList.lootText,
                                  {color: colors.text}
                                ]}>
                                  {`${rewKey.value[1]} `}
                                </Text>
                              </>
                            }
                            {rewKey.value && rewKey.value[2] > 0 &&
                              <>
                                <LootIconPicker cat={props.lootCats[2]} />
                                <Text style={[
                                  stylesList.lootText,
                                  {color: colors.text}
                                ]}>
                                  {`${rewKey.value[2]} `}
                                </Text>
                              </>
                            }
                            {rewKey.value && rewKey.value[3] > 0 &&
                              <>
                                <LootIconPicker cat={props.lootCats[3]} />
                                <Text style={[
                                  stylesList.lootText,
                                  {color: colors.text}
                                ]}>
                                  {`${rewKey.value[2]} `}
                                </Text>
                              </>
                            }
                            {/* If multiple loot items have same value,
                                clarify shown value is not cumulative. */}
                            {rewKey.findCount &&
                              Math.max(...rewKey.findCount) > 1 &&
                              <Text style={[
                                styles.secretRewardText(device),
                                {color: colors.text}
                              ]}>
                                {'each'}
                              </Text>
                            }
                          </View>
                        </>
                      }
                      {/* Is this reward an inventory item? */}
                      {rewKey.rewardItem &&
                        <Text style={[
                          styles.secretRewardText(device),
                          {color: colors.text}
                        ]}>
                          <FindMeArea
                            value={rewKey.value}
                            findArea={rewKey.rewardItem}
                            findCount={rewKey.findCount}
                            findCountActual={rewKey.findCountActual}
                            secret={true}
                          />
                        </Text>
                      }
                      {/* Is this reward a hint in a readable? */}
                      {rewKey.rewardHint &&
                        <>
                          <Text style={[
                            styles.secretRewardText(device),
                            styles.secretRewardOther,
                            {color: colors.text}
                          ]}>
                            {rewKey.rewardHint.length === 1 &&
                              <Text>A hint about</Text>
                            }
                            {rewKey.rewardHint.length > 1 &&
                              <Text>Hints about</Text>
                            }
                          </Text>
                          {rewKey.rewardHint.map((hintKey, hintIndex) => (
                            <Text
                              key={`hint_${hintIndex}`}
                              style={[
                                styles.secretRewardText(device),
                                styles.secretRewardOther,
                                {color: colors.text}
                            ]}>
                              {/* Print 'and' before
                                  final hint in list
                                  if list has at least 2 hints. */}
                              {hintIndex === rewKey.rewardHint.length -1 &&
                                rewKey.rewardHint.length > 1 &&
                                <Text>and </Text>
                              }
                              {/* Print each hint. */}
                              {hintKey}
                              {/* Print comma after each hint
                                  if list has at least 3 hints. */}
                              {hintIndex !== rewKey.rewardHint.length - 1 &&
                                rewKey.rewardHint.length > 2 &&
                                <Text>,</Text>
                              }
                            </Text>
                          ))}
                        </>
                      }
                      {/* Is this reward something else? */}
                      {rewKey.rewardOther &&
                        <Text style={[
                          styles.secretRewardText(device),
                          styles.secretRewardOther,
                          {color: colors.text}
                        ]}>
                          {rewKey.rewardOther}
                        </Text>
                      }
                      {/* Is this reward a bonus objective? */}
                      {rewKey.rewardBonus &&
                        <Text style={[
                          styles.secretRewardText(device),
                          styles.secretRewardOther,
                          {color: colors.text}
                        ]}>
                          A bonus objective
                        </Text>
                      }
                    </View>
                  }
                </View>
              ))}
              {/* Is there no tangible reward for finding this secret? */}
              {!props.rewards &&
                <View style={styles.secretReward}>
                  <Text style={[
                    styles.secretRewardText(device),
                    styles.secretRewardOther,
                    {color: colors.text}
                  ]}>
                    None
                  </Text>
                </View>
              }
            </View>
          </View>
        </>
      }
    </>
  );
});

// Define various styles here.
const styles = StyleSheet.create({
  secretTrigList: {
    //width: (Platform.OS === 'web') ? 590 : '72%',
  },
  secretTrig: {
    flexDirection: 'row',
    flexGrow: 1,
  },
  secretTrigID: {
    borderWidth: 1,
    alignItems: 'center',
    paddingHorizontal: 3,
    //width: (Platform.OS === 'web') ? 140 : '27%',
  },
  secretTrigOne: {
    borderBottomLeftRadius: 8,
  },
  secretTrigTop: device => ({
    borderTopLeftRadius: 8,
    paddingBottom: (device !== 'phone') ? 5 : 3,
  }),
  secretTrigMid: {
    paddingVertical: 8,
  },
  secretTrigBot: device => ({
    borderBottomLeftRadius: 8,
    paddingTop: (device !== 'phone') ? 5 : 3,
    paddingBottom: (device !== 'phone') ? 16 : 13,
  }),
  secretNum: device => ({
    fontSize: (device !== 'phone') ? 12 : 8,
    fontWeight: 'bold',
  }),
  secretLoc: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    justifyContent: 'center',
    //width: (Platform.OS === 'web') ? 150 : '38%',
  },
  secretMethod: {
    borderWidth: 1,
    justifyContent: 'center',
    padding: 2,
    //width: (Platform.OS === 'web') ? 300 : '35%',
  },
  secretText: device => ({
    fontSize: (device !== 'phone') ? 12 : 8,
  }),
  secretRewardList: {
    //width: (Platform.OS === 'web') ? 175 : '28%',
  },
  secretRewardFlex: {
    flexGrow: 100,
  },
  secretReward: {
    borderWidth: 1,
    flex: 1,
    justifyContent: 'center',
    padding: 2,
  },
  secretRewardText: device => ({
    fontSize: (device !== 'phone') ? 12 : 8,
  }),
  secretRewardOther: {
    fontStyle: 'italic',
  },
  secretModal: device => ({
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: (device !== 'phone') ? 420 : 220,
    height: (device !== 'phone') ? 420 : 220,
  }),
  imgSecret: {
    //width: (Platform.OS === 'web') ? 128 : 70,
    //height: (Platform.OS === 'web') ? 128 : 70,
  },
  imgSecretBig: device => ({
    width: (device !== 'phone') ? 400 : 200,
    height: (device !== 'phone') ? 400 : 200,
  }),
  secretSplit: {
    marginBottom: 9,
  },
});
