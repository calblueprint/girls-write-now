import { StyleSheet } from 'react-native';
import colors from '../../styles/colors';

const styles = StyleSheet.create({
  reactions: {
    width: 32,
    height: 32,
    borderRadius: 32 / 2,
    borderWidth: 1,
    backgroundColor: '#89CFF0', //different per emoji reaction
    borderColor: 'white',
    marginTop: 10,
    marginRight: -5, // -10
    overflow: 'hidden',
    justifyContent: 'center',
    paddingLeft: 4,
  },
  reactionText: {
    color: colors.grey,
  },
  reactionNumber: {
    marginLeft: 16,
    marginTop: 16,
  },
});

export default styles;
