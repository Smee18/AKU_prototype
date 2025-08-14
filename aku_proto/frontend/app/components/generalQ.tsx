import React, { useMemo, useState, useEffect } from "react";
import { Text, StyleSheet, View } from "react-native";
import RadioGroup from "react-native-radio-buttons-group";

interface Option {
  id: string;
  label: string;
  value: string; 
}

interface GeneralQProps {
  question: string;
  onSelect: (value: string) => void;
  options: Option[];
}

const GeneralQ: React.FC<GeneralQProps> = ({ question, onSelect, options }) => {
  const radioButtons = useMemo(
    () =>
      options.map((option) => ({
        id: option.id,
        label: option.label,
        value: option.value,
        labelStyle: { color: "#333", fontSize: 16 },
      })),
    [options]
  );

  const [selectedId, setSelectedId] = useState<string>('1');

  useEffect(() => {
    onSelect('1');
  }, [onSelect]);

    
  const handleSelection = (id: string) => { 
      setSelectedId(id); 
      const selectedOption = radioButtons.find(button => button.id === id); 
      if (selectedOption) { 
        onSelect(selectedOption.value); 
      }
  };

  return (
    <View style={styles.card}>
      <Text style={styles.questionText}>{question}</Text>
      <RadioGroup
        radioButtons={radioButtons}
        onPress={handleSelection}
        selectedId={selectedId}
        layout="row"
        containerStyle={styles.radioGroup}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 10,
    marginHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: 300,
    marginTop: 40,
  },
  questionText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#333",
    marginBottom: 15,
    textAlign: "center",
  },
  radioGroup: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: 10,
  },
});

export default GeneralQ;
