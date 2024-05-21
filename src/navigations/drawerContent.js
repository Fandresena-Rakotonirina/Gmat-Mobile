import React, { useState } from 'react';
import {
    Text,
    SafeAreaView,
    Image,
    View
} from 'react-native';
import { Divider } from 'react-native-paper';
import { List, Button, ListItem, Left, Body, Right } from 'native-base';
import Container from '../components/common/container';
import { HOME_NAVIGATOR, TYPE_MATERIEL,USER,TECHNICIEN,SIGNIN, USER_LIST, TECHNICIEN_LIST, MATERIEL_LIST } from '../constants/navigationNames';
import { Ionicons,FontAwesome6,FontAwesome5 } from '@expo/vector-icons';
import styles from './styles';

const DrawerContent = ({ navigation }) => {

    const menuItems = [
        {
            icon: <Ionicons name="list" size={17} />,
            name: 'Gérer matériels',
            onPress: () => {
                navigation.navigate(HOME_NAVIGATOR);
            },
        },
        {
            icon: <Ionicons name="settings" size={17} />,
            name: 'Gérer types matériels',
            onPress: () => {
                navigation.navigate(TYPE_MATERIEL);
            },
        },
        {
            icon: <FontAwesome5 name="users-cog" size={17} />,
            name: 'Gérer technicien',
            onPress: () => {
                navigation.navigate(TECHNICIEN);
            },
        },
        {
            icon: <FontAwesome6 name="users" size={17} />,
            name: 'Gérer utilisateur',
            onPress: () => {
                navigation.navigate(USER);
            },
        }
    ];
    const [isCollapsed, setIsCollapsed] = useState(true);

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <SafeAreaView>
            <Container>
                <Image
                    style={styles.illustration}
                    source={require('../assets/images/FID-LOGO.png')}
                />
                <Divider />
                <View>
                    {menuItems.map(({ name, icon, onPress }) => (
                    <>
                        <ListItem icon onPress={onPress}  style={styles.listItem}>
                            <Left>
                                <Button transparent>
                                    {icon}
                                </Button>
                            </Left>
                            <Body  style={styles.listBody}>
                                <Text style={styles.itemTextList}>{name}</Text>
                            </Body>
                        </ListItem>
                    </>
                    ))}
                </View>
                <Divider />
                <List style={styles.list}>
                    <ListItem onPress={toggleCollapse} icon style={styles.listItem}>
                        <Left>
                            <Button transparent>
                                <Ionicons  name="ellipsis-horizontal" />
                            </Button>
                        </Left>
                        <Body icon style={styles.listBody}>
                            <Text>Plus</Text>
                        </Body>
                        <Right icon style={styles.listBody} >
                            <Button transparent>
                                <Ionicons name={isCollapsed ? 'arrow-forward-outline' : 'arrow-down-outline'} />
                            </Button>
                        </Right>
                    </ListItem>
                    {!isCollapsed && (
                        <ListItem icon onPress={() => navigation.navigate(MATERIEL_LIST)} style={styles.listItem}>
                            <Left>
                                <Button transparent>
                                    <FontAwesome6  name="list-check"  style={styles.iconItem}/>
                                </Button>
                            </Left>
                            <Body  style={styles.listBody}>
                                <Text style={styles.itemTextList}>Listes des matériels</Text>
                            </Body>
                        </ListItem>
                    )}
                    {!isCollapsed && (
                        <ListItem  icon onPress={() => navigation.navigate(USER_LIST)}  style={styles.listItem}>
                            <Left>
                                <Button transparent>
                                    <FontAwesome5  name="list-ul" style={styles.iconItem}/>
                                </Button>
                            </Left>
                            <Body  style={styles.listBody}>
                                <Text style={styles.itemTextList}>Listes des utilisateurs</Text>
                            </Body>
                        </ListItem>
                    )}
                    {!isCollapsed && (
                        <ListItem  icon onPress={() => navigation.navigate(TECHNICIEN_LIST)}  style={styles.listItem}>
                            <Left>
                                <Button transparent>
                                    <FontAwesome6 active name="list"  style={styles.iconItem}/>
                                </Button>
                            </Left>
                            <Body  style={styles.listBody}>
                            <Text style={styles.itemTextList}>Listes des technicien</Text>
                            </Body>
                        </ListItem>
                    )}
                </List>
            </Container>
        </SafeAreaView>
    );
};
export default DrawerContent;