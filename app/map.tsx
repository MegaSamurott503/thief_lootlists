import { useTheme } from '@react-navigation/native';
import { Text, View, ScrollView } from 'react-native';
// need to import:

/* **************** */
/*    MAP SCREEN    */
/* **************** */
// Screen for viewing interactive map of The City.
// Contained in drawer navigator to separate from other screens.
export default function MapScreen() {
  // Access theme colors.
  const { colors } = useTheme();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}>
      <Text style={{color: colors.text}}>
        Interactive map goes here.
      </Text>
      <Text style={{color: colors.text}}>
        (Someday?)
      </Text>
    </View>
  );
}
