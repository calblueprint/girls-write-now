import { StyleSheet } from 'react-native';

import colors from '../../styles/colors';

export default StyleSheet.create({
  view: {
    width: '50%',
    marginBottom: 26,
  },
  label: {
    color: colors.textGrey,
  },
  value: {
    paddingTop: 18,
    paddingRight: 20,
    fontSize: 14,
  },
});
