import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  flex: {
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  inputError: {
    marginTop: 8,
  },
  link: {
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
  redirectText: {
    textAlign: 'center',
    marginBottom: 64,
    marginTop: 16,
  },
  title: {
    paddingTop: 64,
    marginBottom: 23,
  },
  icon: {
    marginRight: 10,
  },
  passwordComplexity: {
    display: 'flex',
    flexDirection: 'row',
    paddingBottom: 8,
  },
  passwordErrorText: {
    marginLeft: 8,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  inputs: {
    paddingBottom: 8,
  },
  navigation: {
    // marginTop: 'auto',
  },
});
