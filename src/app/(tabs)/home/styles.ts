import { Dimensions, StyleSheet } from 'react-native';

import colors from '../../../styles/colors';
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  loading: {
    backgroundColor: colors.white,
    flex: 1,
    position: 'absolute',
    left: 0,
    top: 0,
    width,
    height,
    zIndex: 1,
    padding: 50,
  },
  subheading: {
    marginTop: 12,
    marginBottom: 16,
  },
  scrollView: {
    marginBottom: 20,
    flexGrow: 0,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 12,
  },
  featuredDescription: {
    marginBottom: 16,
    marginTop: 8,
  },
});

export default styles;
