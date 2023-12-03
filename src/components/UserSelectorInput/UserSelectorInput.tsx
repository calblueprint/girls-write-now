import { View, Text } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { Icon } from 'react-native-elements';

import styles from './styles';

type UserSelectorInputProps = {
  options: string[];
  label: string;
  placeholder: string;
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
  placeholder,
  setValue,
  value,
}: UserSelectorInputProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.outer}>
        <Dropdown
          mode="default"
          style={styles.dropdown}
          placeholderStyle={styles.textStyle}
          selectedTextStyle={styles.textStyle}
          inputSearchStyle={styles.textStyle}
          itemTextStyle={styles.textStyle}
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
          placeholder={placeholder}
          value={value}
          renderItem={(item: Option, selected: boolean | undefined) => (
            <Text style={styles.itemContainer}>{item.value}</Text>
          )}
          renderRightIcon={() => (
            <Icon name="arrow-drop-down" type="material" />
          )}
          onChange={(item: Option) => {
            setValue(item.value);
          }}
        />
      </View>
    </View>
  );
}

export default UserSelectorInput;
