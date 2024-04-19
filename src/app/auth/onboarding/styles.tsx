import { StyleSheet } from 'react-native';

import colors from '../../../styles/colors';

export default StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  flex: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingTop: 64,
    paddingBottom: 54,
    paddingLeft: 43,
    paddingRight: 44,
  },
  inputContainer: {
    flex: 1,
    gap: 16,
  },
  subtext: {
    color: colors.darkGrey,
    marginLeft: 8,
  },
  body1: {
    marginTop: 26,
  },
  warning: {
    marginTop: 40,
    marginBottom: 24,
  },
  info: {
    flexDirection: 'row',
    marginTop: 12,
    width: 250,
  },
  updateProfileButton: {
    marginBottom: 24,
  },
  skipButton: {
    flex: 1,
    alignSelf: 'center',
    color: colors.darkGrey,
  },
  icon: {
    paddingLeft: 8,
  },
});
