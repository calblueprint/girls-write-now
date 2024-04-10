import { StyleSheet } from 'react-native';

import colors from '../../../styles/colors';
import globalStyles from '../../../styles/globalStyles';

export default StyleSheet.create({
  marginHorizontal: {
    marginHorizontal: 38,
  },
  errorContainer: {
    paddingTop: 12,
    flexDirection: 'row',
  },
  title: {
    lineHeight: 32,
    paddingTop: 16,
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
    marginHorizontal: 0,
  },
  back: {
    paddingTop: 30,
    paddingLeft: 22,
    color: '#797979',
    fontSize: 12,
    fontWeight: '400',
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
