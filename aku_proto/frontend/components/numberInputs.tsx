import React from "react";
import { StyleSheet, TextInput, View } from "react-native";

interface InputFieldProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
}

const InputField: React.FC<InputFieldProps> = ({ placeholder, value, onChangeText}) => {
    /**
   * @remarks
   * Main code for register inputs
   * 
   * @params
   * placeholder: string: What is displayed in the box
   * value: string: the value that came out of it 
   * onChangetext: function: what happens when text is changed
   *
   * @returns Styled text field with adequate placeholder and logs register/login info to console
    */
  return (
    <View style={styles.container}>
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
        //secureTextEntry={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginBottom: 7,
    width: '50%'

  },
  input: {
    borderWidth: 1.5,
    borderColor: "#2F4858",
    padding: 10,
    borderRadius: 5,
    color: "black",
  },

});

export default InputField;