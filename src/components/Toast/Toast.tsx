import Toast, {
  BaseToast,
  BaseToastProps,
  ToastConfig,
} from 'react-native-toast-message';
import colors from '../../styles/colors';
import { Icon } from 'react-native-elements';
import styles from './styles';

const toastConfig: ToastConfig = {
  success: (props: BaseToastProps) => (
    <BaseToast
      {...props}
      style={styles.toast}
      renderLeadingIcon={() => (
        <Icon
          name="check-circle"
          type="octicon"
          color={colors.lime}
          style={styles.icon}
        />
      )}
    />
  ),
};

/*
 * A component to provide a toast notification to the user.
 * User primarily in on the auth verify screen.
 */
function ToastComponent() {
  return <Toast config={toastConfig} />;
}

export default ToastComponent;
