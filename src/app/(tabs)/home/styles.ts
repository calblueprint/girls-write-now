import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  subheading: {
    fontSize: 16,
    fontWeight: '800',
    textAlign: 'left',
    lineHeight: 24,
    color: 'black',
    marginBottom: 12,
  },
  featuredSubheading: {
    fontSize: 16,
    fontWeight: '800',
    textAlign: 'left',
    lineHeight: 24,
    color: 'black',
    marginBottom: 8,
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
  },
  featuredContainer: {},
});

export default styles;
