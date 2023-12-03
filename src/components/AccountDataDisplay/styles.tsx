import { StyleSheet } from 'react-native';

import colors from '../../styles/colors';

export default StyleSheet.create({
  view: {
    width: '50%',
    marginBottom: 26,
  },
  label: {
    fontSize: 12,
    fontFamily: 'Manrope',
    fontStyle: 'normal',
    fontWeight: '400',
    color: colors.textGrey,
  },
  value: {
    paddingTop: 18,
    paddingRight: 20,
    fontSize: 14,
    fontFamily: 'Manrope',
    fontStyle: 'normal',
    fontWeight: '400',
  },
});
