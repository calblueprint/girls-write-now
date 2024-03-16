import { StyleSheet } from 'react-native';
import colors from '../../../styles/colors';

const styles = StyleSheet.create({
  selector: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fbfbfb',
    marginBottom: 24,
  },
  header: {
    marginBottom: 24,
  },
  selectedText: {
    color: colors.gwnOrange,
    paddingVertical: 8,
  },
  unselectedText: {
    color: colors.black,
    paddingVertical: 8,
  },
  selectedButton: {
    borderBottomWidth: 1,
    borderBottomColor: colors.gwnOrange,
  },
});

export default styles;
