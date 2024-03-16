import { StyleSheet } from 'react-native';

import colors from '../../styles/colors';

const styles = StyleSheet.create({
  authBackButton: {
    paddingTop: 30,
    paddingLeft: 22,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  text: {
    fontSize: 12,
    color: colors.textSecondary,
  },
});

export default styles;
