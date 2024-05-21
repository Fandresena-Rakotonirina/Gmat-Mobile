import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Modal, Portal, Text, Button, Divider } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';

const ModalRendreEnMarche = ({ visible, hideModal }) => {

    const containerStyle = { backgroundColor: 'white', padding: 20, borderRadius: 20, margin: 20 };
    const handleCancel = () => {
        hideModal();
    };

    const handleOk = () => {
        hideModal();
    };
    return (
        <Portal>
            <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                {/* Ajouter l'icône et le texte */}
                <View style={styles.headerContainer}>
                    <MaterialIcons name="warning" size={30} color="orange" style={styles.icon} />
                </View>
                <Divider style={styles.divider} />
                <Text style={{ fontSize: 18, marginBottom: 10, textAlign: 'center' }}>Voulez-vous rendre en marche ce matériel ?</Text>
                <Divider style={styles.divider} />
                <View style={styles.buttonContainer}>
                    <Button onPress={handleOk} style={[styles.button, styles.okButton]}>
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
export default ModalRendreEnMarche;

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