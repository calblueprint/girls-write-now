import { StyleSheet } from 'react-native';

import colors from '../../styles/colors';

const styles = StyleSheet.create({
  card: {
    height: 148,
    width: 128,
    marginRight: 16,
    borderRadius: 5,
    marginBottom: 8,
    paddingHorizontal: 8,
    paddingVertical: 16,
    justifyContent: 'flex-end',
  },
  overlayText: {
    color: colors.white,
    textAlign: 'right',
    fontSize: 14,
  },
});

export default styles;
