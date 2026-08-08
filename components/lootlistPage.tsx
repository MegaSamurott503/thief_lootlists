import { useTheme } from '@react-navigation/native';
import {
  useRouter, useNavigation,
  useLocalSearchParams
} from 'expo-router';
import {
  StyleSheet, Platform,
  Image, Text,
  TouchableOpacity,
  View, ScrollView,
  PixelRatio,
  useWindowDimensions
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  useEffect, useLayoutEffect,
  useState, useContext, useRef
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { SectionHeader } from '@/components/sectionHeader';
import { DebugView } from '@/components/debugView';
import { ArrowsView } from '@/components/arrowsView';
import { FilterView } from '@/components/filterView';
import { TotalsView } from '@/components/totalsView';
import { LootOrder } from '@/components/lootOrder';
import { LootlistEntry } from '@/components/lootlistEntry';
import { SecretEntry } from '@/components/secretEntry';

import { myList } from '@/constants/jsonLists';
import { myAuthors, myContests } from '@/constants/jsonFilters';
import { stylesTitle } from '@/constants/stylesTitle';
import { myScreens } from '@/constants/imgMissions';
import { myImages } from '@/constants/imgItems';
import { mySecrets } from '@/constants/imgSecrets';
import {
  SettingContext, FilterContext,
  FoundContext, CarryoverContext,
  ScrollContext
} from '@/constants/context';

// TODO: go through old .js files and make sure everything is copied over!
// TODO: figure out if any more items should be marked as Easter Eggs
// TODO: THIEF font doesn't load right away when home screen displays and is cut off
/* **************** */
/*   LOOTLIST PAGE  */
/* **************** */
// Custom view component for displaying mission lootlist.
export function LootlistPage(props) {

  // Access the router object.
  const router = useRouter();

  // Access the navigation object.
  const navigation = useNavigation();

  // Access safe area context insets.
  const insets = useSafeAreaInsets();

  // Access window size.
  const { height, width } = useWindowDimensions();

  // Access theme colors.
  const { colors } = useTheme();

  // Fetch accumLoot, accumPiece, and accumPiece states from context.
  const {accumLoot, accumPiece, accumPocket} = useContext(FoundContext);

  // Fetch scroll refs from context.
  const {scrollingPage, scrollingOffset,
        jumpEmpty, jumpTop,
        jumpLoot, jumpItems,
        jumpJunk, jumpSecrets,
        jumpArrows, jumpCrystals,
        jumpKeys, jumpParchment,
        jumpTreasure, jumpJewelry,
        jumpGemstones, jumpTalismans} =
    useContext(ScrollContext);

  // Fetch global setting states from context.
  const {scheme, device,
        //getCurrentTheme, setCurrentTheme,
        getDefaultDiffN, setDefaultDiffN,
        getDefaultDiffH, setDefaultDiffH,
        getDefaultDiffX, setDefaultDiffX,
        getLootSort, setLootSort,
        getShowListLoot, setShowListLoot,
        getShowListItem, setShowListItem,
        getShowListJunk, setShowListJunk,
        getShowListSec, setShowListSec,
        getShowDebug, setShowDebug} =
    useContext(SettingContext);

  // FilterDiff: tracks booleans for difficulty filters.
  // True = show items only available on this difficulty.
  // False = hide items only available on this difficulty.
  const [getFilterDiffN, setFilterDiffN] = useState(getDefaultDiffN);
  const [getFilterDiffH, setFilterDiffH] = useState(getDefaultDiffH);
  const [getFilterDiffX, setFilterDiffX] = useState(getDefaultDiffX);

  // FilterMode: tracks booleans for game mode filters.
  // True = show items only available on this game mode.
  // False = hide items only available on this game mode.
  const [getFilterModeA, setFilterModeA] = useState(true);
  const [getFilterModeB, setFilterModeB] = useState(true);
  const [getFilterModeC, setFilterModeC] = useState(true);

  // FilterLoot: tracks booleans for loot filters.
  // True = show loot items with this value type.
  // False = hide loot items with this value type.
  const [getFilterLootGold, setFilterLootGold] = useState(true);
  const [getFilterLootGems, setFilterLootGems] = useState(true);
  const [getFilterLootGoods, setFilterLootGoods] = useState(true);
  const [getFilterLootSpecial, setFilterLootSpecial] = useState(true);

  // FilterOnly: tracks booleans for miscellaneous filters.
  // True = exclude items that don't fit this category.
  // False = include items that don't fit this category.
  const [getFilterOnlyObj, setFilterOnlyObj] = useState(false);
  const [getFilterOnlyPick, setFilterOnlyPick] = useState(false);
  const [getFilterOnlySec, setFilterOnlySec] = useState(false);

  // FilterArea: tracks list of selections for area filter.
  // When in use, hides any items not found in selected areas.
  const [getFilterArea, setFilterArea] = useState([]);

  // LinkedFind: tracks if items and secrets are found simultaneously.
  // Used to trigger multiple items/secrets at the same time.
  const [getLinkedFind, setLinkedFind] = useState([]);

  // DiffNames: defines the names of each difficulty.
  // Shown on the filter buttons and totals window.
  let diffNames = ["Normal","Hard","Expert"];
  if (myList[props.missionName].diffNames)
    diffNames = myList[props.missionName].diffNames;

  // LootCats: defines the loot categories of this mission.
  // Used to determine which loot icons to display.
  let lootCats = ["gold","gems","goods"];
  if (myList[props.missionName].lootCats)
    lootCats = myList[props.missionName].lootCats;

  // CarriedLoot: tracks carryover loot from the previous mission.
  // Only used if directly navigating from one mission to the next.
  let carriedLoot = 0;
  if (props.carryingLoot)
    carriedLoot = props.carryingLoot;

  // LootOrderSort: array to be filled with loot sub-arrays.
  // Used to sort loot by the order they're found.
  let lootOrderSort = [''];

  // LootCount: stores whether this mission has loot, and what types.
  // Used to determine whether to show loot-related buttons.
  const goldCount =
    ( myList[props.missionName].totals &&
      myList[props.missionName].totals[0][0] === 0 &&
      myList[props.missionName].totals[1][0] === 0 &&
      myList[props.missionName].totals[2][0] === 0 ) ? false : true;
  const gemsCount =
    ( myList[props.missionName].totals &&
      myList[props.missionName].totals[0][1] === 0 &&
      myList[props.missionName].totals[1][1] === 0 &&
      myList[props.missionName].totals[2][1] === 0 ) ? false : true;
  const goodsCount =
    ( myList[props.missionName].totals &&
      myList[props.missionName].totals[0][2] === 0 &&
      myList[props.missionName].totals[1][2] === 0 &&
      myList[props.missionName].totals[2][2] === 0 ) ? false : true;
  const specialCount =
    ( myList[props.missionName].totals &&
      myList[props.missionName].totals[0][3] === 0 &&
      myList[props.missionName].totals[1][3] === 0 &&
      myList[props.missionName].totals[2][3] === 0 ) ? false : true;
  const canFindLoot =
    ( myList[props.missionName].totals &&
      myList[props.missionName].loot && myList[props.missionName].loot.length );

  // Store number of secrets in the mission.
  // Used to determine whether to show secret-related buttons.
  const secretCount =
    (myList[props.missionName].secrets && myList[props.missionName].secrets.length)
    ? myList[props.missionName].secrets.length : 0;

  // Booleans to track whether the mission has items or junk.
  // Used to determine whether to show item- and junk-related buttons.
  const canFindItems =
    (myList[props.missionName].items && myList[props.missionName].items.length);
  const canFindJunk =
    (myList[props.missionName].junk && myList[props.missionName].junk.length);

  // Booleans to track whether the mission has certain item categories.
  // Used to determine whether to show buttons related to those categories.
  const canFindArrows =
    (myList[props.missionName].items &&
      myList[props.missionName].items.some((itemCat) =>
        itemCat.category === "Arrows")
    );
  const canFindCrystals =
    (myList[props.missionName].items &&
      myList[props.missionName].items.some((itemCat) =>
        itemCat.category === "Crystals")
    );
  const canFindKeys =
    (myList[props.missionName].items &&
      myList[props.missionName].items.some((itemCat) =>
        itemCat.category === "Keys")
    );
  const canFindParchment =
    (myList[props.missionName].items &&
      myList[props.missionName].items.some((itemCat) =>
        itemCat.category === "Parchment")
    );
  const canFindTreasure =
    (myList[props.missionName].items &&
      myList[props.missionName].items.some((itemCat) =>
        itemCat.category === "Treasure")
    );
  const canFindJewelry =
    (myList[props.missionName].items &&
      myList[props.missionName].items.some((itemCat) =>
        itemCat.category === "Jewelry")
    );
  const canFindGemstones =
    (myList[props.missionName].items &&
      myList[props.missionName].items.some((itemCat) =>
        itemCat.category === "Gemstones")
    );
  const canFindTalismans =
    (myList[props.missionName].items &&
      myList[props.missionName].items.some((itemCat) =>
        itemCat.category === "Talismans")
    );

  // Assign scroll refs based on item subcategories.
  function pickMyRef(category) {
    switch(category) {
      case "Arrows":
        return jumpArrows;
      case "Crystals":
        return jumpCrystals;
      case "Keys":
        return jumpKeys;
      case "Parchment":
        return jumpParchment;
      case "Treasure":
        return jumpTreasure;
      case "Jewelry":
        return jumpJewelry;
      case "Gemstones":
        return jumpGemstones;
      case "Talismans":
        return jumpTalismans;
      default:
        return jumpEmpty;
    }
  }

  // Track how many pixels the scroll has been scrolled.
  const checkOffset = (event) => {
    scrollingOffset.current = event.nativeEvent.contentOffset.y;
  }

  // Read data from device storage.
  const readFoundLoot = async () => {
    try {
      const jsonArray = await AsyncStorage.getItem(
        `@myloot_${myList[props.missionName].title}`
      );
      // Convert item's state from string to boolean.
      const parseArray = JSON.parse(jsonArray);
      if (parseArray !== null) {
        accumLoot.current = parseArray;
        //alert(`Loaded myloot_${props.title} as ${parseArray}`);
      }
    } catch (e) {
      // Error: Reading the data failed.
      alert('Failed to read loot array.');
    }
  };
  const readFoundPiece = async () => {
    try {
      const jsonArray = await AsyncStorage.getItem(
        `@mypiece_${myList[props.missionName].title}`
      );
      // Convert item's state from string to boolean.
      const parseArray = JSON.parse(jsonArray);
      if (parseArray !== null) {
        accumPiece.current = parseArray;
        //alert(`Loaded mypiece_${props.title} as ${parseArray}`);
      }
    } catch (e) {
      // Error: Reading the data failed.
      alert('Failed to read loot array.');
    }
  };
  const readFoundPocket = async () => {
    try {
      const jsonArray = await AsyncStorage.getItem(
        `@mypocket_${myList[props.missionName].title}`
      );
      // Convert item's state from string to boolean.
      const parseArray = JSON.parse(jsonArray);
      if (parseArray !== null) {
        accumPocket.current = parseArray;
        //alert(`Loaded mypocket_${props.title} as ${parseArray}`);
      }
    } catch (e) {
      // Error: Reading the data failed.
      alert('Failed to read pocket array.');
    }
  };

  useEffect(() => {
    // When component renders, check its last saved data.
    readFoundLoot();
    readFoundPiece();
    readFoundPocket();
  }, []);

  return (
    <View style={{ flex: 1, paddingBottom: insets.bottom }}>
      <ScrollView
        ref={scrollingPage}
        collapsable={false}
        onScroll={checkOffset}
        style={{
          flexGrow: (Platform.OS === 'web') ? 0 : 1,
          height: (!myList[props.missionName].totals) ? '84%' :
            (Platform.OS === 'web') ? height*0.66 : '75%'
        }}
      >
        <View style={[styles.listScreen, {
          width: (width > 844) ? 844 : '100%'
        }]}>
          {/* Mission header (screens, author, etc). */}
          <View
            ref={jumpTop}
            collapsable={false}
            style={styles.titleHeader}
          >
            {/* Display mission title. */}
            {myList[props.missionName].title &&
              <Text style={[
                stylesTitle.bigTitle,
                Platform.OS !== 'web' && {
                  fontSize: width*0.058,
                },
                Platform.OS === 'web' && {
                  fontSize: (width > 849) ? 40 : width*0.047,
                },
                {color: colors.text}
              ]}>
                {myList[props.missionName].title}
                {myList[props.missionName].subtitle && ':'}
              </Text>
            }
            {/* Display mission subtitle, if applicable. */}
            {myList[props.missionName].subtitle &&
              <Text style={[
                stylesTitle.bigTitle,
                Platform.OS !== 'web' && {
                  fontSize: width*0.058,
                },
                Platform.OS === 'web' && {
                  fontSize: (width > 849) ? 40 : width*0.047,
                },
                {color: colors.text}
              ]}>
                {myList[props.missionName].subtitle}
              </Text>
            }
            {/* Display mission author(s). */}
            {myList[props.missionName].author &&
              <Text style={[
                styles.titleHeaderBy, {color: colors.text}
              ]}>
                {'by '}
                {myList[props.missionName].author.map((authKey, authIndex) => (
                  <Text key={`author_${authIndex}`}>
                    {/* Put an 'and' before the last author's name. */}
                    {myList[props.missionName].author.length === 2 &&
                    authIndex === myList[props.missionName].author.length - 1 &&
                      ' and '
                    }
                    {myList[props.missionName].author.length > 2 &&
                    authIndex === myList[props.missionName].author.length - 1 &&
                      'and '
                    }
                    {/* Put the name of the author(s). */}
                    <Text style={styles.titleHeaderName}>
                      {myAuthors[authKey]}
                    </Text>
                    {/* Put a comma between names (if > 2 authors). */}
                    {myList[props.missionName].author.length > 2 &&
                    authIndex !== myList[props.missionName].author.length - 1 &&
                      ', '
                    }
                  </Text>
                ))}
              </Text>
            }
            {/* Display contest name, if applicable. */}
            {myList[props.missionName].contest &&
              <Text style={[
                styles.titleHeaderBy, {color: colors.text}
              ]}>
                {'for the '}
                <Text style={styles.titleHeaderName}>
                  {myContests[myList[props.missionName].contest]}
                </Text>
              </Text>
            }
            {/* Display mission screenshots. */}
            {myList[props.missionName].screens &&
              <View style={styles.imgHeaderView}>
                <Image
                  source={myScreens[ myList[props.missionName].screens[0] ]}
                  style={[styles.imgHeader, {
                    height: (width > 849) ? 225 : width*0.265,
                    width: (width > 849) ? 400 : width*0.475,
                  }]}
                />
                <Image
                  source={myScreens[ myList[props.missionName].screens[1] ]}
                  style={[styles.imgHeader, {
                    height: (width > 849) ? 225 : width*0.265,
                    width: (width > 849) ? 400 : width*0.475,
                  }]}
                />
              </View>
            }
            {/* Display release date & latest version. */}
            {myList[props.missionName].firstRelease &&
              <Text style={[
                styles.titleHeaderDate, {color: colors.text}
              ]}>
                {`Initial release: ${myList[props.missionName].firstRelease}`}
              </Text>
            }
            {myList[props.missionName].latestVersion &&
              <Text style={[
                styles.titleHeaderDate, {color: colors.text}
              ]}>
                {`Latest version: ${myList[props.missionName].latestVersion}`}
              </Text>
            }
            {/* Display buttons to go to previous/next missions. */}
            {(myList[props.missionName].goToPrev || myList[props.missionName].goToNext) &&
              <ArrowsView
                missionName={props.missionName}
                pageID={props.identifier[0]}
                goToPrev={myList[props.missionName].goToPrev}
                goToNext={myList[props.missionName].goToNext}
                //accumLoot={accumLoot.current[2][4]}
              />
            }
            {/* Optional debug info. */}
            {getShowDebug &&
              <DebugView />
            }
          </View>
          {/* Display buttons for filtering lists. */}
          <FilterView
            id={myList[props.missionName].id}
            title={myList[props.missionName].title}
            diffNames={diffNames}
            modeNames={myList[props.missionName].modeNames}
            lootCats={lootCats}
            diffChanges={myList[props.missionName].diffChanges}
            markObj={myList[props.missionName].markObj}
            pocketCount={myList[props.missionName].pocketCount}
            areas={myList[props.missionName].areas}
            goldCount={goldCount}
            gemsCount={gemsCount}
            goodsCount={goodsCount}
            specialCount={specialCount}
            lootCount={canFindLoot}
            secretCount={secretCount}
            getLinkedFind={getLinkedFind}
            setLinkedFind={setLinkedFind}
          />
          {/* Notes section */}
          {myList[props.missionName].notes &&
            myList[props.missionName].notes[0].id !== 'null' &&
            <>
              <SectionHeader headerName="Notes"/>
              <View style={styles.noteView}>
                {/* Map out each entry in notes array. */}
                {myList[props.missionName].notes.map((noteKey, noteIndex) => (
                  <View key={`note_${noteIndex}`}>
                    {noteKey.show &&
                      <Text style={[styles.noteText,
                        {color: colors.text}]}
                      >
                        {noteKey.icon &&
                          <>
                            <Text style={styles.noteSymbol}>
                              {noteKey.icon}
                            </Text>
                            {': '}
                          </>
                        }
                        {`${noteKey.desc}`}
                      </Text>
                    }
                  </View>
                ))}
              </View>
            </>
          }
          {/* Loot section. */}
          {myList[props.missionName].loot && getShowListLoot &&
            <>
              <View ref={jumpLoot} collapsable={false}>
                <SectionHeader headerName="Loot"/>
              </View>
              <View style={[
                Platform.OS !== 'web' && {width: '100%'},
                Platform.OS === 'web' && {
                  width: /*(width > 1300) ? 1300 :
                         (width > 1072) ? 1072 :*/
                         (width > 844) ? 844 :
                         (width > 616) ? 616 : 388
                }
              ]}>
                {/* Empty header bar, as loot isn't split into categories. */}
                <View style={[
                  styles.listHeader,
                  {backgroundColor: colors.backDark,
                  borderColor: colors.border}
                ]}>
                  <Text style={styles.listHeaderText}>
                    {' '}
                  </Text>
                </View>
                {/* List of the mission's loot, sorted by order found. */}
                {getLootSort === "order" &&
                  <View style={styles.listView}>
                    <LootOrder
                      title={myList[props.missionName].title}
                      modeNames={myList[props.missionName].modeNames}
                      lootCats={lootCats}
                      areas={myList[props.missionName].areas}
                      notes={myList[props.missionName].notes}
                      getLinkedFind={getLinkedFind}
                      setLinkedFind={setLinkedFind}
                      lootSort={lootOrderSort.map((list, listIndex) => {
                        myList[props.missionName].loot.forEach((a) => {
                          a.values.forEach((b) => {
                            b.locations.forEach((c) => {
                              if (b.carryValue) {
                                lootOrderSort[c.orderNum] = [a.name, b.value, b.carryValue, c];
                              } else {
                                lootOrderSort[c.orderNum] = [a.name, b.value, [], c];
                              }
                            })
                          })
                        })
                        return lootOrderSort;
                      })}
                    />
                  </View>
                }
                {/* List of the mission's loot, sorted by type and value. */}
                {getLootSort === "value" &&
                  <View style={styles.listView}>
                    {/* Map out each entry in loot array. */}
                    {myList[props.missionName].loot.map((lootKey, lootIndex) => (
                      <LootlistEntry
                        key={`loot_${lootIndex}`}
                        id={lootKey.id}
                        title={myList[props.missionName].title}
                        modeNames={myList[props.missionName].modeNames}
                        lootCats={lootCats}
                        areas={myList[props.missionName].areas}
                        notes={myList[props.missionName].notes}
                        name={lootKey.name}
                        img={lootKey.img.map((imgKey, imgIndex) => {
                          return myImages[imgKey];
                        })}
                        values={lootKey.values}
                        getLinkedFind={getLinkedFind}
                        setLinkedFind={setLinkedFind}
                      />
                    ))}
                  </View>
                }
              </View>
            </>
          }
          {/* Item section. */}
          {myList[props.missionName].items && getShowListItem &&
            <>
              <View ref={jumpItems} collapsable={false}>
                <SectionHeader headerName="Items"/>
              </View>
              <View style={[styles.listView,
                Platform.OS !== 'web' && {width: '90%'},
                Platform.OS === 'web' && {
                  width: /*(width > 1240) ? 1240 :
                         (width > 1012) ? 1012 :*/
                         (width > 784) ? 784 :
                         (width > 556) ? 556 : 328
                }
              ]}>
                {/* Map out each entry in item array. */}
                {myList[props.missionName].items.map((itemCatKey, itemCatIndex) => (
                  <View key={`itemCat_${itemCatIndex}`}>
                    {/* Header bar for each category of items. */}
                    <View
                      ref={pickMyRef(itemCatKey.category)}
                      collapsable={false}
                      style={[
                        styles.listHeader,
                        {backgroundColor: colors.backDark,
                        borderColor: colors.border}
                      ]}
                    >
                      <Text style={styles.listHeaderText}>
                        {itemCatKey.category}
                      </Text>
                    </View>
                    <View>
                      {itemCatKey.catItems.map((itemKey, itemIndex) => (
                        <LootlistEntry
                          key={`item_${itemIndex}`}
                          id={itemKey.id}
                          title={myList[props.missionName].title}
                          modeNames={myList[props.missionName].modeNames}
                          areas={myList[props.missionName].areas}
                          notes={myList[props.missionName].notes}
                          name={itemKey.name}
                          img={itemKey.img.map((imgKey, imgIndex) => {
                            return myImages[imgKey];
                          })}
                          locations={itemKey.locations}
                          getLinkedFind={getLinkedFind}
                          setLinkedFind={setLinkedFind}
                        />
                      ))}
                    </View>
                  </View>
                ))}
              </View>
            </>
          }
          {/* Junk section. */}
          {myList[props.missionName].junk && getShowListJunk &&
            <>
              <View ref={jumpJunk} collapsable={false}>
                <SectionHeader headerName="Junk"/>
              </View>
              <View style={[styles.listView,
                Platform.OS !== 'web' && {width: '90%'},
                Platform.OS === 'web' && {
                  width: /*(width > 1240) ? 1240 :
                         (width > 1012) ? 1012 :*/
                         (width > 784) ? 784 :
                         (width > 556) ? 556 : 328
                }
              ]}>
                {/* Map out each entry in junk array. */}
                {myList[props.missionName].junk.map((junkCatKey, junkCatIndex) => (
                  <View key={`junkCat_${junkCatIndex}`}>
                    {/* Header bar for each category of junk. */}
                    <View style={[
                      styles.listHeader,
                      {backgroundColor: colors.backDark,
                      borderColor: colors.border}
                    ]}>
                      <Text style={styles.listHeaderText}>
                        {junkCatKey.category}
                      </Text>
                    </View>
                    <View>
                      {junkCatKey.catJunk.map((junkKey, junkIndex) => (
                        <LootlistEntry
                          key={`junk_${junkIndex}`}
                          id={junkKey.id}
                          title={myList[props.missionName].title}
                          modeNames={myList[props.missionName].modeNames}
                          areas={myList[props.missionName].areas}
                          notes={myList[props.missionName].notes}
                          name={junkKey.name}
                          img={junkKey.img.map((imgKey, imgIndex) => {
                            return myImages[imgKey];
                          })}
                          locations={junkKey.locations}
                          getLinkedFind={getLinkedFind}
                          setLinkedFind={setLinkedFind}
                        />
                      ))}
                    </View>
                  </View>
                ))}
              </View>
            </>
          }
          {/* Secret section. */}
          {myList[props.missionName].secrets && getShowListSec &&
            <View style={[styles.listSecretView,
              Platform.OS !== 'web' && {width: '100%'},
              Platform.OS === 'web' && {
                width: (width > 784) ? 784 : '100%'
              }
            ]}>
              <View ref={jumpSecrets} collapsable={false}>
                <SectionHeader headerName="Secrets"/>
              </View>
              <View style={[
                styles.listHeader,
                {backgroundColor: colors.backDark,
                borderColor: colors.border}
              ]}>
                <Text style={styles.listHeaderText}>
                  {' '}
                </Text>
              </View>
              <View style={styles.listView}>
                {/* Map out each entry in secrets array. */}
                {myList[props.missionName].secrets.map((secKey, secIndex) => (
                  <SecretEntry
                    key={`sec_${secIndex}`}
                    id={secKey.id}
                    lootCats={lootCats}
                    areas={myList[props.missionName].areas}
                    number={secKey.number}
                    img={secKey.img.map((imgKey, imgIndex) => {
                      return mySecrets[imgKey];
                    })}
                    triggers={secKey.triggers}
                    rewards={secKey.rewards}
                    findLink={secKey.findLink}
                    getLinkedFind={getLinkedFind}
                    setLinkedFind={setLinkedFind}
                  />
                ))}
              </View>
            </View>
          }
        </View>
      </ScrollView>

      {/* Display the mission's loot total(s). */}
      <TotalsView
        title={myList[props.missionName].title}
        diffNames={diffNames}
        lootCats={lootCats}
        totals={myList[props.missionName].totals}
        lootCount={myList[props.missionName].lootCount}
        lootChanges={myList[props.missionName].lootChanges}
        goal1={myList[props.missionName].goal1}
        goal2={myList[props.missionName].goal2}
        pocketCount={myList[props.missionName].pocketCount}
        pocketChanges={myList[props.missionName].pocketChanges}
        carryLoot={myList[props.missionName].carryLoot}
        carriedLoot={carriedLoot}
        canFindLoot={canFindLoot}
        canFindItems={canFindItems}
        canFindJunk={canFindJunk}
        canFindSecrets={secretCount}
        canFindArrows={canFindArrows}
        canFindCrystals={canFindCrystals}
        canFindKeys={canFindKeys}
        canFindParchment={canFindParchment}
        canFindTreasure={canFindTreasure}
        canFindJewelry={canFindJewelry}
        canFindGemstones={canFindGemstones}
        canFindTalismans={canFindTalismans}
      />
    </View>
  );
}

// Define various styles here.
const styles = StyleSheet.create({
  listScreen: {
    //width: '100%',
  },
  listView: {
    //width: '100%',
    marginBottom: (Platform.OS === 'web') ? 10 : 5,
  },
  listItemView: {
    //width: (Platform.OS === 'web') ? 784 : '90%',
  },
  listSecretView: {
    width: (Platform.OS === 'web') ? 785 : '100%',
  },
  listHeader: {
    borderWidth: 1,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    marginHorizontal: (Platform.OS === 'web') ? 10 : 5,
    marginTop: (Platform.OS === 'web') ? 12 : 10,
    padding: 2,
    paddingLeft: 6,
  },
  listHeaderText: {
    color: 'white',
    fontSize: (Platform.OS === 'web') ? 12 : 10,
  },
  listTitleView: {
    alignItems: 'center',
    marginTop: (Platform.OS === 'web') ? 12 : 10,
  },
  listTitleText: {
    //fontSize: (Platform.OS === 'web') ? 18 : 14,
    fontWeight: 'bold',
  },
  listTitleLine: {
    textDecorationLine: 'line-through',
  },
  titleHeader: {
    alignItems: 'center',
    marginVertical: 2,
  },
  titleHeaderBy: {
    //fontSize: (Platform.OS === 'web') ? 24 : 14,
    fontSize: 16 / PixelRatio.getFontScale(),
  },
  titleHeaderName: {
    fontWeight: 'bold',
  },
  titleHeaderDate: {
    //fontSize: (Platform.OS === 'web') ? 16 : 10,
    fontSize: 12 / PixelRatio.getFontScale(),
  },
  imgHeader: {
    marginVertical: 5,
  },
  imgHeaderView: {
    flexDirection: 'row',
    columnGap: 10,
  },
  noteView: {
    marginHorizontal: (Platform.OS === 'web') ? 10 : 5,
    marginTop: 5,
  },
  noteText: {
    fontSize: (Platform.OS === 'web') ? 15 : 12,
  },
  noteSymbol: {
    fontWeight: 'bold',
  }
});
