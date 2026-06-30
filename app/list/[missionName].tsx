import { useTheme } from '@react-navigation/native';
import {
  useRouter, useNavigation,
  useLocalSearchParams
} from 'expo-router';
import {
  useWindowDimensions
} from 'react-native';
import { useEffect, useState, useContext, useRef } from 'react';

import { LootlistPage } from '@/components/lootlistPage';

import { myList } from '@/constants/jsonLists';
import {
  SettingContext, FilterContext,
  FoundContext, CarryoverContext,
  ScrollContext
} from '@/constants/context';

/* **************** */
/*  LOOTLIST SCREEN */
/* **************** */
// Screen for displaying mission lootlist.
// Screen contents change depending on selected mission.
// Contained in stack navigator to allow going back in stack.
export default function LootlistScreen(props) {
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

  // Access window size.
  const { height, width } = useWindowDimensions();

  // Access theme colors.
  const { colors } = useTheme();

  // AccumLoot: tracks the values of loot selected by the user.
  // Each nested array is for Normal, Hard, & Expert difficulty.
  // Each index in an array is for gold, gems, goods, special, and total.
  // Store as a Ref instead of a State to avoid unneeded re-renders.
  const accumLoot = useRef([[0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]]);

  // AccumPiece: tracks the number of loot pieces selected by the user.
  // Each index in the array is for Normal, Hard, & Expert difficulty.
  // Store as a Ref instead of a State to avoid unneeded re-renders.
  const accumPiece = useRef([0,0,0]);

  // AccumPocket: tracks the pickpockets selected by the user.
  // Each index in the array is for Normal, Hard, & Expert difficulty.
  // Store as a Ref instead of a State to avoid unneeded re-renders.
  const accumPocket = useRef([0,0,0]);

  // ScrollingPage: stores a Ref to the lootlist's primary ScrollView.
  // Used to tell the jump buttons which ScrollView to scroll.
  const scrollingPage = useRef({});

  // ScrollingOffset: stores how far the page has scrolled vertically.
  // Used to scroll to item subcategories based on current position.
  const scrollingOffset = useRef(0);

  // Jump: stores Refs to various sections of the lootlist page.
  // Used to tell the jump buttons where on the page to scroll to.
  const jumpEmpty = useRef({});
  const jumpTop = useRef({});
  const jumpLoot = useRef({});
  const jumpItems = useRef({});
  const jumpJunk = useRef({});
  const jumpSecrets = useRef({});

  const jumpArrows = useRef({});
  const jumpCrystals = useRef({});
  const jumpKeys = useRef({});
  const jumpParchment = useRef({});
  const jumpTreasure = useRef({});
  const jumpJewelry = useRef({});
  const jumpGemstones = useRef({});
  const jumpTalismans = useRef({});

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

  useEffect(() => {
    // Set the header title to the mission ID.
    navigation.setOptions({ title: myList[missionName].title});
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
          <ScrollContext.Provider value={
            {scrollingPage, scrollingOffset,
            jumpEmpty, jumpTop,
            jumpLoot, jumpItems,
            jumpJunk, jumpSecrets,
            jumpArrows, jumpCrystals,
            jumpKeys, jumpParchment,
            jumpTreasure, jumpJewelry,
            jumpGemstones, jumpTalismans}
          }>
            <LootlistPage
              identifier={identifier}
              missionName={missionName}
              carryingLoot={carryingLoot}
            />
          </ScrollContext.Provider>
        </FilterContext.Provider>
      </CarryoverContext.Provider>
    </FoundContext.Provider>
  );
}
