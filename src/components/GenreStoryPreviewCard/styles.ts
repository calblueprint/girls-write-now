import { StyleSheet } from 'react-native';

import colors from '../../styles/colors';

const styles = StyleSheet.create({
  card: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    backgroundColor: 'white',
    borderRadius: 6,
    marginTop: 8,
    marginBottom: 8,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    elevation: 10,
    paddingRight: 30,
    marginRight: 30,
    width: '98%',
  },
  top: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  bottom: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    height: 48,
    backgroundColor: colors.lightGrey,
    overflow: 'hidden',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingTop: 8,
  },
  image: {
    height: 106,
    width: 106,
    backgroundColor: colors.lilac,
    borderRadius: 4,
    marginBottom: 12,
    marginTop: 12,
  },
  author: {
    marginLeft: 8,
  },
  authorImage: {
    height: 22,
    width: 22,
    backgroundColor: colors.gwnOrange,
    borderRadius: 22 / 2,
  },
  cardTextContainer: {
    flex: 1,
    marginLeft: 16,
    marginTop: 12,
    marginBottom: 8,
  },
  authorContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  title: {
    marginBottom: 8,
    fontSize: 22,
  },
  tags: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#EBEBEB',
    borderRadius: 10,
    width: 'auto',
    marginRight: 8,
    marginBottom: 10,
  },
  tagsContainer: {
    // backgroundColor: colors.darkGrey,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  horizontalLine: {
    borderBottomColor: '#EBEBEB',
    borderBottomWidth: 1,
    marginTop: 5,
    marginBottom: 10,
  },
  cardContainer2: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorandText: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: 10,
    marginTop: -10,
  },
  subtext: {
    color: '#797979',
    fontSize: 15,
  },
});

export default styles;
