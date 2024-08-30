import React, { useState } from 'react';
import { StyleSheet, Image, View, Text, StatusBar, TouchableOpacity } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import { useFocusEffect } from '@react-navigation/native';
import { HOME_NAVIGATOR } from '../../constants/navigationNames';

const Login = ({ navigation }) => {
  // États pour les valeurs des champs et les messages d'erreur
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Désactiver le swipe du drawer lorsque cet écran est en focus
  useFocusEffect(
    React.useCallback(() => {
      navigation.getParent()?.setOptions({
        swipeEnabled: false,
      });
      return () => {
        navigation.getParent()?.setOptions({
          swipeEnabled: true,
        });
      };
    }, [navigation])
  );

  // Fonction de validation
  const validate = () => {
    let isValid = true;
    if (email.trim() === '') {
      setEmailError('L\'e-mail est requis.');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (password.trim() === '') {
      setPasswordError('Le mot de passe est requis.');
      isValid = false;
    } else {
      setPasswordError('');
    }

    return isValid;
  };

  // Fonction de connexion
  const handleLogin = () => {
    if (validate()) {
      // Navigation si les validations passent
      navigation.navigate(HOME_NAVIGATOR);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" hidden={false} color="red" backgroundColor="black" translucent={false} />
      <View>
        <Animatable.Image animation="fadeInUpBig" source={require("../../assets/images/FID-LOGO.png")} style={styles.profile} />
        <Text style={styles.headerText}>Bienvenue...</Text>
        <TextInput
          mode="outlined"
          label="E-mail"
          theme={{ colors: { primary: '#4772a8' } }}
          placeholder="Enter ici votre e-mail..."
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          underlineColor='red'
          selectionColor="#000"
          error={!!emailError}
        />
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

        <TextInput
          mode="outlined"
          label="Mot de passe"
          theme={{ colors: { primary: '#4772a8', underlineColor: 'red' } }}
          placeholder="Enter ici votre mot de passe..."
          value={password}
          onChangeText={setPassword}
          underlineColor="transparent"
          selectionColor="#000"
          secureTextEntry
          right={<TextInput.Icon name="eye" />}
          error={!!passwordError}
        />
        {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

        <View style={styles.forgotPassword}>
          <TouchableOpacity>
            <Text style={styles.forgot}>Mot de passe oublié ?</Text>
          </TouchableOpacity>
        </View>
        <Button onPress={handleLogin} style={styles.button} mode="contained">
          Se Connecter
        </Button>
        <View style={styles.row}>
          <Text>Vous n'avez pas de compte ?</Text>
          <TouchableOpacity>
            <Text style={styles.link}>S'inscrire</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  headerText: {
    color: "#4772a8",
    fontSize: 25,
    textTransform: "capitalize",
    alignItems: 'center',
    alignSelf: "center",
    marginVertical: 15,
  },
  profile: {
    width: 100,
    height: 100,
    alignItems: 'center',
    alignSelf: "center",
  },
  input: {
    backgroundColor: "red",
  },
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
    marginTop: 6,
  },
  button: {
    width: '100%',
    backgroundColor: "#4772a8",
    marginVertical: 10,
    paddingVertical: 5,
    fontSize: 1,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
    alignSelf: "center",
  },
  link: {
    fontWeight: 'bold',
    color: "#4772a8",
    marginLeft: 5,
  },
  errorText: {
    color: 'red',
    marginVertical: 5,
    justifyContent:"center",
    alignItems:"center"
  },
});
