import React, { useState } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Card, CardItem, Text, Body, View } from 'native-base';
import ModalRendreEnPanne from './modalRendreEnPanne';
import ModalRendreOccuper from './modalRendreOccuper';

const CardMateriel = ({ details }) => {

    const windowWidth = Dimensions.get('window').width;
    const [visibleModalOccuper, setvisibleModalOccuper] = useState(false);
    const [visibleModalEnPanne, setVisibleModalEnPanne] = useState(false);
 
    const showModalOccuper = () => setvisibleModalOccuper(true);
    const hideModalOccuper = () => setvisibleModalOccuper(false);
 
    const showModalEnPanne = () => setVisibleModalEnPanne(true);
    const hideModalEnPanne = () => setVisibleModalEnPanne(false);   
    return (
        <>
            {details.map(detail => (
                <Card key={detail.id} style={styles.card}>
                    <CardItem bordered>
                        <View>
                            <Text style={styles.headerText}>{detail.type}</Text>
                            <Text>Marque: {detail.marque}</Text>
                            <Text>Libre: {detail.total}</Text>
                            <Text>Occupé: 0 </Text>
                            <Text>En panne: 0 </Text>
                        </View>
                    </CardItem>
                    <CardItem footer bordered style={styles.footer}>
                        <View style={styles.buttonContainer}>
                            <MaterialIcons style={{ marginRight: windowWidth * 0.3 }} name="person-add" size={20} onPress={showModalOccuper} />
                            <MaterialIcons name="do-not-disturb" size={20} onPress={showModalEnPanne} />
                        </View>
                    </CardItem>
                </Card>
            ))}
            <ModalRendreOccuper visible={visibleModalOccuper} hideModal={hideModalOccuper} />
            <ModalRendreEnPanne visible={visibleModalEnPanne} hideModal={hideModalEnPanne} />
        </>
    )
}
export default CardMateriel
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
       justifyContent: 'center',
    },
    buttonContainer: {
       flexDirection: 'row',
       justifyContent: 'space-between',
       alignItems: 'center',
    }
 });