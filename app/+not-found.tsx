import { useTheme } from '@react-navigation/native';
import { Link, Stack } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export default function NotFoundScreen() {
  // Access theme colors.
  const { colors } = useTheme();

  return (
    <>
      <Stack.Screen options={{ title: "ERROR 404" }} />
      <View style={styles.container}>
        <Text style={{color: colors.text}}>
          Page Not Found. Check your URL.
        </Text>
        <Text style={{color: colors.text}}>
          WIP
        </Text>
        <Link
          href="/"
          style={{color: colors.text}}>
          Go to home screen
        </Link>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
