import { Dimensions, StyleSheet } from 'react-native';

import colors from '../../../styles/colors';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 24,
    flex: 1,
  },
  resultCounter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    // padding: 20
  },
  searchContainer: {
    backgroundColor: 'transparent',
    borderRadius: 10,
    borderColor: colors.grey,
  },
  inputContainer: {
    backgroundColor: 'transparent',
    borderRadius: 10,
    borderColor: colors.grey2,
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
  numDisplay: {
    marginTop: 20,
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
  dropdown: {
    borderColor: '#797979',
    flexGrow: 0,
    flexShrink: 0,
    borderWidth: 1.5,
    borderRadius: 7,
    width: 140,
    height: 30,
    color: '#797979',
  },
  dropdownContainer: {
    marginLeft: 10,
    marginTop: 13,
    marginBottom: 30,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  firstDropdown: {
    marginRight: 10,
  },
  secondDropdown: {
    marginLeft: 10,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  itemContainer: {},
  placeholderStyle: {
    color: colors.darkGrey,
    marginLeft: 45,
  },
  clearFilters: {
    color: colors.fadedBlack,
  },
  clearFiltersButton: {
    marginBottom: 8,
    marginTop: 'auto',
  },
});

export default styles;
