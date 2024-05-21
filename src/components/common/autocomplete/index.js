import React, { useState, useRef } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { TextInput, List, IconButton, Colors } from 'react-native-paper';
import styles from './styles';

const Autocomplete = ({users}) => {
   const [text, setText] = useState('');
   const [showOptions, setShowOptions] = useState(false);
   const [options, setOptions] = useState(['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry', 'Fig']);
   const inputRef = useRef(null);

   const filterOptions = (query) => {
      return options.filter(option =>
         option.toLowerCase().includes(query.toLowerCase())
      );
   };

   const handleInputChange = (query) => {
      setText(query);
      setShowOptions(true); // Afficher la liste déroulante lors de la saisie
   };

   const handleInputFocus = () => {
      setShowOptions(true); // Afficher la liste déroulante lors du focus sur l'input
   };

   const handleOptionSelect = (option) => {
      setText(option);
      setShowOptions(false); // Masquer la liste déroulante après avoir sélectionné une option
   };

   const handleCloseOptions = () => {
      setShowOptions(false); // Masquer la liste déroulante lors de la fermeture via l'icône
   };

   const renderOptions = () => {
      const filteredOptions = filterOptions(text);

      if (filteredOptions.length === 0 && text.length > 0) {
         return <Text style={styles.noDataText}>Aucune donnée dans la liste</Text>;
      }

      return (
         <ScrollView style={styles.dropdown}>
            {filteredOptions.map((option, index) => (
               <List.Item
                  key={index}
                  title={option}
                  onPress={() => handleOptionSelect(option)}
               />
            ))}
         </ScrollView>
      );
   };

   return (
      <View style={styles.container}>
         <TextInput
            mode='outlined'
            ref={inputRef}
            label="Fruit"
            value={text}
            onChangeText={handleInputChange}
            onFocus={handleInputFocus}
         />
         {showOptions && renderOptions()}
      </View>
   );
};

export default Autocomplete;
