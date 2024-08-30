import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Modal, Portal, Text, Button, TextInput, Divider } from 'react-native-paper';
import { useQuery, useMutation } from '@apollo/client';
import { ADD_TECHNICIEN } from '../../GraphQL/Mutations';
import { LOAD_TECHNICIENS } from '../../GraphQL/Queries';

const ModalAjouter = ({ visible, hideModal }) => {

    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [contact, setContact] = useState('');

    const containerStyle = { backgroundColor: 'white', padding: 20, borderRadius: 20, margin: 20 };
    const handleCancel = () => {
        hideModal();
        setNom("");
        setPrenom("");
        setContact("");
    };
    const [
        addTechnicien,
        { loading: loadingADD_TECHNICIEN, error: errorADD_TECHNICIEN }
     ] = useMutation(ADD_TECHNICIEN)
    const AjouterMechanicien = () => {
        addTechnicien({
            variables: {
                addTechnicienFields: {
                    nom: nom,
                    prenom: prenom,
                    contact: contact,
                    
                }
            },
            refetchQueries: [{ query: LOAD_TECHNICIENS }]
        }).then(response => {
            console.log("Technicien enregistree :", response);
            handleCancel();  // Fermer le modal après l'ajout
        }).catch(error => {
            console.log("Erreur lors de l'ajout du technicien:", error);
        });

        if (loadingADD_TECHNICIEN) {
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
                    label="Contact"
                    mode='outlined'
                    onChangeText={text => setContact(text)}
                    value={contact}
                    style={styles.textInput}
                    underlineColorAndroid="transparent"
                    keyboardType="numeric"
                />
                <Divider style={styles.divider} />
                <View style={styles.buttonContainer}>
                    <Button onPress={AjouterMechanicien} style={styles.button}>
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