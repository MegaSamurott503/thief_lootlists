import { useTheme } from '@react-navigation/native';
import {
  StyleSheet, Platform,
  useWindowDimensions
} from 'react-native';
import { useContext } from 'react';
import { MultipleSelectList } from 'react-native-dropdown-select-list';

import { SettingContext } from '@/constants/context';

/* **************** */
/*  FILTER DROPDOWN */
/* **************** */
// Custom dropdown-select-list component for filtering other screen components.
export function FilterDropdown(props) {
  // Use defaults to avoid errors if some props are undefined.
  const {
    size = '',
    label = 'Selected:'
  } = props;

  // Access window size.
  const { height, width } = useWindowDimensions();

  // Access theme colors.
  const { colors } = useTheme();

  // Fetch global setting states from context.
  const { device } = useContext(SettingContext);

  return (
    <MultipleSelectList
      boxStyles={[
        styles.selectBox(device),
        device === 'phone' && {
          width: (props.size === 'wide') ? '80%' : width*0.46,
        },
        device !== 'phone' && {
          width: (props.size === 'wide') ?
            ((width > 460) ? 425 : width*0.92) :
            ((width > 618) ? 280 : 220),
        },
        {backgroundColor: colors.inputArea,
        borderColor: colors.inputBorder}
      ]}
      checkBoxStyles={{backgroundColor: colors.inputCheck}}
      inputStyles={[
        {color: colors.text,
        fontSize: (props.size === 'wide') ? 14 : 12}
      ]}
      labelStyles={{color: colors.text}}
      dropdownStyles={[
        styles.selectDropdown(device),
        device === 'phone' && {
          width: (props.size === 'wide') ? '80%' : width*0.46,
        },
        device !== 'phone' && {
          width: (props.size === 'wide') ?
            ((width > 460) ? 425 : width*0.92) :
            ((width > 618) ? 280 : 220),
        },
        {backgroundColor: colors.inputArea,
        borderColor: colors.inputBorder}
      ]}
      dropdownItemStyles={styles.selectListItem}
      dropdownTextStyles={[
        //styles.selectListText,
        device === 'phone' && {
          fontSize: (props.size === 'wide') ? 10 : 9
        },
        device !== 'phone' && {
          fontSize: (props.size === 'wide') ? 14 : 12
        },
        {color: colors.text}
      ]}
      badgeStyles={[
        styles.selectBadge,
        {backgroundColor: colors.backLight,
        borderColor: colors.border}
      ]}
      badgeTextStyles={[
        styles.selectBadgeText,
        {color: colors.text}
      ]}
      data={props.data}
      save="value"
      setSelected={(pickMe) => props.setFilter(pickMe)}
      placeholder={props.placeholder}
      label={props.label}
    />
  );
}

// Define various styles here.
const styles = StyleSheet.create({
  selectBox: device => ({
    borderRadius: 5,
    //width: (Platform.OS === 'web') ? 425 : '80%',
    marginHorizontal: (device !== 'phone') ? 10 : 5,
    marginVertical: 5,
  }),
  selectDropdown: device => ({
    borderRadius: 5,
    //width: (Platform.OS === 'web') ? 425 : '80%',
    marginHorizontal: (device !== 'phone') ? 10 : 5,
    marginVertical: 5,
  }),
  selectListItem: {
    alignItems: 'center',
    marginHorizontal: -5,
    height: 30,
  },
  selectListText: {
    //fontSize: (Platform.OS === 'web') ? 15 : 10,
  },
  selectBadge: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    margin: -5,
    paddingHorizontal: 5,
  },
  selectBadgeText: {
    fontSize: 10,
  },
});
