import * as React from 'react';
import { StyleSheet, StatusBar,Image } from 'react-native';
import { Container, Header, Title, Button, Text, Tab, Tabs, TabHeading, Left,Right, Body, View } from 'native-base';
import { Ionicons} from '@expo/vector-icons';
import { TYPE_MATERIEL } from '../../constants/navigationNames';
import Tab1 from '../../components/Materiel/materielLibre';
import Tab2 from '../../components/Materiel/materielOccuper';
import Tab3 from '../../components/Materiel/materielEnPanne';

const Materiel = ({ navigation }) => {

   return (
      <View style={styles.container}>
         <Container>
            <Header style={styles.header}>
               <StatusBar barStyle="light-content" hidden={false} color="red" backgroundColor="black" translucent={false} />
               <Left>
                  <Button transparent onPress={() => navigation.openDrawer()}>
                     <Ionicons name="menu" size={17} color="white"/>
                  </Button>
               </Left>
               <Body>
                  <Title style={{ fontSize: 17, textTransform: 'uppercase' }}>Matériels</Title>   
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
            <Tabs tabBarUnderlineStyle={{ backgroundColor: '#4772a8' }}>
               <Tab
                  heading={
                     <TabHeading style={{ backgroundColor: 'rgba(255, 255, 255 ,1)' }}>
                        <Text style={{ color: '#4772a8'}}>Libre</Text>
                     </TabHeading>
                  }
               >
                  <Tab1 />
               </Tab>
               <Tab
                  heading={
                     <TabHeading style={{ backgroundColor: 'rgba(255, 255, 255 ,1)' }}>
                        <Text style={{ color: '#4772a8'}}>Occupé</Text>
                     </TabHeading>
                  }
               >
                  <Tab2 />
               </Tab>
               <Tab
                  heading={
                     <TabHeading style={{ backgroundColor: 'rgba(255, 255, 255 ,1)' }}>
                        <Text style={{ color: '#4772a8'}}>En panne</Text>
                     </TabHeading>
                  }
               >
                  <Tab3 />
               </Tab>
            </Tabs>
         </Container>
      </View>
   );
};

export default Materiel;
const styles = StyleSheet.create({
   container:{
       flex: 1,
       height:"100%",
       width:"100%"
   },
   header:{
       backgroundColor:"#4772a8",
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
    }
})
