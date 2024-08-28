import React, { useState } from 'react';
import { StyleSheet, StatusBar, Image, ScrollView, Dimensions } from 'react-native';
import { FAB, TextInput, PaperProvider, Menu, Divider } from 'react-native-paper';
import { Container, Header, Title, Button, Text, Card, CardItem, Left, Right, Body, View } from 'native-base';
import { useQuery } from '@apollo/client';
import { SIGNIN } from '../../constants/navigationNames';
import { LOAD_DETAILS } from '../../GraphQL/Queries';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { TYPE_MATERIEL } from '../../constants/navigationNames';
import ModalAjouter from '../../components/type materiel/modaleAjouter';
import ModalModifier from '../../components/type materiel/modalModifier';
import ModalSupprimer from '../../components/type materiel/modalSupprimer';
import ListTypeMateriel from '../../components/type materiel/listTypeMateriel'

const TypeMateriel = ({ navigation }) => {

   const windowWidth = Dimensions.get('window').width;

   const { error, loading, data } = useQuery(LOAD_DETAILS)
   const [visibleModalAjouter, setvisibleModalAjouter] = useState(false);
   const showModalAjouter = () => setvisibleModalAjouter(true);
   const hideModalAjouter = () => setvisibleModalAjouter(false);

   const [visibleModalModifier, setvisibleModalModifier] = useState(false);
   //const showModalModifier = () => setvisibleModalModifier(true);
   const hideModalModifier = () => setvisibleModalModifier(false);

   const [visibleModalSupprimer, setvisibleModalSupprimer] = useState(false);
   //const showModalSupprimer = () => setvisibleModalSupprimer(true);
   const hideModalSupprimer = () => setvisibleModalSupprimer(false);

   const [selectedDetail, setSelectedDetail] = useState(null);
   const [selectedId, setSelectedId] = useState(null); // Ajouter un état pour stocker l'ID sélectionné
   const [visibleMenu, setVisibleMenu] = useState({});
   const openMenu = (index) => {
      setVisibleMenu(prevState => ({ ...prevState, [index]: true }));
   };

   const closeMenu = (index) => {
      setVisibleMenu(prevState => ({ ...prevState, [index]: false }));
   };
   const handleModifierPress = (index) => {
      setSelectedDetail(data.details[index]); // Récupère le détail correspondant à l'index
      setvisibleModalModifier(true); // Ouvre la modale de modification
      closeMenu(index); // Ferme le menu
   };
   const handleSupprimerPress = (index) => {
      const selectedId = data.details[index].id; // Récupérer l'ID du matériel à partir de l'index
      setSelectedId(selectedId); // Stocker l'ID dans l'état
      setvisibleModalSupprimer(true); // Afficher le modal
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
                     <Title style={{ fontSize: 17, textTransform: 'uppercase' }}>Type matériels</Title>
                  </Body>
                  <Right>
                     <Button transparent onPress={() => navigation.navigate(SIGNIN)}>
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
                  label="Rechercher type matériel ici..."
                  value={""}
                  onChangeText={""}
               />
               <View style={styles.content}>
                  <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
                     {loading ? (
                        <Text>Loading...</Text>
                     ) : error ? (
                        <Text>Error fetching data !</Text>
                     ) : (
                        <ListTypeMateriel details={data.details} renderMenu={renderMenu} />
                     )}
                  </ScrollView>
               </View>
               <ModalAjouter visible={visibleModalAjouter} hideModal={hideModalAjouter} />
               <ModalModifier visible={visibleModalModifier} hideModal={hideModalModifier} selectedDetail={selectedDetail} />
               <ModalSupprimer visible={visibleModalSupprimer} hideModal={hideModalSupprimer} id={selectedId} />

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

export default TypeMateriel;
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
