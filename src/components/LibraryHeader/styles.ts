import { StyleSheet } from 'react-native';
import colors from '../../styles/colors';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexGrow: 1,
    width: '100%',
  },
  image: {
    height: 51,
    width: 51,
    borderRadius: 51 / 2,
    marginBottom: 12,
  },
  textContainer: {
    flexDirection: 'row',
  },
  username: {
    paddingLeft: 12,
  },
  horizontal: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignContent: 'center',
  },
});

export default styles;
