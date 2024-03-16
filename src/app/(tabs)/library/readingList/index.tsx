import { View, ScrollView } from 'react-native';
import PreviewCard from '../../../../components/PreviewCard/PreviewCard';
import { router } from 'expo-router';

export default function ReadingList() {
  return (
    <View style={{ marginRight: 24, width: '100%' }}>
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
