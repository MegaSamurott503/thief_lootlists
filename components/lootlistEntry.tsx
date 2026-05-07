import { useTheme } from '@react-navigation/native';
import {
  StyleSheet, Platform,
  Image,
  Text, View,
  useWindowDimensions
} from 'react-native';
import { useContext } from 'react';

import { FindMe } from '@/components/findMe';
import { ImageSwitch } from '@/components/imageSwitch';

import { stylesList } from '@/constants/stylesList';
import { stylesImg } from '@/constants/stylesImg';
import {
  iconGold, iconGems, iconGoods, iconSpecial
} from '@/constants/imgUI';
import { CarryoverContext } from '@/constants/context';

/* **************** */
/*  LOOTLIST ENTRY  */
/* **************** */
// Custom view component of a unique item and all its locations.
export function LootlistEntry(props) {
  // Use defaults to avoid errors if some props are undefined.
  const {
    values = [],
    orderedLoot = []
  } = props;

  // Access window size.
  const { height, width } = useWindowDimensions();

  // Access theme colors.
  const { colors } = useTheme();

  // Fetch CarryLoot state from context.
  const {getCarryLoot, setCarryLoot} =
    useContext(CarryoverContext);

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

  /*function passingTest() {
    alert('Test success.');
  };*/

  return (
    <View style={stylesList.listEntry}>
      <View style={[
        styles.nameEntry,
        {backgroundColor: colors.backMed,
        borderColor: colors.border},
        myValues && styles.nameEntryLoot
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
        <Text style={[styles.entryText, {color: colors.text}]}>
          {props.name}
        </Text>
      </View>
      <View style={[
        styles.subEntry, myValues && styles.subEntryLoot
      ]}>
        {/* For loot,
            map out each entry in loot value sub-array. */}
        {myValues && myValues.map((valueKey, index1) => (
          <View
            key={valueKey.id}
            style={[
              (Platform.OS === 'web' && width >= 617 &&
              valueKey.locations.length < 3)
              ? styles.subEntryLPV_Web
              : (Platform.OS === 'web' && width < 617 &&
                valueKey.locations.length === 1)
                ? styles.subEntryLPV_Web
                : styles.subEntryLocsPerValue
            ]}
          >
            <View style={[
              styles.subEntryValue,
              {backgroundColor: colors.backMed,
              borderColor: colors.border}
            ]}>
              {/* Loot item's value goes here. */}
              {valueKey.value && valueKey.value[0] > 0 &&
                <View style={stylesList.lootRow}>
                  <Image
                    source={iconGold}
                    style={stylesImg.imgLootIcon}
                  />
                  <Text style={[stylesList.lootText, {color: colors.text}]}>
                    {valueKey.value[0]}
                  </Text>
                </View>
              }
              {valueKey.value && valueKey.value[1] > 0 &&
                <View style={stylesList.lootRow}>
                  <Image
                    source={iconGems}
                    style={stylesImg.imgLootIcon}
                  />
                  <Text style={[stylesList.lootText, {color: colors.text}]}>
                    {valueKey.value[1]}
                  </Text>
                </View>
              }
              {valueKey.value && valueKey.value[2] > 0 &&
                <View style={stylesList.lootRow}>
                  <Image
                    source={iconGoods}
                    style={stylesImg.imgLootIcon}
                  />
                  <Text style={[stylesList.lootText, {color: colors.text}]}>
                    {valueKey.value[2]}
                  </Text>
                </View>
              }
              {valueKey.value && valueKey.value[3] > 0 &&
                <View style={stylesList.lootRow}>
                  <Image
                    source={iconSpecial}
                    style={stylesImg.imgLootIcon}
                  />
                  <Text style={[stylesList.lootText, {color: colors.text}]}>
                    {valueKey.value[3]}
                  </Text>
                </View>
              }
              {/* Variable values for carryover loot. */}
              {valueKey.carryValue &&
                valueKey.carryValue[0] === -1 &&
                <View style={stylesList.lootRow}>
                  <Image
                    source={iconGold}
                    style={stylesImg.imgLootIcon}
                  />
                  <Text style={[stylesList.lootText, {color: colors.text}]}>
                    {getCarryLoot}
                    {!getCarryLoot && "????"}
                  </Text>
                </View>
              }
              {valueKey.carryValue &&
                valueKey.carryValue[1] === -1 &&
                <View style={stylesList.lootRow}>
                  <Image
                    source={iconGems}
                    style={stylesImg.imgLootIcon}
                  />
                  <Text style={[stylesList.lootText, {color: colors.text}]}>
                    {getCarryLoot}
                    {!getCarryLoot && "????"}
                  </Text>
                </View>
              }
              {valueKey.carryValue &&
                valueKey.carryValue[2] === -1 &&
                <View style={stylesList.lootRow}>
                  <Image
                    source={iconGoods}
                    style={stylesImg.imgLootIcon}
                  />
                  <Text style={[stylesList.lootText, {color: colors.text}]}>
                    {getCarryLoot}
                    {!getCarryLoot && "????"}
                  </Text>
                </View>
              }
              {valueKey.carryValue &&
                valueKey.carryValue[3] === -1 &&
                <View style={stylesList.lootRow}>
                  <Image
                    source={iconSpecial}
                    style={stylesImg.imgLootIcon}
                  />
                  <Text style={[stylesList.lootText, {color: colors.text}]}>
                    {getCarryLoot}
                    {!getCarryLoot && "????"}
                  </Text>
                </View>
              }
              {/* Edge case for loot with value of 0. */}
              {valueKey.value &&
                (!valueKey.carryValue || valueKey.carryValue.length === 0) &&
                valueKey.value[0] === 0 &&
                valueKey.value[1] === 0 &&
                valueKey.value[2] === 0 &&
                valueKey.value[3] === 0 &&
                <Text style={[stylesList.lootText, {color: colors.text}]}>
                  0
                </Text>
              }
            </View>
            <View style={[styles.subEntryLoc, styles.subEntryLocLoot]}>
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
  );
}

// Define various styles here.
const styles = StyleSheet.create({
  nameEntry: {
    borderWidth: 1,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    alignItems: 'center',
    width: (Platform.OS === 'web') ? 80 : '15%',
  },
  nameEntryLoot: {
    width: (Platform.OS === 'web') ? 80 : '13.5%',
  },
  subEntry: {
    flex: 1,
    width: (Platform.OS === 'web') ? 764 : '85%',
  },
  subEntryLoot: {
    flex: 1,
    width: (Platform.OS === 'web') ? 764 : '86.5%',
  },
  subEntryLocsPerValue: {
    flex: 10,
    flexDirection: 'row',
    minHeight: (Platform.OS === 'web') ? 38 : 30,
  },
  subEntryLPV_Web: {
    //backgroundColor: 'orange',
    flex: 1,
    flexDirection: 'row',
    minHeight: (Platform.OS === 'web') ? 38 : 30,
  },
  subEntryValue: {
    //flexDirection: 'row',
    borderWidth: 1,
    justifyContent: 'center',
    paddingLeft: (Platform.OS === 'web') ? 4 : 2,
    width: (Platform.OS === 'web') ? 60 : '11%',
  },
  subEntryLoc: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'stretch',
    //width: '89%',
  },
  subEntryLocLoot: {
    width: (Platform.OS === 'web') ? 228 : '89%',
  },
  entryText: {
    fontSize: (Platform.OS === 'web') ? 12 : 7.5,
    textAlign: 'center',
  },
});
