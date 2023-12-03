import { CheckBox } from '@rneui/themed';
import { memo } from 'react';

type ParentFilterProps = {
  id: number;
  name: string;
  checked: boolean;
  onPress: (id: number) => void;
};

function ParentFilter({ id, name, checked, onPress }: ParentFilterProps) {
  return (
    <CheckBox
      key={id}
      title={name}
      checked={checked}
      onPress={() => onPress(id)}
      iconType="material-community"
      checkedIcon="checkbox-marked"
      uncheckedIcon="checkbox-blank-outline"
      checkedColor="black"
    />
  );
}

export default memo(ParentFilter);
