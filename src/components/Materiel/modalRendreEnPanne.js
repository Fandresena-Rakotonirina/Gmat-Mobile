import React, { useState, useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { Modal, Portal, Text, Button, TextInput, Divider } from 'react-native-paper';
import Autocomplete from '../common/autocomplete';
import { ADD_MATERIEL } from '../../GraphQL/Mutations';
import { useMutation, useQuery } from '@apollo/client';
import { LOAD_MATERIELS, LOAD_TECHNICIENS, LOAD_DETAILS } from '../../GraphQL/Queries';
import { createOptionsTechnicien } from '../../utils';

const ModalRendreEnPanne = ({ visible, hideModal, detailId, materielLibre }) => {
    const [serie, setSerie] = useState('');
    const [nombre, setNombre] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [technicienId, setTechnicienId] = useState(null);

    const containerStyle = { backgroundColor: 'white', padding: 20, borderRadius: 20, margin: 20 };

    const { loading, error, data } = useQuery(LOAD_TECHNICIENS);
    const [addMateriel] = useMutation(ADD_MATERIEL, {
        refetchQueries: [{ query: LOAD_MATERIELS }, { query: LOAD_TECHNICIENS }, { query: LOAD_DETAILS }]
    });

    const handleCancel = () => {
        hideModal();
        setSerie('');
        setNombre('');
        setTechnicienId(null);
        setErrorMessage('');
    };

    const rendreEnPanneMat = () => {
        if (!technicienId || !serie || !nombre) {
            setErrorMessage("Tous les champs doivent être remplis.");
            return;
        }

        if (parseInt(nombre) > materielLibre) {
            setErrorMessage(`Il y a seulement ${materielLibre} matériel(s) libre(s) !!!`);
            return;
        }

        addMateriel({
            variables: {
                addMaterielFields: {
                    serie,
                    nombre: parseInt(nombre, 10),  // Conversion en entier,
                    technicienId,
                    detailId,
                    status: 'en panne',
                }
            }
        }).then(response => {
            console.log("Matériel ajouté (en panne ):", response);
            handleCancel();
        }).catch(error => {
            console.log("Erreur lors de l'ajout :", error);
        });
    };

    const optionsTechnicien = useMemo(() => createOptionsTechnicien(data?.techniciens), [data]);

    if (loading) return <Text>Loading...</Text>;
    if (error) return <Text>Error: {error.message}</Text>;

    return (
        <Portal>
            <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                <Text style={styles.title}>Confier un {type} {marque}" à :</Text>
                <Autocomplete users={optionsTechnicien} placeholder={"Technicien"} setUserId={setTechnicienId} />
                <View style={styles.inputContainer}>
                    <TextInput
                        label="Série ..."
                        mode='outlined'
                        onChangeText={setSerie}
                        value={serie}
                        style={[styles.textInput, { marginRight: 10 }]}
                    />
                    <TextInput
                        label="Nombre"
                        mode='outlined'
                        onChangeText={setNombre}
                        value={nombre}
                        style={styles.textInput}
                        keyboardType="numeric"
                    />
                </View>
                {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
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

const styles = StyleSheet.create({
    title: {
        fontSize: 18,
        marginBottom: 10,
        alignSelf: "center"
    },
    inputContainer: {
        flexDirection: "row",
        marginBottom: 20
    },
    textInput: {
        flex: 1,
        backgroundColor: 'transparent'
    },
    errorMessage: {
        color: 'red',
        marginBottom: 10
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

export default ModalRendreEnPanne;
