import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  mt16: {
    marginTop: 16,
  },
  label: {
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '400',
  },
  container: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'black',
  },
  inputField: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Manrope',
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
