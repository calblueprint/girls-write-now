import { StyleSheet } from 'react-native';

import colors from '../../../styles/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 48,
  },
  image: {
    width: '100%',
    height: 153,
    marginBottom: 16,
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
  excerpt: {
    fontFamily: 'Manrope-Regular',
    fontSize: 18,
    textAlign: 'left',
    color: colors.black,
    paddingTop: 16,
    paddingBottom: 16,
  },
  story: {
    fontFamily: 'Manrope-Regular',
    fontSize: 14,
    textAlign: 'left',
    color: colors.black,
    marginBottom: 16,
  },
  process: {
    fontFamily: 'Manrope-Regular',
    fontSize: 14,
    textAlign: 'left',
    color: colors.black,
    marginBottom: 16,
  },
});

export default styles;
