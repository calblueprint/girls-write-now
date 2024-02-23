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
  titleStyle: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    color: 'white',
  },
});
