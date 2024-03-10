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
  back: {
    paddingTop: 30,
    paddingBottom: 16,
    color: '#797979',
    fontSize: 12,
    fontWeight: '400',
  },
});
