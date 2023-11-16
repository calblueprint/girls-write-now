import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  contentCardContainer: {
    marginRight: 20,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  card: {
    height: 135,
    width: 120,
    borderRadius: 4,
    marginBottom: 8,
  },
  overlayContainer: {
    ...StyleSheet.absoluteFillObject, // This makes the overlay cover the entire parent container
    justifyContent: 'flex-end',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  overlayText: {
    color: 'white',
    paddingBottom: 20,
    whiteSpace: 'pre-wrap',
  },
});

export default styles;
