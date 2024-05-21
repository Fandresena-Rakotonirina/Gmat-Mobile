import React, { useState, useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { Modal, Portal, Text, Button, TextInput, Divider } from 'react-native-paper';
import Autocomplete from '../common/autocomplete';
import { LOAD_USERS } from '../../GraphQL/Queries'

const ModalRendreOccuper = ({ visible, hideModal }) => {

    const [inputText, setInputText] = React.useState('');
    const [selectedValue, setSelectedValue] = useState(null);
    const [selectedIds, setIds] = useState([]);

    const { error, loading, data } = useQuery(LOAD_USERS);
    const containerStyle = { backgroundColor: 'white', padding: 20, borderRadius: 20, margin: 20 };
    const handleCancel = () => {
        hideModal();
        setInputText('');
    };

    const handleOk = () => {

        hideModal();
        console.log(selectedValue);
        setInputText('');

    };
    const optionsUser = createOptionsUser(data?.users)

    return (
        <Portal>
            <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                <Text style={{ fontSize: 18, marginBottom: 10, alignSelf: "center" }}>Donner un  ORDINATEUR ASUS à :</Text>
                <TextInput
                    label="Taper l'utisateur ici ..."
                    value={inputText}
                    mode='outlined'
                    onChangeText={setInputText}
                    style={styles.textInput}
                    underlineColorAndroid="transparent" // Pour supprimer le fond du TextInput 
                />
                <Autocomplete users={optionsUser}/>
                {/* <Divider style={styles.divider} /> */} 
                <View style={styles.buttonContainer}>
                    <Button onPress={handleCancel} style={styles.button}>
                        OK
                    </Button>
                    <Button onPress={handleOk} style={styles.button}>
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