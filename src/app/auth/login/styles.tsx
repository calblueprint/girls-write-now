import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  flex: {
    justifyContent: 'space-between',
  },
  forgotPassword: {
    fontFamily: 'Manrope-Regular',
    fontSize: 12,
    textDecorationLine: 'underline',
    paddingTop: 18,
    paddingBottom: 16,
    fontWeight: '400',
  },
  link: {
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
  redirectText: {
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 64,
  },
  title: {
    fontFamily: 'Manrope-Bold',
    lineHeight: 33,
    paddingTop: 64,
    marginBottom: 28,
    fontSize: 24,
    fontWeight: '700',
  },
  error: {
    color: 'red',
  },
  icon: {
    paddingRight: 10,
  },
});
