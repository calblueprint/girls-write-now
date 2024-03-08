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
    fontFamily: 'Manrope-Regular',
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '700',
    paddingBottom: 16,
  },
  heading: {
    paddingBottom: 24,
    fontFamily: 'Manrope-Regular',
    fontSize: 24,
    fontStyle: 'normal',
    fontWeight: '700',
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
  label: {
    fontSize: 12,
    fontFamily: 'Manrope-Regular',
    fontStyle: 'normal',
    fontWeight: '400',
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
    flex: 1,
    flexDirection: 'row',
    marginTop: 12,
    marginBottom: 16,
  },
  subtext: {
    color: colors.darkGrey,
    marginLeft: 8,
  },
});
