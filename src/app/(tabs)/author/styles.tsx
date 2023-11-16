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
    fontSize: 25,
    fontFamily: 'Avenir',
    marginLeft: -10,
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
    width: 324,
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
    fontSize: 17,
    paddingBottom: 2,
  },
  backButton: {
    paddingTop: 20,
    paddingBottom: 15,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    color: colors.lightGrey,
  },
  storyCountText: {
    paddingTop: 10,
    paddingBottom: 10,
    fontWeight: 'bold',
  },
  pronouns: {
    color: '#797979',
    marginLeft: -10,
  },
});

export default styles;
