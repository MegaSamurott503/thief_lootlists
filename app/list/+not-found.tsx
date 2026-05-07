import { Link, Stack } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export default function NotFoundScreen() {
  return (
    <View style={styles.container}>
      <Text>NO MISSION FOUND</Text>
      <Text>Either there's a typo in your URL,</Text>
      <Text>or I haven't added a list for that mission yet.</Text>
      <Link href="/">Go to home screen</Link>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
