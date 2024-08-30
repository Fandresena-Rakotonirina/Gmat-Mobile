import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Modal, Portal, Text, Button, TextInput, Divider } from 'react-native-paper';
import { useMutation } from '@apollo/client';
import { ADD_DETAIL } from '../../GraphQL/Mutations';
import { LOAD_DETAILS } from '../../GraphQL/Queries';

const ModalAjouter = ({ visible, hideModal }) => {

    const [type, setType] = useState('');
    const [marque, setMarque] = useState('');
    const [total, setTotal] = useState('');

    const containerStyle = { backgroundColor: 'white', padding: 20, borderRadius: 20, margin: 20 };
    const handleCancel = () => {
        hideModal();
        setType("");
        setTotal("");
    };
    const [addDetail, { loading: loadingADD_DETAIL, error: errorADD_DETAIL }] =
        useMutation(ADD_DETAIL, {
            update(cache, { data }) {
                const newDetailFromResponse = data?.addDetail
                const existingDetails = cache.readQuery({ query: LOAD_DETAILS })
                cache.writeQuery({
                    query: LOAD_DETAILS,
                    data: {
                        details: [...existingDetails?.details, newDetailFromResponse]
                    }
                })
            }
        })

    const ajouterTypeMateriel = () => {
        addDetail({
            variables: {
                addDetailFields: {
                    type: type,
                    marque: marque,
                    total: parseInt(total),
                    
                }
            }
        }).then(response => {
            console.log("Réponse de la mutation :", response);
            handleCancel();  // Fermer le modal après l'ajout
        }).catch(error => {
            console.log("Erreur lors de l'ajout :", error);
        });

        if (loadingADD_DETAIL) {
            console.log("Chargement...");
        }
    };
    return (
        <Portal>
            <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                <Text style={{ fontSize: 18, marginBottom: 10, alignSelf: "center", fontWeight: "bold" }}>Nouveau type matériel :</Text>
                <TextInput
                    label="Type du matériel"
                    mode='outlined'
                    onChangeText={text => setType(text)}
                    value={type}
                    style={styles.textInput}
                    underlineColorAndroid="transparent" // Pour supprimer le fond du TextInput
                />
                <View style={styles.alignerDeuxInput}>
                    <TextInput
                        label="Marque"
                        mode='outlined'
                        onChangeText={text => setMarque(text)}
                        value={marque}
                        style={[styles.textInput, { flex: 1, marginRight: 10 }]} // flex: 1 pour occuper l'espace disponible, marginRight pour l'espace entre les deux champs
                        underlineColorAndroid="transparent"
                    />
                    <TextInput
                        label="Nombre"
                        mode='outlined'
                        onChangeText={text => setTotal(text)}
                        value={total}
                        style={[styles.textInput, { flex: 1 }]} // flex: 1 pour occuper l'espace disponible
                        underlineColorAndroid="transparent"
                        keyboardType="numeric"
                    />
                </View>
                <Divider style={styles.divider} />
                <View style={styles.buttonContainer}>
                    <Button onPress={ajouterTypeMateriel} style={styles.button}>
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
    },
    alignerDeuxInput: {
        flexDirection: "row"
    }
});