import React, { useState,useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Modal, Portal, Text, Button, TextInput, Divider } from 'react-native-paper';

import { useQuery, useMutation } from '@apollo/client';
import { UPDATE_TECHNICIEN } from '../../GraphQL/Mutations';
import { LOAD_TECHNICIENS } from '../../GraphQL/Queries';
const ModalModifier = ({ visible, hideModal,selectedTechnicien }) => {

    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [contact, setContact] = useState('');
    const [updateTechnicien, { loading, error }] = useMutation(UPDATE_TECHNICIEN)

    const containerStyle = { backgroundColor: 'white', padding: 20, borderRadius: 20, margin: 20 };
    const handleCancel = () => {
        hideModal();
    };
    // Mettre à jour les valeurs de l'état lorsque selectedDetail change
    useEffect(() => {
        if (selectedTechnicien) {
            setNom(selectedTechnicien.nom);
            setPrenom(selectedTechnicien.prenom);
            setContact(selectedTechnicien.contact);
        }
    }, [selectedTechnicien]);
    const modifierTypemateriel = () => {
        if (!selectedTechnicien || !selectedTechnicien.id) {
            console.log("Erreur : l'ID n'est pas disponible pour la modification");
            return;
        }

        updateTechnicien({
            variables: {
                id: selectedTechnicien.id,
                updateTechnicienFields: { nom: nom, prenom: prenom, contact: contact }
            },
            refetchQueries: [{ query: LOAD_TECHNICIENS }]
        }).then(response => {
            console.log("Technicien modifie ", response);
            handleCancel();  // Fermer le modal après l'ajout
        }).catch(error => {
            console.log("Erreur lors de l'ajout :", error);
        });
        
        if (loading) {
            console.log("Chargement...");
        }
    };
    return (
        <Portal>
            <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                <Text style={{ fontSize: 18, marginBottom: 10, alignSelf: "center", fontWeight: "bold" }}>Modifier utilisateur :</Text>
                <TextInput
                    label="Nom "
                    mode='outlined'
                    onChangeText={text => setNom(text)}
                    value={nom}
                    style={styles.textInput}
                    underlineColorAndroid="transparent" // Pour supprimer le fond du TextInput
                />
                <TextInput
                    label="Prénom "
                    mode='outlined'
                    onChangeText={text => setPrenom(text)}
                    value={prenom}
                    style={styles.textInput}
                    underlineColorAndroid="transparent" // Pour supprimer le fond du TextInput
                />
                <View style={styles.alignerDeuxInput}>
                    <TextInput
                        label="Contact"
                        mode='outlined'
                        onChangeText={text => setContact(text)}
                        value={contact}
                        style={[styles.textInput, { flex: 1, marginRight: 10 }]} // flex: 1 pour occuper l'espace disponible, marginRight pour l'espace entre les deux champs
                        underlineColorAndroid="transparent"
                        keyboardType="numeric"
                    />
                </View>
                <Divider style={styles.divider} />
                <View style={styles.buttonContainer}>
                    <Button onPress={modifierTypemateriel} style={styles.button}>
                        Modifier
                    </Button>
                    <Button onPress={handleCancel} style={styles.button}>
                        Annuler
                    </Button>
                </View>
            </Modal>
        </Portal>
    );
};
export default ModalModifier;
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
    },
    alignerDeuxInput: {
        flexDirection: "row"
    }
});