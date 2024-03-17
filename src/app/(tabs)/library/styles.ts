import { StyleSheet } from 'react-native';
import colors from '../../../styles/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  selector: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fbfbfb',
    marginBottom: 24,
  },
  header: {
    paddingHorizontal: 24,
    marginBottom: 24,
    marginTop: 60,
  },
  selectedText: {
    textAlign: 'center',
    color: colors.gwnOrange,
    paddingVertical: 8,
  },
  unselectedText: {
    textAlign: 'center',
    color: colors.black,
    paddingVertical: 8,
  },
  selectedButton: {
    borderBottomWidth: 1,
    borderBottomColor: colors.gwnOrange,
  },
  scrollView: {
    width: '100%',
    paddingHorizontal: 24,
  },
});

export default styles;
