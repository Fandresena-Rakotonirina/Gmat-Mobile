import React, { useState } from 'react';
import { StyleSheet, ScrollView, Alert } from 'react-native';
import { Text, View } from 'native-base';
import { TextInput,PaperProvider } from 'react-native-paper';
import { useQuery } from '@apollo/client'
import { LOAD_MATERIELS } from '../../GraphQL/Queries'
import ListMaterielOccuper from './listMaterielOccuper';

const MaterielOccuper = () => {

   const { error, loading, data } = useQuery(LOAD_MATERIELS)
   const [text, setText] = React.useState("");

   if (loading) return <Text>Loading...</Text>;
   if (error) {
      console.log('Error fetching data:', error);
      return <Text>Error fetching data !</Text>;
   }

   // Filtrer les résultats pour exclure les materiels où user.id est non nul et existe
  const filteredMateriels = data.materiels.filter(materiel => materiel.user && materiel.user.id !== null);

   return (
      <PaperProvider>
         <View style={styles.container}>
            <TextInput
               style={styles.input}
               mode="flat"
               theme={{ colors: { primary: '#4772a8' } }}
               label="Recherche..."
               value={text}
               onChangeText={setText}
            />
            <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
               <ListMaterielOccuper details={filteredMateriels} />
            </ScrollView>
         </View>
      </PaperProvider>

   );
};

export default MaterielOccuper;
const styles = StyleSheet.create({
   container: {
      flex: 1,
      padding: 15,
      height: "100%",
      width: "100%"
   },
   input: {
      marginBottom: 15,
      backgroundColor: '#f0f4fa',
   },
   card: {
      borderRadius: 15,
      marginBottom: 20,
   },
   headerText: {
      fontSize: 20,
      fontWeight: 'bold',
   },
   footer: {
      flexDirection: 'row',
      justifyContent: 'center', // Pour centrer horizontalement
      alignItems: 'center', // Pour centrer verticalement
   }
});
