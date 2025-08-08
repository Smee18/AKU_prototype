import React from "react";
import { TextInput, StyleSheet } from "react-native";

interface InputFieldProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
}

const InputField: React.FC<InputFieldProps> = ({ placeholder, value, onChangeText }) => {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      placeholderTextColor="silver"
      returnKeyType="done"
      autoCorrect={false}
      autoCapitalize="none"
      keyboardType="numeric"
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#2F4858",
    padding: 12,
    borderRadius: 8,
    color: "black",
    marginBottom: 10, // spacing between inputs
    width: 300,
  },
});

export default InputField;
