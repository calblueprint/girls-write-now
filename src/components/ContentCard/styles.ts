import { StyleSheet } from 'react-native';

import colors from '../../styles/colors';

const styles = StyleSheet.create({
  contentCard: {
    marginRight: 20,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    borderRadius: 6,
    shadowColor: colors.black,
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 5,
    elevation: 4,
  },
  image: {
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: 140,
    width: 148, //148,
    backgroundColor: colors.lime,
    borderRadius: 4,
    marginBottom: 8,
  },
  textContainer: {
    width: 148,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
  },
  title: {
    marginBottom: 4,
    padding: 0,
  },
});

export default styles;
