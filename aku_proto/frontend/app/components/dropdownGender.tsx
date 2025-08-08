import { DropDownSelect } from 'react-native-simple-dropdown-select';
import { View } from 'react-native';
import { useState } from 'react';

type DropdownProps = {
  onValueChange: (value: string) => void;
};

export default function Dropdown({ onValueChange }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<any>(null);

  return (
    <View
      style={{
        width: 300,
      }}
    >
      <DropDownSelect
        toggle={() => setOpen(!open)}
        selectedData={value}
        open={open}
        data={[
          { id: 1, name: 'Male' },
          { id: 2, name: 'Female' },
        ]}
        onSelect={(selectedItem) => {
          setValue(selectedItem);
          setOpen(false);
          onValueChange(selectedItem.name);
        }}
        dropDownContainerStyle={{
          width: 300,
        }}
        placeholder='Select a gender'
      />
    </View>
  );
}
