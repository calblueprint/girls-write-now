import { StyleSheet } from 'react-native';

import colors from './colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingHorizontal: 24,
  },
  authContainer: {
    marginHorizontal: 38,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },

  h1: {
    fontFamily: 'Manrope-Bold',
    fontSize: 24,
    textAlign: 'left',
    color: 'black',
  },
  h2: {
    fontFamily: 'Manrope-Bold',
    fontSize: 20,
    textAlign: 'left',
    color: 'black',
  },
  h3: {
    fontFamily: 'Manrope-Bold',
    fontSize: 18,
    textAlign: 'left',
    color: 'black',
  },

  subHeading1: {
    fontFamily: 'Manrope-Semibold',
    fontSize: 14,
    textAlign: 'left',
    color: 'black',
  },
  subHeading1Bold: {
    fontFamily: 'Manrope-Bold',
    fontSize: 14,
    textAlign: 'left',
    color: 'black',
  },
  subHeading2: {
    fontFamily: 'Manrope-Semibold',
    fontSize: 12,
    textAlign: 'left',
    color: 'black',
  },
  subHeading2Bold: {
    fontFamily: 'Manrope-Bold',
    fontSize: 12,
    textAlign: 'left',
    color: 'black',
  },

  body1: {
    fontFamily: 'Manrope-Regular',
    fontSize: 14,
    textAlign: 'left',
    color: 'black',
  },
  body1Bold: {
    fontFamily: 'Manrope-Bold',
    fontSize: 14,
    textAlign: 'left',
    color: 'black',
  },
  body2: {
    fontFamily: 'Manrope-Regular',
    fontSize: 16,
    textAlign: 'left',
    color: 'black',
  },
  body2Bold: {
    fontFamily: 'Manrope-Bold',
    fontSize: 16,
    textAlign: 'left',
    color: 'black',
  },
  body3: {
    fontFamily: 'Manrope-Regular',
    fontSize: 18,
    textAlign: 'left',
    color: 'black',
  },
  bodyUnderline: {
    fontFamily: 'Manrope-Regular',
    fontSize: 12,
    textDecorationLine: 'underline',
    textAlign: 'left',
    color: 'black',
  },
  bodyBoldUnderline: {
    fontFamily: 'Manrope-Bold',
    fontSize: 14,
    textDecorationLine: 'underline',
    textAlign: 'left',
    color: 'black',
  },

  button1: {
    fontFamily: 'Manrope-Regular',
    fontSize: 12,
    textAlign: 'left',
    color: 'black',
  },
  button2: {
    fontFamily: 'Manrope-Semibold',
    fontSize: 21,
    textAlign: 'left',
    color: 'black',
  },

  subtext: {
    fontFamily: 'Manrope-Regular',
    fontSize: 12,
    textAlign: 'left',
    color: 'black',
  },
  subtextBold: {
    fontFamily: 'Manrope-Bold',
    fontSize: 12,
    textAlign: 'left',
    color: 'black',
  },
  errorMessage: {
    fontFamily: 'Manrope-Semibold',
    fontSize: 12,
    textAlign: 'left',
    color: colors.error,
  },
  mt20: {
    marginTop: 20,
  },
});

export const fonts = ['Manrope-Bold', 'Manrope-Regular', 'Manrope-Semibold'];
