import { StyleSheet } from 'react-native';

import colors from '../../../styles/colors';
import globalStyles from '../../../styles/globalStyles';

const styles = StyleSheet.create({
  textSelected: {
    color: '#EB563B',
    textDecorationLine: 'underline',
  },

  container: {
    width: '100%',
    marginTop: 24,
    flex: 1,
  },

  flatListStyle: {
    paddingTop: 15,
  },
  scrollViewContainer: {
    marginTop: 30,
    marginBottom: 15,
    width: '100%',
  },
  noStoriesText: {
    fontSize: 20,
    color: '#EB563B',
  },
  noStoriesText2: {
    fontSize: 13,
  },
  renderStories: {
    flex: 1,
  },
  headerContainer: {},
});

export default styles;
