import { Button } from 'react-native-elements';

import styles from './styles';

type StyledButtonProps = {
  disabled: boolean;
  text: string;
  onPress: () => void;
};

function StyledButton({ disabled, onPress, text }: StyledButtonProps) {
  return (
    <Button
      disabledStyle={styles.disabledStyle}
      buttonStyle={styles.buttonStyle}
      disabledTitleStyle={styles.disabledTitleStyle}
      titleStyle={styles.titleStyle}
      title={text}
      disabled={disabled}
      onPress={onPress}
    />
  );
}

export default StyledButton;
