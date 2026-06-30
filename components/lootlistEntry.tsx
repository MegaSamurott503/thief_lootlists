import { useTheme } from '@react-navigation/native';
import {
  StyleSheet, Platform,
  Image,
  Text, View,
  useWindowDimensions
} from 'react-native';
import { useContext } from 'react';

import { FindMe } from '@/components/findMe';
import { LootIconPicker } from '@/components/lootIconPicker';
import { ImageSwitch } from '@/components/imageSwitch';

import { stylesList } from '@/constants/stylesList';
import { stylesImg } from '@/constants/stylesImg';
import {
  FilterContext, CarryoverContext, SettingContext
} from '@/constants/context';

/* **************** */
/*  LOOTLIST ENTRY  */
/* **************** */
// Custom view component of a unique item and all its locations.
export function LootlistEntry(props) {
  // Use defaults to avoid errors if some props are undefined.
  const {
    values = [],
    orderedLoot = [],
    addSpacing = ''
  } = props;

  // Access window size.
  const { height, width } = useWindowDimensions();

  // Access theme colors.
  const { colors } = useTheme();

  // Fetch CarryLoot state from context.
  const {getCarryLoot, setCarryLoot} =
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
  const { device } = useContext(SettingContext);

  // If loot is sorted by order found,
  // create a string of the single loot's value and location,
  // then convert it into a JSON object.
  let oneLoot = props.orderedLoot ?
  `[{ "id": "order_one",` +
    `"value": [${orderedLoot[1]}],` +
    `"carryValue": [${orderedLoot[2]}],` +
    `"locations": [ {} ]` +
  `}]` : '';
  let oneLootObj = oneLoot ?
    JSON.parse(oneLoot) : '';
  // 'locations' is already a JSON object,
  // so add it in after converting.
  if (oneLootObj) {
    oneLootObj[0].locations[0] = orderedLoot[3];
  }

  // Get all the loot locations grouped by value.
  // If sorted by order found,
  // each value group will only have one location.
  const myValues = props.values
    ? props.values
    : (props.orderedLoot
      ? oneLootObj : '');

  // Arrays to store data from this entry's items.
  // Used to completely hide this entry's box
  // depending on the filters applied.
  // Will contain sub-arrays for each loot value.
  // For entry headers, use flat() method
  // to flatten nested arrays into one array.
  const whatsMyDiff = [];
  const whatsMyDiffBox = [];
  const whatsMyDiffRec = [];
  const whatsMyMode = [];
  const whatsMyLoot = [];
  const whatsMyLootCarry = [];
  const whatsMyLoc = [];
  const whatsMyObj = [];
  const whatsMyPick = [];
  const whatsMySec = [];

  // Iterate through all of this entry's items
  // and add their relevant data to the 'whatsMy' arrays.
  if (myValues) {
    myValues.forEach((eachValue) => {
      // Create sub-arrays for each loot value.
      let tempMyDiff = [];
      let tempMyDiffRec = [];
      let tempMyDiffBox = [];
      let tempMyMode = [];
      let tempMyLoot = [];
      let tempMyLootCarry = [];
      let tempMyLoc = [];
      let tempMyObj = [];
      let tempMyPick = [];
      let tempMySec = [];
      // Loop through and fill each sub-array.
      eachValue.locations.forEach((eachLoc) => {
        if (eachLoc.findCount) {
          tempMyDiff.push(eachLoc.findCount);
        } else {
          tempMyDiff.push([1,1,1]);
        }
        if (eachLoc.findCountRecipe) {
          tempMyDiffRec.push(eachLoc.findCountRecipe);
        } else {
          tempMyDiffRec.push([1,1,1]);
        }
        if (eachLoc.findCountBox) {
          tempMyDiffBox.push(eachLoc.findCountBox);
        } else {
          tempMyDiffBox.push([1,1,1]);
        }
        if (eachLoc.findCountMode) {
          tempMyMode.push(eachLoc.findCountMode);
        } else {
          tempMyMode.push([-1,-1,-1]);
        }
        if (eachValue.value) {
          tempMyLoot.push(eachValue.value);
        }
        if (eachValue.carryValue) {
          tempMyLootCarry.push(eachValue.carryValue);
        }
        if (eachLoc.findArea) {
          tempMyLoc.push(eachLoc.findArea);
        }
        if (eachLoc.findObj) {
          tempMyObj.push(eachLoc.findObj);
        }
        if (eachLoc.findPick) {
          tempMyPick.push(eachLoc.findPick);
        }
        if (eachLoc.findSecret) {
          tempMySec.push(eachLoc.findSecret);
        }
      });
      // Add sub-arrays to each main array.
      whatsMyDiff.push(tempMyDiff);
      whatsMyDiffRec.push(tempMyDiffRec);
      whatsMyDiffBox.push(tempMyDiffBox);
      whatsMyMode.push(tempMyMode);
      whatsMyLoot.push(tempMyLoot);
      whatsMyLootCarry.push(tempMyLootCarry);
      whatsMyLoc.push(tempMyLoc);
      whatsMyObj.push(tempMyObj);
      whatsMyPick.push(tempMyPick);
      whatsMySec.push(tempMySec);
    });
  } else if (props.locations) {
    // Create empty sub-arrays to be flattened.
    whatsMyDiff[0] = [];
    whatsMyDiffRec[0] = [];
    whatsMyDiffBox[0] = [];
    whatsMyMode[0] = [];
    whatsMyLoot[0] = [];
    whatsMyLootCarry[0] = [];
    whatsMyLoc[0] = [];
    whatsMyObj[0] = [];
    whatsMyPick[0] = [];
    whatsMySec[0] = [];
    // Loop through and fill the sub-array.
    props.locations.forEach((eachLoc) => {
      if (eachLoc.findCount) {
        whatsMyDiff[0].push(eachLoc.findCount);
      } else {
        whatsMyDiff[0].push([1,1,1]);
      }
      if (eachLoc.findCountRecipe) {
        whatsMyDiffRec[0].push(eachLoc.findCountRecipe);
      } else {
        whatsMyDiffRec[0].push([1,1,1]);
      }
      if (eachLoc.findCountBox) {
        whatsMyDiffBox[0].push(eachLoc.findCountBox);
      } else {
        whatsMyDiffBox[0].push([1,1,1]);
      }
      if (eachLoc.findCountMode) {
        whatsMyMode[0].push(eachLoc.findCountMode);
      } else {
        whatsMyMode[0].push([-1,-1,-1]);
      }
      if (eachLoc.findArea) {
        whatsMyLoc[0].push(eachLoc.findArea);
      }
      if (eachLoc.findObj) {
        whatsMyObj[0].push(eachLoc.findObj);
      }
      if (eachLoc.findPick) {
        whatsMyPick[0].push(eachLoc.findPick);
      }
      if (eachLoc.findSecret) {
        whatsMySec[0].push(eachLoc.findSecret);
      }
    });
  }

  /*function passingTest() {
    alert('Test success.');
  };*/

  return (
    <>
      {(
      // If all items are exclusive to certain difficulties,
      // hide this entry if those difficulty filters are disabled.
        (getFilterDiffN &&
          whatsMyDiff.flat().some(loc => loc[0] !== 0) &&
          whatsMyDiffRec.flat().some(loc => loc[0] !== 0) &&
          whatsMyDiffBox.flat().some(loc => loc[0] !== 0) ) ||
        (getFilterDiffH &&
          whatsMyDiff.flat().some(loc => loc[1] !== 0) &&
          whatsMyDiffRec.flat().some(loc => loc[1] !== 0) &&
          whatsMyDiffBox.flat().some(loc => loc[1] !== 0) ) ||
        (getFilterDiffX &&
          whatsMyDiff.flat().some(loc => loc[2] !== 0) &&
          whatsMyDiffRec.flat().some(loc => loc[2] !== 0) &&
          whatsMyDiffBox.flat().some(loc => loc[2] !== 0) )
      ) &&
      // If all items are exclusive to certain game modes,
      // hide this entry if those game mode filters are disabled.
      ( (getFilterModeA &&
          whatsMyMode.flat().some(loc => loc[0] !== 0) ) ||
        (getFilterModeB &&
          whatsMyMode.flat().some(loc => loc[1] !== 0) ) ||
        (getFilterModeC &&
          whatsMyMode.flat().some(loc => loc[2] !== 0) )
      ) &&
      // Depending on the items' loot type(s),
      // hide this entry if those loot filters are disabled.
      ( (getFilterLootGold && myValues &&
          (whatsMyLoot.flat().some(val => val[0] !== 0) ||
          whatsMyLootCarry.flat().some(val => val[0] === -1)) ) ||
        (getFilterLootGems && myValues &&
          (whatsMyLoot.flat().some(val => val[1] !== 0) ||
          whatsMyLootCarry.flat().some(val => val[1] === -1)) ) ||
        (getFilterLootGoods && myValues &&
          (whatsMyLoot.flat().some(val => val[2] !== 0) ||
          whatsMyLootCarry.flat().some(val => val[2] === -1)) ) ||
        (getFilterLootSpecial && myValues &&
          (whatsMyLoot.flat().some(val => val[3] !== 0) ||
          whatsMyLootCarry.flat().some(val => val[3] === -1)) ) ||
        (myValues && whatsMyLootCarry.flat().some(val =>
          Math.max(...val) === 0) ) ||
        !myValues
      ) &&
      // If no items are the goal of an objective,
      // hide this entry if the objectives only filter is enabled.
      !( getFilterOnlyObj &&
        !whatsMyObj.flat().includes(true) ) &&
      // If no items are a pickpocket,
      // hide this entry if the pickpockets only filter is enabled.
      !( getFilterOnlyPick &&
        !whatsMyPick.flat().includes(true) ) &&
      // If no items are in a secret location,
      // hide this entry if the secrets only filter is enabled.
      !( getFilterOnlySec &&
        !whatsMySec.flat().includes(true) ) &&
      // If area filter has one or more areas selected,
      // hide this entry if none of the items' areas are selected.
      ( !getFilterArea.length ||
        whatsMyLoc.flat().some(loc =>
          getFilterArea.includes(props.areas[loc].value))
      ) &&
        <View style={[
          stylesList.listEntry,
          // If loot is sorted by order found,
          // put space between loot found in different general areas.
          addSpacing && styles.orderSplit
        ]}>
          <View style={[
            styles.nameEntry(device),
            {backgroundColor: colors.backMed,
            borderColor: colors.border},
            myValues && styles.nameEntryLoot(device)
          ]}>
            {/* Item's image goes here. */}
            {props.img.length === 1 &&
              <Image
                source={props.img[0]}
                style={stylesImg.imgStyle}
              />
            }
            {/* If the item has several varieties,
                switch between the images every few seconds. */}
            {props.img.length > 1 &&
              <ImageSwitch
                img={props.img}
              />
            }
            <Text style={[styles.entryText(device), {color: colors.text}]}>
              {props.name}
            </Text>
            {/*<Text style={[styles.entryText(device), {color: colors.text}]}>
              {whatsMyDiff}
            </Text>*/}
          </View>
          <View style={[
            styles.subEntry(device),
            myValues && styles.subEntryLoot(device)
          ]}>
            {/* For loot,
                map out each entry in loot value sub-array. */}
            {myValues && myValues.map((valueKey, index1) => (
              <View
                key={valueKey.id}
                style={[
                  (device !== 'phone' && width >= 617 &&
                  valueKey.locations.length < 3)
                  ? styles.subEntryLPV_Web(device)
                  : (device !== 'phone' && width < 617 &&
                    valueKey.locations.length === 1)
                    ? styles.subEntryLPV_Web(device)
                    : styles.subEntryLocsPerValue(device)
                ]}
              >
                {(
                // If all items are exclusive to certain difficulties,
                // hide this entry if those difficulty filters are disabled.
                  (getFilterDiffN &&
                    whatsMyDiff[index1].some(loc => loc[0] !== 0) &&
                    whatsMyDiffRec[index1].some(loc => loc[0] !== 0) &&
                    whatsMyDiffBox[index1].some(loc => loc[0] !== 0) ) ||
                  (getFilterDiffH &&
                    whatsMyDiff[index1].some(loc => loc[1] !== 0) &&
                    whatsMyDiffRec[index1].some(loc => loc[1] !== 0) &&
                    whatsMyDiffBox[index1].some(loc => loc[1] !== 0) ) ||
                  (getFilterDiffX &&
                    whatsMyDiff[index1].some(loc => loc[2] !== 0) &&
                    whatsMyDiffRec[index1].some(loc => loc[2] !== 0) &&
                    whatsMyDiffBox[index1].some(loc => loc[2] !== 0) )
                ) &&
                // If all items are exclusive to certain game modes,
                // hide this entry if those game mode filters are disabled.
                ( (getFilterModeA &&
                    whatsMyMode[index1].some(loc => loc[0] !== 0) ) ||
                  (getFilterModeB &&
                    whatsMyMode[index1].some(loc => loc[1] !== 0) ) ||
                  (getFilterModeC &&
                    whatsMyMode[index1].some(loc => loc[2] !== 0) )
                ) &&
                // Depending on the items' loot type(s),
                // hide this entry if those loot filters are disabled.
                ( (getFilterLootGold && myValues &&
                    (whatsMyLoot[index1].some(val => val[0] !== 0) ||
                    whatsMyLootCarry[index1].some(val => val[0] === -1)) ) ||
                  (getFilterLootGems && myValues &&
                    (whatsMyLoot[index1].some(val => val[1] !== 0) ||
                    whatsMyLootCarry[index1].some(val => val[1] === -1)) ) ||
                  (getFilterLootGoods && myValues &&
                    (whatsMyLoot[index1].some(val => val[2] !== 0) ||
                    whatsMyLootCarry[index1].some(val => val[2] === -1)) ) ||
                  (getFilterLootSpecial && myValues &&
                    (whatsMyLoot[index1].some(val => val[3] !== 0) ||
                    whatsMyLootCarry[index1].some(val => val[3] === -1)) ) ||
                  (myValues && whatsMyLootCarry[index1].some(val =>
                    Math.max(...val) === 0) ) ||
                  !myValues
                ) &&
                // If no items are the goal of an objective,
                // hide this entry if the objectives only filter is enabled.
                !( getFilterOnlyObj &&
                  !whatsMyObj[index1].includes(true) ) &&
                // If no items are a pickpocket,
                // hide this entry if the pickpockets only filter is enabled.
                !( getFilterOnlyPick &&
                  !whatsMyPick[index1].includes(true) ) &&
                // If no items are in a secret location,
                // hide this entry if the secrets only filter is enabled.
                !( getFilterOnlySec &&
                  !whatsMySec[index1].includes(true) ) &&
                // If area filter has one or more areas selected,
                // hide this entry if none of the items' areas are selected.
                ( !getFilterArea.length ||
                  whatsMyLoc[index1].some(loc =>
                    getFilterArea.includes(props.areas[loc].value))
                ) &&
                  <>
                    <View style={[
                      styles.subEntryValue(device),
                      {backgroundColor: colors.backMed,
                      borderColor: colors.border}
                    ]}>
                      {/* Loot item's value goes here. */}
                      {valueKey.value && valueKey.value[0] > 0 &&
                        <View style={stylesList.lootRow}>
                          <LootIconPicker cat={props.lootCats[0]} />
                          <Text style={[stylesList.lootText, {color: colors.text}]}>
                            {valueKey.value[0]}
                          </Text>
                        </View>
                      }
                      {valueKey.value && valueKey.value[1] > 0 &&
                        <View style={stylesList.lootRow}>
                          <LootIconPicker cat={props.lootCats[1]} />
                          <Text style={[stylesList.lootText, {color: colors.text}]}>
                            {valueKey.value[1]}
                          </Text>
                        </View>
                      }
                      {valueKey.value && valueKey.value[2] > 0 &&
                        <View style={stylesList.lootRow}>
                          <LootIconPicker cat={props.lootCats[2]} />
                          <Text style={[stylesList.lootText, {color: colors.text}]}>
                            {valueKey.value[2]}
                          </Text>
                        </View>
                      }
                      {valueKey.value && valueKey.value[3] > 0 &&
                        <View style={stylesList.lootRow}>
                          <LootIconPicker cat={props.lootCats[3]} />
                          <Text style={[stylesList.lootText, {color: colors.text}]}>
                            {valueKey.value[3]}
                          </Text>
                        </View>
                      }
                      {/* Variable values for carryover loot. */}
                      {valueKey.carryValue &&
                        valueKey.carryValue[0] === -1 &&
                        <View style={stylesList.lootRow}>
                          <LootIconPicker cat={props.lootCats[0]} />
                          <Text style={[stylesList.lootText, {color: colors.text}]}>
                            {getCarryLoot}
                            {!getCarryLoot && "????"}
                          </Text>
                        </View>
                      }
                      {valueKey.carryValue &&
                        valueKey.carryValue[1] === -1 &&
                        <View style={stylesList.lootRow}>
                          <LootIconPicker cat={props.lootCats[1]} />
                          <Text style={[stylesList.lootText, {color: colors.text}]}>
                            {getCarryLoot}
                            {!getCarryLoot && "????"}
                          </Text>
                        </View>
                      }
                      {valueKey.carryValue &&
                        valueKey.carryValue[2] === -1 &&
                        <View style={stylesList.lootRow}>
                          <LootIconPicker cat={props.lootCats[2]} />
                          <Text style={[stylesList.lootText, {color: colors.text}]}>
                            {getCarryLoot}
                            {!getCarryLoot && "????"}
                          </Text>
                        </View>
                      }
                      {valueKey.carryValue &&
                        valueKey.carryValue[3] === -1 &&
                        <View style={stylesList.lootRow}>
                          <LootIconPicker cat={props.lootCats[3]} />
                          <Text style={[stylesList.lootText, {color: colors.text}]}>
                            {getCarryLoot}
                            {!getCarryLoot && "????"}
                          </Text>
                        </View>
                      }
                      {/* Edge case for loot with value of 0. */}
                      {valueKey.value &&
                        (!valueKey.carryValue || !valueKey.carryValue.length) &&
                        valueKey.value[0] === 0 &&
                        valueKey.value[1] === 0 &&
                        valueKey.value[2] === 0 &&
                        valueKey.value[3] === 0 &&
                        <Text style={[stylesList.lootText, {color: colors.text}]}>
                          0
                        </Text>
                      }
                    </View>
                    <View style={[styles.subEntryLoc, styles.subEntryLocLoot(device)]}>
                      {/* Map out each entry in loot location sub-sub-array. */}
                      {valueKey.locations.map((locKey, index2) => (
                        <FindMe
                          key={locKey.id}
                          id={locKey.id}
                          title={props.title}
                          modeNames={props.modeNames}
                          areas={props.areas}
                          notes={props.notes}
                          value={valueKey.value}
                          carryValue={valueKey.carryValue}
                          findSimple={locKey.findSimple}
                          findArea={locKey.findArea}
                          findNarrow={locKey.findNarrow}
                          findExact={locKey.findExact}
                          findObj={locKey.findObj}
                          findCount={locKey.findCount}
                          findCountRecipe={locKey.findCountRecipe}
                          findCountBox={locKey.findCountBox}
                          findCountMode={locKey.findCountMode}
                          findCountActual={locKey.findCountActual}
                          findRecipe={locKey.findRecipe}
                          findBox={locKey.findBox}
                          findPick={locKey.findPick}
                          findSecret={locKey.findSecret}
                          findEaster={locKey.findEaster}
                          findUnable={locKey.findUnable}
                          findNote={locKey.findNote}
                          findLink={locKey.findLink}
                          loadout={locKey.loadout}
                          price={locKey.price}
                          getLinkedFind={props.getLinkedFind}
                          setLinkedFind={props.setLinkedFind}
                          //passingTest={() => passingTest()}
                        />
                      ))}
                    </View>
                  </>
                }
              </View>
            ))}
            {/* For items and junk,
                map out each entry in location sub-array. */}
            {props.locations &&
              <View style={styles.subEntryLoc}>
                {props.locations.map((locKey, index3) => (
                  <FindMe
                    key={locKey.id}
                    id={locKey.id}
                    title={props.title}
                    modeNames={props.modeNames}
                    areas={props.areas}
                    notes={props.notes}
                    value={locKey.value}
                    findSimple={locKey.findSimple}
                    findArea={locKey.findArea}
                    findNarrow={locKey.findNarrow}
                    findExact={locKey.findExact}
                    findObj={locKey.findObj}
                    findCount={locKey.findCount}
                    findCountRecipe={locKey.findCountRecipe}
                    findCountBox={locKey.findCountBox}
                    findCountMode={locKey.findCountMode}
                    findCountActual={locKey.findCountActual}
                    findRecipe={locKey.findRecipe}
                    findBox={locKey.findBox}
                    findPick={locKey.findPick}
                    findSecret={locKey.findSecret}
                    findEaster={locKey.findEaster}
                    findUnable={locKey.findUnable}
                    findNote={locKey.findNote}
                    findLink={locKey.findLink}
                    loadout={locKey.loadout}
                    price={locKey.price}
                    carryover={locKey.carryover}
                    getLinkedFind={props.getLinkedFind}
                    setLinkedFind={props.setLinkedFind}
                  />
                ))}
              </View>
            }
          </View>
        </View>
      }
    </>
  );
}

// Define various styles here.
const styles = StyleSheet.create({
  nameEntry: device => ({
    borderWidth: 1,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    alignItems: 'center',
    width: (device !== 'phone') ? 80 : '15%',
  }),
  nameEntryLoot: device => ({
    width: (device !== 'phone') ? 80 : '13.5%',
  }),
  subEntry: device => ({
    flex: 1,
    width: (device !== 'phone') ? 764 : '85%',
  }),
  subEntryLoot: device => ({
    flex: 1,
    width: (device !== 'phone') ? 764 : '86.5%',
  }),
  subEntryLocsPerValue: device => ({
    flex: 10,
    flexDirection: 'row',
    minHeight: (device !== 'phone') ? 38 : 30,
  }),
  subEntryLPV_Web: device => ({
    //backgroundColor: 'orange',
    flex: 1,
    flexDirection: 'row',
    minHeight: (device !== 'phone') ? 38 : 30,
  }),
  subEntryValue: device => ({
    //flexDirection: 'row',
    borderWidth: 1,
    justifyContent: 'center',
    paddingLeft: (device !== 'phone') ? 4 : 2,
    width: (device !== 'phone') ? 60 : '11%',
  }),
  subEntryLoc: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'stretch',
    //width: '89%',
  },
  subEntryLocLoot: device => ({
    width: (device !== 'phone') ? 228 : '89%',
  }),
  entryText: device => ({
    fontSize: (device !== 'phone') ? 12 : 7.5,
    textAlign: 'center',
  }),
  orderSplit: {
    marginBottom: 9,
  },
});
