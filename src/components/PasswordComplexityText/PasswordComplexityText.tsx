import { View, Text } from 'react-native';
import Icon from '../../../assets/icons';

import styles from './styles';
import globalStyles from '../../styles/globalStyles';
import colors from '../../styles/colors';

type PasswordComplexityTextProps = {
  message: string;
  condition: boolean;
};

export default function PasswordComplexityText({
  condition,
  message,
}: PasswordComplexityTextProps) {
  return (
    <View style={styles.passwordComplexity}>
      <Icon type={condition ? 'green_check' : 'grey_dot'} />
      <Text
        style={[
          globalStyles.errorMessage,
          styles.passwordErrorText,
          condition ? { color: colors.textGreen } : { color: colors.textGrey },
        ]}
      >
        {message}
      </Text>
    </View>
  );
}
