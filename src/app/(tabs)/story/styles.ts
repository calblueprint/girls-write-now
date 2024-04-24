import { StyleSheet } from 'react-native';

import globalStyles from '../../../styles/globalStyles';
import colors from '../../../styles/colors';

const styles = StyleSheet.create({
  container: {
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 48,
  },
  image: {
    width: '100%',
    height: 200,
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
    marginTop: 15,
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
    fontFamily: 'Manrope-Regular',
    fontSize: 12,
    fontWeight: '400',
    color: 'white',
  },
  shareButtonText: {
    fontFamily: 'Manrope-Regular',
    fontSize: 14,
    fontWeight: '400',
    color: 'white',
    marginLeft: -5,
    textDecorationLine: 'underline',
  },
  excerpt: {
    fontFamily: 'Manrope-Regular',
    fontSize: 16,
    textAlign: 'left',
    color: 'black',
  },
  story: {
    fontFamily: 'Manrope-Regular',
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'left',
    color: 'black',
    marginBottom: 16,
  },
  authorProcess: {
    fontFamily: 'Manrope-Regular',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'left',
    color: 'black',
    marginBottom: 5,
    marginTop: 10,
  },
  process: {
    fontFamily: 'Manrope-Regular',
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'left',
    color: 'black',
    marginBottom: 16,
  },
  options: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  backToTopButtonText: {
    fontFamily: 'Manrope-Regular',
    fontSize: 15,
    fontWeight: '800',
    textAlign: 'left',
    color: 'black',
    textDecorationLine: 'underline',
  },
  bottomReactionContainer: {
    flex: 1,
    justifyContent: 'space-around',
  },
  button_style: {
    width: 125,
    marginBottom: 16,
    borderRadius: 8,
    height: 35,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#EB563B',
  },
  bottomReactionContainer: {
    flex: 1,
    justifyContent: 'space-around',
  },
});

export default styles;
