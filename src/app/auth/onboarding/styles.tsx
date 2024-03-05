import { StyleSheet } from 'react-native';

import colors from '../../../styles/colors';

export default StyleSheet.create({
  container: {
    paddingVertical: 63,
    paddingLeft: 43,
    paddingRight: 44,
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
    flex: 1,
    flexDirection: 'row',
    marginTop: 12,
    marginBottom: 16,
    width: 250,
  },
});
