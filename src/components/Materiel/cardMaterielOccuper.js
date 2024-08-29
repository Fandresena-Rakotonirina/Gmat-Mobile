import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Text, Card, CardItem, Body } from 'native-base';
import { Modal, Portal, Button, Divider } from 'react-native-paper';
import { useMutation } from '@apollo/client';
import { DELETE_MATERIEL } from '../../GraphQL/Mutations';
import { LOAD_MATERIELS, LOAD_USERS,LOAD_DETAILS } from '../../GraphQL/Queries';

const CardMaterielOccuper = ({ detail }) => {
    const [visibleModal, setVisibleModal] = useState(false);
    const [deleteMateriel] = useMutation(DELETE_MATERIEL);

    const showModal = () => setVisibleModal(true);
    const hideModal = () => setVisibleModal(false);

    const rendrelibreMateriel = () => {
        
        if (!detail.id) {
            console.log("Erreur : l'ID n'est pas disponible pour la suppression");
            return;
        }
        deleteMateriel({
            variables: { id: detail.id },
            refetchQueries: [{ query: LOAD_MATERIELS }, { query: LOAD_USERS }, { query: LOAD_DETAILS }],
        })
            .then(response => {
                console.log("Réponse de la suppression :", response);
                hideModal();
            })
            .catch(error => {
                console.log("Erreur lors de la suppression :", error);
            });
    };

    return (
        <>
            <Card style={styles.card}>
                <CardItem bordered>
                    <Body>
                        <Text style={styles.headerText}>{detail.detail.type} ({detail.detail.marque})</Text>
                        <Text>Série : {detail.serie}</Text>
                        <Text>Nombre : 1</Text>
                        <Text>Utilisateur : {detail.user.nom} {detail.user.prenom}</Text>
                    </Body>
                </CardItem>
                <CardItem footer bordered style={styles.footer}>
                    <View>
                        <MaterialIcons name="person-add-disabled" size={20} onPress={showModal} />
                    </View>
                </CardItem>
            </Card>

            {/* Modal intégré directement dans le composant */}
            <Portal>
                <Modal visible={visibleModal} onDismiss={hideModal} contentContainerStyle={styles.modalContainer}>
                    <View style={styles.headerContainer}>
                        <MaterialIcons name="warning" size={30} color="orange" style={styles.icon} />
                    </View>
                    <Divider style={styles.divider} />
                    <Text style={{ fontSize: 18, marginBottom: 10, textAlign: 'center' }}>
                        Voulez-vous rendre libre ce matériel ?
                    </Text>
                    <Divider style={styles.divider} />
                    <View style={styles.buttonContainer}>
                        <Button onPress={rendrelibreMateriel} style={[styles.button, styles.okButton]}>
                            Oui
                        </Button>
                        <Button onPress={hideModal} style={[styles.button, styles.cancelButton]}>
                            Non
                        </Button>
                    </View>
                </Modal>
            </Portal>
        </>
    );
};

export default CardMaterielOccuper;

const styles = StyleSheet.create({
    card: {
        borderRadius: 15,
        marginBottom: 20,
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 20,
        margin: 20,
    },
    headerContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    divider: {
        marginVertical: 10,
        backgroundColor: 'gray',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        flex: 1,
    },
    okButton: {
        marginRight: 5,
    },
    cancelButton: {
        marginLeft: 5,
    },
});
