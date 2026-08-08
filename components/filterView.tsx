import { useTheme } from '@react-navigation/native';
import {
  StyleSheet, Platform,
  Image,
  Text, TouchableOpacity,
  View, Modal,
  ActivityIndicator,
  useWindowDimensions
} from 'react-native';
import { useState, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MultipleSelectList } from 'react-native-dropdown-select-list';
import Ionicons from '@expo/vector-icons/Ionicons';

import { LootIconPicker } from '@/components/lootIconPicker';
import { FilterDropdown } from '@/components/filterDropdown';

import { stylesImg } from '@/constants/stylesImg';
import { stylesSelect } from '@/constants/stylesSelect';
import { stylesModal } from '@/constants/stylesModal';
import {
  FoundContext, FilterContext, SettingContext
} from '@/constants/context';

/* **************** */
/*    FILTER VIEW   */
/* **************** */
// Custom view component of options for filtering item locations.
export function FilterView(props) {
  // Access window size.
  const { height, width } = useWindowDimensions();

  // Access theme colors.
  const { colors } = useTheme();

  // ShowModal: tracks the modal's visibility.
  // Used to show or hide the modal with 'please wait' text.
  const [getShowModal, setShowModal] = useState(false);

  // Fetch FoundLoot and FoundPocket states from context.
  const {accumLoot, accumPiece, accumPocket} = useContext(FoundContext);

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
  const {scheme, device,
        getCurrentTheme, setCurrentTheme} =
    useContext(SettingContext);

  // Variables for checkbox icon formatting.
  const checkSize = 14;
  const checkColorOn = (getCurrentTheme === 'dark' ||
    (getCurrentTheme === 'default' && scheme === 'dark'))
    ? 'goldenrod' : 'olive';
  const checkColorOff = (getCurrentTheme === 'dark' ||
    (getCurrentTheme === 'default' && scheme === 'dark'))
    ? 'rgb(140,140,140)' : 'rgb(70,70,70)';

  // Remove this mission's data in device storage.
  const removeStored = async () => {
    const invKeys = [];
    // Show the 'please wait' modal.
    setShowModal(true);
    // Create an array large enough to contain all IDs.
    for (let i = 1; i <= 140; i++) {
      invKeys.push(`@inventory_${props.id}_loot_${i}`);
    }
    for (let i = 1; i <= 130; i++) {
      invKeys.push(`@inventory_${props.id}_item_${i}`);
    }
    for (let i = 1; i <= 90; i++) {
      invKeys.push(`@inventory_${props.id}_junk_${i}`);
    }
    for (let i = 1; i <= 20; i++) {
      invKeys.push(`@secret_${props.id}_sec_${i}`);
    }
    try {
      await AsyncStorage.multiRemove(invKeys);
      await AsyncStorage.removeItem(`@myloot_${props.title}`);
      await AsyncStorage.removeItem(`@mypiece_${props.title}`);
      await AsyncStorage.removeItem(`@mypocket_${props.title}`);
      //alert('Cleared all items.');
    } catch (e) {
      // Error: Clearing the data failed.
      alert('Failed to clear data.');
    }

    // Reset loot & pickpocket totals to 0.
    accumLoot.current = [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]];
    accumPiece.current = [0,0,0];
    accumPocket.current = [0,0,0];
    // Update item boxes.
    props.setLinkedFind('reset');
    // Hide the 'please wait' modal.
    setShowModal(false);
  };

  return (
    <>
      {/* Button to clear all selected items. */}
      <TouchableOpacity
        style={[
          styles.allButton,
          {backgroundColor: colors.backLight,
          borderColor: colors.border}
        ]}
        onPress={removeStored}
      >
        <Text style={{color: colors.text}}>
          Clear All
        </Text>
        {/* Modal to show 'please wait' text. */}
        <Modal
          animationType='fade'
          transparent={true}
          statusBarTranslucent={true}
          visible={getShowModal}
          onRequestClose={() => setShowModal(false)}
        >
          {/* Semi-transparent background. */}
          <View
            style={stylesModal.modalView}
            activeOpacity={1}
          >
            {/* Pop-up box containing the text. */}
            <View style={[
              styles.waitModal,
              {backgroundColor: colors.backLight,
              borderColor: colors.border}
            ]}>
              <ActivityIndicator
                size='large'
                color='yellow'
              />
              <Text style={{color: colors.text}}>
                Clearing mission data.
              </Text>
              <Text style={{color: colors.text}}>
                Please wait...
              </Text>
            </View>
          </View>
        </Modal>
      </TouchableOpacity>

      <View style={styles.filters}>
        <Text style={[
            Platform.OS !== 'web' && {
              fontSize: width*0.035,
            },
            Platform.OS === 'web' && {
              fontSize: (width > 460) ? 14 : width*0.03,
            },
            {color: colors.text}
          ]}>
          Filters:
        </Text>
        <View>
          {/* Row of difficulty filters, if applicable. */}
          {props.diffChanges &&
            <View style={styles.filterRow}>
              {/* Normal difficulty filter. */}
              <TouchableOpacity
                // Change background color when toggled.
                style={[styles.filterButton,
                  {minWidth: (Platform.OS === 'web')
                    ? 105 : width*0.256,
                  backgroundColor: colors.backLight,
                  borderColor: colors.border},
                  !getFilterDiffN && {backgroundColor: colors.backDark}
                ]}
                // Toggle whether this filter is on or off.
                onPress={() => setFilterDiffN(!getFilterDiffN)}
              >
                {/* Change checkbox icon when toggled. */}
                <Ionicons
                  name={getFilterDiffN ? "checkbox" : "square-outline"}
                  size={checkSize}
                  color={getFilterDiffN ? checkColorOn : checkColorOff}
                />
                <Text style={[
                  styles.filterTextMode,
                  {fontSize: (Platform.OS === 'web')
                    ? 12 : width*0.028,
                  color: colors.locN}
                ]}>
                  {` ■ ${props.diffNames[0]}`}
                </Text>
              </TouchableOpacity>
              {/* Hard difficulty filter. */}
              <TouchableOpacity
                // Change background color when toggled.
                style={[styles.filterButton,
                  {minWidth: (Platform.OS === 'web')
                    ? 105 : width*0.256,
                  backgroundColor: colors.backLight,
                  borderColor: colors.border},
                  !getFilterDiffH && {backgroundColor: colors.backDark}
                ]}
                // Toggle whether this filter is on or off.
                onPress={() => setFilterDiffH(!getFilterDiffH)}
              >
                {/* Change checkbox icon when toggled. */}
                <Ionicons
                  name={getFilterDiffH ? "checkbox" : "square-outline"}
                  size={checkSize}
                  color={getFilterDiffH ? checkColorOn : checkColorOff}
                />
                <Text style={[
                  styles.filterTextMode,
                  {fontSize: (Platform.OS === 'web')
                    ? 12 : width*0.028,
                  color: colors.locH}
                ]}>
                  {` ▲ ${props.diffNames[1]}`}
                </Text>
              </TouchableOpacity>
              {/* Expert difficulty filter. */}
              <TouchableOpacity
                // Change background color when toggled.
                style={[styles.filterButton,
                  {minWidth: (Platform.OS === 'web')
                    ? 105 : width*0.256,
                  backgroundColor: colors.backLight,
                  borderColor: colors.border},
                  !getFilterDiffX && {backgroundColor: colors.backDark}
                ]}
                // Toggle whether this filter is on or off.
                onPress={() => setFilterDiffX(!getFilterDiffX)}
              >
                {/* Change checkbox icon when toggled. */}
                <Ionicons
                  name={getFilterDiffX ? "checkbox" : "square-outline"}
                  size={checkSize}
                  color={getFilterDiffX ? checkColorOn : checkColorOff}
                />
                <Text style={[
                  styles.filterTextMode,
                  {fontSize: (Platform.OS === 'web')
                    ? 12 : width*0.028,
                  color: colors.locX}
                ]}>
                  {` ◆ ${props.diffNames[2]}`}
                </Text>
              </TouchableOpacity>
            </View>
          }

          {/* Row of game mode filters, if applicable. */}
          {props.modeNames &&
            <View style={styles.filterRow}>
              {/* Game mode A filter. */}
              {props.modeNames.length >= 1 &&
                <TouchableOpacity
                  // Change background color when toggled.
                  style={[styles.filterButton,
                    {minWidth: (Platform.OS === 'web')
                      ? 105 : width*0.256,
                    backgroundColor: colors.backLight,
                    borderColor: colors.border},
                    !getFilterModeA && {backgroundColor: colors.backDark}
                  ]}
                  // Toggle whether this filter is on or off.
                  onPress={() => setFilterModeA(!getFilterModeA)}
                >
                  {/* Change checkbox icon when toggled. */}
                  <Ionicons
                    name={getFilterModeA ? "checkbox" : "square-outline"}
                    size={checkSize}
                    color={getFilterModeA ? checkColorOn : checkColorOff}
                  />
                  <Text style={[
                    styles.filterTextMode,
                    {fontSize: (Platform.OS === 'web')
                      ? 12 : width*0.028,
                    color: getFilterModeA
                      ? colors.text : colors.textInvert}
                  ]}>
                    {` ${props.modeNames[0].name}`}
                  </Text>
                </TouchableOpacity>
              }
              {/* Game mode B filter. */}
              {props.modeNames.length >= 2 &&
                <TouchableOpacity
                  // Change background color when toggled.
                  style={[styles.filterButton,
                    {minWidth: (Platform.OS === 'web')
                      ? 105 : width*0.256,
                    backgroundColor: colors.backLight,
                    borderColor: colors.border},
                    !getFilterModeB && {backgroundColor: colors.backDark}
                  ]}
                  // Toggle whether this filter is on or off.
                  onPress={() => setFilterModeB(!getFilterModeB)}
                >
                  {/* Change checkbox icon when toggled. */}
                  <Ionicons
                    name={getFilterModeB ? "checkbox" : "square-outline"}
                    size={checkSize}
                    color={getFilterModeB ? checkColorOn : checkColorOff}
                  />
                  <Text style={[
                    styles.filterTextMode,
                    {fontSize: (Platform.OS === 'web')
                      ? 12 : width*0.028,
                    color: getFilterModeB
                      ? colors.text : colors.textInvert}
                  ]}>
                    {` ${props.modeNames[1].name}`}
                  </Text>
                </TouchableOpacity>
              }
              {/* Game mode C filter. */}
              {props.modeNames.length >= 3 &&
                <TouchableOpacity
                  // Change background color when toggled.
                  style={[styles.filterButton,
                    {minWidth: (Platform.OS === 'web')
                      ? 105 : width*0.256,
                    backgroundColor: colors.backLight,
                    borderColor: colors.border},
                    !getFilterModeC && {backgroundColor: colors.backDark}
                  ]}
                  // Toggle whether this filter is on or off.
                  onPress={() => setFilterModeC(!getFilterModeC)}
                >
                  {/* Change checkbox icon when toggled. */}
                  <Ionicons
                    name={getFilterModeC ? "checkbox" : "square-outline"}
                    size={checkSize}
                    color={getFilterModeC ? checkColorOn : checkColorOff}
                  />
                  <Text style={[
                    styles.filterTextMode,
                    {fontSize: (Platform.OS === 'web')
                      ? 12 : width*0.028,
                    color: getFilterModeC
                      ? colors.text : colors.textInvert}
                  ]}>
                    {` ${props.modeNames[2].name}`}
                  </Text>
                </TouchableOpacity>
              }
            </View>
          }

          {/* Row of loot type filters, if applicable. */}
          {props.lootCount &&
            <View style={styles.filterRow}>
              {/* Gold loot filter. */}
              {props.goldCount &&
                <TouchableOpacity
                  // Change background color when toggled.
                  style={[styles.filterButton,
                    {minWidth: (Platform.OS === 'web')
                      ? 105 : width*0.256,
                    backgroundColor: colors.backLight,
                    borderColor: colors.border},
                    !getFilterLootGold && {backgroundColor: colors.backDark}
                  ]}
                  // Toggle whether this filter is on or off.
                  onPress={() => setFilterLootGold(!getFilterLootGold)}
                >
                  {/* Change checkbox icon when toggled. */}
                  <Ionicons
                    name={getFilterLootGold ? "checkbox" : "square-outline"}
                    size={checkSize}
                    color={getFilterLootGold ? checkColorOn : checkColorOff}
                  />
                  <Text> </Text>
                  <LootIconPicker cat={props.lootCats[0]} big="true" />
                </TouchableOpacity>
              }
              {/* Gems loot filter. */}
              {props.gemsCount &&
                <TouchableOpacity
                  // Change background color when toggled.
                  style={[styles.filterButton,
                    {minWidth: (Platform.OS === 'web')
                      ? 105 : width*0.256,
                    backgroundColor: colors.backLight,
                    borderColor: colors.border},
                    !getFilterLootGems && {backgroundColor: colors.backDark}
                  ]}
                  // Toggle whether this filter is on or off.
                  onPress={() => setFilterLootGems(!getFilterLootGems)}
                >
                  {/* Change checkbox icon when toggled. */}
                  <Ionicons
                    name={getFilterLootGems ? "checkbox" : "square-outline"}
                    size={checkSize}
                    color={getFilterLootGems ? checkColorOn : checkColorOff}
                  />
                  <Text> </Text>
                  <LootIconPicker cat={props.lootCats[1]} big="true" />
                </TouchableOpacity>
              }
              {/* Goods loot filter. */}
              {props.goodsCount &&
                <TouchableOpacity
                  // Change background color when toggled.
                  style={[styles.filterButton,
                    {minWidth: (Platform.OS === 'web')
                      ? 105 : width*0.256,
                    backgroundColor: colors.backLight,
                    borderColor: colors.border},
                    !getFilterLootGoods && {backgroundColor: colors.backDark}
                  ]}
                  // Toggle whether this filter is on or off.
                  onPress={() => setFilterLootGoods(!getFilterLootGoods)}
                >
                  {/* Change checkbox icon when toggled. */}
                  <Ionicons
                    name={getFilterLootGoods ? "checkbox" : "square-outline"}
                    size={checkSize}
                    color={getFilterLootGoods ? checkColorOn : checkColorOff}
                  />
                  <Text> </Text>
                  <LootIconPicker cat={props.lootCats[2]} big="true" />
                </TouchableOpacity>
              }
              {/* Special loot filter. */}
              {props.specialCount &&
                <TouchableOpacity
                  // Change background color when toggled.
                  style={[styles.filterButton,
                    {minWidth: (Platform.OS === 'web')
                      ? 105 : width*0.256,
                    backgroundColor: colors.backLight,
                    borderColor: colors.border},
                    !getFilterLootSpecial && {backgroundColor: colors.backDark}
                  ]}
                  // Toggle whether this filter is on or off.
                  onPress={() => setFilterLootSpecial(!getFilterLootSpecial)}
                >
                  {/* Change checkbox icon when toggled. */}
                  <Ionicons
                    name={getFilterLootSpecial ? "checkbox" : "square-outline"}
                    size={checkSize}
                    color={getFilterLootSpecial ? checkColorOn : checkColorOff}
                  />
                  <Text> </Text>
                  <LootIconPicker cat={props.lootCats[3]} big="true" />
                </TouchableOpacity>
              }
            </View>
          }

          {/* Row of miscellaneous filters, if applicable. */}
          {(props.markObj || props.secretCount ||
            (props.pocketCount && (Math.max(...props.pocketCount) > 0) )) &&
            <View style={styles.filterRow}>
              {/* Objectives only filter. */}
              {props.markObj &&
                <TouchableOpacity
                  // Change background color when toggled.
                  style={[styles.filterButton,
                    {minWidth: (Platform.OS === 'web')
                      ? 105 : width*0.256,
                    backgroundColor: colors.backLight,
                    borderColor: colors.border},
                    !getFilterOnlyObj && {backgroundColor: colors.backDark}
                  ]}
                  // Toggle whether this filter is on or off.
                  onPress={() => setFilterOnlyObj(!getFilterOnlyObj)}
                >
                  {/* Change checkbox icon when toggled. */}
                  <Ionicons
                    name={getFilterOnlyObj ? "checkbox" : "square-outline"}
                    size={checkSize}
                    color={getFilterOnlyObj ? checkColorOn : checkColorOff}
                  />
                  <Text style={[
                    styles.filterTextMode,
                    {fontSize: (Platform.OS === 'web')
                      ? 12 : width*0.028,
                    color: getFilterOnlyObj
                      ? colors.text : colors.textInvert}
                  ]}>
                    {` Only Objs`}
                  </Text>
                </TouchableOpacity>
              }
              {/* Pickpockets only filter. */}
              {(props.pocketCount &&
               (Math.max(...props.pocketCount) > 0) ) &&
                <TouchableOpacity
                  // Change background color when toggled.
                  style={[styles.filterButton,
                    {minWidth: (Platform.OS === 'web')
                      ? 105 : width*0.256,
                    backgroundColor: colors.backLight,
                    borderColor: colors.border},
                    !getFilterOnlyPick && {backgroundColor: colors.backDark}
                  ]}
                  // Toggle whether this filter is on or off.
                  onPress={() => setFilterOnlyPick(!getFilterOnlyPick)}
                >
                  {/* Change checkbox icon when toggled. */}
                  <Ionicons
                    name={getFilterOnlyPick ? "checkbox" : "square-outline"}
                    size={checkSize}
                    color={getFilterOnlyPick ? checkColorOn : checkColorOff}
                  />
                  <Text style={[
                    styles.filterTextMode,
                    {fontSize: (Platform.OS === 'web')
                      ? 12 : width*0.028,
                    color: getFilterOnlyPick
                      ? colors.text : colors.textInvert}
                  ]}>
                    {` Only Picks`}
                  </Text>
                </TouchableOpacity>
              }
              {/* Secrets only filter. */}
              {props.secretCount > 0 &&
                <TouchableOpacity
                  // Change background color when toggled.
                  style={[styles.filterButton,
                    {minWidth: (Platform.OS === 'web')
                      ? 105 : width*0.256,
                    backgroundColor: colors.backLight,
                    borderColor: colors.border},
                    !getFilterOnlySec && {backgroundColor: colors.backDark}
                  ]}
                  // Toggle whether this filter is on or off.
                  onPress={() => setFilterOnlySec(!getFilterOnlySec)}
                >
                  {/* Change checkbox icon when toggled. */}
                  <Ionicons
                    name={getFilterOnlySec ? "checkbox" : "square-outline"}
                    size={checkSize}
                    color={getFilterOnlySec ? checkColorOn : checkColorOff}
                  />
                  <Text style={[
                    styles.filterTextMode,
                    {fontSize: (Platform.OS === 'web')
                      ? 12 : width*0.028,
                    color: getFilterOnlySec
                      ? colors.text : colors.textInvert}
                  ]}>
                    {` Only Secrets`}
                  </Text>
                </TouchableOpacity>
              }
            </View>
          }
        </View>
      </View>

      {/* Area filter. */}
      <FilterDropdown
        getFilter={getFilterArea}
        setFilter={setFilterArea}
        data={props.areas}
        placeholder="Filter by Area"
        label="Areas:"
        size="wide"
      />
    </>
  );
}

// Define various styles here.
const styles = StyleSheet.create({
  filters: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: (Platform.OS === 'web') ? 10 : 5,
  },
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    marginHorizontal: 5,
    marginVertical: 5,
    paddingHorizontal: 4,
    paddingVertical: 2,
    //minWidth: 105,
    minHeight: 27,
  },
  filterTextFalse: {
    color: 'white',
  },
  filterTextMode: {
    //fontSize: 12,
    fontWeight: 'bold',
  },
  allButton: {
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: (Platform.OS === 'web') ? 10 : 5,
    marginVertical: (Platform.OS === 'web') ? 10 : 5,
    paddingHorizontal: 4,
    paddingVertical: 2,
    width: 80,
  },
  waitModal: {
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },
});
