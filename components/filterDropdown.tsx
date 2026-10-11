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
        styles.selectBox(width, props.size),
        {backgroundColor: colors.inputArea,
        borderColor: colors.inputBorder}
      ]}
      checkBoxStyles={{backgroundColor: colors.inputCheck}}
      inputStyles={[
        styles.selectInput(width, props.size),
        {color: colors.text}
      ]}
      labelStyles={{color: colors.text}}
      dropdownStyles={[
        styles.selectDropdown(width, props.size),
        {backgroundColor: colors.inputArea,
        borderColor: colors.inputBorder}
      ]}
      dropdownItemStyles={styles.selectListItem}
      dropdownTextStyles={[
        styles.selectListText(width, props.size),
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
  selectBox: (width, size) => ({
    borderRadius: 5,
    width: (size === 'wide')
      ? ((width > 449) ? 425 : '80%')
      : ((width > 899) ? width*0.19 :
          (width > 617) ? width*0.23 : width*0.45),
    marginHorizontal: (width > 449) ? 10 : 6,
    marginVertical: 5,
  }),
  selectInput: (width, size) => ({
    fontSize: (size === 'wide')
      ? 14
      : (width > 1199 ? 14 :
          width > 449 ? 12 : 11),
    width: '95%',
    marginLeft: (width > 1234) ? -5 : -10,
    marginRight: -5,
  }),
  selectDropdown: (width, size) => ({
    borderRadius: 5,
    width: (size === 'wide')
      ? ((width > 449) ? 425 : '80%')
      : ((width > 899) ? width*0.19 :
          (width > 617) ? width*0.23 : width*0.45),
    marginHorizontal: (width > 449) ? 10 : 6,
    marginVertical: 5,
  }),
  selectListItem: {
    alignItems: 'center',
    marginHorizontal: -10,
    height: 30,
  },
  selectListText: (width, size) => ({
    fontSize: (size === 'wide')
      ? ((width > 449) ? 14 : 10)
      : ((width > 899) ? 12 :
          (width > 449) ? 10 : 9),
  }),
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
