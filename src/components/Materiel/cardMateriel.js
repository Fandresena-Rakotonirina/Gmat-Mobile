import React, { useState } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Card, CardItem, Text, View } from 'native-base';
import ModalRendreEnPanne from './modalRendreEnPanne';
import ModalRendreOccuper from './modalRendreOccuper';

const CardMateriel = ({ details }) => {

    const windowWidth = Dimensions.get('window').width;
    const [visibleModalOccuper, setvisibleModalOccuper] = useState(false);
    const [visibleModalEnPanne, setVisibleModalEnPanne] = useState(false);
    const [selectedDetailId, setSelectedDetailId] = useState(null); // State to hold the selected detail ID

    const showModalOccuper = (id) => {
        setSelectedDetailId(id); // Set the selected detail ID
        setvisibleModalOccuper(true);
    };
    const hideModalOccuper = () => setvisibleModalOccuper(false);
 
    const showModalEnPanne = (id) => {
        setSelectedDetailId(id); // Set the selected detail ID
        setVisibleModalEnPanne(true);
    };
    const hideModalEnPanne = () => setVisibleModalEnPanne(false);

    return (
        <>
            {details.map(detail => {
                const totalMateriels = detail.total; // Utilisation de detail.total pour obtenir le total des matériels d'un type spécifique
                const materielOccupe = detail.materiels.filter(materiel => materiel.user && materiel.user.id).length;
                const materielEnPanne = detail.materiels.filter(materiel => materiel.technicien && materiel.technicien.id).length;
                const materielLibre = totalMateriels - (materielOccupe + materielEnPanne);

                return (
                    <React.Fragment key={detail.id}>
                        <Card style={styles.card}>
                            <CardItem bordered>
                                <View>
                                    <Text style={styles.headerText}>{detail.type}</Text>
                                    <Text>Marque: {detail.marque}</Text>
                                    <Text>Libre: {materielLibre}</Text>
                                    <Text>Occupé: {materielOccupe}</Text>
                                    <Text>En panne: {materielEnPanne}</Text>
                                </View>
                            </CardItem>
                            <CardItem footer bordered style={styles.footer}>
                                <View style={styles.buttonContainer}>
                                    <MaterialIcons
                                        style={{ marginRight: windowWidth * 0.3 }}
                                        name="person-add"
                                        size={20}
                                        onPress={() => showModalOccuper(detail.id)}
                                    />
                                    <MaterialIcons
                                        name="do-not-disturb"
                                        size={20}
                                        onPress={() => showModalEnPanne(detail.id)} 
                                    />
                                </View>
                            </CardItem>
                        </Card>
                        <ModalRendreOccuper
                            visible={visibleModalOccuper}
                            hideModal={hideModalOccuper}
                            detailId={selectedDetailId}
                        />
                        <ModalRendreEnPanne
                            visible={visibleModalEnPanne}
                            hideModal={hideModalEnPanne}
                            detailId={selectedDetailId} 
                        />
                    </React.Fragment>
                );
            })}
        </>
    );
}

export default CardMateriel;

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
