import { StyleSheet } from 'react-native';

import colors from '../../../styles/colors';

const styles = StyleSheet.create({
  container: {
    paddingLeft: 24,
    paddingRight: 24,
  },
  authorImage: {
    backgroundColor: '#D9D9D9',
    width: 21,
    height: 21,
    borderRadius: 100 / 2,
  },
  title: {
    marginBottom: 16,
  },
  author: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
  },
  genres: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderRadius: 10,
    marginBottom: 16,
  },
  genresBorder: {
    backgroundColor: '#D9D9D9',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 10,
    marginRight: 8,
  },
  genresText: {
    backgroundColor: '#D9D9D9',
  },
  shareButtonText: {
    color: colors.white,
  },
  excerpt: {
    textAlign: 'left',
    paddingVertical: 16,
  },
  story: {
    marginBottom: 16,
  },
  authorProcess: {
    marginBottom: 16,
  },
  process: {
    marginBottom: 16,
  },
  backToTopButtonText: {
    fontFamily: 'Manrope-Regular',
    fontSize: 12,
    fontWeight: '800',
    textAlign: 'left',
    color: 'black',
  },
  bottomReactionContainer: {
    flex: 1,
    justifyContent: 'space-around',
  },
});

export default styles;
