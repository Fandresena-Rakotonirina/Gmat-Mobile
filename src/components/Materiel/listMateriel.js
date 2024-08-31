import React from 'react';
import { StyleSheet, StatusBar, Image } from 'react-native';
import { Button, Divider } from 'react-native-paper';
import { Container, Header, Content, List, ListItem, Left, Body, Right, Text, Title, View } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { useQuery } from '@apollo/client';
import { SIGNIN } from '../../constants/navigationNames';
import { LOAD_MATERIELS } from '../../GraphQL/Queries';

const ListMateriel = ({ navigation }) => {
   const { error, loading, data } = useQuery(LOAD_MATERIELS);

   return (
      <Container>
         <Header style={styles.header}>
            <StatusBar barStyle="light-content" hidden={false} color="red" backgroundColor="black" translucent={false} />
            <Left>
               <Button onPress={() => navigation.openDrawer()}>
                  <Ionicons name="menu" size={17} color="white" />
               </Button>
            </Left>
            <Body style={{ flex: 2, marginLeft: 20 }}>
               <Title style={{ fontSize: 17, textTransform: 'uppercase', marginLeft: "10" }}>Listes Matérielles</Title>
            </Body>
            <Right>
               <Button onPress={() => navigation.navigate(SIGNIN)}>
                  <View style={styles.avatarContainer}>
                     <Image
                        source={require('../../assets/images/Profile.png')}
                        style={styles.avatar}
                     />
                  </View>
               </Button>
            </Right>
         </Header>
         <Content>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>
               <Button
                  type="contained"
                  icon="download"
                  mode="contained"
                  onPress={() => console.log('Pressed PDF')}
                  style={{ backgroundColor: 'transparent' }}
                  labelStyle={{ color: 'black' }}
                  contentStyle={{ flexDirection: 'row-reverse' }}
               >
                  PDF
               </Button>
               <Button
                  type="contained"
                  icon="printer"
                  mode="contained"
                  onPress={() => console.log('Pressed Imprimer')}
                  style={{ backgroundColor: 'transparent' }}
                  labelStyle={{ color: 'black' }}
                  contentStyle={{ flexDirection: 'row-reverse' }}
               >
                  Imprimer
               </Button>
            </View>
            <Divider />
            <List style={{ marginBottom: 50 }}>
               {loading ? (
                  <Text>Loading...</Text> // Affiche un message de chargement pendant que les données sont récupérées
               ) : error ? (
                  <Text>Error: {error.message}</Text> // Affiche un message d'erreur si la requête échoue
               ) : !data || !data.materiels || data.materiels.length === 0 ? (
                  <Text>No data available</Text> // Affiche un message si aucune donnée n'est disponible
               ) : (
                  data.materiels.map(materiel => (
                     <ListItem avatar key={materiel.id} style={{ paddingLeft: 0, paddingRight: 0, marginLeft: 0 }}>
                        <Body>
                           <Text>Type : {materiel.detail.type}</Text>
                           <Text>Marque : {materiel.detail.marque}</Text>
                           <Text note>Série : {materiel.serie}</Text>
                           {materiel.user?.id ? (
                              <>
                                 <Text note>Utilisateur : {materiel.user.nom} {materiel.user.prenom}</Text>
                              </>
                           ) : materiel.technicien?.id ? (
                              <>
                                 <Text note>Mécanicien : {materiel.technicien.nom} {materiel.technicien.prenom}</Text>
                              </>
                           ) : (
                              <Text note>Status : Libre</Text>
                           )}
                        </Body>
                        <Right>
                           <Text note >
                              {materiel.user ? 'En marche' : 'En panne'}
                           </Text>
                        </Right>
                     </ListItem>
                  ))
               )}
            </List>

         </Content>
      </Container>
   );
};

export default ListMateriel;

const styles = StyleSheet.create({
   container: {
      flex: 1,
      padding: 20,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
   },
   header: {
      backgroundColor: "#4772a8",
      marginBottom: 0,
   },
   avatarContainer: {
      width: 30,
      height: 30,
      borderRadius: 15,
      overflow: 'hidden',
   },
   avatar: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover'
   },
   buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginBottom: 10,
      paddingHorizontal: 20,
   },
   pdfButton: {
      backgroundColor: '#f0ad4e',
      marginRight: 10,
   },
   printButton: {
      backgroundColor: '#5bc0de',
   },
});
