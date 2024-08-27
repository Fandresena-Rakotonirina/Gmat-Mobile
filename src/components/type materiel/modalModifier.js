import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Modal, Portal, Text, Button, TextInput, Divider } from 'react-native-paper';

import { useQuery, useMutation } from '@apollo/client';
import { UPDATE_DETAIL } from '../../GraphQL/Mutations';
import { LOAD_DETAILS } from '../../GraphQL/Queries';
const ModalModifier = ({ visible, hideModal, selectedDetail }) => {

    const [type, setType] = useState('');
    const [marque, setMarque] = useState('');
    const [total, setTotal] = useState('');
    const [updateDetail, { loading, error }] = useMutation(UPDATE_DETAIL)

    const containerStyle = { backgroundColor: 'white', padding: 20, borderRadius: 20, margin: 20 };
    const handleCancel = () => {
        hideModal();
    };

    // Mettre à jour les valeurs de l'état lorsque selectedDetail change
    useEffect(() => {
        if (selectedDetail) {
            setType(selectedDetail.type);
            setMarque(selectedDetail.marque);
            setTotal(selectedDetail.total.toString());
        }
    }, [selectedDetail]);

    const modifierTypemateriel = () => {
        if (!selectedDetail || !selectedDetail.id) {
            console.log("Erreur : l'ID n'est pas disponible pour la modification");
            return;
        }

        updateDetail({
            variables: {
                id: selectedDetail.id,
                updateMaterielFields: { type: type, marque: marque, total: parseInt(total) }
            },
            refetchQueries: [{ query: LOAD_DETAILS }]
        }).then(response => {
            console.log("Type materiel modifier  :", response);
            hideModal();  // Fermer le modal après l'ajout
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