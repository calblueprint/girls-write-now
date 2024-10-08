import { StyleSheet } from 'react-native';

import colors from '../../styles/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    // flexDirection: 'row'
  },
  reactionView: {
    borderRadius: 20,
    padding: 10,
    alignSelf: 'center',
  },
  reactionsContainer: {
    flex: 1,
    flexDirection: 'row',
    gap: 5,
    justifyContent: 'space-between',
    padding: 10,
    position: 'absolute', // Positioning the container above the toggle button
    bottom: -4,
    backgroundColor: '#D9D9D9',
    borderRadius: 20,
  },
});

export default styles;
