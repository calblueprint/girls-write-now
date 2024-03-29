import { StyleSheet } from 'react-native';

import colors from '../../styles/colors';

const styles = StyleSheet.create({
  contentCard: {
    marginRight: 20,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  image: {
    height: 140,
    width: 148,
    backgroundColor: colors.lime,
    borderRadius: 4,
    marginBottom: 8,
  },
  textContainer: {
    width: 148,
  },
  title: {
    marginBottom: 4,
  },
});

export default styles;
