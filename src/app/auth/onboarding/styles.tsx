import { StyleSheet } from 'react-native';

import colors from '../../../styles/colors';

export default StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingVertical: 66,
    paddingLeft: 43,
    paddingRight: 44,
    backgroundColor: 'white',
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
