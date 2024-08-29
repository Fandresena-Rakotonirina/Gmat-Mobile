import React, { useState, useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { Modal, Portal, Text, Button, TextInput, Divider } from 'react-native-paper';
import Autocomplete from '../common/autocomplete';
import { ADD_MATERIEL } from '../../GraphQL/Mutations'
import { useMutation, useQuery } from '@apollo/client'
import { LOAD_MATERIELS, LOAD_USERS } from '../../GraphQL/Queries'
import { createOptionsUser } from '../../utils'

const ModalRendreOccuper = ({ visible, hideModal,detailId }) => {

    const [serie, setSerie] = React.useState('');
    const [userId, setUserId] = useState(null);  // Stocke l'ID de l'utilisateur sélectionné    
    const [selectedValue, setSelectedValue] = useState(null);
    const [selectedIds, setIds] = useState([]);

    const { error, loading, data } = useQuery(LOAD_USERS);
    const containerStyle = { backgroundColor: 'white', padding: 20, borderRadius: 20, margin: 20 };
    const handleCancel = () => {
        hideModal();
    };
    const [addMateriel, { loading: loadingADD_RENDREOCCUPER, error: errorADD_RENDREOCCUPER }] = useMutation(
        ADD_MATERIEL
    )
    const rendreOccuperMat = () => {
        console.log(selectedValue);
        if (!userId || !serie) {
            console.log("Erreur : l'utilisateur ou la série est manquante");
            return;
        }
        addMateriel({
            variables: {
                addMaterielFields: {
                    serie: serie,
                    userId: userId,
                    detailId: detailId, // Ajout du detailId ici
                    status: 'en marche',
                }
            },
            refetchQueries: [{ query: LOAD_MATERIELS }, { query: LOAD_USERS }]
        }).then(response => {
            console.log("Matériel ajouté :", response);
            handleCancel();
            setSerie('');
            setUserId(null);
        }).catch(error => {
            console.log("Erreur lors de l'ajout :", error);
        });
    };
    const optionsUser = useMemo(() => createOptionsUser(data?.users), [data]);
    if (loading) return <Text>Loading...</Text>;
    if (error) return <Text>Error: {error.message}</Text>;

    return (
        <Portal>
            <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                <Text style={{ fontSize: 18, marginBottom: 10, alignSelf: "center" }}>Donner un  ORDINATEUR ASUS à :</Text>
                <Autocomplete users={optionsUser} placeholder={"Utilisateur"} setUserId={setUserId} />
                <TextInput
                    label="Série du matériel ..."
                    mode='outlined'
                    onChangeText={text => setSerie(text)}
                    value={serie}
                    style={styles.textInput}
                    underlineColorAndroid="transparent" // Pour supprimer le fond du TextInput 
                />
                <Divider style={styles.divider} />
                <View style={styles.buttonContainer}>
                    <Button onPress={rendreOccuperMat} style={styles.button}>
                        Valider
                    </Button>
                    <Button onPress={handleCancel} style={styles.button}>
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