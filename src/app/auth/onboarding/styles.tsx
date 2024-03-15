import { StyleSheet } from 'react-native';

import colors from '../../../styles/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 64,
    paddingLeft: 44,
    paddingRight: 44,
  },
  verticallySpaced: {
    flex: 1,
    justifyContent: 'space-between',
  },
  datePickerButton: {
    paddingBottom: 16,
  },
  subtext: {
    color: colors.darkGrey,
    marginLeft: 8,
  },
  h1: {
    marginTop: 66,
  },
  body1: {
    marginTop: 26,
  },
  info: {
    flexDirection: 'row',
    marginTop: 12,
    marginBottom: 16,
    width: 250,
  },
  icon: {
    paddingLeft: 8,
  },
});
