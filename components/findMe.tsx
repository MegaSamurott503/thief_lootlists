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
import { useEffect, useState, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { FindMeArea } from '@/components/findMeArea';
import { FindMePrecise } from '@/components/findMePrecise';

import { stylesList } from '@/constants/stylesList';
import { stylesImg } from '@/constants/stylesImg';
import { stylesArrow } from '@/constants/stylesArrow';
import { stylesModal } from '@/constants/stylesModal';
import {
  bgDefaultLight, bgDefaultDark,
  bgEasyLight, bgEasyDark,
  bgMediumLight, bgMediumDark,
  bgHardLight, bgHardDark,
  bgFoundLight, bgFoundDark,
  arrowLight, arrowDark,
  iconGold, iconGems, iconGoods, iconSpecial
} from '@/constants/imgUI';
import {
  SettingContext, FilterContext,
  FoundContext, CarryoverContext
} from '@/constants/context';

// TODO: one time, total loot for Cistern returned empty after toggling purchasable item
/* **************** */
/*      FIND ME     */
/* **************** */
// Custom view component of a precise location of a given item.
export function FindMe(props) {
  // Use defaults to avoid errors if some props are undefined.
  const {
    id = '',
    title = '',
    modeNames = [{'name': '', 'icon': ''}],
    areas = [{'key': '1', 'value': ''}],
    notes = [{'delimiter': '', 'icon': ''}],
    value = [0,0,0,0],
    carryValue = [0,0,0,0],
    findSimple = '',
    findArea = 0,
    findNarrow = '',
    findExact = '',
    findObj = false,
    findCount = [1,1,1],
    findCountRecipe = [1,1,1],
    findCountBox = [1,1,1],
    findCountMode = [-1,-1,-1],
    findCountActual = [-1,-1,-1],
    findRecipe = ' ',
    findBox = false,
    findPick = false,
    findSecret = false,
    findEaster = false,
    findUnable = false,
    findNote = 0,
    findLink = [],
    loadout = '',
    price = 0,
    carryover = false,
    getLinkedFind = props.getLinkedFind,
    setLinkedFind = props.setLinkedFind,
    //passingTest = passingTest,
  } = props;

  // Access window size.
  const { height, width } = useWindowDimensions();

  // Access theme colors.
  const { colors } = useTheme();

  // SimpleColor: tracks this item's background color & pattern.
  // Used to display found status or ease of finding loot items.
  const [getSimpleColor, setSimpleColor] = useState(bgDefaultLight);

  // IsFound: tracks if this item is selected as 'found'.
  // Used to change location's background color & update loot totals.
  const [getIsFound, setIsFound] = useState(false);

  // BuyCount: tracks how many of this item are bought in-game.
  // Used to update the total loot counts accordingly.
  const [getBuyCount, setBuyCount] = useState(1);

  // ShowModal: tracks the purchase modal's visibility.
  // Used to show or hide the modal for spending loot in-game.
  const [getShowModal, setShowModal] = useState(false);

  // Fetch FoundLoot and FoundPocket states from context.
  const {accumLoot, accumPiece, accumPocket} =
    useContext(FoundContext);

  // Fetch CarryLoot and CarryFound states from context.
  const {getCarryLoot, setCarryLoot,
        getCarryFoundN, setCarryFoundN,
        getCarryFoundH, setCarryFoundH,
        getCarryFoundX, setCarryFoundX} =
    useContext(CarryoverContext);

  // Fetch filter states from context.
  const {getFilterDiffN, setFilterDiffN,
        getFilterDiffH, setFilterDiffH,
        getFilterDiffX, setFilterDiffX,
        getFilterModeA, setFilterModeA,
        getFilterModeB, setFilterModeB,
        getFilterModeC, setFilterModeC,
        getFilterLootGold, setFilterLootGold,
        getFilterLootGems, setFilterLootGems,
        getFilterLootGoods, setFilterLootGoods,
        getFilterLootSpecial, setFilterLootSpecial,
        getFilterOnlyObj, setFilterOnlyObj,
        getFilterOnlyPick, setFilterOnlyPick,
        getFilterOnlySec, setFilterOnlySec,
        getFilterArea, setFilterArea} =
    useContext(FilterContext);

  // Fetch global setting states from context.
  const {scheme,
        getCurrentTheme, setCurrentTheme,
        getSpoilerSec, setSpoilerSec,
        getSpoilerEgg, setSpoilerEgg} =
    useContext(SettingContext);

  // Save & read item's 'found'/'not found' data in device storage.
  // This allows user's selections to persist,
  // whether they navigate to another screen or close the app.
  // This is a promise-based method, using the 'async await' syntax
  // with a 'try-catch' block.
  // Use the item's ID to ensure each data has a unique identifier.

  // Send data to device storage.
  const storeIsFound = async (newToggle) => {
    try {
      // Convert item's state from boolean to string.
      const jsonToggle = JSON.stringify(newToggle);
      await AsyncStorage.setItem(`@inventory_${id}`, jsonToggle);
      //alert(`Saved inventory_${props.id} as ${jsonToggle}`);
    } catch (e) {
      // Error: Saving the data failed.
      alert('Failed to save value.');
    }
  };

  const storeFoundLoot = async (addFoundLoot) => {
    try {
      // Convert item's state from array to string.
      const jsonLoot = JSON.stringify(addFoundLoot);
      await AsyncStorage.setItem(`@myloot_${title}`, jsonLoot);
      //alert(`Saved myloot_${myList[missionName].title} as ${jsonLoot}`);
    } catch (e) {
      // Error: Saving the data failed.
      alert('Failed to save array.');
    }
  };

  const storeFoundPiece = async (addFoundPiece) => {
    try {
      // Convert item's state from array to string.
      const jsonPiece = JSON.stringify(addFoundPiece);
      await AsyncStorage.setItem(`@mypiece_${title}`, jsonPiece);
      //alert(`Saved mypiece_${myList[missionName].title} as ${jsonPiece}`);
    } catch (e) {
      // Error: Saving the data failed.
      alert('Failed to save array.');
    }
  };

  const storeFoundPocket = async (addFoundPocket) => {
    try {
      // Convert item's state from array to string.
      const jsonPocket = JSON.stringify(addFoundPocket);
      await AsyncStorage.setItem(`@mypocket_${title}`, jsonPocket);
      //alert(`Saved mypocket_${myList[missionName].title} as ${jsonPocket}`);
    } catch (e) {
      // Error: Saving the data failed.
      alert('Failed to save array.');
    }
  };

  // Read data from device storage.
  const readIsFound = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(`@inventory_${id}`);
      // Convert item's state from string to boolean.
      const parseValue = JSON.parse(jsonValue);
      if (parseValue !== null) {
        setIsFound(parseValue);
        simpleColorSwitch(parseValue);
        //alert(`Loaded inventory_${id} as ${jsonValue}`);
      }
    } catch (e) {
      // Error: Reading the data failed.
      alert('Failed to read value.');
    }
  };

  function checkLootSpent() {
    // If item is present but can't be acquired
    // (or doing so softlocks or kills the player),
    // skip this function.
    if (!findUnable) {
      // Is this item acquired by spending loot in-game,
      // and are multiple copies of this item purchasable?
      if (props.value && Math.min(...props.value) < 0 &&
        Math.max(...props.findCount) > 1) {
        // Show a modal to specify how many items were purchased.
        // Skip the modal if the item is being deselected.
        if (!getIsFound) {
          setShowModal(true);
        } else {
          activateMe(getBuyCount);
        }
      // Otherwise, activate/deactivate this item's box as normal.
      } else {
        activateMe(0);
      }
    }
  }

  function confirmLootSpent(numBought) {
    // Close the purchase modal.
    setShowModal(false);
    // Update the loot totals.
    activateMe(numBought);
  }

  function activateMe(boughtCount) {
    let newFound = toggleMe("opposite");

    // Increment found loot per difficulty.
    const addFoundLoot = accumLoot.current.map((foundDiffKey, i) => {
      return foundDiffKey.map((foundValueKey, j) => {
        let newValue = 0;
        // Update the findCount if bought from an in-game store.
        // If buying a container of items, don't use findCountBox.
        let newFindCount = findCount[i];
        if (boughtCount !== 0 && findCount[i] !== 0) {
          newFindCount = boughtCount;
        }
        let newBoxCount = findCountBox[i];
        if (boughtCount !== 0 && findCountBox[i] > 1) {
          newBoxCount = 1;
        }
        // Increment gold, gems, goods, & special.
        if (j < 4 && (props.value || props.findLink)) {
          // If newly selected, add...
          if (newFound) {
            // ...the value of this loot...
            if (props.value) {
              newValue = foundValueKey += (
                props.value[j] *
                newFindCount * newBoxCount * findCountRecipe[i]
              );
            }
            // ...and the value of any linked loot.
            if (props.findLink) {
              props.findLink.map((foundLinkKey, k) => {
                if (foundLinkKey.value) {
                  newValue += (
                    foundLinkKey.value[j] * foundLinkKey.findCount[i]
                  );
                }
              });
            }
            return newValue;
          // If newly deselected, subtract...
          } else {
            // ...the value of this loot...
            if (props.value) {
              newValue = foundValueKey -= (
                props.value[j] *
                newFindCount * newBoxCount * findCountRecipe[i]
              );
            }
            // ...and the value of any linked loot.
            if (props.findLink) {
              props.findLink.map((foundLinkKey, k) => {
                if (foundLinkKey.value) {
                  newValue -= (
                    foundLinkKey.value[j] * foundLinkKey.findCount[i]
                  );
                }
              });
            }
            return newValue;
          }
        // Increment total loot.
        } else if (j === 4 && (props.value || props.findLink)) {
          // If newly selected, add...
          if (newFound) {
            // ...the value of this loot...
            if (props.value) {
              newValue = foundValueKey += (
                (props.value[0] + props.value[1] + props.value[2] + props.value[3]) *
                newFindCount * newBoxCount * findCountRecipe[i]
              );
            }
            // ...and the value of any linked loot.
            if (props.findLink) {
              props.findLink.map((allKey, l) => {
                if (allKey.value) {
                  newValue += (
                    (allKey.value[0] + allKey.value[1] + allKey.value[2] + allKey.value[3]) *
                    allKey.findCount[i]
                  );
                }
              });
            }
            return newValue;
          // If newly deselected, subtract...
          } else {
            // ...the value of this loot...
            if (props.value) {
              newValue = foundValueKey -= (
                (props.value[0] + props.value[1] + props.value[2] + props.value[3]) *
                newFindCount * newBoxCount * findCountRecipe[i]
              );
            }
            // ...and the value of any linked loot.
            if (props.findLink) {
              props.findLink.map((allKey, l) => {
                if (allKey.value) {
                  newValue -= (
                    (allKey.value[0] + allKey.value[1] + allKey.value[2] + allKey.value[3]) *
                    allKey.findCount[i]
                  );
                }
              });
            }
            return newValue;
          }
        }
      });
    });
    if ((props.value || props.findLink) &&
        (!props.carryValue || props.carryValue.length === 0)) {
      //setFoundLoot(addFoundLoot);
      //alert(`${addFoundLoot}`);
      accumLoot.current = addFoundLoot;
      storeFoundLoot(addFoundLoot);
    }

    // Increment found loot pieces per difficulty.
    const addFoundPiece = accumPiece.current.map((pieceDiffKey, e) => {
      // If newly selected, add...
      if (newFound) {
        // ...the number of loot pieces...
        if (props.value && Math.max(...props.value) > 0) {
          pieceDiffKey = pieceDiffKey += (
            findCount[e] * findCountBox[e] * findCountRecipe[e]
          );
        }
        // ...and the number of any linked loot pieces.
        if (props.findLink) {
          props.findLink.map((foundLinkKey, k) => {
            if (foundLinkKey.value) {
              pieceDiffKey += (
                foundLinkKey.findCount[e]
              );
            }
          });
        }
        return pieceDiffKey;
      // If newly deselected, subtract...
      } else {
        // ...the number of loot pieces...
        if (props.value && Math.max(...props.value) > 0) {
          pieceDiffKey = pieceDiffKey -= (
            findCount[e] * findCountBox[e] * findCountRecipe[e]
          );
        }
        // ...and the number of any linked loot pieces.
        if (props.findLink) {
          props.findLink.map((foundLinkKey, k) => {
            if (foundLinkKey.value) {
              pieceDiffKey -= (
                foundLinkKey.findCount[e]
              );
            }
          });
        }
        return pieceDiffKey;
      }
    });
    if ((props.value || props.findLink) && props.loadout !== "start") {
      //setFoundPiece(addFoundPiece);
      //alert(`${addFoundPiece}`);
      accumPiece.current = addFoundPiece;
      storeFoundPiece(addFoundPiece);
    }

    // Increment found pickpockets per difficulty.
    const addFoundPocket = accumPocket.current.map((pocketDiffKey, p) => {
      // If newly selected, add...
      if (newFound) {
        // ...one pickpocket...
        if (props.findCountBox && props.findCountBox[p] > 0) {
          pocketDiffKey += 1;
        }
        // ...and another for every linked pickpocket.
        if (props.findLink && props.findLink.length > 0) {
          props.findLink.map((pocketLinkKey, q) => {
            if (pocketLinkKey.findPick &&
              pocketLinkKey.findCount[p] > 0) {
              pocketDiffKey += 1;
            };
          });
        }
        return pocketDiffKey;
      // If newly deselected, subtract...
      } else {
        // ...one pickpocket...
        if (props.findCountBox && props.findCountBox[p] > 0) {
          pocketDiffKey -= 1;
        }
        // ...and another for every linked pickpocket.
        if (props.findLink && props.findLink.length > 0) {
          props.findLink.map((pocketLinkKey, q) => {
            if (pocketLinkKey.findPick &&
              pocketLinkKey.findCount[p] > 0) {
              pocketDiffKey -= 1;
            };
          });
        }
        return pocketDiffKey;
      }
    });
    if (props.findPick) {
      //setFoundPocket(addFoundPocket);
      accumPocket.current = addFoundPocket;
      storeFoundPocket(addFoundPocket);
    }

    // Toggle whether carryover loot is 'found' or 'not found'.
    if (newFound &&
      props.carryValue && Math.min(...props.carryValue) === -1) {
      //setCarryFound(true);
        if (findCount[0] !== 0) setCarryFoundN(true);
        if (findCount[1] !== 0) setCarryFoundH(true);
        if (findCount[2] !== 0) setCarryFoundX(true);
    } else if (
      props.carryValue && Math.min(...props.carryValue) === -1) {
      //setCarryFound(false);
        if (findCount[0] !== 0) setCarryFoundN(false);
        if (findCount[1] !== 0) setCarryFoundH(false);
        if (findCount[2] !== 0) setCarryFoundX(false);
    }

    // Toggle any linked items.
    if (props.findLink) {
      setLinkedFind(props.findLink);
    }
  };

  function toggleMe(type) {
    let newToggle = true;
    // If this item is not part of the starting inventory,
    // toggle between 'found' and 'not found'.
    if (!props.loadout || props.loadout !== "start") {
      newToggle = toggleSwitch(getIsFound, type);
    };

    simpleColorSwitch(newToggle);

    storeIsFound(newToggle);
    setIsFound(newToggle);
    return newToggle;
  }

  // Switch statement to set item as 'found' / 'not found'.
  function toggleSwitch(toggle, type) {
    switch(type) {
      // 'On' sets this item as 'found'.
      case "on":
        return true;
      // 'Off' sets this item as 'not found'.
      case "off":
        return false;
      // 'Opposite' inverts this item's status.
      case "opposite":
        return !toggle;
      // If no case specified, don't change item's status.
      default:
        return toggle;
    }
  }

  // Change the component's background image.
  // Use different patterns to account for colorblindness.
  function simpleColorSwitch(newFound) {
    if (getCurrentTheme === 'dark' ||
      (getCurrentTheme === 'default' && scheme === 'dark')) {
      // Checkmark if item is marked as found (or in starting inventory).
      if (newFound) {
        setSimpleColor(bgFoundDark);
      } else {
        // Green pattern for loot that's easy to find.
        if (props.findSimple === "findE") {
          setSimpleColor(bgEasyDark);
        // Blue pattern for loot that's somewhat hidden.
        } else if (props.findSimple === "findM") {
          setSimpleColor(bgMediumDark);
        // Purple pattern for loot that's hard to spot.
        } else if (props.findSimple === "findH") {
          setSimpleColor(bgHardDark);
        // Default (no pattern) for items and junk.
        } else {
          setSimpleColor(bgDefaultDark);
        }
      }
    } else {
      // Checkmark if item is marked as found (or in starting inventory).
      if (newFound) {
        setSimpleColor(bgFoundLight);
      } else {
        // Lime pattern for loot that's easy to find.
        if (props.findSimple === "findE") {
          setSimpleColor(bgEasyLight);
        // Cyan pattern for loot that's somewhat hidden.
        } else if (props.findSimple === "findM") {
          setSimpleColor(bgMediumLight);
        // Pink pattern for loot that's hard to spot.
        } else if (props.findSimple === "findH") {
          setSimpleColor(bgHardLight);
        // Default (no pattern) for items and junk.
        } else {
          setSimpleColor(bgDefaultLight);
        }
      }
    }
  }

  useEffect(() => {
    // When component renders, check its last saved data.
    readIsFound();

    simpleColorSwitch();

    // Select this item by default if it's in the starting inventory.
    if (props.loadout && props.loadout === "start") {
      //toggleMe("on");
      activateMe(0);
    };

    if (props.getLinkedFind) {
      // If 'Clear All' button has been pressed,
      // toggle this item as 'not found'.
      if (props.getLinkedFind === "reset") {
        toggleMe("off");
        setLinkedFind();
      // If another item is selected that's linked to this item,
      // toggle this item as 'found' or 'not found', as well.
      } else {
        props.getLinkedFind.map((linkKey, linkIndex) => {
          if (linkKey.id === props.id) {
            // Clear the array of linked items.
            setLinkedFind();

            toggleMe("opposite");

          }
        });
      }
    }

    /*if (props.id === 't0_test_loot_1') {
      alert(`${props.findLink[0].id}`);
    }*/
    // Create an interval to force the found totals to update.
    /*const linkToMe = setInterval(() => {
      //gohere
      if (props.getLinkedFind && props.findLink) {
        if (props.getLinkedFind.length > 0 &&
          props.getLinkedFind[0].id === props.id) {
          //alert(`Good!`);
          toggleMe("opposite");
        }
        setLinkedFind();
      }

    // Delay how often the interval updates.
    // 200 milliseconds = five times per second.
  }, 200);

    // Clear the interval when the component unmounts.
    return () => clearInterval(linkToMe);*/
  }, [props.getLinkedFind, getCurrentTheme]);

  return (
    <>
      {(
      // If exclusive to certain difficulties,
      // hide this box if those difficulty filters are disabled.
        (getFilterDiffN && findCount[0] !== 0 &&
          findCountRecipe[0] !== 0 && findCountBox[0] !== 0) ||
        (getFilterDiffH && findCount[1] !== 0 &&
          findCountRecipe[1] !== 0 && findCountBox[1] !== 0) ||
        (getFilterDiffX && findCount[2] !== 0 &&
          findCountRecipe[2] !== 0 && findCountBox[2] !== 0)
      ) &&
      // If exclusive to certain game modes,
      // hide this box if those game mode filters are disabled.
      ( (getFilterModeA && findCountMode[0] !== 0) ||
        (getFilterModeB && findCountMode[1] !== 0) ||
        (getFilterModeC && findCountMode[2] !== 0)
      ) &&
      // Depending on this item's loot type(s),
      // hide this box if those loot filters are disabled.
      ( (getFilterLootGold && props.value &&
          (props.value[0] !== 0 ||
          (props.carryValue && props.carryValue[0] === -1)) ) ||
        (getFilterLootGems && props.value &&
          (props.value[1] !== 0 ||
          (props.carryValue && props.carryValue[1] === -1)) ) ||
        (getFilterLootGoods && props.value &&
          (props.value[2] !== 0 ||
          (props.carryValue && props.carryValue[2] === -1)) ) ||
        (getFilterLootSpecial && props.value &&
          (props.value[3] !== 0 ||
          (props.carryValue && props.carryValue[3] === -1)) ) ||
        (props.value && Math.max(...props.value) === 0) ||
        !props.value
      ) &&
      // If not the goal of an objective,
      // hide this box if the objectives only filter is enabled.
      !( getFilterOnlyObj && !props.findObj ) &&
      // If not a pickpocket,
      // hide this box if the pickpockets only filter is enabled.
      !( getFilterOnlyPick && !props.findPick ) &&
      // If not in a secret location,
      // hide this box if the secrets only filter is enabled.
      !( getFilterOnlySec && !props.findSecret ) &&
      // If area filter has one or more areas selected,
      // hide this box if this item's area is not selected.
      ( getFilterArea.length === 0 ||
        getFilterArea.includes(props.areas[props.findArea].value)
      ) &&
        <>
          <TouchableOpacity
            // Different background colors to indicate
            // simplicity of finding (Easy, Medium, Hard),
            // and whether user has selected it.
            style={[
              styles.find,
              {backgroundColor: colors.backLight,
              borderColor: colors.border},
              //findSimple === "findE" && {backgroundColor: colors.findE},
              //findSimple === "findM" && {backgroundColor: colors.findM},
              //findSimple === "findH" && {backgroundColor: colors.findH},
              //getIsFound && {backgroundColor: colors.found},
            ]}
            // Toggle whether this box is selected or not.
            onPress={() => checkLootSpent()}
          >
            {/*Text fields for general area and precise location.*/}
            <ImageBackground
              source={getSimpleColor}
              resizeMode="cover"
              style={[
                stylesList.findBackground,
                (Platform.OS === 'web') ? stylesList.findBackgroundWeb : ''
              ]}
            >
              {(getIsFound || (!props.findSecret && !props.findEaster) ||
                (props.findSecret && !props.findEaster && getSpoilerSec !== 'all') ||
                (props.findEaster && !props.findSecret && getSpoilerEgg !== 'all') ||
                (props.findSecret && props.findEaster &&
                  getSpoilerSec !== 'all' && getSpoilerEgg !== 'all')) &&
                <FindMeArea
                  modeNames={props.modeNames}
                  value={props.value}
                  findArea={props.areas[props.findArea].value}
                  findObj={props.findObj}
                  findCount={props.findCount}
                  findCountRecipe={props.findCountRecipe}
                  findCountBox={props.findCountBox}
                  findCountMode={props.findCountMode}
                  findCountActual={props.findCountActual}
                  findNote={props.notes[props.findNote]}
                  loadout={props.loadout}
                  carryover={props.carryover}
                />
              }
              {(getIsFound || (!props.findSecret && !props.findEaster) ||
                (props.findSecret && !props.findEaster && getSpoilerSec === 'none') ||
                (props.findEaster && !props.findSecret && getSpoilerEgg === 'none') ||
                (props.findSecret && props.findEaster &&
                  getSpoilerSec === 'none' && getSpoilerEgg === 'none')) &&
                <FindMePrecise
                  modeNames={props.modeNames}
                  value={props.value}
                  findNarrow={props.findNarrow}
                  findExact={props.findExact}
                  findCount={props.findCount}
                  findCountRecipe={props.findCountRecipe}
                  findCountBox={props.findCountBox}
                  findCountMode={props.findCountMode}
                  findCountActual={props.findCountActual}
                  findRecipe={props.findRecipe}
                  findBox={props.findBox}
                  findPick={props.findPick}
                  findSecret={props.findSecret}
                  findEaster={props.findEaster}
                  findUnable={props.findUnable}
                  findNote={props.notes[props.findNote]}
                  loadout={props.loadout}
                  price={props.price}
                />
              }
              {/* Spoiler cover if secret locations are set to be hidden. */}
              {!getIsFound &&
                props.findSecret && getSpoilerSec !== 'none' &&
                <Text style={[
                  stylesList.locText,
                  {fontSize: (Platform.OS === 'web') ? 12 : width*0.019,
                    color: colors.text},
                  props.findUnable && stylesList.locNoGet,
                ]}>
                  {props.findEaster &&
                    <>
                      <Text style={{color: colors.locN}}>(</Text>
                      <Text style={{color: colors.locX}}>\</Text>
                      <Text style={{color: colors.locH}}>) </Text>
                    </>
                  }
                  <Text style={{color: colors.locSecret}}>[[ </Text>
                  <Text style={{fontWeight: 'bold'}}>
                    SECRET
                  </Text>
                  <Text style={{color: colors.locSecret}}> ]]</Text>
                  {props.findEaster &&
                    <>
                      <Text style={{color: colors.locH}}> (</Text>
                      <Text style={{color: colors.locX}}>/</Text>
                      <Text style={{color: colors.locN}}>)</Text>
                    </>
                  }
                </Text>
              }
              {/* Spoiler cover if easter egg locations are set to be hidden. */}
              {!getIsFound &&
                props.findEaster && getSpoilerEgg !== 'none' &&
                <Text style={[
                  stylesList.locText,
                  {fontSize: (Platform.OS === 'web') ? 12 : width*0.019,
                    color: colors.text},
                  props.findUnable && stylesList.locNoGet,
                ]}>
                  <Text style={{color: colors.locN}}>(</Text>
                  <Text style={{color: colors.locX}}>\</Text>
                  <Text style={{color: colors.locH}}>) </Text>
                  {props.findSecret &&
                    <Text style={{color: colors.locSecret}}>[[ </Text>
                  }
                  <Text style={{fontWeight: 'bold'}}>
                    EASTER EGG
                  </Text>
                  {props.findSecret &&
                    <Text style={{color: colors.locSecret}}> ]]</Text>
                  }
                  <Text style={{color: colors.locH}}> (</Text>
                  <Text style={{color: colors.locX}}>/</Text>
                  <Text style={{color: colors.locN}}>)</Text>
                </Text>
              }
            </ImageBackground>
          </TouchableOpacity>
          {/* Modal to specify how much in-game loot is spent. */}
          {((props.value && Math.min(...props.value) < 0 &&
              Math.max(...props.findCount) > 1)) &&
            <Modal
              animationType='fade'
              transparent={true}
              statusBarTranslucent={true}
              visible={getShowModal === true}
              onRequestClose={() => setShowModal(false)}
            >
              {/* Semi-transparent background.
                  Tap the background to hide the modal. */}
              <TouchableOpacity
                style={stylesModal.modalView}
                activeOpacity={1}
                onPressOut={() => setShowModal(false)}
              >
                {/* Pop-up box with buttons. */}
                <TouchableWithoutFeedback>
                  <View style={[
                    styles.buyModal,
                    {backgroundColor: colors.backMed,
                    borderColor: colors.border}
                  ]}>
                    <Text style={[
                      styles.buyModalText,
                      {color: colors.text}
                    ]}>
                      Purchased how many?
                    </Text>
                    <View style={styles.buyModalCount}>
                      {/* left arrow button. */}
                      {/* Don't let BuyCount go below 1. */}
                      {(getBuyCount > 1) &&
                        <TouchableOpacity
                          style={[
                            styles.arrowLeftButton,
                            {borderColor: colors.border}
                          ]}
                          onPress={() => setBuyCount(getBuyCount - 1)}
                        >
                          <Image
                            source={(getCurrentTheme === 'dark' ||
                              (getCurrentTheme === 'default' && scheme === 'dark'))
                              ? arrowDark : arrowLight}
                            style={stylesArrow.arrowLeft}
                          />
                        </TouchableOpacity>
                      }
                      {(getBuyCount <= 1) &&
                        <View style={styles.arrowEmpty}></View>
                      }
                      {/* Number of items being bought. */}
                      <Text style={[
                        styles.buyModalText,
                        styles.buyNumber,
                        {color: colors.text}
                      ]}>
                        {`${getBuyCount}`}
                      </Text>
                      {/* Right arrow button. */}
                      {/* Don't let BuyCount go above findCount. */}
                      {(getBuyCount < Math.max(...props.findCount)) &&
                        <TouchableOpacity
                          style={[
                            styles.arrowRightButton,
                            {borderColor: colors.border}
                          ]}
                          onPress={() => setBuyCount(getBuyCount + 1)}
                        >
                          <Image
                            source={(getCurrentTheme === 'dark' ||
                              (getCurrentTheme === 'default' && scheme === 'dark'))
                              ? arrowDark : arrowLight}
                            style={stylesArrow.arrowRight}
                          />
                        </TouchableOpacity>
                      }
                      {(getBuyCount >= Math.max(...props.findCount)) &&
                        <View style={styles.arrowEmpty}></View>
                      }
                    </View>
                    {/* Amount of gold being spent. */}
                    {(props.value[0] !== 0) &&
                      <Text style={[
                        styles.buyModalPrice,
                        {color: colors.text}
                      ]}>
                        {`${props.value[0] * getBuyCount} `}
                        <Image
                          source={iconGold}
                          style={stylesImg.imgLootIconBig}
                        />
                      </Text>
                    }
                    {/* Amount of gems being spent. */}
                    {(props.value[1] !== 0) &&
                      <Text style={[
                        styles.buyModalPrice,
                        {color: colors.text}
                      ]}>
                        {`${props.value[1] * getBuyCount} `}
                        <Image
                          source={iconGems}
                          style={stylesImg.imgLootIconBig}
                        />
                      </Text>
                    }
                    {/* Amount of goods being spent. */}
                    {(props.value[2] !== 0) &&
                      <Text style={[
                        styles.buyModalPrice,
                        {color: colors.text}
                      ]}>
                        {`${props.value[2] * getBuyCount} `}
                        <Image
                          source={iconGoods}
                          style={stylesImg.imgLootIconBig}
                        />
                      </Text>
                    }
                    {/* Amount of special being spent. */}
                    {(props.value[3] !== 0) &&
                      <Text style={[
                        styles.buyModalPrice,
                        {color: colors.text}
                      ]}>
                        {`${props.value[3] * getBuyCount} `}
                        <Image
                          source={iconSpecial}
                          style={stylesImg.imgLootIconBig}
                        />
                      </Text>
                    }
                    {/* Button to confirm loot spent. */}
                    <TouchableOpacity
                      style={[
                        styles.buyButton,
                        {backgroundColor: colors.backLight,
                        borderColor: colors.border}
                      ]}
                      onPress={() => confirmLootSpent(getBuyCount)}
                    >
                      <Text style={{color: colors.text}}>
                        Confirm
                      </Text>
                    </TouchableOpacity>
                  </View>
                </TouchableWithoutFeedback>
              </TouchableOpacity>
            </Modal>
          }
        </>
      }
    </>
  );
}

// Define various styles here.
const styles = StyleSheet.create({
  find: {
    borderWidth: 1,
    width: (Platform.OS === 'web') ? 228 : '50%',
  },
  buyModal: {
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: (Platform.OS === 'web') ? 240 : 200,
    height: (Platform.OS === 'web') ? 180 : 160,
  },
  buyModalCount: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: (Platform.OS === 'web') ? 8 : 8,
  },
  buyModalText: {
    fontSize: (Platform.OS === 'web') ? 20 : 14,
  },
  buyModalPrice: {
    fontSize: (Platform.OS === 'web') ? 20 : 13,
  },
  buyNumber: {
    marginHorizontal: (Platform.OS === 'web') ? 20 : 20,
  },
  buyButton: {
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: (Platform.OS === 'web') ? 10 : 5,
    marginVertical: (Platform.OS === 'web') ? 10 : 5,
    paddingHorizontal: 4,
    paddingVertical: 2,
    width: 80,
  },
  arrowLeftButton: {
    borderRightWidth: 1,
    height: (Platform.OS === 'web') ? 42 : 34,
  },
  arrowRightButton: {
    borderLeftWidth: 1,
    height: (Platform.OS === 'web') ? 42 : 34,
  },
  arrowEmpty: {
    width: (Platform.OS === 'web') ? 21 : 21,
  },
});
