import { StyleSheet } from 'react-native';

import colors from '../../../styles/colors';

export default StyleSheet.create({
  otpTextInputStyle: {
    borderRadius: 10,
    borderWidth: 2,
    borderBottomWidth: 2,
    height: 80,
    width: 40,
    borderColor: colors.black,
  },
  otpContainerStyle: {
    marginBottom: 20,
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
