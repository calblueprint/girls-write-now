import { StyleSheet } from 'react-native';

import colors from '../../styles/colors';

const styles = StyleSheet.create({
  authorCardContainer: {
    marginRight: 20,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
  },
  authorInfo: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  name: {
    paddingTop: 15,
    fontWeight: 'bold',
    fontSize: 20,
  },
  image: {
    height: 76,
    width: 84,
    backgroundColor: colors.darkGrey,
    borderRadius: 4,
    marginBottom: 12,
    marginTop: 12,
  },

  bioContainer: {},
  bioText: {
    paddingTop: 15,
    paddingBottom: 15,
    color: 'gray',
  },
  authorStatementContainer: {
    paddingTop: 15,
    paddingBottom: 5,
    fontWeight: 'bold',
    fontSize: 15,
  },
  authorStatement: {
    paddingBottom: 15,
    color: 'gray',
  },
  imageContainer: {},
  authorTextContainer: {
    paddingLeft: 20,
  },
  line: {
    borderTopColor: 'black',
    borderTopWidth: 20,
  },
});

export default styles;
