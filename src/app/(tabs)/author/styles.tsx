import { StyleSheet } from 'react-native';

import colors from '../../../styles/colors';

const styles = StyleSheet.create({
  authorCardContainer: {
    marginTop: 16,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  image: {
    height: 68,
    width: 68,
    backgroundColor: colors.darkGrey,
    borderRadius: 4,
  },
  authorTextContainer: {
    paddingLeft: 20,
  },
  line: {
    borderTopColor: 'black',
    borderTopWidth: 20,
  },
  authorStatementTitle: {
    marginBottom: 8,
  },
  storyCountText: {
    fontSize: 12,
    marginBottom: 8,
  },
  pronouns: {
    color: colors.textGrey,
  },
});

export default styles;
