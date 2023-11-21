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
    paddingBottom: 4,
    paddingTop: 4,
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  searchValueText: {
    color: 'black',
    fontWeight: '400',
    fontSize: 14,
    justifyContent: 'center',
  },
  numResultsText: {
    color: '#A7A5A5',
    fontWeight: '400',
    fontSize: 10,
    justifyContent: 'center',
  },
});

export default styles;
