import { StyleSheet } from 'react-native';

import colors from '../../../styles/colors';
import globalStyles from '../../../styles/globalStyles';

export default StyleSheet.create({
  errorContainer: {
    paddingTop: 12,
    flexDirection: 'row',
  },
  title: {
    lineHeight: 32,
  },
  sent: {
    paddingTop: 20,
    paddingBottom: 36,
  },
  otpTextInputStyle: {
    ...globalStyles.subHeading1Bold,
    textAlign: 'center',
    borderRadius: 5,
    padding: 10,
    borderWidth: 1,
    borderBottomWidth: 1,
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
    marginHorizontal: 42,
  },
  resendButton: {
    marginLeft: 8,
    color: colors.darkGrey,
  },
  x: {
    ...globalStyles.subHeading1Bold,
    color: colors.error,
    marginRight: 6,
  },
  errorMessage: {
    marginTop: 3,
  },
});
