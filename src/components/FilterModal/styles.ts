import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  modalBackground: {
    backgroundColor: 'rgba(0, 0, 0, 0.0)',
  },
  modalContainer: {
    backgroundColor: 'white',
    height: 500,
  },
  textContainer: {
    marginRight: 32,
    marginLeft: 32,
    marginTop: 16,
  },
  closeContainer: {
    display: 'flex',
    alignItems: 'flex-end',
    marginRight: 12,
    marginTop: 12,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'left',
    color: 'black',
    paddingBottom: 24,
  },
  scrollView: {
    // marginHorizontal: 20,
  },
  filterText: {
    fontSize: 24,
  },
  subfilterText: {},
});

export default styles;
