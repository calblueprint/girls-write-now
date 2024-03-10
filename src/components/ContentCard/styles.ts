import { StyleSheet } from 'react-native';

import colors from '../../styles/colors';

const styles = StyleSheet.create({
  contentCard: {
    marginRight: 20,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    borderRadius: 6,
    shadowColor: colors.black,
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 5,
    elevation: 4,
  },
  image: {
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: 140,
    width: 148,
    backgroundColor: colors.lime,
    borderRadius: 4,
    marginBottom: 8,
  },
  authors: {
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
    borderWidth: 1,
    backgroundColor: '#89CFF0',
    borderColor: 'white',
    marginTop: 15,
    marginLeft: -45,
    flexDirection: 'row',
  },
  textContainer: {
    width: 166,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
  },
  title: {
    marginBottom: 4,
    padding: 0,
  },
  reactionNumber: {
    marginLeft: 15,
    marginTop: 10,
  },
  reactions: {
    width: 20,
    height: 20,
    borderRadius: 20 / 2,
    borderWidth: 1,
    backgroundColor: '#89CFF0', //different per emoji reaction
    borderColor: 'white',
    marginTop: 10,
    marginRight: -10,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
});

export default styles;
