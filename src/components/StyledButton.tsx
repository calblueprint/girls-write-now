import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';

import globalStyles from '../styles/globalStyles';

type StyledButtonProps = {
  disabled: boolean;
  text: string;
  onPress: () => void;
  extraStyles?: object;
};

function StyledButton({
  disabled,
  onPress,
  text,
  extraStyles = {},
}: StyledButtonProps) {
  return (
    <View style={[styles.verticallySpaced, globalStyles.mt20, extraStyles]}>
      <Button
        buttonStyle={{ backgroundColor: '#EB563B' }}
        title={text}
        disabled={disabled}
        onPress={onPress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
});

export default StyledButton;
