import { StyleSheet } from 'react-native';

import colors from '../../styles/colors';

const styles = StyleSheet.create({
  card: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    backgroundColor: colors.white,
    borderRadius: 6,
    marginTop: 8,
    marginBottom: 8,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    elevation: 4,
    paddingRight: 8,
  },
  // top: {
  //   flex: 1,
  //   flexDirection: 'row',
  //   justifyContent: 'flex-start',
  //   alignItems: 'flex-start',
  //   paddingLeft: 12,
  //   paddingRight: 12,
  //   shadowColor: '#000',
  //   shadowOffset: { width: 0, height: 2 },
  //   shadowOpacity: 0.3,
  //   shadowRadius: 3,
  // },
  // bottom: {
  //   flex: 1,
  //   flexDirection: 'column',
  //   justifyContent: 'flex-start',
  //   alignItems: 'flex-start',
  //   height: 48,
  //   backgroundColor: colors.lightGrey,
  //   overflow: 'hidden',
  //   borderRadius: 6,
  //   paddingHorizontal: 12,
  //   paddingTop: 8,
  // },
  image: {
    height: 96,
    width: 96,
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
    marginTop: 10,
    marginBottom: 8,
  },
  authorContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 12,
  },
  title: {
    marginBottom: 8,
  },
  titleContainer: {
    paddingTop: 16,
    paddingLeft: 12,
  },
  tag: {
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
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    paddingLeft: 12,
    paddingBottom: 8,
    backgroundColor: colors.white,
  },
  tagsRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  moreTags: {
    paddingRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  moreTagsText: {
    color: colors.darkGrey,
  },
  storyDescription: {
    color: colors.darkGrey,
  },
  body: {
    flexDirection: 'row',
    paddingLeft: 12,
    paddingBottom: 16,
  },
});

export default styles;
