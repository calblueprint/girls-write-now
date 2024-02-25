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
    marginLeft: 10,
  },
  h1: {
    marginTop: 30,
  },
  body1: {
    marginTop: 25,
  },
  info: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 10,
    width: 250,
  },
});
