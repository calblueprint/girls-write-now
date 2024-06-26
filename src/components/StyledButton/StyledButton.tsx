import { Button } from 'react-native-elements';

import globalStyles from '../../styles/globalStyles';
import styles from './styles';

type StyledButtonProps = {
  disabled: boolean;
  text: string;
  onPress: () => void;
};

/*
 * A pre styled button
 * Used throughout the auth flow, and on the setting screen
 */
function StyledButton({ disabled, onPress, text }: StyledButtonProps) {
  return (
    <Button
      disabledStyle={styles.disabledStyle}
      buttonStyle={styles.buttonStyle}
      disabledTitleStyle={[globalStyles.button2, styles.titleStyle]}
      titleStyle={[globalStyles.button2, styles.titleStyle]}
      title={text}
      disabled={disabled}
      onPress={onPress}
    />
  );
}

export default StyledButton;
