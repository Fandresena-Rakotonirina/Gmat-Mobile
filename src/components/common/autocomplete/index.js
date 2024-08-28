import React, { useState, useRef } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { TextInput, List, IconButton, Colors } from 'react-native-paper';
import styles from './styles';

const Autocomplete = ({ users, placeholder, setUserId }) => {
   const [text, setText] = useState('');
   const [showOptions, setShowOptions] = useState(false);
   const inputRef = useRef(null);

   const filterOptions = (query) => {
      return users.filter(option =>
         option.value.toLowerCase().includes(query.toLowerCase())
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
      setText(option.value);
      setUserId(option.id);  // Définit l'ID de l'utilisateur sélectionné
      setShowOptions(false);
   };

   const handleCloseOptions = () => {
      setShowOptions(false); // Masquer la liste déroulante lors de la fermeture via l'icône
   };

   const renderOptions = () => {
      const filteredOptions = filterOptions(text);

      if (filteredOptions.length === 0 && text.length > 0) {
         return <Text style={styles.noDataText}>Il n'y a pas de trace de cette recherche dans la base de données</Text>;
      }

      return (
         <ScrollView style={styles.dropdown}>
            {filteredOptions.map((option, index) => (
               <List.Item
                  key={option.id} // Assurez-vous que chaque option a une clé unique
                  title={option.value} // Affichez la valeur de l'option
                  onPress={() => handleOptionSelect(option)}
               />
            ))}
         </ScrollView>
      );
   };

   // Tester l'affichage de toutes les utilisateurs
   const renderAllOptions = () => {
      return (
         <ScrollView style={styles.dropdown}>
            {users.map((option, index) => (
               <List.Item
                  key={index}
                  title={option.value}
                  onPress={() => handleOptionSelect(option)}
               />
            ))}
         </ScrollView>
      );
   };
   return (
      <>
         <TextInput
            mode='outlined'
            ref={inputRef}
            label={placeholder}
            value={text}
            onChangeText={handleInputChange}
            onFocus={handleInputFocus}
         />
         {showOptions && renderOptions()}
      </>
   );
};

export default Autocomplete;
