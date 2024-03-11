import { StyleSheet } from 'react-native';
import colors from '../../../styles/colors';

export default StyleSheet.create({
  container: {
    paddingVertical: 32,
    paddingLeft: 30,
    paddingRight: 30,
  },
  heading: {
    paddingBottom: 8,
  },
  body: {
    justifyContent: 'space-between',
  },

  subtext: {
    paddingVertical: 18,
    color: colors.darkGrey,
  },
  back: {
    paddingTop: 30,
    paddingBottom: 16,
    color: colors.darkGrey,
    fontSize: 12,
    fontWeight: '400',
  },
});
