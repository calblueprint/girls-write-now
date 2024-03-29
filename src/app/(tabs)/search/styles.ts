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
    paddingHorizontal: 8,
  },
  searchContainer: {
    backgroundColor: 'transparent',
    borderRadius: 10,
    marginBottom: 8,
    borderColor: colors.grey,
  },
  inputContainer: {
    backgroundColor: 'transparent',
    borderRadius: 10,
    borderColor: 'grey',
    borderWidth: 1,
    borderBottomWidth: 1,
  },
  greyOverlay: {
    flex: 1,
    position: 'absolute',
    left: 0,
    top: 0,
    opacity: 0.2,
    backgroundColor: 'black',
    width: '200%',
    height,
    zIndex: 1,
    marginRight: -16,
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
    marginTop: 8,
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
  contentContainerRecents: {
    paddingHorizontal: 8,
    marginBottom: 8,
  },
  contentCotainerStories: {
    paddingHorizontal: 8,
  },
  genreText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    marginRight: 24,
  },
  parentName: {
    fontSize: 18,
    fontWeight: '600',
  },
  seeAll: {
    fontSize: 12,
    textDecorationLine: 'underline',
  },
  emptySearch: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    alignItems: 'center',
    marginTop: '60%',
  },
  cancelButton: {
    color: colors.grey,
  },
});

export default styles;
