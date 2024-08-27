import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Modal, Portal, Text, Button, Divider } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';

import { useQuery, useMutation } from '@apollo/client';
import { DELETE_DETAIL } from '../../GraphQL/Mutations';
import { LOAD_DETAILS } from '../../GraphQL/Queries';
const ModalSupprimer = ({ visible, hideModal,id }) => {

    const containerStyle = { backgroundColor: 'white', padding: 20, borderRadius: 20, margin: 20 };
    const [deleteDetail, { loading, error }] = useMutation(DELETE_DETAIL)

    const handleCancel = () => {
        hideModal();
    };

    const suprimerTypeMateriel = () => {
        if (!id) {
            console.log("Erreur : l'ID n'est pas disponible pour la suppression");
            return;
        }
        deleteDetail({
            variables: { id: id }, // Utilisation de l'ID pour la suppression
            refetchQueries: [{ query: LOAD_DETAILS }],
        }).then(response => {
            console.log("Réponse de la suppression :", response);
            hideModal();  // Fermer le modal après la suppression
        }).catch(error => {
            console.log("Erreur lors de la suppression :", error);
        });
    };
    return (
        <Portal>
            <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                {/* Ajouter l'icône et le texte */}
                <View style={styles.headerContainer}>
                    <MaterialIcons name="warning" size={40} color="red" style={styles.icon} />
                </View>
                <Divider style={styles.divider} />
                <Text style={{ fontSize: 18, marginBottom: 10, textAlign: 'center' }}>Voulez-vous vraiment supprimer ce  type matériel ?</Text>
                <Divider style={styles.divider} />
                <View style={styles.buttonContainer}>
                    <Button onPress={suprimerTypeMateriel} style={[styles.button, styles.okButton]}>
                        Oui
                    </Button>
                    <Button onPress={handleCancel} style={[styles.button, styles.cancelButton]}>
                        Non
                    </Button>
                </View>
            </Modal>
        </Portal>
    );
};
export default ModalSupprimer;

const styles = StyleSheet.create({
    headerContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    divider: {
        marginVertical: 10,
        backgroundColor: 'gray',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between', // Pour centrer les boutons à gauche et à droite
    },
    button: {
        flex: 1, // Pour que les boutons prennent le même espace
    },
    okButton: {
        marginRight: 5, // Marge à droite pour "Ok" (peut être ajusté selon le style souhaité)
    },
    cancelButton: {
        marginLeft: 5, // Marge à gauche pour "Annuler" (peut être ajusté selon le style souhaité)
    },
}); 