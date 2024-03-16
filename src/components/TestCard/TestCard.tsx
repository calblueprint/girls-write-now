import {
  GestureResponderEvent,
  TextInput,
  Pressable,
  Text,
  View,
} from 'react-native';

import styles from './styles';
import globalStyles from '../../styles/globalStyles';
import {
  addUserStoryToFavorites,
  addUserStoryToReadingList,
  fetchUserStoriesFavorites,
  fetchUserStoriesReadingList,
} from '../../queries/savedStories';
import { useState } from 'react';
import { useSession } from '../../utils/AuthContext';
import { Button } from 'react-native-paper';

function TestCard() {
  const { user } = useSession();
  const [storyId, setStoryId] = useState('');

  return (
    <Pressable>
      <View style={styles.contentCard}>
        <View style={styles.textContainer}>
          <TextInput onChangeText={t => setStoryId(t)} value={storyId} />
          <Text
            style={globalStyles.body1}
            onPress={async () =>
              await addUserStoryToReadingList(user?.id, parseInt(storyId))
            }
          >
            Add story to reading
          </Text>
          <Text
            style={globalStyles.body1}
            onPress={async () =>
              await addUserStoryToFavorites(user?.id, parseInt(storyId))
            }
          >
            Add story to favs list
          </Text>
          <Button
            onPress={async () =>
              console.log(await fetchUserStoriesFavorites(user?.id))
            }
          >
            log favs
          </Button>
          <Button
            onPress={async () =>
              console.log(await fetchUserStoriesReadingList(user?.id))
            }
          >
            log reading
          </Button>
        </View>
      </View>
    </Pressable>
  );
}

export default TestCard;
