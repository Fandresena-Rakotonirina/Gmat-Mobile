import React from 'react';
import { StyleSheet, StatusBar, Image } from 'react-native';
import { Button, Divider } from 'react-native-paper';
import { Container, Header, Content, List, ListItem, Left, Body, Right, Text, Title, View } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { useQuery } from '@apollo/client';
import { SIGNIN } from '../../constants/navigationNames';
import { LOAD_USERS } from '../../GraphQL/Queries';

const ListeUtilisateur = ({ navigation }) => {
   const { error, loading, data } = useQuery(LOAD_USERS);

   if (loading) {
      return <Text>Loading...</Text>; // Affiche un message de chargement pendant que les données sont récupérées
   }

   if (error) {
      return <Text>Error: {error.message}</Text>; // Affiche un message d'erreur si la requête échoue
   }

   if (!data || !data.users) {
      return <Text>No data available</Text>; // Affiche un message si aucune donnée n'est disponible
   }

   return (
      <Container>
         <Header style={styles.header}>
            <StatusBar barStyle="light-content" hidden={false} color="red" backgroundColor="black" translucent={false} />
            <Left>
               <Button onPress={() => navigation.openDrawer()}>
                  <Ionicons name="menu" size={17} color="white" />
               </Button>
            </Left>
            <Body style={{ flex: 2 ,marginLeft:20}}>
               <Title style={{ fontSize: 17, textTransform: 'uppercase' }}>Listes utilisateurs</Title>
            </Body>
            <Right>
               <Button  onPress={() => navigation.navigate(SIGNIN)}>
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
               {data.users.map(user => (
                  <ListItem avatar key={user.id} style={{ paddingLeft: 0, paddingRight: 0, marginLeft: 0 }}>
                     <Body>
                        <Text>Nom : {user.nom}</Text>
                        <Text>Prenom : {user.prenom}</Text>
                        <Text note>Fonction : {user.fonction}</Text>
                        <Text note>Email : {user.email}</Text>
                     </Body>
                  </ListItem>
               ))}
            </List>
         </Content>
      </Container>
   );
};

export default ListeUtilisateur;

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
