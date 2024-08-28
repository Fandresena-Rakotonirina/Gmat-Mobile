import React, { useState } from 'react';
import { Text, View ,StyleSheet} from 'react-native';

const ListUtilisateur = () => {

   return (
      <View style={styles.container}>
         <Text>List Utilisateur</Text>
      </View>
   );
};

export default ListUtilisateur;
const styles = StyleSheet.create({
   container: {
      flex: 1,
      padding: 20,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
   }
})
