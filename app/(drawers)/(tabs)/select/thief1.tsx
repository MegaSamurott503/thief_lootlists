import { useTheme } from '@react-navigation/native';
import {
  StyleSheet, Platform,
  Text, View, ScrollView,
  useWindowDimensions
} from 'react-native';

import { GoToMission } from '@/components/goToMission';

import { stylesGoTo } from '@/constants/stylesGoTo';

/* **************** */
/*  THIEF 1 SCREEN  */
/* **************** */
// Screen for choosing a Thief 1 mission.
// Contained in tab navigator to easily switch Thief games.
export default function Thief1Screen() {
  // Access window size.
  const { height, width } = useWindowDimensions();

  // Access theme colors.
  const { colors } = useTheme();

  return (
    <ScrollView style={{
      height: (Platform.OS === 'web') ? height*0.99 : '100%'
    }}>
      <View style={stylesGoTo.buttonPage}>
        <Text style={{color: colors.text}}>
          Thief 1 Mission Selection
        </Text>
        <Text style={{color: colors.text}}>
          WIP
        </Text>
        <View style={stylesGoTo.buttonView}>
          <GoToMission
            missionID="t1_training"
            missionName="A Keeper's Training"
            imgAB="A"
          />
          <GoToMission
            missionID="t1_bafford"
            missionName="Lord Bafford's Manor"
            imgAB="A"
          />
          <GoToMission
            missionID="t1_cragscleft"
            missionName="Break from Cragscleft Prison"
            imgAB="B"
          />
          <GoToMission
            missionID="t1_bonehoard"
            missionName="Down in the Bonehoard"
            imgAB="B"
          />
          <GoToMission
            missionID="t1_assassins"
            missionName="Assassins"
            imgAB="B"
          />
          <GoToMission
            missionID="t1_guild"
            missionName="Thieves' Guild"
            imgAB="B"
          />
          <GoToMission
            missionID="t1_sword"
            missionName="The Sword"
            imgAB="A"
          />
          <GoToMission
            missionID="t1_haunted"
            missionName="The Haunted Cathedral"
            imgAB="A"
          />
          <GoToMission
            missionID="t1_towers"
            missionName="The Mage Towers"
            imgAB="B"
          />
          <GoToMission
            missionID="t1_lost"
            missionName="The Lost City"
            imgAB="A"
          />
          <GoToMission
            missionID="t1_song"
            missionName="Song of the Caverns"
            imgAB="B"
          />
          <GoToMission
            missionID="t1_undercover"
            missionName="Undercover"
            imgAB="A"
          />
          <GoToMission
            missionID="t1_return"
            missionName="Return to the Cathedral"
            imgAB="A"
          />
          <GoToMission
            missionID="t1_escape"
            missionName="Escape!"
            imgAB="A"
          />
          <GoToMission
            missionID="t1_bedfellows"
            missionName="Strange Bedfellows"
            imgAB="B"
          />
          <GoToMission
            missionID="t1_maw"
            missionName="Into the Maw of Chaos"
            imgAB="A"
          />
          {/*<GoToMission
            missionID="t1_blooper"
            missionName="Blooper Reel"
            imgAB="A"
          />*/}
        </View>
      </View>
    </ScrollView>
  );
}

// Define various styles here.
const styles = StyleSheet.create({

});
