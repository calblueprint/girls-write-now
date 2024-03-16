import { StyleSheet } from 'react-native';
import colors from '../../styles/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: 0,
    paddingRight: 0,
  },
  image: {
    height: 51,
    width: 51,
    borderRadius: 4,
    marginBottom: 12,
  },
  textContainer: {
    flexDirection: 'row',
  },
  username: {
    paddingLeft: 12,
  },
  horizontal: {
    flex: 1,
    flexGrow: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default styles;
