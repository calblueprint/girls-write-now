import { StyleSheet } from 'react-native';

import colors from '../../../styles/colors';

const styles = StyleSheet.create({
  textSelected: {
    color: '#EB563B',
    textDecorationLine: 'underline',
  },
  container: {
    paddingHorizontal: 24,
    width: '100%',
    marginTop: 24,
    flex: 1,
  },

  flatListStyle: {
    paddingTop: 15,
  },
  scrollViewContainer: {
    marginVertical: 15,
    width: '100%',
  },
  noStoriesText: {
    fontSize: 20,
    color: '#EB563B',
  },
  noStoriesText2: {
    fontSize: 13,
  },
  renderStories: {
    paddingBottom: 10,
    flex: 1,
  },
  headerContainer: {},
  dropdown: {
    borderColor: '#797979',
    flexGrow: 0,
    flexShrink: 0,
    borderWidth: 1.5,
    borderRadius: 7,
    width: 140,
    height: 30,
    color: '#797979',
  },
  dropdownContainer: {
    marginTop: 20,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  firstDropdown: {
    marginRight: 10,
  },
  secondDropdown: {
    marginLeft: 10,
  },
  icon: {
    marginRight: 5,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  itemContainer: {},
  placeholderStyle: {
    color: colors.darkGrey,
    marginLeft: 45,
  },
});

export default styles;
