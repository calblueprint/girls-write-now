import { StyleSheet } from 'react-native';
import colors from '../../styles/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    width: '100%',
    flexDirection: 'column',
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
    width: '100%',
    alignContent: 'center',
  },
});

export default styles;
