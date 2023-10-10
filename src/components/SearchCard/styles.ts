import { StyleSheet } from 'react-native';
import colors from '../../styles/colors';

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: colors.lightGrey,
    borderRadius: 4,
    marginBottom: 16,
    maxHeight: 100,
    paddingLeft: 12,
    paddingRight: 12,
  },
  image: {
    height: 76,
    width: 84,
    backgroundColor: colors.darkGrey,
    borderRadius: 4,
    marginBottom: 12,
    marginTop: 12,
  },
  author: {
    marginLeft: 8,
  },
  authorImage: {
    height: 21,
    width: 21,
    backgroundColor: colors.darkGrey,
    borderRadius: 21 / 2,
  },
  cardTextContainer: {
    flex: 1,
    overflow: 'hidden',
    marginLeft: 16,
    marginTop: 12,
    marginBottom: 12,
    maxHeight: 80,
  },
  authorContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 4,
  },
  title: {
    marginBottom: 4,
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: colors.darkGrey,
    borderRadius: 10,
    width: 'auto',
    marginRight: 8,
    marginBottom: 8,
  },
  tagsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexWrap: 'wrap',
    overflow: 'hidden',
  },
});

export default styles;
