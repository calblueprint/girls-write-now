import { StyleSheet } from 'react-native';

import globalStyles from '../../../styles/globalStyles';

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
    fontFamily: 'Manrope-Regular',
    fontSize: 24,
    fontWeight: '400',
    textAlign: 'left',
    color: 'black',
    marginBottom: 16,
  },
  author: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
  },
  authorText: {
    fontFamily: 'Manrope-Regular',
    fontSize: 12,
    fontWeight: '400',
    textAlign: 'left',
    color: 'black',
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
});

export default styles;
