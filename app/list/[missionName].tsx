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
import { useEffect, useState, useContext, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { SectionHeader } from '@/components/sectionHeader';
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
  FoundContext, CarryoverContext
} from '@/constants/context';

// TODO: go through old .js files and make sure everything is copied over!
// TODO: figure out if any more items should be marked as Easter Eggs
// TODO: THIEF font doesn't load right away when home screen displays and is cut off
/* **************** */
/*  LOOTLIST SCREEN */
/* **************** */
// Screen for displaying mission lootlist.
// Screen contents change depending on selected mission.
// Contained in stack navigator to allow going back in stack.
export default function LootlistScreen(props) {
  // Use defaults to avoid errors if some props are undefined.
  const {
    carriedLoot = 0
  } = props;

  // Square brackets [] around filename make this a dynamic URL route.
  // Get the URL's dynamic segment with 'useLocalSearchParams' hook.
  // Get any search parameters with an optional check.
  const { missionName, carryingLoot } = useLocalSearchParams<{
    missionName: string, carryingLoot?: int
  }>();

  // Get the identifier from the mission's ID.
  // 't1', 't2', or 'fm'
  const identifier = missionName.split("_");

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

  // AccumLoot: tracks the values of loot selected by the user.
  // Each nested array is for Normal, Hard, & Expert difficulty.
  // Each index in an array is for gold, gems, goods, special, and total.
  // Store as a Ref instead of a State to avoid unneeded re-renders.
  const accumLoot = useRef([[0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]]);

  //AccumPiece: tracks the number of loot pieces selected by the user.
  // Each index in the array is for Normal, Hard, & Expert difficulty.
  // Store as a Ref instead of a State to avoid unneeded re-renders.
  const accumPiece = useRef([0,0,0]);

  // AccumPocket: tracks the pickpockets selected by the user.
  // Each index in the array is for Normal, Hard, & Expert difficulty.
  // Store as a Ref instead of a State to avoid unneeded re-renders.
  const accumPocket = useRef([0,0,0]);

  // Fetch global setting states from context.
  const {scheme,
        //getCurrentTheme, setCurrentTheme,
        getDefaultDiffN, setDefaultDiffN,
        getDefaultDiffH, setDefaultDiffH,
        getDefaultDiffX, setDefaultDiffX,
        getLootSort, setLootSort,
        getShowListLoot, setShowListLoot,
        getShowListItem, setShowListItem,
        getShowListJunk, setShowListJunk,
        getShowListSec, setShowListSec} =
    useContext(SettingContext);

  // CarryLoot: tracks loot carried over from the previous mission.
  // Only used if lootlist's 'carryLoot' is set to 'true'.
  const [getCarryLoot, setCarryLoot] = useState('');

  // CarryFound: tracks if carryover loot has been found.
  // Differentiate for carryover loot that moves depending on difficulty.
  const [getCarryFoundN, setCarryFoundN] = useState(false);
  const [getCarryFoundH, setCarryFoundH] = useState(false);
  const [getCarryFoundX, setCarryFoundX] = useState(false);

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

  // LootOrderSort: array to be filled with loot sub-arrays.
  // Used to sort loot by the order they're found.
  let lootOrderSort = [''];

  // LootCount: stores whether this mission has loot, and what types.
  // Used to determine whether to show the loot type filters.
  const goldCount =
    ( myList[missionName].totals &&
      myList[missionName].totals[0][0] === 0 &&
      myList[missionName].totals[1][0] === 0 &&
      myList[missionName].totals[2][0] === 0 ) ? false : true;
  const gemsCount =
    ( myList[missionName].totals &&
      myList[missionName].totals[0][1] === 0 &&
      myList[missionName].totals[1][1] === 0 &&
      myList[missionName].totals[2][1] === 0 ) ? false : true;
  const goodsCount =
    ( myList[missionName].totals &&
      myList[missionName].totals[0][2] === 0 &&
      myList[missionName].totals[1][2] === 0 &&
      myList[missionName].totals[2][2] === 0 ) ? false : true;
  const specialCount =
    ( myList[missionName].totals &&
      myList[missionName].totals[0][3] === 0 &&
      myList[missionName].totals[1][3] === 0 &&
      myList[missionName].totals[2][3] === 0 ) ? false : true;
  const lootCount =
    ( myList[missionName].totals && myList[missionName].loot )
    ? true : false;

  // Store number of secrets in the mission.
  // Used to determine whether to show the Secrets Only filter.
  const secretCount =
    (myList[missionName].secrets && myList[missionName].secrets.length)
    ? myList[missionName].secrets.length : 0;

  // Read data from device storage.
  const readFoundLoot = async () => {
    try {
      const jsonArray = await AsyncStorage.getItem(
        `@myloot_${myList[missionName].title}`
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
        `@mypiece_${myList[missionName].title}`
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
        `@mypocket_${myList[missionName].title}`
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
    // Set the header title to the mission ID.
    navigation.setOptions({ title: myList[missionName].title});
    // When component renders, check its last saved data.
    readFoundLoot();
    readFoundPiece();
    readFoundPocket();
  }, [navigation]);

  return (
    <FoundContext.Provider value={
      {accumLoot, accumPiece, accumPocket}
    }>
      <CarryoverContext.Provider value={
        {getCarryLoot, setCarryLoot,
          getCarryFoundN, setCarryFoundN,
          getCarryFoundH, setCarryFoundH,
          getCarryFoundX, setCarryFoundX}
      }>
        <FilterContext.Provider value={
          {getFilterDiffN, setFilterDiffN,
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
          getFilterArea, setFilterArea}
        }>
          {/* <SafeAreaView style={{ flex: 1 }}> */}
          <View style={{ flex: 1, paddingBottom: insets.bottom }}>
            <ScrollView style={{
              flexGrow: (Platform.OS === 'web') ? 0 : 1,
              height: (!myList[missionName].totals &&
                !myList[missionName].pocketCount) ? '100%' :
                (Platform.OS === 'web') ? height*0.66 : '75%'
            }}>
              <View style={[styles.listScreen, {
                width: (width > 844) ? 844 : '100%'
              }]}>
                {/* Mission header (screens, author, etc). */}
                <View style={styles.titleHeader}>
                  {/* Display mission title. */}
                  {myList[missionName].title &&
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
                      {myList[missionName].title}
                      {myList[missionName].subtitle && ':'}
                    </Text>
                  }
                  {/* Display mission subtitle, if applicable. */}
                  {myList[missionName].subtitle &&
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
                      {myList[missionName].subtitle}
                    </Text>
                  }
                  {/* Display mission author(s). */}
                  {myList[missionName].author &&
                    <Text style={[
                      styles.titleHeaderBy, {color: colors.text}
                    ]}>
                      {'by '}
                      {myList[missionName].author.map((authKey, authIndex) => (
                        <Text key={`author_${authIndex}`}>
                          {/* Put an 'and' before the last author's name. */}
                          {myList[missionName].author.length === 2 &&
                          authIndex === myList[missionName].author.length - 1 &&
                            ' and '
                          }
                          {myList[missionName].author.length > 2 &&
                          authIndex === myList[missionName].author.length - 1 &&
                            'and '
                          }
                          {/* Put the name of the author(s). */}
                          <Text style={styles.titleHeaderName}>
                            {myAuthors[authKey]}
                          </Text>
                          {/* Put a comma between names (if > 2 authors). */}
                          {myList[missionName].author.length > 2 &&
                          authIndex !== myList[missionName].author.length - 1 &&
                            ', '
                          }
                        </Text>
                      ))}
                    </Text>
                  }
                  {/* Display contest name, if applicable. */}
                  {myList[missionName].contest &&
                    <Text style={[
                      styles.titleHeaderBy, {color: colors.text}
                    ]}>
                      {'for the '}
                      <Text style={styles.titleHeaderName}>
                        {myContests[myList[missionName].contest]}
                      </Text>
                    </Text>
                  }
                  {/* Display mission screenshots. */}
                  {myList[missionName].screens &&
                    <View style={styles.imgHeaderView}>
                      <Image
                        source={myScreens[ myList[missionName].screens[0] ]}
                        style={[styles.imgHeader, {
                          height: (width > 849) ? 225 : width*0.265,
                          width: (width > 849) ? 400 : width*0.475,
                        }]}
                      />
                      <Image
                        source={myScreens[ myList[missionName].screens[1] ]}
                        style={[styles.imgHeader, {
                          height: (width > 849) ? 225 : width*0.265,
                          width: (width > 849) ? 400 : width*0.475,
                        }]}
                      />
                    </View>
                  }
                  {/* Display release date & latest version. */}
                  {myList[missionName].firstRelease &&
                    <Text style={[
                      styles.titleHeaderDate, {color: colors.text}
                    ]}>
                      {`Initial release: ${myList[missionName].firstRelease}`}
                    </Text>
                  }
                  {myList[missionName].latestVersion &&
                    <Text style={[
                      styles.titleHeaderDate, {color: colors.text}
                    ]}>
                      {`Latest version: ${myList[missionName].latestVersion}`}
                    </Text>
                  }
                  {/* Display buttons to go to previous/next missions. */}
                  {(myList[missionName].goToPrev || myList[missionName].goToNext) &&
                    <ArrowsView
                      missionName={missionName}
                      pageID={identifier[0]}
                      goToPrev={myList[missionName].goToPrev}
                      goToNext={myList[missionName].goToNext}
                      accumLoot={accumLoot.current[2][4]}
                    />
                  }
                  {/*<Text>{`width: ${width}`}</Text>*/}
                </View>
                {/* Display buttons for filtering lists. */}
                <FilterView
                  id={myList[missionName].id}
                  title={myList[missionName].title}
                  diffNames={myList[missionName].diffNames}
                  modeNames={myList[missionName].modeNames}
                  diffChanges={myList[missionName].diffChanges}
                  markObj={myList[missionName].markObj}
                  pocketCount={myList[missionName].pocketCount}
                  areas={myList[missionName].areas}
                  goldCount={goldCount}
                  gemsCount={gemsCount}
                  goodsCount={goodsCount}
                  specialCount={specialCount}
                  lootCount={lootCount}
                  secretCount={secretCount}
                  getLinkedFind={getLinkedFind}
                  setLinkedFind={setLinkedFind}
                />
                {/* Notes section */}
                {myList[missionName].notes &&
                  myList[missionName].notes[0].id !== 'null' &&
                  <>
                    <SectionHeader headerName="Notes"/>
                    <View style={styles.noteView}>
                      {/* Map out each entry in notes array. */}
                      {myList[missionName].notes.map((noteKey, noteIndex) => (
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
                {myList[missionName].loot && getShowListLoot &&
                  <>
                    <SectionHeader headerName="Loot"/>
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
                            title={myList[missionName].title}
                            modeNames={myList[missionName].modeNames}
                            areas={myList[missionName].areas}
                            notes={myList[missionName].notes}
                            getLinkedFind={getLinkedFind}
                            setLinkedFind={setLinkedFind}
                            lootSort={lootOrderSort.map((list, listIndex) => {
                              myList[missionName].loot.forEach((a) => {
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
                          {myList[missionName].loot.map((lootKey, lootIndex) => (
                            <LootlistEntry
                              key={`loot_${lootIndex}`}
                              id={lootKey.id}
                              title={myList[missionName].title}
                              modeNames={myList[missionName].modeNames}
                              areas={myList[missionName].areas}
                              notes={myList[missionName].notes}
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
                {myList[missionName].items && getShowListItem &&
                  <>
                    <SectionHeader headerName="Items"/>
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
                      {myList[missionName].items.map((itemCatKey, itemCatIndex) => (
                        <View key={`itemCat_${itemCatIndex}`}>
                          {/* Header bar for each category of items. */}
                          <View style={[
                            styles.listHeader,
                            {backgroundColor: colors.backDark,
                            borderColor: colors.border}
                          ]}>
                            <Text style={styles.listHeaderText}>
                              {itemCatKey.category}
                            </Text>
                          </View>
                          <View>
                            {itemCatKey.catItems.map((itemKey, itemIndex) => (
                              <LootlistEntry
                                key={`item_${itemIndex}`}
                                id={itemKey.id}
                                title={myList[missionName].title}
                                modeNames={myList[missionName].modeNames}
                                areas={myList[missionName].areas}
                                notes={myList[missionName].notes}
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
                {myList[missionName].junk && getShowListJunk &&
                  <>
                    <SectionHeader headerName="Junk"/>
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
                      {myList[missionName].junk.map((junkCatKey, junkCatIndex) => (
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
                                title={myList[missionName].title}
                                modeNames={myList[missionName].modeNames}
                                areas={myList[missionName].areas}
                                notes={myList[missionName].notes}
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
                {myList[missionName].secrets && getShowListSec &&
                  <View style={[styles.listSecretView,
                    Platform.OS !== 'web' && {width: '100%'},
                    Platform.OS === 'web' && {
                      width: (width > 784) ? 784 : '100%'
                    }
                  ]}>
                    <SectionHeader headerName="Secrets"/>
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
                      {myList[missionName].secrets.map((secKey, secIndex) => (
                        <SecretEntry
                          key={`sec_${secIndex}`}
                          id={secKey.id}
                          areas={myList[missionName].areas}
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
              title={myList[missionName].title}
              diffNames={myList[missionName].diffNames}
              totals={myList[missionName].totals}
              lootCount={myList[missionName].lootCount}
              lootChanges={myList[missionName].lootChanges}
              goal1={myList[missionName].goal1}
              goal2={myList[missionName].goal2}
              pocketCount={myList[missionName].pocketCount}
              pocketChanges={myList[missionName].pocketChanges}
              carryLoot={myList[missionName].carryLoot}
              carriedLoot={carriedLoot}
            />
          </View>
          {/* </SafeAreaView> */}
        </FilterContext.Provider>
      </CarryoverContext.Provider>
    </FoundContext.Provider>
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
