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
                    label="Nom "
                    //value={inputText}
                    mode='outlined'
                    //onChangeText={""}
                    style={styles.textInput}
                    underlineColorAndroid="transparent" // Pour supprimer le fond du TextInput
                />
                <TextInput
                    label="Prénom"
                    //value={inputText}
                    mode='outlined'
                    //onChangeText={""}
                    style={styles.textInput}
                    underlineColorAndroid="transparent" 
                />
                 <TextInput
                    label="Fonction"
                    //value={inputText}
                    mode='outlined'
                    //onChangeText={""}
                    style={styles.textInput}
                    underlineColorAndroid="transparent"
                />
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
    }
});