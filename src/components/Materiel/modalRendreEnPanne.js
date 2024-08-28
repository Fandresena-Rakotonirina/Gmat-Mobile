import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Modal, Portal, Text, Button, TextInput, Divider } from 'react-native-paper';
import { createOptionsTechnicien } from '../../utils';
import Autocomplete from '../common/autocomplete';
import { ADD_MATERIEL } from '../../GraphQL/Mutations'
import { useMutation, useQuery } from '@apollo/client'
import { LOAD_MATERIELS, LOAD_TECHNICIENS } from '../../GraphQL/Queries'


const ModalRendreEnPanne = ({ visible, hideModal, detailId }) => {

    const [serie, setSerie] = React.useState('');
    const [technicienId, setTechnicienId] = useState(null);  // Stocke l'ID du technicien sélectionné    
    const [selectedValue, setSelectedValue] = useState(null);
    const containerStyle = { backgroundColor: 'white', padding: 20, borderRadius: 20, margin: 20 };

    const { error, loading, data } = useQuery(LOAD_TECHNICIENS);
    const handleCancel = () => {
        hideModal();
        setSerie('');
    };
    const [addMateriel, { loading: loadingADD_RENDREENPANNE, error: errorADD_RENDREENPANNE }] = useMutation(
        ADD_MATERIEL
    )
    const rendreEnPanneMat = () => {
        if (!technicienId || !serie) {
            console.log("Erreur : l'utilisateur ou la série est manquante");
            return;
        }
        addMateriel({
            variables: {
                addMaterielFields: {
                    serie: serie,
                    technicienId: technicienId,
                    detailId: detailId, // Ajout du detailId ici
                    status: 'en panne',
                }
            },
            refetchQueries: [{ query: LOAD_MATERIELS }, { query: LOAD_TECHNICIENS }]
        }).then(response => {
            console.log("Matériel ajouté :", response);
            handleCancel();
            setSerie('');
            setUserId(null);
        }).catch(error => {
            console.log("Erreur lors de l'ajout :", error);
        });
    };

    const optionsTechnicien = createOptionsTechnicien(data?.techniciens)
    if (loading) return <Text>Loading...</Text>;
    if (error) return <Text>Error: {error.message}</Text>;
    return (
        <Portal>
            <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                <Text style={{ fontSize: 18, marginBottom: 10, alignSelf: "center" }}>Confier un  ORDINATEUR ASUS à :</Text>
                <Autocomplete users={optionsTechnicien} placeholder={"Technicien"} setUserId={setTechnicienId}  />
                <TextInput
                    label="Serie du materiel..."
                    mode='outlined'
                    onChangeText={text => setSerie(text)}
                    value={serie}
                    style={styles.textInput}
                    underlineColorAndroid="transparent"
                />
                <Divider style={styles.divider} />
                <View style={styles.buttonContainer}>
                    <Button onPress={rendreEnPanneMat} style={styles.button}>
                        OK
                    </Button>
                    <Button onPress={handleCancel} style={styles.button}>
                        Annuler
                    </Button>
                </View>
            </Modal>
        </Portal>
    );
};
export default ModalRendreEnPanne;

const styles = StyleSheet.create({
    textInput: {
        marginBottom: 20,
        backgroundColor: 'transparent', // Définir le fond du TextInput comme transparent
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