import * as React from 'react';
import { StyleSheet, Image, View, Text, StatusBar, TouchableOpacity, ScrollView } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { HOME_NAVIGATOR } from '../../constants/navigationNames';
import * as Animatable from 'react-native-animatable';

const Login = ({ navigation }) => {
   
   return (
      
      <View style={styles.container}>
         <StatusBar barStyle="light-content" hidden={false} color="red" backgroundColor="black" translucent={false} />
         <View >
            <Animatable.Image animation="fadeInUpBig" source={require("../../assets/images/FID-LOGO.png")} style={styles.profile} />
            <Text style={styles.headerText}>Bienvenue...</Text>
            <TextInput
               mode="outlined"
               label="E-mail"
               theme={{ colors: { primary: '#4772a8' } }}
               placeholder="Enter ici votre e-mail..."
               onChangeText={""}
               keyboardType="email-address"
               underlineColor='red'
               selectionColor="#000"
               value={""}
            />
            <TextInput
               mode="outlined"
               label="Mot de passe"
               theme={{ colors: { primary: '#4772a8', underlineColor: 'red' } }}
               placeholder="Enter ici votre mot de passe..."
               onChangeText={""}
               underlineColor="transparent"
               selectionColor="#000"
               password={true}
               right={<TextInput.Icon name="eye" />}
               value={""}
               secureTextEntry
            />
            <View style={styles.forgotPassword}>
               <TouchableOpacity>
                  <Text style={styles.forgot}>Mot de passe oublié ?</Text>
               </TouchableOpacity>
            </View>
            <Button onPress={() => navigation.navigate(HOME_NAVIGATOR)} style={styles.button} mode="contained" >
               Se Connecter
            </Button>
            <View style={styles.row}>
               <Text>Vous n'avez pas de compte ?</Text>
               <TouchableOpacity >
                  <Text style={styles.link}>S'inscrire</Text>
               </TouchableOpacity>
            </View>
         </View>
      </View>
   );
};

export default Login;
const styles = StyleSheet.create({
   container:{
       flex: 1,
       padding: 20,
       width: '100%',
       alignSelf: 'center',
       justifyContent: 'center',
   },
   headerText:{
       color:"#4772a8",
       fontSize:25,
       textTransform:"capitalize",
       alignItems: 'center',
       alignSelf:"center",
       marginVertical:15
   },
   profile:{
       width:100,  
       height:100,
       alignItems: 'center',
       alignSelf:"center"
   },
   input: {
     backgroundColor: "red"
   },
   forgotPassword: {
       width: '100%',
       alignItems: 'flex-end',
       marginBottom: 24,
       marginTop:6
    },
     button: {
       width: '100%',
       backgroundColor:"#4772a8",
       marginVertical: 10,
       paddingVertical: 5,
       fontSize:1
     },
   row: {
       flexDirection: 'row',
       marginTop: 4,
       alignSelf:"center"
   },
   link: {
       fontWeight: 'bold',
       color: "#4772a8",
       marginLeft:5
   } 
})