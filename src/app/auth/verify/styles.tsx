import { StyleSheet } from 'react-native';

import colors from '../../../styles/colors';

export default StyleSheet.create({
  input: {
    height: 80,
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
    justifyContent: 'flex-start',
  },
  backButton: {
    color: colors.textGrey,
    justifyContent: 'flex-end',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  resendButton: {
    color: colors.citrus,
  },
});
