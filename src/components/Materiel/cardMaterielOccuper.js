import React, { useState } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Text, Card, CardItem, Body, View, H3 } from 'native-base';

const CardMateriel = ({ detail,showModal }) => {

    return (
        <>
            <Card style={styles.card}>
                <CardItem bordered>
                    <Body>
                        <Text style={styles.headerText}>{detail.detail.type}({detail.detail.marque})</Text>
                        <Text>Série : {detail.serie}</Text>
                        <Text>Nombre : 1</Text>
                        <Text>Utilisateur : {detail.user.nom} {detail.user.prenom}</Text>
                    </Body>
                </CardItem>
                <CardItem footer bordered style={styles.footer}>
                    <View>
                        <MaterialIcons name="person-add-disabled" size={20} onPress={showModal} />
                    </View>
                </CardItem>
            </Card>
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
        flexDirection: 'row',
        justifyContent: 'center', // Pour centrer horizontalement
        alignItems: 'center', // Pour centrer verticalement
    }
});