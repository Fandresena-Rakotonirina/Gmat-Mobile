import React, { useState } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Text, Card, CardItem, Body, View, H3 } from 'native-base';
import { TextInput, PaperProvider } from 'react-native-paper';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import ModalRendreEnMarche from './modalRendreEnMarche';
import { useQuery } from '@apollo/client';
import { LOAD_MATERIELS } from '../../GraphQL/Queries';
import ListMaterielEnPanne from './listMaterielEnpanne';

const MaterielEnPanne = ({ navigation }) => {

   const { error, loading, data } = useQuery(LOAD_MATERIELS)
   const [text, setText] = React.useState("");
   const [visibleModal, setvisibleModal] = useState(false);

   const showModal = () => setvisibleModal(true);
   const hideModal = () => setvisibleModal(false);

   if (loading) return <Text>Loading...</Text>;
   if (error) {
      console.log('Error fetching data:', error);
      return <Text>Error fetching data !</Text>;
   }

   // Filtrer les résultats pour exclure les materiels où technicien.id est non nul et existe
   const filteredMateriels = data.materiels.filter(materiel => materiel.technicien && materiel.technicien.id !== null);

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
               <ListMaterielEnPanne details={filteredMateriels} showModal={showModal} />
               {/* <Card style={styles.card}>
                  <CardItem bordered>
                     <Body>
                        <Text style={styles.headerText}>ORDINATEUR</Text>
                        <Text>Marque : ASUS</Text>
                        <Text>Nombre : 1</Text>
                        <Text>Technicien : Santatriniaina Fandresena</Text>
                     </Body>
                  </CardItem>
                  <CardItem footer bordered style={styles.footer}>
                     <View>
                        <FontAwesome name="check" size={20}  onPress={showModal} />
                     </View>
                  </CardItem>
               </Card> */}
            </ScrollView>
            <ModalRendreEnMarche visible={visibleModal} hideModal={hideModal} />
         </View>
      </PaperProvider>
   );
};
export default MaterielEnPanne;

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
