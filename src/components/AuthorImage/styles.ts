import { StyleSheet } from 'react-native';

import colors from '../../styles/colors';
import globalStyles from '../../styles/globalStyles';
export default StyleSheet.create({
  author: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    marginLeft: 12,
  },
  authorText: {
    fontFamily: 'Manrope-Regular',
    fontSize: 15,
    fontWeight: '400',
    textAlign: 'left',
    color: 'black',
  },
  author_image: {
    backgroundColor: '#D9D9D9',
    width: 25,
    height: 25,
    borderRadius: 100 / 2,
  },
  author_container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  author_text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
