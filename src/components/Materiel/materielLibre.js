import React, { useState } from 'react';
import { StyleSheet, ScrollView, Dimensions } from 'react-native';
import { useQuery } from '@apollo/client'
import { Card, CardItem, Text, Body, View } from 'native-base';
import { TextInput, PaperProvider } from 'react-native-paper';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { LOAD_DETAILS } from '../../GraphQL/Queries'
import CardMateriel from './cardMateriel';


const MaterielLibre = () => {
   const { error, loading, data } = useQuery(LOAD_DETAILS);

   const [text, setText] = React.useState("");
   if (loading) return <Text>Loading...</Text>;
   if (error) {
      console.log('Error fetching data:', error);
      return <Text>Error fetching data !</Text>;
   }
   
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
               <CardMateriel details={data.details}/>
            </ScrollView>
           
         </View>
      </PaperProvider>
   );
};

export default MaterielLibre;
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
      justifyContent: 'center',
   },
   buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
   }
});