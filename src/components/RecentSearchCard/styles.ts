import { StyleSheet } from 'react-native';

import colors from '../../styles/colors';

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: colors.lightGrey,
    borderRadius: 4,
    marginBottom: 16,
    maxHeight: 100,
    paddingLeft: 12,
    paddingRight: 12,
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default styles;
