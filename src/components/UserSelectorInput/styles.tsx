import { StyleSheet } from 'react-native';
import colors from '../../styles/colors';

export default StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '400',
    color: colors.textGrey,
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
    borderColor: colors.shadowDark,
    borderTopWidth: 0,
    borderTopEndRadius: 0,
    borderTopStartRadius: 0,
  },
  itemContainer: {
    padding: -7,
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
