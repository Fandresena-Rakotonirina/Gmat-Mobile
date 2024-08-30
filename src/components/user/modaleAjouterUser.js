import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Modal, Portal, Text, Button, TextInput, Divider } from 'react-native-paper';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../../GraphQL/Mutations';
import { LOAD_USERS } from '../../GraphQL/Queries';

const ModalAjouter = ({ visible, hideModal }) => {

    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [fonction, setFonction] = useState('');

    const containerStyle = { backgroundColor: 'white', padding: 20, borderRadius: 20, margin: 20 };
    const handleCancel = () => {
        hideModal();
        setNom("");
        setPrenom("");
        setFonction("");
    };
    const [addUser, { loading: loadingADD_USER, error: errorADD_USER }] =
        useMutation(ADD_USER, {
            update(cache, { data }) {
                // add a new user to the existing array
                const newUserFromResponse = data?.addUser
                const existingUsers = cache.readQuery({ query: LOAD_USERS })
                cache.writeQuery({
                    query: LOAD_USERS,
                    data: {
                        users: [...existingUsers?.users, newUserFromResponse]
                    }
                })
            }
        })
    const ajouterUtilisateur = () => {
        addUser({
            variables: {
                addUserFields: {
                    nom: nom,
                    prenom: prenom,
                    fonction: fonction
                }
            }
        }).then(response => {
            console.log("Utilisateur ajoutee avec succes :", response);
            handleCancel();
        }).catch(error => {
            console.log("Erreur lors de l'ajout :", error);
        });

        if (loadingADD_USER) {
            console.log("Chargement...");
        }
    };
    return (
        <Portal>
            <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                <Text style={{ fontSize: 18, marginBottom: 10, alignSelf: "center", fontWeight: "bold" }}>Nouveau type matériel :</Text>
                <TextInput
                    label="Nom "
                    mode='outlined'
                    onChangeText={text => setNom(text)}
                    value={nom}
                    style={styles.textInput}
                    underlineColorAndroid="transparent" // Pour supprimer le fond du TextInput
                />
                <TextInput
                    label="Prénom"
                    mode='outlined'
                    onChangeText={text => setPrenom(text)}
                    value={prenom}
                    style={styles.textInput}
                    underlineColorAndroid="transparent"
                />
                <TextInput
                    label="Fonction"
                    mode='outlined'
                    onChangeText={text => setFonction(text)}
                    value={fonction}
                    style={styles.textInput}
                    underlineColorAndroid="transparent"
                />
                <Divider style={styles.divider} />
                <View style={styles.buttonContainer}>
                    <Button onPress={ajouterUtilisateur} style={styles.button}>
                        Ajouter
                    </Button>
                    <Button onPress={handleCancel} style={styles.button}>
                        Annuler
                    </Button>
                </View>
            </Modal>
        </Portal>
    );
};
export default ModalAjouter;
const styles = StyleSheet.create({
    textInput: {
        marginBottom: 20,
        backgroundColor: 'transparent',
    },
    divider: {
        marginVertical: 10,
        backgroundColor: 'gray'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    button: {
        marginLeft: 10
    }
});