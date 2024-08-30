import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Text, Card, CardItem, Body, Right, H3 } from 'native-base';

const CardUser = ({ user, index, renderMenu }) => {

    return (
        <>
            <Card style={styles.card}>
                <CardItem bordered>
                    <Body>
                        <Text>{user.nom} {user.prenom}</Text>
                        <Text style={{ color: "#fb5a77" }}>
                            {user.fonction}{user.level === 1 && ' (Admin)'}
                            </Text>
                        <Text>Nombre de matériel a utilisé: {user.materiels?.length}</Text>
                    </Body>
                    <Right style={{ position: 'absolute', top: 10, right: 5, zIndex: 999 }}>
                        {renderMenu(index)}
                    </Right>
                </CardItem>
            </Card>
        </>
    )
}
export default CardUser
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