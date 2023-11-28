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
    color: colors.textPrimary,
  },
  h2: {
    fontFamily: 'Manrope-Bold',
    fontSize: 20,
    textAlign: 'left',
    color: colors.textPrimary,
  },
  h3: {
    fontFamily: 'Manrope-Bold',
    fontSize: 18,
    textAlign: 'left',
    color: colors.textPrimary,
  },
  sh1: {
    fontFamily: 'Manrope-SemiBold',
    fontSize: 14,
    textAlign: 'left',
    color: colors.textPrimary,
  },
  sh2: {
    fontFamily: 'Manrope-Bold',
    fontSize: 14,
    textAlign: 'left',
    color: colors.textPrimary,
  },
  sh3: {
    fontFamily: 'Manrope-SemiBold',
    fontSize: 12,
    textAlign: 'left',
    color: colors.textPrimary,
  },
  body1: {
    fontFamily: 'Manrope-Regular',
    fontSize: 14,
    textAlign: 'left',
    color: colors.textPrimary,
  },
  body2: {
    fontFamily: 'Manrope-Regular',
    fontSize: 16,
    textAlign: 'left',
    color: colors.textPrimary,
  },
  body3: {
    fontFamily: 'Manrope-Regular',
    fontSize: 18,
    textAlign: 'left',
    color: colors.textPrimary,
  },
  subtext: {
    fontFamily: 'Manrope-Regular',
    fontSize: 12,
    textAlign: 'left',
    color: colors.textPrimary,
  },
  button1: {
    fontFamily: 'Manrope-Regular',
    fontSize: 12,
    textAlign: 'left',
    color: colors.textPrimary,
  },
  button2: {
    fontFamily: 'Manrope-SemiBold',
    fontSize: 21,
    textAlign: 'left',
    color: colors.textPrimary,
  },
  errorMessage: {
    fontFamily: 'Manrope-Regular',
    fontSize: 12,
    textAlign: 'left',
    color: colors.textPrimary,
  },
  bodyUnderline: {
    fontFamily: 'Manrope-Regular',
    fontSize: 12,
    textAlign: 'left',
    color: colors.textPrimary,
    textDecorationLine: 'underline',
  },
  bodyBoldUnderline: {
    fontFamily: 'Manrope-Bold',
    fontSize: 14,
    textAlign: 'left',
    color: colors.textPrimary,
    textDecorationLine: 'underline',
  },
});
