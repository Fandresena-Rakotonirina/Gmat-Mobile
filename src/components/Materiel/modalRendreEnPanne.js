import * as React from 'react';
import { View,StyleSheet} from 'react-native';
import { Modal, Portal, Text, Button, TextInput,Divider} from 'react-native-paper';

const ModalRendreEnPanne = ({ visible, hideModal }) => {

    const [inputText, setInputText] = React.useState('');
    const containerStyle = { backgroundColor: 'white', padding: 20, borderRadius: 20, margin: 20 };
    const handleCancel = () => {
        hideModal();
        setInputText('');
    };

    const handleOk = () => {
        // Ajoutez ici la logique pour utiliser la valeur de inputText
        hideModal();
        setInputText('');
    };
    return (
        <Portal>
            <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                <Text style={{ fontSize: 18, marginBottom: 10, alignSelf: "center" }}>Confier un  ORDINATEUR ASUS à :</Text>
                <TextInput
                    label="Taper le technicien ici..."
                    value={inputText}
                    mode='outlined'
                    onChangeText={setInputText}
                    style={styles.textInput}
                    underlineColorAndroid="transparent" // Pour supprimer le fond du TextInput
                />
                <TextInput
                    label="Serie du materiel..."
                    mode='outlined'
                    value={inputText}
                    onChangeText={setInputText}
                    style={styles.textInput}
                    underlineColorAndroid="transparent"
                />
                <Divider style={styles.divider} />
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