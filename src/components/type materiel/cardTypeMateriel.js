import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Text, Card, CardItem, Body, Right, H3 } from 'native-base';

const CardTypeMateriel = ({ detail, index, renderMenu}) => {

    return (
        <>
            <Card style={styles.card}>
                <CardItem bordered>
                    <Body>
                        <Text style={styles.headerText}>ORDINATEUR</Text>
                        <Text>Type: {detail.type}</Text>
                        <Text>Marque: {detail.marque}</Text>
                        <Text>Nombre: {detail.total}</Text>
                        <Text>Occupé : </Text>
                        <Text>En panne: </Text>
                    </Body>
                    <Right style={{ position: 'absolute', top: 10, right: 5, zIndex: 999 }}>
                        {renderMenu(index)}
                    </Right>
                </CardItem>
            </Card>
        </>
    )
}
export default CardTypeMateriel
const styles = StyleSheet.create({
    card: {
        borderRadius: 15,
        marginBottom: 20,
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
    }
});