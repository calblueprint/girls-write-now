import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  flex: {
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  inputError: {
    color: 'red',
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
    fontSize: 24,
    paddingTop: 64,
    marginBottom: 23,
    fontWeight: '700',
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
    fontSize: 12,
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
