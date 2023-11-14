import { StyleSheet } from 'react-native';

import colors from '../../../styles/colors';

const styles = StyleSheet.create({
  authorCardContainer: {
    marginRight: 20,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
  },
  name: {
    paddingTop: 15,
    fontWeight: 'bold',
    fontSize: 20,
    fontFamily: 'Avenir',
  },
  image: {
    height: 76,
    width: 84,
    backgroundColor: colors.darkGrey,
    borderRadius: 4,
    marginBottom: 12,
    marginTop: 12,
  },
  bioText: {
    paddingTop: 15,
    paddingBottom: 15,
    color: 'black',
    fontFamily: 'Avenir',
  },
  authorStatementContainer: {
    paddingTop: 15,
    paddingBottom: 5,
    fontWeight: 'bold',
    fontSize: 15,
  },
  authorStatement: {
    paddingBottom: 15,
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
    fontWeight: 'bold',
  },
});

export default styles;
