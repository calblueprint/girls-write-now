import { StyleSheet } from 'react-native';

import colors from '../../../styles/colors';

export default StyleSheet.create({
  container: {
    paddingVertical: 66,
    paddingLeft: 43,
    paddingRight: 44,
    backgroundColor: 'white',
  },
  subtext: {
    color: colors.darkGrey,
    marginLeft: 8,
  },
  body1: {
    marginTop: 26,
  },
  info: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 12,
    width: 250,
  },
  bottomContainer: {
    marginTop: 112,
  },
  updateProfileButton: {
    marginTop: 30,
    marginBottom: 24,
  },
  skipButton: {
    flex: 1,
    alignSelf: 'center',
    color: colors.darkGrey,
  },
});
