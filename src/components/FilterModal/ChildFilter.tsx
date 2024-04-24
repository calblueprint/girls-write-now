import { CheckBox } from '@rneui/themed';
import { memo } from 'react';

type ChildFilterProps = {
  id: number;
  name: string;
  checked: boolean;
  onPress: (id: number) => void;
};

function ChildFilter({ id, name, checked, onPress }: ChildFilterProps) {
  return (
    <CheckBox
      textStyle={{ color: 'purple' }}
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

export default memo(ChildFilter);
