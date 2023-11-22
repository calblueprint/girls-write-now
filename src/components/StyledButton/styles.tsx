import { StyleSheet } from 'react-native';
import colors from '../../styles/colors';

export default StyleSheet.create({
  disabledStyle: {
    borderRadius: 5,
    backgroundColor: colors.gwnOrangeDisabled,
  },
  buttonStyle: {
    borderRadius: 5,
    backgroundColor: colors.gwnOrange,
  },
  disabledTitleStyle: {
    fontSize: 21,
    fontWeight: '400',
    paddingHorizontal: 24,
    paddingVertical: 10,
    color: 'white',
  },
  titleStyle: {
    fontSize: 21,
    fontWeight: '400',
    paddingHorizontal: 24,
    paddingVertical: 10,
    color: 'white',
  },
});
