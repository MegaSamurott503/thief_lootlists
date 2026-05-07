import { useTheme } from '@react-navigation/native';
import { Link } from 'expo-router';
import {
  StyleSheet, Platform,
  Image, ImageBackground,
  Text, View, ScrollView,
  useWindowDimensions
} from "react-native";
import { useContext } from 'react';

import { SectionHeader } from '@/components/sectionHeader';

import { stylesTitle } from '@/constants/stylesTitle';
import { stylesList } from '@/constants/stylesList';
import { stylesImg } from '@/constants/stylesImg';
import { iconGold,
  bgDefaultLight, bgDefaultDark,
  bgEasyLight, bgEasyDark,
  bgMediumLight, bgMediumDark,
  bgHardLight, bgHardDark,
  bgFoundLight, bgFoundDark
} from '@/constants/imgUI';
import { SettingContext } from '@/constants/context';

export default function Index() {
  // Access window size.
  const { height, width } = useWindowDimensions();

  // Access theme colors.
  const { colors } = useTheme();

  // Fetch global setting states from context.
  const {scheme,
    getCurrentTheme, setCurrentTheme} =
    useContext(SettingContext);

  return (
    <ScrollView
      contentContainerStyle={{
        alignItems: 'center',
      }}>
      <Text style={[
        styles.homeTitle,
        Platform.OS !== 'web' && {
          fontSize: width*0.058,
        },
        Platform.OS === 'web' && {
          fontSize: (width > 849) ? 40 : width*0.047,
        },
        {color: colors.text}
      ]}>
        {`THIEF Lootlists`}
      </Text>
      <Text style={[styles.explainText, {color: colors.text}]}>
        {`for `}
        <Text style={stylesList.locCount}>
          {`THIEF: The Dark Project / Gold`}
        </Text>
        {`, `}
      </Text>
      <Text style={[styles.explainText, {color: colors.text}]}>
        <Text style={stylesList.locCount}>
          {`THIEF II: The Metal Age`}
        </Text>
        {`,`}
      </Text>
      <Text style={[styles.explainText, {color: colors.text}]}>
        {`and an ever-growing list of `}
        <Text style={stylesList.locCount}>
          {`fan missions`}
        </Text>
        {`.`}
      </Text>
      <Text style={[styles.marginText, {color: colors.text}]}>
        {`(`}
        <Text style={stylesList.locCount}>
          {`THIEF: Deadly Shadows`}
        </Text>
        {` lists coming someday!)`}
      </Text>

      {/* UI explanations. */}
      <SectionHeader headerName="Info"/>
      <View style={styles.explainArea}>
        <View style={[styles.explain, styles.explainCenter]}>

          {/* Description of selected items. */}
          <Text style={[styles.explainText, {color: colors.text}]}>
            {`Click on an item's location to mark it with a`}
          </Text>
          <Text style={[styles.explainText, {color: colors.text}]}>
            <Text style={{backgroundColor: colors.found}}>
              {(getCurrentTheme === 'light' ||
                (getCurrentTheme === 'default' && scheme === 'light')) &&
                `yellow`}
              {(getCurrentTheme === 'dark' ||
                (getCurrentTheme === 'default' && scheme === 'dark')) &&
                `gold`}
              {` checkmark`}
            </Text>
            {`. Selected items will be saved to your`}
          </Text>
          <Text style={[styles.explainText, {color: colors.text}]}>
            {`device's memory, and the loot and pickpocket totals at`}
          </Text>
          <Text style={[styles.explainText, {color: colors.text}]}>
            {`the bottom of the page will be updated automatically.`}
          </Text>
          <View
            style={[
              styles.explainBox,
              {borderColor: colors.border},
            ]}
          >
            <ImageBackground
              source={(getCurrentTheme === 'dark' ||
                (getCurrentTheme === 'default' && scheme === 'dark'))
                ? bgFoundDark : bgFoundLight}
              resizeMode="cover"
              style={[
                styles.explainBackground,
                (Platform.OS === 'web') ? styles.explainBackgroundWeb : ''
              ]}
            >
              <Text style={[
                stylesList.locText,
                {fontSize: (Platform.OS === 'web') ? 12 : width*0.019,
                  color: colors.text}
              ]}>
                {`Lord Bafford's Bedroom`}
              </Text>
              <Text style={[
                stylesList.locText,
                {fontSize: (Platform.OS === 'web') ? 12 : width*0.019,
                  color: colors.text}
              ]}>
                {`north table`}
              </Text>
            </ImageBackground>
          </View>

          {/* Description of background colors for loot. */}
          <Text style={[styles.marginText, {color: colors.text}]}>
            {`Unselected loot items have a colored background`}
          </Text>
          <Text style={[styles.explainText, {color: colors.text}]}>
            {`to indicate (subjectively) how well-hidden they are.`}
          </Text>

          {/* Description of easy background color. */}
          <Text style={[styles.marginText, {color: colors.text}]}>
            {`A `}
            <Text style={{backgroundColor: colors.findE}}>
              {`curved `}
              {(getCurrentTheme === 'light' ||
                (getCurrentTheme === 'default' && scheme === 'light')) &&
                `lime`}
              {(getCurrentTheme === 'dark' ||
                (getCurrentTheme === 'default' && scheme === 'dark')) &&
                `green`}
              {` background`}
            </Text>
            {` indicates a loot item that`}
          </Text>
          <Text style={[styles.explainText, {color: colors.text}]}>
            {` is out in the open. As long as you try to visit every`}
          </Text>
          <Text style={[styles.explainText, {color: colors.text}]}>
            {`obvious location in the mission, you should find it easily.`}
          </Text>
          <View
            style={[
              styles.explainBox,
              {borderColor: colors.border},
            ]}
          >
            <ImageBackground
              source={(getCurrentTheme === 'dark' ||
                (getCurrentTheme === 'default' && scheme === 'dark'))
                ? bgEasyDark : bgEasyLight}
              resizeMode="cover"
              style={[
                styles.explainBackground,
                (Platform.OS === 'web') ? styles.explainBackgroundWeb : ''
              ]}
            >
              <Text style={[
                stylesList.locText,
                {fontSize: (Platform.OS === 'web') ? 12 : width*0.019,
                  color: colors.text}
              ]}>
                {`Butler's Quarters`}
              </Text>
              <Text style={[
                stylesList.locText,
                {fontSize: (Platform.OS === 'web') ? 12 : width*0.019,
                  color: colors.text}
              ]}>
                {'south room, north table '}
                <Text style={stylesList.locCount}>
                  {`x2`}
                </Text>
              </Text>
            </ImageBackground>
          </View>

          {/* Description of medium background color. */}
          <Text style={[styles.marginText, {color: colors.text}]}>
            {`A `}
            <Text style={{backgroundColor: colors.findM}}>
              {`slanted `}
              {(getCurrentTheme === 'light' ||
                (getCurrentTheme === 'default' && scheme === 'light')) &&
                `cyan`}
              {(getCurrentTheme === 'dark' ||
                (getCurrentTheme === 'default' && scheme === 'dark')) &&
                `blue`}
              {` background`}
            </Text>
            {` indicates a loot item that`}
          </Text>
          <Text style={[styles.explainText, {color: colors.text}]}>
            {`is tucked away out of sight, or the passage/switch`}
          </Text>
          <Text style={[styles.explainText, {color: colors.text}]}>
            {`that leads to it is easily overlooked. Keep your eyes open.`}
          </Text>
          <View
            style={[
              styles.explainBox,
              {borderColor: colors.border},
            ]}
          >
            <ImageBackground
              source={(getCurrentTheme === 'dark' ||
                (getCurrentTheme === 'default' && scheme === 'dark'))
                ? bgMediumDark : bgMediumLight}
              resizeMode="cover"
              style={[
                styles.explainBackground,
                (Platform.OS === 'web') ? styles.explainBackgroundWeb : ''
              ]}
            >
              <Text style={[
                stylesList.locText,
                {fontSize: (Platform.OS === 'web') ? 12 : width*0.019,
                  color: colors.text}
              ]}>
                {`Narcotics Division`}
              </Text>
              <Text style={[
                stylesList.locText,
                {fontSize: (Platform.OS === 'web') ? 12 : width*0.019,
                  color: colors.text}
              ]}>
                {`under southwest desk`}
              </Text>
            </ImageBackground>
          </View>

          {/* Description of hard background color. */}
          <Text style={[styles.marginText, {color: colors.text}]}>
            {`A `}
            <Text style={{backgroundColor: colors.findH}}>
              {`jagged `}
              {(getCurrentTheme === 'light' ||
                (getCurrentTheme === 'default' && scheme === 'light')) &&
                `pink`}
              {(getCurrentTheme === 'dark' ||
                (getCurrentTheme === 'default' && scheme === 'dark')) &&
                `purple`}
              {` background`}
            </Text>
            {` indicates a loot item that`}
          </Text>
          <Text style={[styles.explainText, {color: colors.text}]}>
            {`is very difficult to spot if you don't know it's there.`}
          </Text>
          <Text style={[styles.explainText, {color: colors.text}]}>
            {`Be prepared to pixel hunt for it (or the switch revealing it).`}
          </Text>
          <View
            style={[
              styles.explainBox,
              {borderColor: colors.border},
            ]}
          >
            <ImageBackground
              source={(getCurrentTheme === 'dark' ||
                (getCurrentTheme === 'default' && scheme === 'dark'))
                ? bgHardDark : bgHardLight}
              resizeMode="cover"
              style={[
                styles.explainBackground,
                (Platform.OS === 'web') ? styles.explainBackgroundWeb : ''
              ]}
            >
              <Text style={[
                stylesList.locText,
                {fontSize: (Platform.OS === 'web') ? 12 : width*0.019,
                  color: colors.text}
              ]}>
                {`Ramirez's Quarters`}
              </Text>
              <Text style={[
                stylesList.locText,
                {fontSize: (Platform.OS === 'web') ? 12 : width*0.019,
                  color: colors.text}
              ]}>
                {`bedroom, near footlocker`}
              </Text>
            </ImageBackground>
          </View>

          {/* Description of objective marker. */}
          <Text style={[styles.marginText, {color: colors.text}]}>
            <Text style={{fontWeight: 'bold', color: colors.locObj}}>
              {'✶'}
            </Text>
            {` An azure star indicates an item that triggers an objective`}
          </Text>
          <Text style={[styles.explainText, {color: colors.text}]}>
            {`when it is picked up, used correctly, or delivered somewhere.`}
          </Text>
          <View
            style={[
              styles.explainBox,
              {borderColor: colors.border},
            ]}
          >
            <ImageBackground
              source={(getCurrentTheme === 'dark' ||
                (getCurrentTheme === 'default' && scheme === 'dark'))
                ? bgDefaultDark : bgDefaultLight}
              resizeMode="cover"
              style={[
                styles.explainBackground,
                (Platform.OS === 'web') ? styles.explainBackgroundWeb : ''
              ]}
            >
              <Text style={[
                stylesList.locText,
                {fontSize: (Platform.OS === 'web') ? 12 : width*0.019,
                  color: colors.text}
              ]}>
                <Text style={{fontWeight: 'bold', color: colors.locObj}}>
                  {'✶'}
                </Text>
                {` Conservatory`}
              </Text>
              <Text style={[
                stylesList.locText,
                {fontSize: (Platform.OS === 'web') ? 12 : width*0.019,
                  color: colors.text}
              ]}>
                {`1F, behind middle statue`}
              </Text>
            </ImageBackground>
          </View>

          {/* Description of difficulty markers. */}
          <Text style={[styles.marginText, {color: colors.text}]}>
            {`A colored shape(s) indicates an item that is`}
          </Text>
          <Text style={[styles.explainText, {color: colors.text}]}>
            {`available on one or two difficulties, but not all three.`}
          </Text>
          <Text style={[styles.explainText, {color: colors.text}]}>
            {`You can use the filters at the top of a mission's page to`}
          </Text>
          <Text style={[styles.explainText, {color: colors.text}]}>
            {`show or hide items based on difficulty (or other options).`}
          </Text>

          {/* Description of normal difficulty marker. */}
          <Text style={[styles.marginText, {color: colors.text}]}>
            <Text style={{fontWeight: 'bold', color: colors.locN}}>
              {'■'}
            </Text>
            {` A `}
            <Text>
              {(getCurrentTheme === 'light' ||
                (getCurrentTheme === 'default' && scheme === 'light')) &&
                `green`
              }
              {(getCurrentTheme === 'dark' ||
                (getCurrentTheme === 'default' && scheme === 'dark')) &&
                `lime`
              }
            </Text>
            {` square indicates Normal difficulty.`}
          </Text>
          <View
            style={[
              styles.explainBox,
              {borderColor: colors.border},
            ]}
          >
            <ImageBackground
              source={(getCurrentTheme === 'dark' ||
                (getCurrentTheme === 'default' && scheme === 'dark'))
                ? bgDefaultDark : bgDefaultLight}
              resizeMode="cover"
              style={[
                styles.explainBackground,
                (Platform.OS === 'web') ? styles.explainBackgroundWeb : ''
              ]}
            >
              <Text style={[
                stylesList.locText,
                {fontSize: (Platform.OS === 'web') ? 12 : width*0.019,
                  color: colors.text}
              ]}>
                <Text style={{fontWeight: 'bold', color: colors.locN}}>
                  {'■'}
                </Text>
                {` Mynell's Space`}
              </Text>
              <Text style={[
                stylesList.locText,
                {fontSize: (Platform.OS === 'web') ? 12 : width*0.019,
                  color: colors.text}
              ]}>
                {`spider cage, `}
                <Text style={stylesList.locBox}>
                  {'coin box'}
                </Text>
              </Text>
            </ImageBackground>
          </View>

          {/* Description of hard difficulty marker. */}
          <Text style={[styles.marginText, {color: colors.text}]}>
            <Text style={{fontWeight: 'bold', color: colors.locH}}>
              {'▲'}
            </Text>
            {` A `}
            <Text>
              {(getCurrentTheme === 'light' ||
                (getCurrentTheme === 'default' && scheme === 'light')) &&
                `blue`
              }
              {(getCurrentTheme === 'dark' ||
                (getCurrentTheme === 'default' && scheme === 'dark')) &&
                `cyan`
              }
            </Text>
            {` triangle indicates Hard difficulty.`}
          </Text>
          <View
            style={[
              styles.explainBox,
              {borderColor: colors.border},
            ]}
          >
            <ImageBackground
              source={(getCurrentTheme === 'dark' ||
                (getCurrentTheme === 'default' && scheme === 'dark'))
                ? bgDefaultDark : bgDefaultLight}
              resizeMode="cover"
              style={[
                styles.explainBackground,
                (Platform.OS === 'web') ? styles.explainBackgroundWeb : ''
              ]}
            >
              <Text style={[
                stylesList.locText,
                {fontSize: (Platform.OS === 'web') ? 12 : width*0.019,
                  color: colors.text}
              ]}>
                <Text style={{fontWeight: 'bold', color: colors.locH}}>
                  {'▲'}
                </Text>
                {` Officers' Quarters`}
              </Text>
              <Text style={[
                stylesList.locText,
                {fontSize: (Platform.OS === 'web') ? 12 : width*0.019,
                  color: colors.text}
              ]}>
                {`office, east bookshelf`}
              </Text>
            </ImageBackground>
          </View>

          {/* Description of expert difficulty marker. */}
          <Text style={[styles.marginText, {color: colors.text}]}>
            <Text style={{fontWeight: 'bold', color: colors.locX}}>
              {'◆'}
            </Text>
            {` A `}
            <Text>
              {(getCurrentTheme === 'light' ||
                (getCurrentTheme === 'default' && scheme === 'light')) &&
                `purple`
              }
              {(getCurrentTheme === 'dark' ||
                (getCurrentTheme === 'default' && scheme === 'dark')) &&
                `pink`
              }
            </Text>
            {` diamond indicates Expert difficulty.`}
          </Text>
          <View
            style={[
              styles.explainBox,
              {borderColor: colors.border},
            ]}
          >
            <ImageBackground
              source={(getCurrentTheme === 'dark' ||
                (getCurrentTheme === 'default' && scheme === 'dark'))
                ? bgDefaultDark : bgDefaultLight}
              resizeMode="cover"
              style={[
                styles.explainBackground,
                (Platform.OS === 'web') ? styles.explainBackgroundWeb : ''
              ]}
            >
              <Text style={[
                stylesList.locText,
                {fontSize: (Platform.OS === 'web') ? 12 : width*0.019,
                  color: colors.text}
              ]}>
                <Text style={{fontWeight: 'bold', color: colors.locX}}>
                  {'◆'}
                </Text>
                {` Upper Sewer`}
              </Text>
              <Text style={[
                stylesList.locText,
                {fontSize: (Platform.OS === 'web') ? 12 : width*0.019,
                  color: colors.text}
              ]}>
                {`Thom's quarters, bookcase`}
              </Text>
            </ImageBackground>
          </View>

        </View>
        <View style={[styles.explain, styles.explainCenter]}>

          {/* Description of container marker. */}
          <Text style={[styles.explainText, {color: colors.text}]}>
            {`An `}
            <Text style={stylesList.locBox}>
              {'underlined'}
            </Text>
            {` location indicates an item that`}
          </Text>
          <Text style={[styles.explainText, {color: colors.text}]}>
            {`is obtained directly from a container.`}
          </Text>
          <Text style={[styles.explainText, {color: colors.text}]}>
            {`If a container gives you multiple items,`}
          </Text>
          <Text style={[styles.explainText, {color: colors.text}]}>
            {`selecting one will instantly select the others.`}
          </Text>
          <View
            style={[
              styles.explainBox,
              {borderColor: colors.border},
            ]}
          >
            <ImageBackground
              source={(getCurrentTheme === 'dark' ||
                (getCurrentTheme === 'default' && scheme === 'dark'))
                ? bgDefaultDark : bgDefaultLight}
              resizeMode="cover"
              style={[
                styles.explainBackground,
                (Platform.OS === 'web') ? styles.explainBackgroundWeb : ''
              ]}
            >
              <Text style={[
                stylesList.locText,
                {fontSize: (Platform.OS === 'web') ? 12 : width*0.019,
                  color: colors.text}
              ]}>
                {`Terrace`}
              </Text>
              <Text style={[
                stylesList.locText,
                {fontSize: (Platform.OS === 'web') ? 12 : width*0.019,
                  color: colors.text}
              ]}>
                {`storage shed, `}
                <Text style={stylesList.locBox}>
                  {'footlocker'}
                </Text>
              </Text>
            </ImageBackground>
          </View>

          {/* Description of pickpocket marker. */}
          <Text style={[styles.marginText, {color: colors.text}]}>
            {`An { `}
            <Text style={stylesList.locPick}>
              {'italicized'}
            </Text>
            {` } location surrounded by curly braces`}
          </Text>
          <Text style={[styles.explainText, {color: colors.text}]}>
            {`indicates an item that can be pickpocketed.`}
          </Text>
          <View
            style={[
              styles.explainBox,
              {borderColor: colors.border},
            ]}
          >
            <ImageBackground
              source={(getCurrentTheme === 'dark' ||
                (getCurrentTheme === 'default' && scheme === 'dark'))
                ? bgDefaultDark : bgDefaultLight}
              resizeMode="cover"
              style={[
                styles.explainBackground,
                (Platform.OS === 'web') ? styles.explainBackgroundWeb : ''
              ]}
            >
              <Text style={[
                stylesList.locText,
                {fontSize: (Platform.OS === 'web') ? 12 : width*0.019,
                  color: colors.text}
              ]}>
                {`2F Southeast Offices`}
              </Text>
              <Text style={[
                stylesList.locText,
                {fontSize: (Platform.OS === 'web') ? 12 : width*0.019,
                  color: colors.text}
              ]}>
                {`Marin's office, { `}
                <Text style={stylesList.locPick}>
                  {'on red archer'}
                </Text>
                {` }`}
              </Text>
            </ImageBackground>
          </View>

          {/* Description of additional instructions. */}
          <Text style={[styles.marginText, {color: colors.text}]}>
            {`Some items have an additional requirement(s)`}
          </Text>
          <Text style={[styles.explainText, {color: colors.text}]}>
            {`that must be met to spawn them into the mission`}
          </Text>
          <Text style={[styles.explainText, {color: colors.text}]}>
            {`(e.g. a crafting recipe). Any such requirements`}
          </Text>
          <Text style={[styles.explainText, {color: colors.text}]}>
            {`are printed after the location in `}
            <Text style={stylesList.locCount}>
              {`bold text`}
            </Text>
            {`.`}
          </Text>
          <View
            style={[
              styles.explainBox,
              {borderColor: colors.border},
            ]}
          >
            <ImageBackground
              source={(getCurrentTheme === 'dark' ||
                (getCurrentTheme === 'default' && scheme === 'dark'))
                ? bgDefaultDark : bgDefaultLight}
              resizeMode="cover"
              style={[
                styles.explainBackground,
                (Platform.OS === 'web') ? styles.explainBackgroundWeb : ''
              ]}
            >
              <Text style={[
                stylesList.locText,
                {fontSize: (Platform.OS === 'web') ? 12 : width*0.019,
                  color: colors.text}
              ]}>
                {`Hammerite Crypts`}
              </Text>
              <Text style={[
                stylesList.locText,
                {fontSize: (Platform.OS === 'web') ? 12 : width*0.019,
                  color: colors.text}
              ]}>
                {`lower level, `}
                <Text style={stylesList.locCount}>
                  {`trade Golden Bone x5`}
                </Text>
              </Text>
            </ImageBackground>
          </View>

          {/* Description of spending loot on items. */}
          <Text style={[styles.marginText, {color: colors.text}]}>
            {`Some FMs have items that require you to spend`}
          </Text>
          <Text style={[styles.explainText, {color: colors.text}]}>
            {`loot to obtain them. The price of each item`}
          </Text>
          <Text style={[styles.explainText, {color: colors.text}]}>
            {`is printed after the location in `}
            <Text style={stylesList.locCount}>
              {`bold text`}
            </Text>
            {`, and`}
          </Text>
          <Text style={[styles.explainText, {color: colors.text}]}>
            {`the loot totals below will be updated automatically.`}
          </Text>
          <View
            style={[
              styles.explainBox,
              {borderColor: colors.border},
            ]}
          >
            <ImageBackground
              source={(getCurrentTheme === 'dark' ||
                (getCurrentTheme === 'default' && scheme === 'dark'))
                ? bgDefaultDark : bgDefaultLight}
              resizeMode="cover"
              style={[
                styles.explainBackground,
                (Platform.OS === 'web') ? styles.explainBackgroundWeb : ''
              ]}
            >
              <Text style={[
                stylesList.locText,
                {fontSize: (Platform.OS === 'web') ? 12 : width*0.019,
                  color: colors.text}
              ]}>
                {`Farkus Outfitters`}
              </Text>
              <Text style={[
                stylesList.locText,
                {fontSize: (Platform.OS === 'web') ? 12 : width*0.019,
                  color: colors.text}
              ]}>
                {`counter, `}
                <Text style={stylesList.locCount}>
                  {`spend 500 `}
                  <Image
                    source={iconGold}
                    style={stylesImg.imgLootIcon}
                  />
                </Text>
              </Text>
            </ImageBackground>
          </View>

          {/* Description of actual number available marker. */}
          <Text style={[styles.marginText, {color: colors.text}]}>
            {`A `}
            <Text style={stylesList.locCount}>
              {`number`}
            </Text>
            {` followed by another `}
            <Text style={stylesList.locCount}>
              {`(number in parentheses)`}
            </Text>
          </Text>
          <Text style={[styles.explainText, {color: colors.text}]}>
            {`indicates that the number of items made available`}
          </Text>
          <Text style={[styles.explainText, {color: colors.text}]}>
            {`is different from the number of items obtainable.`}
          </Text>
          <Text style={[styles.explainText, {color: colors.text}]}>
            {`This usually happens in the loadout store if there's`}
          </Text>
          <Text style={[styles.explainText, {color: colors.text}]}>
            {`not enough money to buy an item's full stock.`}
          </Text>
          <View
            style={[
              styles.explainBox,
              {borderColor: colors.border},
            ]}
          >
            <ImageBackground
              source={(getCurrentTheme === 'dark' ||
                (getCurrentTheme === 'default' && scheme === 'dark'))
                ? bgDefaultDark : bgDefaultLight}
              resizeMode="cover"
              style={[
                styles.explainBackground,
                (Platform.OS === 'web') ? styles.explainBackgroundWeb : ''
              ]}
            >
              <Text style={[
                stylesList.locText,
                {fontSize: (Platform.OS === 'web') ? 12 : width*0.019,
                  color: colors.text}
              ]}>
                {`Loadout Store `}
                <Text style={stylesList.locCount}>
                  {`x15(7)`}
                </Text>
              </Text>
              <Text style={[
                stylesList.locText,
                {fontSize: (Platform.OS === 'web') ? 12 : width*0.019,
                  color: colors.text}
              ]}>
                {`Price: 300`}
              </Text>
            </ImageBackground>
          </View>

          {/* Description of unobtainable marker. */}
          <Text style={[styles.marginText, {color: colors.text}]}>
            {`A location with a `}
            <Text style={stylesList.locNoGet}>
              {'strikethrough'}
            </Text>
            {` indicates`}
          </Text>
          <Text style={[styles.explainText, {color: colors.text}]}>
            {`an item that is in an unreachable location,`}
          </Text>
          <Text style={[styles.explainText, {color: colors.text}]}>
            {`out of bounds, or cannot be collected without`}
          </Text>
          <Text style={[styles.explainText, {color: colors.text}]}>
            {`failing an objective, becoming softlocked, or dying.`}
          </Text>
          <View
            style={[
              styles.explainBox,
              {borderColor: colors.border},
            ]}
          >
            <ImageBackground
              source={(getCurrentTheme === 'dark' ||
                (getCurrentTheme === 'default' && scheme === 'dark'))
                ? bgDefaultDark : bgDefaultLight}
              resizeMode="cover"
              style={[
                styles.explainBackground,
                (Platform.OS === 'web') ? styles.explainBackgroundWeb : ''
              ]}
            >
              <Text style={[
                stylesList.locText,
                {fontSize: (Platform.OS === 'web') ? 12 : width*0.019,
                  color: colors.text}
              ]}>
                {`Hammer Cathedral`}
              </Text>
              <Text style={[
                stylesList.locText,
                stylesList.locNoGet,
                {fontSize: (Platform.OS === 'web') ? 12 : width*0.019,
                  color: colors.text}
              ]}>
                {`sanctuary, nave `}
                <Text style={stylesList.locCount}>
                  {`x2`}
                </Text>
              </Text>
            </ImageBackground>
          </View>

          {/* Description of spoiler settings. */}
          <Text style={[styles.marginText, {color: colors.text}]}>
            {`Secret and Easter Egg items can have their locations`}
          </Text>
          <Text style={[styles.explainText, {color: colors.text}]}>
            {`partially or fully hidden while unselected to avoid spoilers.`}
          </Text>
          <Text style={[styles.explainText, {color: colors.text}]}>
            {`Adjust these spoiler covers on the settings page.`}
          </Text>

          {/* Description of secret marker. */}
          <Text style={[styles.marginText, {color: colors.text}]}>
            {`A location surrounded by `}
            <Text style={{color: colors.locSecret}}>
              {'[[ '}
            </Text>
            {`red brackets`}
            <Text style={{color: colors.locSecret}}>
              {' ]]'}
            </Text>
          </Text>
          <Text style={[styles.explainText, {color: colors.text}]}>
            {`indicates an item found in a secret area,`}
          </Text>
          <Text style={[styles.explainText, {color: colors.text}]}>
            {`or the item itself is the secret.`}
          </Text>
          <View
            style={[
              styles.explainBox,
              {borderColor: colors.border},
            ]}
          >
            <ImageBackground
              source={(getCurrentTheme === 'dark' ||
                (getCurrentTheme === 'default' && scheme === 'dark'))
                ? bgDefaultDark : bgDefaultLight}
              resizeMode="cover"
              style={[
                styles.explainBackground,
                (Platform.OS === 'web') ? styles.explainBackgroundWeb : ''
              ]}
            >
              <Text style={[
                stylesList.locText,
                {fontSize: (Platform.OS === 'web') ? 12 : width*0.019,
                  color: colors.text}
              ]}>
                {`Truart Family Cemetery`}
              </Text>
              <Text style={[
                stylesList.locText,
                {fontSize: (Platform.OS === 'web') ? 12 : width*0.019,
                  color: colors.text}
              ]}>
                <Text style={{color: colors.locSecret}}>
                  {'[[ '}
                </Text>
                {`behind dirt pile`}
                <Text style={{color: colors.locSecret}}>
                  {' ]]'}
                </Text>
              </Text>
            </ImageBackground>
          </View>

          {/* Description of Easter Egg marker. */}
          <Text style={[styles.marginText, {color: colors.text}]}>
            {`A location surrounded by `}
            <Text style={{color: colors.locN}}>(</Text>
            <Text style={{color: colors.locX}}>\</Text>
            <Text style={{color: colors.locH}}>) </Text>
            {`colorful parentheses`}
            <Text style={{color: colors.locH}}> (</Text>
            <Text style={{color: colors.locX}}>/</Text>
            <Text style={{color: colors.locN}}>)</Text>
          </Text>
          <Text style={[styles.explainText, {color: colors.text}]}>
            {`indicates an item found in an Easter Egg area,`}
          </Text>
          <Text style={[styles.explainText, {color: colors.text}]}>
            {`or the item itself is the Easter Egg.`}
          </Text>
          <View
            style={[
              styles.explainBox,
              {borderColor: colors.border},
            ]}
          >
            <ImageBackground
              source={(getCurrentTheme === 'dark' ||
                (getCurrentTheme === 'default' && scheme === 'dark'))
                ? bgDefaultDark : bgDefaultLight}
              resizeMode="cover"
              style={[
                styles.explainBackground,
                (Platform.OS === 'web') ? styles.explainBackgroundWeb : ''
              ]}
            >
              <Text style={[
                stylesList.locText,
                {fontSize: (Platform.OS === 'web') ? 12 : width*0.019,
                  color: colors.text}
              ]}>
                <Text style={{fontWeight: 'bold', color: colors.locX}}>
                  {'◆'}
                </Text>
                {` Basketball Court`}
              </Text>
              <Text style={[
                stylesList.locText,
                {fontSize: (Platform.OS === 'web') ? 12 : width*0.019,
                  color: colors.text}
              ]}>
                <Text style={{color: colors.locN}}>(</Text>
                <Text style={{color: colors.locX}}>\</Text>
                <Text style={{color: colors.locH}}>) </Text>
                {`center`}
                <Text style={{color: colors.locH}}> (</Text>
                <Text style={{color: colors.locX}}>/</Text>
                <Text style={{color: colors.locN}}>)</Text>
              </Text>
            </ImageBackground>
          </View>

          {/* Description of bodies. */}
          <Text style={[styles.marginText, {color: colors.text}]}>
            {`Bodies and corpse parts are not included as junk items`}
          </Text>
          <Text style={[styles.explainText, {color: colors.text}]}>
            {`to avoid having to list every AI in the mission`}
          </Text>
          <Text style={[styles.explainText, {color: colors.text}]}>
            {`(except if they are treated as an inventory item).`}
          </Text>

          {/* Description of secret list. */}
          <Text style={[styles.marginText, {color: colors.text}]}>
            {`A list of the mission's secrets (if any),`}
          </Text>
          <Text style={[styles.explainText, {color: colors.text}]}>
            {`including images, instructions, and rewards,`}
          </Text>
          <Text style={[styles.explainText, {color: colors.text}]}>
            {`is displayed at the bottom of the page.`}
          </Text>
          <Text style={[styles.explainText, {color: colors.text}]}>
            {`Click the secret's location to mark it as found,`}
          </Text>
          <Text style={[styles.explainText, {color: colors.text}]}>
            {`and click the secret's image(s) to enlarge it.`}
          </Text>

          {/* Spacer at the bottom of the page. */}
          <Text>
            {``}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

// Define various styles here.
const styles = StyleSheet.create({
  homeTitle: {
    fontFamily: 'Thief',
    textAlign: 'center',
  },
  explain: {
    marginTop: (Platform.OS === 'web') ? 12 : 10,
  },
  explainArea: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  explainCenter: {
    alignItems: 'center',
  },
  explainText: {
    fontSize: (Platform.OS === 'web') ? 14 : 12,
  },
  marginText: {
    fontSize: (Platform.OS === 'web') ? 14 : 12,
    marginTop: 8,
  },
  explainBox: {
    borderWidth: 1,
    width: (Platform.OS === 'web') ? 228 : 156,
    height: (Platform.OS === 'web') ? 84 : 56,
    marginBottom: 4,
  },
  explainBackground: {
    flex: 1,
    justifyContent: 'center',
    padding: 2,
  },
  explainBackgroundWeb: {
    width: '100%',
    height: '100%',
  }
});
