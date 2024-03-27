import { View, Text } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { Icon } from 'react-native-elements';

import styles from './styles';
import globalStyles from '../../styles/globalStyles';

type UserSelectorInputProps = {
  options: string[];
  label: string;
  setValue: (value: string) => any;
  value: string;
};

type Option = {
  label: string;
  value: string;
};

function UserSelectorInput({
  options,
  label,
  setValue,
  value,
}: UserSelectorInputProps) {
  return (
    <View>
      <Text style={[globalStyles.subtext, styles.label]}>{label}</Text>
      <Dropdown
        mode="default"
        style={styles.dropdown}
        placeholderStyle={[globalStyles.body1, styles.grey]}
        selectedTextStyle={globalStyles.body1}
        inputSearchStyle={globalStyles.body1}
        itemTextStyle={globalStyles.body1}
        containerStyle={styles.dropdownContainer}
        dropdownPosition="bottom"
        itemContainerStyle={styles.itemContainer}
        iconStyle={styles.iconStyle}
        data={options.map(option => {
          return { label: option, value: option };
        })}
        maxHeight={400}
        labelField="label"
        valueField="value"
        placeholder="Select Option"
        value={value}
        renderItem={(item: Option, selected: boolean | undefined) => (
          <Text style={[globalStyles.body1, styles.itemContainer]}>
            {item.value}
          </Text>
        )}
        renderRightIcon={() => <Icon name="arrow-drop-down" type="material" />}
        onChange={(item: Option) => {
          setValue(item.value);
        }}
      />
    </View>
  );
}

export default UserSelectorInput;
