import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Modal, Portal, Text, Button, TextInput, Divider } from 'react-native-paper';

const ModalAjouter = ({ visible, hideModal }) => {

    const [inputText, setInputText] = React.useState('');

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
                <Text style={{ fontSize: 18, marginBottom: 10, alignSelf: "center", fontWeight: "bold" }}>Nouveau type matériel :</Text>
                <TextInput
                    label="Type du matériel"
                    //value={inputText}
                    mode='outlined'
                    //onChangeText={""}
                    style={styles.textInput}
                    underlineColorAndroid="transparent" // Pour supprimer le fond du TextInput
                />
                <View style={styles.alignerDeuxInput}>
                    <TextInput
                        label="Marque"
                        mode='outlined'
                        //value={""}
                        //onChangeText={""}
                        style={[styles.textInput, { flex: 1, marginRight: 10 }]} // flex: 1 pour occuper l'espace disponible, marginRight pour l'espace entre les deux champs
                        underlineColorAndroid="transparent"
                    />
                    <TextInput
                        label="Nombre"
                        mode='outlined'
                        //value={""}
                        //onChangeText={""}
                        style={[styles.textInput, { flex: 1 }]} // flex: 1 pour occuper l'espace disponible
                        underlineColorAndroid="transparent"
                        keyboardType="numeric"
                    />
                </View>
                <Divider style={styles.divider} />
                <View style={styles.buttonContainer}>
                    <Button onPress={handleCancel} style={styles.button}>
                        Ajouter
                    </Button>
                    <Button onPress={handleOk} style={styles.button}>
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
    alignerDeuxInput:{
        flexDirection:"row"
    }
});