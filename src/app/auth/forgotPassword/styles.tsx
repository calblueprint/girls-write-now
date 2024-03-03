import { StyleSheet } from 'react-native';
import colors from '../../../styles/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 63,
    paddingLeft: 43,
    paddingRight: 44,
    justifyContent: 'space-between',
  },

  heading: {
    paddingBottom: 8,
  },

  subtext: {
    paddingVertical: 18,
    color: colors.darkGrey,
  },
});
