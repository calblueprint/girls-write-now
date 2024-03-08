import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  mt16: {
    marginTop: 16,
    width: '100%',
  },
  container: {
    paddingRight: 10,
    marginTop: 8,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'black',
    fontFamily: 'Manrope-Regular',
  },
  inputField: {
    flex: 1,
    fontSize: 14,
    padding: 10,
    color: '#000000',
  },
  button: {
    backgroundColor: 'gray',
  },
  verticallySpaced: {
    alignSelf: 'stretch',
  },
});
