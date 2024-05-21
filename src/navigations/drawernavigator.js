import 'react-native-gesture-handler';
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeNavigator from './homenavigator';
import DrawerContent from './drawerContent';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{drawerType: 'front'}}
      drawerContent={({navigation}) =>
        getDrawerContent(navigation)
      }>
      <Drawer.Screen
        options={{headerShown: false}}
        name="Materiel"
        component={HomeNavigator}
      />
    </Drawer.Navigator>
  );
};

const getDrawerContent = (navigation) => {
  return <DrawerContent navigation={navigation} />;
};
export default DrawerNavigator;
