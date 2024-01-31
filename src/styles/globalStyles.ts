import { StyleSheet } from 'react-native';

import colors from './colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingLeft: 24,
    paddingRight: 24,
  },
  authContainer: {
    marginHorizontal: 38,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  mt20: {
    marginTop: 20,
  },
  h1: {
    fontFamily: 'Manrope-Bold',
    fontSize: 24,
    textAlign: 'left',
    color: colors.black,
  },
  h2: {
    fontFamily: 'Manrope-Bold',
    fontSize: 20,
    textAlign: 'left',
    color: colors.black,
  },
  h3: {
    fontFamily: 'Manrope-Bold',
    fontSize: 18,
    textAlign: 'left',
    color: colors.black,
  },
  sh1: {
    fontFamily: 'Manrope-SemiBold',
    fontSize: 14,
    textAlign: 'left',
    color: colors.black,
  },
  sh2: {
    fontFamily: 'Manrope-Bold',
    fontSize: 14,
    textAlign: 'left',
    color: colors.black,
  },
  sh3: {
    fontFamily: 'Manrope-SemiBold',
    fontSize: 12,
    textAlign: 'left',
    color: colors.black,
  },
  body1: {
    fontFamily: 'Manrope-Regular',
    fontSize: 14,
    textAlign: 'left',
    color: colors.black,
  },
  body2: {
    fontFamily: 'Manrope-Regular',
    fontSize: 16,
    textAlign: 'left',
    color: colors.black,
  },
  body3: {
    fontFamily: 'Manrope-Regular',
    fontSize: 18,
    textAlign: 'left',
    color: colors.black,
  },
  subtext: {
    fontFamily: 'Manrope-Regular',
    fontSize: 12,
    textAlign: 'left',
    color: colors.black,
  },
  button1: {
    fontFamily: 'Manrope-Regular',
    fontSize: 12,
    textAlign: 'left',
    color: colors.black,
  },
  button2: {
    fontFamily: 'Manrope-SemiBold',
    fontSize: 21,
    textAlign: 'left',
    color: colors.black,
  },
  errorMessage: {
    fontFamily: 'Manrope-Regular',
    fontSize: 12,
    textAlign: 'left',
    color: colors.black,
  },
  bodyUnderline: {
    fontFamily: 'Manrope-Regular',
    fontSize: 12,
    textAlign: 'left',
    color: colors.black,
    textDecorationLine: 'underline',
  },
  bodyBoldUnderline: {
    fontFamily: 'Manrope-Bold',
    fontSize: 14,
    textAlign: 'left',
    color: colors.black,
    textDecorationLine: 'underline',
  },
});
