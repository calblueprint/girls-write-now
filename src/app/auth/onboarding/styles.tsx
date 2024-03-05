import { StyleSheet } from 'react-native';

import colors from '../../../styles/colors';

export default StyleSheet.create({
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 10,
    padding: 5,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
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
