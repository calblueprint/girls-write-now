import { StyleSheet } from 'react-native';

import colors from '../../styles/colors';

const styles = StyleSheet.create({
  card: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    backgroundColor: '#FFF',
    borderRadius: 6,
    marginTop: 8,
    marginBottom: 8,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    elevation: 4,
  },
  image: {
    height: 96,
    width: 96,
    backgroundColor: colors.lilac,
    borderRadius: 4,
    marginBottom: 12,
  },
  author: {
    marginLeft: 8,
  },
  authorImage: {
    height: 22,
    width: 22,
    backgroundColor: colors.gwnOrange,
    borderRadius: 22 / 2,
    marginLeft: 8,
  },
  cardTextContainer: {
    flex: 1,
    marginTop: 10,
    marginBottom: 8,
  },
  authorContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    flex: 1,
    alignSelf: 'flex-start',
    // marginBottom: 8,
  },
  titleContainer: {
    paddingTop: 16,
    paddingLeft: 12,
    paddingRight: 12,
    paddingBottom: 8,
    borderBottomColor: '#EBEBEB',
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    flex: 1,
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
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    borderRadius: 6,
    paddingLeft: 12,
    paddingBottom: 4,
    backgroundColor: colors.white,
  },
  tagsRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignContent: 'flex-end',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  moreTags: {
    paddingVertical: 10,
    paddingRight: 12,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  moreTagsText: {
    color: colors.darkGrey,
  },
  reactions: {
    width: 32,
    height: 32,
    borderRadius: 32 / 2,
    borderWidth: 1,
    backgroundColor: '#89CFF0', //different per emoji reaction
    borderColor: 'white',
    marginTop: 10,
    marginRight: -5, // -10
    overflow: 'hidden',
    justifyContent: 'center',
    paddingLeft: 4,
  },
  reactionText: {
    color: colors.grey,
  },
  reactionNumber: {
    marginLeft: 16,
    marginTop: 16,
  },
  storyDescription: {
    color: colors.darkGrey,
    paddingRight: 12,
    paddingLeft: 10,
  },
  body: {
    flexDirection: 'row',
    marginTop: 16,
    paddingLeft: 12,
    paddingBottom: 12,
  },
});

export default styles;
