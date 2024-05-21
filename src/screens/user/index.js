import React, { useState } from 'react';
import { StyleSheet, StatusBar, Image, ScrollView, Dimensions } from 'react-native';
import { FAB, TextInput, PaperProvider, Menu, Divider } from 'react-native-paper';
import { Container, Header, Title, Button, Text, Card, CardItem, Left, Right, Body, View } from 'native-base';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { TYPE_MATERIEL } from '../../constants/navigationNames';
import ModalAjouter from '../../components/user/modaleAjouterUser';
import ModalModifier from '../../components/user/modalModifierUser';
import ModalSupprimer from '../../components/user/modalSupprimerUser';

const User = ({ navigation }) => {

   const windowWidth = Dimensions.get('window').width;

   const [visibleModalAjouter, setvisibleModalAjouter] = useState(false);
   const showModalAjouter = () => setvisibleModalAjouter(true);
   const hideModalAjouter = () => setvisibleModalAjouter(false);

   const [visibleModalModifier, setvisibleModalModifier] = useState(false);
   //const showModalModifier = () => setvisibleModalModifier(true);
   const hideModalModifier = () => setvisibleModalModifier(false);

   const [visibleModalSupprimer, setvisibleModalSupprimer] = useState(false);
   //const showModalSupprimer = () => setvisibleModalSupprimer(true);
   const hideModalSupprimer = () => setvisibleModalSupprimer(false);


   const [visibleMenu, setVisibleMenu] = useState({});
   const openMenu = (index) => {
      setVisibleMenu(prevState => ({ ...prevState, [index]: true }));
   };

   const closeMenu = (index) => {
      setVisibleMenu(prevState => ({ ...prevState, [index]: false }));
   };
   const handleModifierPress = (index) => {
      setvisibleModalModifier(true)
      closeMenu(index); // Fermer le menu
   };
   const handleSupprimerPress = (index) => {
      setvisibleModalSupprimer(true)
      closeMenu(index); // Fermer le menu
   };

   const renderMenu = (index) => (
      <Menu
         visible={visibleMenu[index]}
         onDismiss={() => closeMenu(index)}
         anchor={<MaterialIcons name="more-vert" size={24} color="black" onPress={() => openMenu(index)} />}
      >
         <Menu.Item onPress={() => handleModifierPress(index)} title="Modifier" />
         <Divider />
         <Menu.Item onPress={() => handleSupprimerPress(index)} title="Supprimer" />
         <Divider />
         <Menu.Item onPress={() => console.log('Voir materiels')} title="Voir materiels" />
      </Menu>
   );

   return (
      <PaperProvider>
         <View style={styles.container}>
            <Container>
               <Header style={styles.header}>
                  <StatusBar barStyle="light-content" hidden={false} color="red" backgroundColor="black" translucent={false} />
                  <Left>
                     <Button transparent onPress={() => navigation.openDrawer()}>
                        <Ionicons name="menu" size={17} color="white" />
                     </Button>
                  </Left>
                  <Body>
                     <Title style={{ fontSize: 17, textTransform: 'uppercase' }}>Utisateur</Title>
                  </Body>
                  <Right>
                     <Button transparent onPress={() => navigation.navigate(TYPE_MATERIEL)}>
                        <View style={styles.avatarContainer}>
                           <Image
                              source={require('../../assets/images/Profile.png')}
                              style={styles.avatar}
                           />
                        </View>
                     </Button>
                  </Right>
               </Header>
               <TextInput
                  style={styles.input}
                  mode="flat"
                  theme={{ colors: { primary: '#4772a8' } }}
                  label="Rechercher utilisateur ici..."
                  value={""}
                  onChangeText={""}
               />
               <View style={styles.content}>
                  <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
                     <Card style={styles.card}>
                        <CardItem bordered>
                           <Body>
                              <Text>SANTATRINIAINA</Text>
                              <Text>Fandresena</Text>
                              <Text style={{color:"#fb5a77"}}>Charge de projet</Text>
                              <Text>Nombre de matériel a utilisé: 1</Text>
                           </Body>
                           <Right style={{ position: 'absolute', top: 10, right: 5, zIndex: 999 }}>
                              {renderMenu(0)}
                           </Right>
                        </CardItem>
                     </Card>
                     <Card style={styles.card}>
                        <CardItem bordered>
                           <Body>
                              <Text>ALPHONSO</Text>
                              <Text>Davies</Text>
                              <Text style={{color:"#fb5a77"}}>AS</Text>
                              <Text>Nombre de materiel a utilisaer: 1</Text>
                           </Body>
                           <Right style={{ position: 'absolute', top: 10, right: 5, zIndex: 999 }}>
                              {renderMenu(1)}
                           </Right>
                        </CardItem>
                     </Card>
                  </ScrollView>
               </View>
               <ModalAjouter visible={visibleModalAjouter} hideModal={hideModalAjouter} />
               <ModalModifier visible={visibleModalModifier} hideModal={hideModalModifier} />
               <ModalSupprimer visible={visibleModalSupprimer} hideModal={hideModalSupprimer} />

               <FAB
                  style={styles.fab}
                  small
                  icon="plus"
                  onPress={showModalAjouter}
                  color="#fff"
                  backgroundColor="#4772a8"
               />
            </Container>
         </View>
      </PaperProvider>
   );
};

export default User;
const styles = StyleSheet.create({
   container: {
      flex: 1,
      height: "100%",
      width: "100%"
   },
   input: {
      margin: 10,
      backgroundColor: '#f0f4fa',
   },
   content: {
      flex: 1, // Pour que le contenu occupe tout l'espace disponible
      padding: 10, // Espacement intérieur pour le contenu
   },
   header: {
      backgroundColor: "#4772a8",
      marginBottom: 0
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
   headerText: {
      fontSize: 16,
      fontWeight: 'bold',
   },
   fab: {
      position: 'absolute',
      margin: 20,
      right: 0,
      bottom: 0,

   }
})

