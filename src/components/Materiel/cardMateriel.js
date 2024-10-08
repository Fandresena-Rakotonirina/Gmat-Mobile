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
    const [selectedDetailId, setSelectedDetailId] = useState(null);

    const showModalOccuper = (id) => {
        setSelectedDetailId(id);
        setvisibleModalOccuper(true);
    };
    const hideModalOccuper = () => setvisibleModalOccuper(false);

    const showModalEnPanne = (id) => {
        setSelectedDetailId(id);
        setVisibleModalEnPanne(true);
    };
    const hideModalEnPanne = () => setVisibleModalEnPanne(false);

    return (
        <>
            {details.map(detail => {

                // Calcul de la somme des nombres de matériels occupés
                const materielOccupe = detail.materiels
                    .filter(materiel => materiel.user && materiel.user.id)
                    .reduce((total, materiel) => total + parseInt(materiel.nombre, 10), 0);

                // Calcul de la somme des nombres de matériels en panne
                const materielEnPanne = detail.materiels
                    .filter(materiel => materiel.technicien && materiel.technicien.id)
                    .reduce((total, materiel) => total + parseInt(materiel.nombre, 10), 0);

                const materielLibre = detail.total - (materielOccupe + materielEnPanne);
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
                            materielLibre={materielLibre}
                            type={detail.type}
                            marque={detail.marque}
                        />
                        <ModalRendreEnPanne
                            visible={visibleModalEnPanne}
                            hideModal={hideModalEnPanne}
                            detailId={selectedDetailId}
                            materielLibre={materielLibre}
                            type={detail.type} 
                            marque={detail.marque} 
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
