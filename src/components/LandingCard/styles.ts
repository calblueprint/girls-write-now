import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  contentCardContainer: {
    marginRight: 15,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  card: {
    height: 145,
    width: 135,
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
    alignSelf: 'flex-end',
    textAlign: 'right',
    whiteSpace: 'pre-wrap',
    paddingBottom: 15,
    paddingRight: 10,
    fontSize: 12.5,
  },
});

export default styles;
