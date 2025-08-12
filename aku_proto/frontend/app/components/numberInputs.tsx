import React from "react";
import { TextInput, StyleSheet, View, Text } from "react-native";

interface InputFieldProps {
  head?: string
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
}

const InputField: React.FC<InputFieldProps> = ({ head, placeholder, value, onChangeText }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.head}>{head}</Text>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center', // Center horizontally
  },
  input: {
    borderWidth: 1,
    borderColor: "#2F4858",
    padding: 12,
    borderRadius: 8,
    color: "black",
    width: 300, // Fixed width for consistent sizing
  },

  head: {
    marginRight: 'auto',
    marginLeft: 30,
    marginBottom: 10,
    fontWeight: 'bold',
  }
});

export default InputField;