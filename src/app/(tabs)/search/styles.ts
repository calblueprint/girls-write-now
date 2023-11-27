import { Dimensions, StyleSheet } from 'react-native';

import colors from '../../../styles/colors';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'flex-start',
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 20,
    gap: 14,
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
