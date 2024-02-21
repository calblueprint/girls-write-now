import { StyleSheet } from 'react-native';

import colors from '../../styles/colors';

export default StyleSheet.create({
  outer: {
    position: 'relative',
    zIndex: 1,
  },
  container: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 10,
  },
  dropdown: {
    height: 50,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  dropdownContainer: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.fadedBlack,
    borderTopWidth: 0,
    borderTopEndRadius: 0,
    borderTopStartRadius: 0,
    position: 'relative',
    top: -6,
  },
  itemContainer: {
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderRadius: 5,
  },
  icon: {
    marginRight: 5,
  },
  textStyle: {
    fontSize: 14,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
});
