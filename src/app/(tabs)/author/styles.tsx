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
  name: {
    fontWeight: 'bold',
    fontSize: 24,
    fontFamily: 'Avenir',
  },
  image: {
    height: 68,
    width: 68,
    backgroundColor: colors.darkGrey,
    borderRadius: 4,
  },
  bioText: {
    color: 'black',
    fontFamily: 'Avenir',
    fontSize: 14,
  },
  authorStatement: {
    fontSize: 14,
    color: 'black',
    fontWeight: '400',
    fontFamily: 'Avenir',
  },
  authorTextContainer: {
    paddingLeft: 20,
  },
  line: {
    borderTopColor: 'black',
    borderTopWidth: 20,
  },
  authorStatementTitle: {
    fontWeight: 'bold',
    fontFamily: 'Avenir',
    fontSize: 16,
    marginBottom: 8,
  },
  storyCountText: {
    fontSize: 12,
    marginBottom: 8,
  },
  pronouns: {
    color: '#797979',
  },
});

export default styles;
