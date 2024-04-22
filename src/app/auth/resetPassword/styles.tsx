import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    paddingVertical: 64,
    paddingLeft: 44,
    paddingRight: 44,
    flex: 1,
    justifyContent: 'space-between',
  },

  newPassword: {
    padding: 8,
    paddingBottom: 8,
  },

  passwordComplexity: {
    display: 'flex',
    flexDirection: 'row',
    paddingBottom: 8,
  },

  passwordErrorText: {
    marginLeft: 8,
  },

  icon: {
    marginRight: 10,
  },
});
