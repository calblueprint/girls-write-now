import { StyleSheet } from 'react-native';

import colors from '../../styles/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'pink',
  },
  reactionView: {
    flexDirection: 'row',
    position: 'absolute',
    backgroundColor: '#D9D9D9',
    display: 'flex',
    borderRadius: 20,
    height: 40,
    padding: 13,
    alignSelf: 'flex-start',
  },
  reactionsContainer: {
    flexDirection: 'row',
    position: 'absolute',
    padding: 10,
    bottom: 50,
    backgroundColor: '#D9D9D9',
    borderRadius: 20,
  },
  icon_container: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingBottom: 50,
  },
  font: {
    color: 'white',
    fontSize: 40,
  },
});

export default styles;
