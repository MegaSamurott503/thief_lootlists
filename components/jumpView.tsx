import { useTheme } from '@react-navigation/native';
import {
  StyleSheet, Platform,
  Text,
  TouchableOpacity,
  View, useWindowDimensions
} from 'react-native';
import { useContext } from 'react';

import {
  SettingContext, ScrollContext
} from '@/constants/context';

/* **************** */
/*    JUMP VIEW     */
/* **************** */
// Custom view component with buttons to scroll to different sections.
export function JumpView(props) {

  // Access window size.
  const { height, width } = useWindowDimensions();

  // Access theme colors.
  const { colors } = useTheme();

  // Fetch scroll refs from context.
  const {scrollingPage, scrollingOffset,
        jumpTop,
        jumpLoot, jumpItems,
        jumpJunk, jumpSecrets,
        jumpArrows, jumpCrystals,
        jumpKeys, jumpParchment,
        jumpTreasure, jumpJewelry,
        jumpGemstones, jumpTalismans} =
    useContext(ScrollContext);

  // Fetch global setting states from context.
  const {device,
        getShowListLoot, setShowListLoot,
        getShowListItem, setShowListItem,
        getShowListJunk, setShowListJunk,
        getShowListSec, setShowListSec} =
    useContext(SettingContext);

  // Additional offset to use when scrolling on mobile devices.
  let deviceOffset = (Platform.OS !== 'web') ? 80 : 0;

  // Jump function for major section headers or the top of the page.
  function jumpHere(jumpRef) {
    jumpRef.current?.measure((myX, myY, width, height, pageX, pageY) => {
      //alert(myY);
      scrollingPage.current.scrollTo({ y: myY });
    });
  }

  // Jump function for subcategories. (Needs additional info
  // because subcategories aren't direct children of the ScrollView)
  function jumpItemHere(jumpRef) {
    jumpRef.current?.measure((myX, myY, width, height, pageX, pageY) => {
      //alert(scrollingOffset.current + pageY);
      if (jumpRef === jumpSecrets) {
        scrollingPage.current.scrollTo(
          { y: scrollingOffset.current + pageY - deviceOffset }
        );
      } else {
        scrollingPage.current.scrollTo(
          { y: scrollingOffset.current + pageY - deviceOffset - 5 }
        );
      }
    });
  }

  return (
    <View style={styles.jumpView}>
      <Text style={[
          Platform.OS !== 'web' && {
            fontSize: width*0.027,
          },
          Platform.OS === 'web' && {
            fontSize: (width > 460) ? 14 : width*0.03,
          },
          {color: colors.text}
        ]}>
        Jump to:
      </Text>

      <View style={styles.buttonSection}>
        {/* Buttons for the primary list sections, if present. */}
        <View style={styles.jumpSection}>
          {/* Button to jump to the top of the page. */}
          <TouchableOpacity
            style={[
              styles.jumpButton,
              {backgroundColor: colors.backLight,
              borderColor: colors.border}
            ]}
            onPress={() => jumpHere(jumpTop)}
          >
            <Text style={
              {fontSize: (Platform.OS === 'web') ? 14 : width*0.028,
              color: colors.text}
            }>
              Page Top
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.jumpSection}>
          {/* Button to jump to the loot section. */}
          {props.canFindLoot && getShowListLoot &&
            <TouchableOpacity
              style={[
                styles.jumpButton,
                {backgroundColor: colors.backLight,
                borderColor: colors.border}
              ]}
              onPress={() => jumpHere(jumpLoot)}
            >
              <Text style={
                {fontSize: (Platform.OS === 'web') ? 14 : width*0.028,
                color: colors.text}
              }>
                Loot
              </Text>
            </TouchableOpacity>
          }
          {/* Button to jump to the items section. */}
          {props.canFindItems && getShowListItem &&
            <TouchableOpacity
              style={[
                styles.jumpButton,
                {backgroundColor: colors.backLight,
                borderColor: colors.border}
              ]}
              onPress={() => jumpHere(jumpItems)}
            >
              <Text style={
                {fontSize: (Platform.OS === 'web') ? 14 : width*0.028,
                color: colors.text}
              }>
                Items
              </Text>
            </TouchableOpacity>
          }
          {/* Button to jump to the junk section. */}
          {props.canFindJunk && getShowListJunk &&
            <TouchableOpacity
              style={[
                styles.jumpButton,
                {backgroundColor: colors.backLight,
                borderColor: colors.border}
              ]}
              onPress={() => jumpHere(jumpJunk)}
            >
              <Text style={
                {fontSize: (Platform.OS === 'web') ? 14 : width*0.028,
                color: colors.text}
              }>
                Junk
              </Text>
            </TouchableOpacity>
          }
          {/* Button to jump to the secrets section. */}
          {props.canFindSecrets > 0 && getShowListSec &&
            <TouchableOpacity
              style={[
                styles.jumpButton,
                {backgroundColor: colors.backLight,
                borderColor: colors.border}
              ]}
              onPress={() => jumpItemHere(jumpSecrets)}
            >
              <Text style={
                {fontSize: (Platform.OS === 'web') ? 14 : width*0.028,
                color: colors.text}
              }>
                Secrets
              </Text>
            </TouchableOpacity>
          }
        </View>

        {/* Buttons for the secondary item sections, if present. */}
        {props.canFindItems && getShowListItem &&
          <View style={styles.jumpSection}>
            {/* Button to jump to the arrows and crystals. */}
            {props.canFindArrows &&
              <TouchableOpacity
                style={[
                  styles.jumpButton,
                  {backgroundColor: colors.backLight,
                  borderColor: colors.border}
                ]}
                onPress={() => jumpItemHere(jumpArrows)}
              >
                <Text style={
                  {fontSize: (Platform.OS === 'web') ? 14 : width*0.028,
                  color: colors.text}
                }>
                  Arrows
                </Text>
              </TouchableOpacity>
            }
            {!props.canFindArrows && props.canFindCrystals &&
              <TouchableOpacity
                style={[
                  styles.jumpButton,
                  {backgroundColor: colors.backLight,
                  borderColor: colors.border}
                ]}
                onPress={() => jumpItemHere(jumpCrystals)}
              >
                <Text style={
                  {fontSize: (Platform.OS === 'web') ? 14 : width*0.028,
                  color: colors.text}
                }>
                  Arrows
                </Text>
              </TouchableOpacity>
            }
            {/* Button to jump to the keys. */}
            {props.canFindKeys &&
              <TouchableOpacity
                style={[
                  styles.jumpButton,
                  {backgroundColor: colors.backLight,
                  borderColor: colors.border}
                ]}
                onPress={() => jumpItemHere(jumpKeys)}
              >
                <Text style={
                  {fontSize: (Platform.OS === 'web') ? 14 : width*0.028,
                  color: colors.text}
                }>
                  Keys
                </Text>
              </TouchableOpacity>
            }
            {/* Button to jump to the readables. */}
            {props.canFindParchment &&
              <TouchableOpacity
                style={[
                  styles.jumpButton,
                  {backgroundColor: colors.backLight,
                  borderColor: colors.border}
                ]}
                onPress={() => jumpItemHere(jumpParchment)}
              >
                <Text style={
                  {fontSize: (Platform.OS === 'web') ? 14 : width*0.028,
                  color: colors.text}
                }>
                  Parchment
                </Text>
              </TouchableOpacity>
            }
            {/* Button to jump to the treasure, gemstones, etc. */}
            {props.canFindTreasure &&
              <TouchableOpacity
                style={[
                  styles.jumpButton,
                  {backgroundColor: colors.backLight,
                  borderColor: colors.border}
                ]}
                onPress={() => jumpItemHere(jumpTreasure)}
              >
                <Text style={
                  {fontSize: (Platform.OS === 'web') ? 14 : width*0.028,
                  color: colors.text}
                }>
                  Treasure
                </Text>
              </TouchableOpacity>
            }
            {!props.canFindTreasure && props.canFindJewelry &&
              <TouchableOpacity
                style={[
                  styles.jumpButton,
                  {backgroundColor: colors.backLight,
                  borderColor: colors.border}
                ]}
                onPress={() => jumpItemHere(jumpJewelry)}
              >
                <Text style={
                  {fontSize: (Platform.OS === 'web') ? 14 : width*0.028,
                  color: colors.text}
                }>
                  Treasure
                </Text>
              </TouchableOpacity>
            }
            {!props.canFindTreasure && !props.canFindJewelry &&
            props.canFindGemstones &&
              <TouchableOpacity
                style={[
                  styles.jumpButton,
                  {backgroundColor: colors.backLight,
                  borderColor: colors.border}
                ]}
                onPress={() => jumpItemHere(jumpGemstones)}
              >
                <Text style={
                  {fontSize: (Platform.OS === 'web') ? 14 : width*0.028,
                  color: colors.text}
                }>
                  Treasure
                </Text>
              </TouchableOpacity>
            }
            {!props.canFindTreasure && !props.canFindJewelry &&
            !props.canFindGemstones && props.canFindTalismans &&
              <TouchableOpacity
                style={[
                  styles.jumpButton,
                  {backgroundColor: colors.backLight,
                  borderColor: colors.border}
                ]}
                onPress={() => jumpItemHere(jumpTalismans)}
              >
                <Text style={
                  {fontSize: (Platform.OS === 'web') ? 14 : width*0.028,
                  color: colors.text}
                }>
                  Treasure
                </Text>
              </TouchableOpacity>
            }
          </View>
        }
      </View>
    </View>
  );
}

// Define various styles here.
const styles = StyleSheet.create({
  jumpView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  jumpSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  buttonSection: {
    marginHorizontal: 5,
  },
  jumpButton: {
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 5,
    marginVertical: 5,
    paddingHorizontal: 4,
    paddingVertical: 2,
    width: (Platform.OS === 'web') ? 80 : 75,
  },
});
