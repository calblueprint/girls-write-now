import { StyleSheet } from 'react-native';

import colors from '../../../styles/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 42,
  },
  heading: {
    paddingBottom: 8,
  },
  body: {
    flex: 1,
    justifyContent: 'space-between',
  },
  button: {
    paddingBottom: 40,
  },
  subtext: {
    paddingVertical: 18,
    color: colors.darkGrey,
  },
});
