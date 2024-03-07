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
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
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
    marginBottom: 8,
  },
  titleContainer: {
    paddingTop: 16,
    paddingLeft: 12,
    borderBottomColor: '#EBEBEB',
    borderBottomWidth: StyleSheet.hairlineWidth,
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
    borderRadius: 6,
    paddingLeft: 12,
    paddingBottom: 4,
    backgroundColor: colors.white,
  },
  tagsRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexWrap: 'wrap',
    paddingTop: 4,
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
