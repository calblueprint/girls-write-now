import { Dropdown, MultiSelect } from 'react-native-element-dropdown';
import globalStyles from '../../styles/globalStyles';
import styles from './styles';
import { View } from 'react-native';
import { Icon } from 'react-native-elements';

import colors from '../../styles/colors';

type FilterDropdownProps = {
  placeholder: string;
  value: string[];
  data: string[];
  selectedBorderColor?: string;
  setter: React.Dispatch<React.SetStateAction<string[]>>;
};

/*
 * Dropdown used for filtering stories
 * Will change the border color to `selectedBorderColor` if an option is selected
 * Primarily used on the search and genre screens
 */
function FilterDropdown({
  placeholder,
  value,
  data,
  setter,
  selectedBorderColor = colors.darkGrey,
}: FilterDropdownProps) {
  return (
    <MultiSelect
      mode="default"
      style={[
        styles.dropdown,
        value.length > 0 ? { borderColor: selectedBorderColor } : {},
      ]}
      value={value}
      placeholderStyle={[globalStyles.body1, styles.placeholderStyle]}
      selectedTextStyle={globalStyles.body1}
      inputSearchStyle={globalStyles.body1}
      itemTextStyle={globalStyles.body1}
      dropdownPosition="bottom"
      itemContainerStyle={styles.itemContainer}
      iconStyle={styles.iconStyle}
      data={data.map(topic => {
        return { label: topic, value: topic };
      })}
      renderSelectedItem={() => <View />}
      maxHeight={400}
      labelField="label"
      valueField="value"
      placeholder={placeholder}
      renderRightIcon={() => (
        <Icon
          color={value.length > 0 ? selectedBorderColor : colors.darkGrey}
          name="arrow-drop-down"
          type="material"
        />
      )}
      onChange={item => {
        if (item) {
          setter(item);
        }
      }}
    />
  );
}

type FilterSingleDropdownProps = {
  placeholder: string;
  value: string;
  data: string[];
  setter: React.Dispatch<React.SetStateAction<string>>;
};

function FilterSingleDropdown({
  placeholder,
  value,
  data,
  setter,
}: FilterSingleDropdownProps) {
  return (
    <Dropdown
      mode="default"
      style={styles.dropdown}
      value={value}
      placeholderStyle={[globalStyles.body1, styles.placeholderStyle]}
      selectedTextStyle={globalStyles.body1}
      inputSearchStyle={globalStyles.body1}
      itemTextStyle={globalStyles.body1}
      dropdownPosition="bottom"
      itemContainerStyle={styles.itemContainer}
      iconStyle={styles.iconStyle}
      data={data.map(topic => {
        return { label: topic, value: topic };
      })}
      maxHeight={400}
      labelField="label"
      valueField="value"
      placeholder={placeholder}
      renderRightIcon={() => (
        <Icon color={colors.darkGrey} name="arrow-drop-down" type="material" />
      )}
      onChange={item => {
        if (item) {
          setter(item.value);
        }
      }}
    />
  );
}

export { FilterDropdown, FilterSingleDropdown };
