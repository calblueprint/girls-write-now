import { StyleSheet } from 'react-native';

import colors from '../../../styles/colors';

export default StyleSheet.create({
  selectors: {
    flex: 1,
    gap: 16,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 24,
    paddingBottom: 60,
  },
  button: {
    marginBottom: 32,
  },
  main: {
    paddingLeft: 12,
    width: '100%',
    justifyContent: 'space-between',
    flexGrow: 1,
  },
  subheading: {
    paddingBottom: 16,
  },
  heading: {
    paddingBottom: 20,
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
});
