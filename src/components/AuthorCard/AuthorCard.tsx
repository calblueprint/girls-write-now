import { Image, Pressable, Text, View } from 'react-native';

import styles from './styles';
import globalStyles from '../../styles/globalStyles';

type AuthorCardProps = {
  name: string;
  pronouns: string;
  image: string;
  bio: string;
  artist_statement: string;
};
function AuthorCard({
  name,
  pronouns,
  image,
  bio,
  artist_statement,
}: AuthorCardProps) {
  return (
    <View style={styles.authorCardContainer}>
      <View style={styles.authorInfo}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: image }} />
        </View>
        <View style={styles.authorTextContainer}>
          <Text style={styles.name}>{name}</Text>
          <Text>{pronouns}</Text>
          <Text style={{ fontWeight: 'bold' }}>Mentee</Text>
        </View>
      </View>

      <View style={styles.bioContainer}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ flex: 1, height: 1, backgroundColor: 'lightgray' }} />
          <View style={{ flex: 1, height: 1, backgroundColor: 'lightgray' }} />
        </View>

        <Text style={styles.bioText}>{bio}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ flex: 1, height: 1, backgroundColor: 'lightgray' }} />

          <View style={{ flex: 1, height: 1, backgroundColor: 'lightgray' }} />
        </View>
      </View>

      <View>
        <Text style={styles.authorStatementContainer}>Artist's Statement</Text>
        <Text style={styles.authorStatement}>{artist_statement}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ flex: 1, height: 1, backgroundColor: 'lightgray' }} />
          <View style={{ flex: 1, height: 1, backgroundColor: 'lightgray' }} />
        </View>
      </View>

      <Text style={{ fontWeight: 'bold' }}> 1 Story</Text>
    </View>
  );
}
export default AuthorCard;
