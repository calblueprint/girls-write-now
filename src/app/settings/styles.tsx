import { StyleSheet } from 'react-native';
import colors from '../../styles/colors';

export default StyleSheet.create({
  button: {
    marginBottom: 32,
  },
  main: {
    flex: 1,
    width: '100%',
    paddingLeft: 12,
    justifyContent: 'space-between',
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  subheading: {
    paddingBottom: 16,
  },
  heading: {
    paddingBottom: 20,
  },
  back: {
    paddingTop: 30,
    paddingBottom: 16,
    color: '#797979',
    fontSize: 12,
    fontWeight: '400',
  },
  staticData: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  icon: {
    paddingLeft: 8,
  },
  dateButtonText: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  dateButton: {
    paddingTop: 18,
  },
  info: {
    flexDirection: 'row',
    marginLeft: 8,
    marginTop: 40,
    marginBottom: 20,
    marginRight: 30,
    maxWidth: '80%',
  },
  subtext: {
    color: colors.darkGrey,
    marginLeft: 8,
    flexWrap: 'wrap',
  },
  datePicker: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
});
