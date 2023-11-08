import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingLeft: 24,
    paddingRight: 24,
  },
  auth_container: {
    marginTop: 40,
    padding: 12,
  },
  h1: {
    // fontFamily: 'DMSans-Bold',
    fontSize: 50,
    fontWeight: '700',
    textAlign: 'left',
    color: 'black',
  },
  h2: {
    // fontFamily: 'DMSans-Bold',
    fontSize: 40,
    fontWeight: '400',
    textAlign: 'left',
    color: 'black',
  },
  h3: {
    // fontFamily: 'DMSans-Regular',
    fontSize: 32,
    fontWeight: '400',
    textAlign: 'left',
    color: 'black',
  },
  h4: {
    // fontFamily: 'DMSans-Regular',
    fontSize: 24,
    fontWeight: '800',
    textAlign: 'left',
    color: 'black',
  },
  body1: {
    // fontFamily: 'DMSans-Regular',
    fontSize: 12,
    fontWeight: '400',
    textAlign: 'left',
    color: 'black',
    lineHeight: 18,
  },
  body2: {
    // fontFamily: 'DMSans-Regular',
    fontSize: 10,
    fontWeight: '400',
    textAlign: 'left',
    color: 'black',
  },
  body3: {
    fontFamily: 'Avenir',
    fontSize: 8,
    fontWeight: '400',
    textAlign: 'left',
    color: 'black',
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  mt20: {
    marginTop: 20,
  },
  passwordComplexity: {
    display: 'flex',
    flexDirection: 'row',
  },
});
