import { Dimensions, StyleSheet } from 'react-native';

import colors from '../../../styles/colors';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 24,
    flex: 1,
  },
  default: {
    marginHorizontal: 8,
  },
  searchContainer: {
    backgroundColor: 'transparent',
    borderRadius: 10,
    borderColor: 'transparent',
    padding: 0,
    marginBottom: 16,
  },
  inputContainer: {
    backgroundColor: '#D9D9D9',
    margin: 0,
    borderRadius: 10,
  },
  greyOverlay: {
    flex: 1,
    position: 'absolute',
    left: 0,
    top: 0,
    opacity: 0.2,
    backgroundColor: 'black',
    width,
    height,
    zIndex: 1,
  },
  noOverlay: {
    flex: 1,
    position: 'absolute',
    left: 0,
    top: 0,
    width,
    height,
  },
  recentSpacing: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 0,
    marginBottom: 8,
    marginHorizontal: 8,
  },
  searchText: {
    fontWeight: '500',
    fontSize: 14,
  },
  numDisplay: {
    marginTop: 24,
    marginBottom: 8,
  },
  clearAll: {
    color: colors.gwnOrange,
    fontSize: 12,
    fontWeight: '400',
  },
  contentContainerRecents: {
    paddingHorizontal: 8,
  },
  contentCotainerStories: {
    paddingHorizontal: 8,
    paddingBottom: 24,
  },
  scrollView: {
    flexGrow: 0,
  },

  genreText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  parentName: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingBottom: 10,
    paddingLeft: 10,
  },
  seeAll: {
    color: '#2D2D2D',
    textDecorationLine: 'underline',
  },
});

export default styles;
