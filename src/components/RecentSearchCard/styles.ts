import { StyleSheet } from 'react-native';
import colors from '../../styles/colors';

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 4,
    marginTop: 8,
    marginBottom: 8,
    paddingLeft: 12,
    paddingRight: 12,
    paddingBottom: 10,
    paddingTop: 10,

    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    elevation: 7,
  },
  leftItems: {
    gap: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightItems: {
    gap: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchValueText: {
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
