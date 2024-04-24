import { StyleSheet } from 'react-native';

import colors from '../../styles/colors';

const styles = StyleSheet.create({
  dropdown: {
    borderColor: colors.darkGrey,
    flexGrow: 0,
    flexShrink: 0,
    borderWidth: 1,
    borderRadius: 7,
    width: 105,
    height: 30,
    marginRight: 8,
    color: colors.darkGrey,
  },
  dropdownContainer: {
    marginTop: 20,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  firstDropdown: {
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  itemContainer: {},
  placeholderStyle: {
    marginBottom: 6,
    marginTop: 3,
    paddingLeft: 10,
    fontSize: 14,
    color: colors.darkGrey,
  },

});

export default styles;
