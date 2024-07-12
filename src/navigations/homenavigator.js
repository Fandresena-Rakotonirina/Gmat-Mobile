import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Materiel from '../screens/materiel';
import Login from '../screens/login';
import Register from '../screens/register';
import TypeMateriel from '../screens/type materiel';
import Technicien from '../screens/technicien';
import User from '../screens/user';
import ListTechnicien from '../components/technicien/listTechnicien';
import {
   HOME_NAVIGATOR,
   TYPE_MATERIEL,
   TECHNICIEN,
   SIGNIN,
   USER,
   SIGNUP,
   MATERIEL_LIST,
   USER_LIST,
   TECHNICIEN_LIST
} from '../constants/navigationNames';
import ListUser from '../components/user/listUser';
import ListMateriel from '../components/Materiel/listMateriel';

const HomeStack = createStackNavigator();

const HomeNavigator = () => {
   return (
      <HomeStack.Navigator initialRouteName={SIGNIN}>
         <HomeStack.Screen name={TYPE_MATERIEL} options={{ headerLeft: null, animationEnabled: false, headerShown: false }} component={TypeMateriel} />
         <HomeStack.Screen name={TECHNICIEN} options={{ headerLeft: null, animationEnabled: false, headerShown: false }} component={Technicien} />
         <HomeStack.Screen name={HOME_NAVIGATOR} options={{ headerLeft: null, animationEnabled: false, headerShown: false }} component={Materiel} />
         <HomeStack.Screen name={TECHNICIEN_LIST} options={{ headerLeft: null, animationEnabled: false, headerShown: false }} component={ListTechnicien} />
         <HomeStack.Screen name={USER_LIST} options={{ headerLeft: null, animationEnabled: false, headerShown: false }} component={ListUser} />
         <HomeStack.Screen name={MATERIEL_LIST} options={{ headerLeft: null, animationEnabled: false, headerShown: false }} component={ListMateriel} />
         <HomeStack.Screen name={USER} options={{ headerLeft: null, animationEnabled: false, headerShown: false }} component={User} />
         <HomeStack.Screen name={SIGNIN} options={{ headerLeft: null, animationEnabled: false, headerShown: false }} component={Login} />
         <HomeStack.Screen name={SIGNUP} options={{ headerLeft: null, animationEnabled: false, headerShown: false }} component={Register} />
      </HomeStack.Navigator>
   );
};
export default HomeNavigator;
   