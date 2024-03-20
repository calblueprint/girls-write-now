import { View, ScrollView } from 'react-native';
import PreviewCard from '../../../../components/PreviewCard/PreviewCard';
import { router } from 'expo-router';
import styles from './styles';

export default function ReadingList() {
  return (
    <View style={styles.container}>
      <PreviewCard
        key={'aaa'}
        title={'aaa'}
        image={'aaa'}
        author={'aaa'}
        authorImage={'aaa'}
        excerpt={{ html: 'aaa' }}
        tags={['aaa']}
        pressFunction={() =>
          router.push({
            pathname: '/story',
            params: { storyId: 'aaa' },
          })
        }
      ></PreviewCard>
      <PreviewCard
        key={'aaa'}
        title={'aaa'}
        image={'aaa'}
        author={'aaa'}
        authorImage={'aaa'}
        excerpt={{ html: 'aaa' }}
        tags={['aaa']}
        pressFunction={() =>
          router.push({
            pathname: '/story',
            params: { storyId: 'aaa' },
          })
        }
      ></PreviewCard>
    </View>
  );
}
