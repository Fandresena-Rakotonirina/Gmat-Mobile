import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Modal, Portal, Text, Button, TextInput, Divider } from 'react-native-paper';
import Autocomplete from '../common/autocomplete';
import { ADD_MATERIEL } from '../../GraphQL/Mutations';
import { useMutation,useQuery } from '@apollo/client';
import { LOAD_USERS ,LOAD_MATERIELS,LOAD_DETAILS} from '../../GraphQL/Queries';
import { createOptionsUser } from '../../utils';

const ModalRendreOccuper = ({ visible, hideModal, detailId, materielLibre,type,marque }) => {
    const [serie, setSerie] = React.useState('');
    const [nombre, setNombre] = React.useState('');
    const [userId, setUserId] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const containerStyle = { backgroundColor: 'white', padding: 20, borderRadius: 20, margin: 20 };

    const { data: usersData, loading: loadingUsers, error: errorUsers } = useQuery(LOAD_USERS);
    
     const [addMateriel] = useMutation(ADD_MATERIEL, {
        refetchQueries: [{ query: LOAD_MATERIELS }, { query: LOAD_USERS }, { query: LOAD_DETAILS }]
    });

    const handleCancel = () => {
        hideModal();
        setSerie('');
        setNombre('');
        setTechnicienId(null);
        setErrorMessage('');
    };

    const rendreOccuperMat = () => {
        if (!userId || !serie || !nombre) {
            setErrorMessage("Tous les champs doivent être remplis");
            return;
        }

        if (parseInt(nombre) > materielLibre) {
            setErrorMessage(`Matériel insuffisant. Il y a seulement ${materielLibre} matériel(s) libre(s) dans le stock.`);
            return;
        }

        addMateriel({
            variables: {
                addMaterielFields: {
                    serie,
                    nombre: parseInt(nombre, 10),  // Conversion en entier,
                    userId,
                    detailId,
                    status: 'en marche',
                }
            }
        }).then(response => {
            console.log("Matériel ajouté ( en marche ):", response);
            handleCancel();
        }).catch(error => {
            console.log("Erreur lors de l'ajout :", error);
        });
    };

    const optionsUser = createOptionsUser(usersData?.users);

    if (loadingUsers) return <Text>Loading...</Text>;
    if (errorUsers) return <Text>Error: {errorUsers?.message}</Text>;

    return (
        <Portal>
            <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                <Text style={{ fontSize: 18, marginBottom: 10, alignSelf: "center" }}>Donner un  {type} {marque}" à :</Text>
                <Autocomplete users={optionsUser} placeholder={"Utilisateur"} setUserId={setUserId} />
                <View style={styles.alignerDeuxInput}>
                    <TextInput
                        label="Série ..."
                        mode='outlined'
                        onChangeText={text => setSerie(text)}
                        value={serie}
                        style={[styles.textInput, { flex: 1, marginRight: 10 }]}
                        underlineColorAndroid="transparent"
                    />
                    <TextInput
                        label="Nombre"
                        mode='outlined'
                        onChangeText={text => setNombre(text)}
                        value={nombre}
                        style={[styles.textInput, { flex: 1 }]}
                        underlineColorAndroid="transparent"
                        keyboardType="numeric"
                    />
                </View>
                {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
                <Divider style={styles.divider} />
                <View style={styles.buttonContainer}>
                    <Button onPress={rendreOccuperMat} style={styles.button}>
                        Valider
                    </Button>
                    <Button onPress={hideModal} style={styles.button}>
                        Annuler
                    </Button>
                </View>
            </Modal>
        </Portal>
    );
};

export default ModalRendreOccuper;

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
    },
    errorMessage: {
        color: 'red',
        marginBottom: 10,
        alignSelf: 'center'
    }
});
