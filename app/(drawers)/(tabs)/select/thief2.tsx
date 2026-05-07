import { useTheme } from '@react-navigation/native';
import {
  StyleSheet, Platform,
  Text, View, ScrollView,
  useWindowDimensions
} from 'react-native';

import { GoToMission } from '@/components/goToMission';

import { stylesGoTo } from '@/constants/stylesGoTo';

/* **************** */
/*  THIEF 2 SCREEN  */
/* **************** */
// Screen for choosing a Thief 2 mission.
// Contained in tab navigator to easily switch Thief games.
export default function Thief2Screen() {
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
          Thief 2 Mission Selection
        </Text>
        <Text style={{color: colors.text}}>
          WIP
        </Text>
        <View style={stylesGoTo.buttonView}>
          <GoToMission
            missionID="t2_interference"
            missionName="Running Interference"
            imgAB="B"
          />
          <GoToMission
            missionID="t2_shipping"
            missionName="Shipping ... and Receiving"
            imgAB="A"
          />
          <GoToMission
            missionID="t2_framed"
            missionName="Framed"
            imgAB="A"
          />
          <GoToMission
            missionID="t2_ambush"
            missionName="Ambush!"
            imgAB="B"
          />
          <GoToMission
            missionID="t2_eavesdropping"
            missionName="Eavesdropping"
            imgAB="B"
          />
          <GoToMission
            missionID="t2_bank"
            missionName="First City Bank and Trust"
            imgAB="B"
          />
          <GoToMission
            missionID="t2_blackmail"
            missionName="Blackmail"
            imgAB="B"
          />
          <GoToMission
            missionID="t2_courier"
            missionName="Trace the Courier"
            imgAB="A"
          />
          <GoToMission
            missionID="t2_blood"
            missionName="Trail of Blood"
            imgAB="A"
          />
          <GoToMission
            missionID="t2_party"
            missionName="Life of the Party"
            imgAB="B"
          />
          <GoToMission
            missionID="t2_cargo"
            missionName="Precious Cargo"
            imgAB="B"
          />
          <GoToMission
            missionID="t2_kidnap"
            missionName="Kidnap"
            imgAB="B"
          />
          <GoToMission
            missionID="t2_casing"
            missionName="Casing the Joint"
            imgAB="A"
          />
          <GoToMission
            missionID="t2_masks"
            missionName="Masks"
            imgAB="B"
          />
          <GoToMission
            missionID="t2_soulforge"
            missionName="Sabotage at Soulforge"
            imgAB="A"
          />
          {/*<GoToMission
            missionID="t2_guest"
            missionName="The Unwelcome Guest (Demo)"
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
