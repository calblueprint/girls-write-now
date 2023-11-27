import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  contentCardContainer: {
    marginRight: 20,
    paddingBottom: 20,
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
    alignItems: 'center',
  },
  overlayText: {
    color: 'white',
    paddingTop: 60,
    paddingRight: 10,
    whiteSpace: 'pre-wrap',
    fontSize: 12.5,
  },
});

export default styles;
