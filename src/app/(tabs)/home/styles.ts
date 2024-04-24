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
  scrollView1: {
    paddingBottom: 16,
    flexGrow: 0,
    padding: 8,
  },
  scrollView2: {
    paddingBottom: 20,
    flexGrow: 0,
    padding: 8,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 12,
    marginRight: 24,
  },
  featuredDescription: {
    marginBottom: 24,
    marginRight: 24,
  },
  featuredDescriptionLink: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default styles;
