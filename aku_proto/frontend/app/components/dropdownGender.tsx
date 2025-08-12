import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';

type GenderOption = {
  id: number;
  name: string;
};

type DropdownProps = {
  onValueChange: (value: string) => void;
};

export default function Dropdown({ onValueChange }: DropdownProps) {
  const [, setValue] = useState<GenderOption | null>(null);
  const genderOptions: GenderOption[] = [
    { id: 1, name: 'Male' },
    { id: 2, name: 'Female' },
  ];

  return (
    <SelectDropdown
      data={genderOptions}
      onSelect={(selectedItem: GenderOption) => {
        setValue(selectedItem);
        onValueChange(selectedItem.name);
      }}
      renderButton={(selectedItem: GenderOption | null, isOpened: boolean) => (
        <View style={styles.dropdownButtonStyle}>
          <Text style={styles.dropdownButtonTxtStyle}>
            {selectedItem?.name || 'Select a gender'}
          </Text>
        </View>
      )}
      renderItem={(item: GenderOption, index: number, isSelected: boolean) => (
        <View style={[
          styles.dropdownItemStyle,
          isSelected && styles.selectedItemStyle
        ]}>
          <Text style={styles.dropdownItemTxtStyle}>{item.name}</Text>
        </View>
      )}
      dropdownStyle={styles.dropdownMenuStyle}
      dropdownOverlayColor="transparent"
    />
  );
}

const styles = StyleSheet.create({
  dropdownButtonStyle: {
    width: 300,
    height: 50,
    backgroundColor: '#E9ECEF',
    borderRadius: 8,
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  dropdownButtonTxtStyle: {
    fontSize: 16,
    color: '#000',
  },
  dropdownMenuStyle: {
    backgroundColor: '#E9ECEF',
    borderRadius: 8,
    marginTop: 8,
  },
  dropdownItemStyle: {
    width: '100%',
    paddingHorizontal: 12,
    paddingVertical: 12,
    justifyContent: 'center',
  },
  selectedItemStyle: {
    backgroundColor: '#D2D9DF',
  },
  dropdownItemTxtStyle: {
    fontSize: 16,
    color: '#000',
  },
});