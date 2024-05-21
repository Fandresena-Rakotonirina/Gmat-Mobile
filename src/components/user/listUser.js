import React, { useState } from 'react';
import {Text,View,StyleSheet } from 'react-native';

const ListUser = ({ navigation }) => {

   return (
         <View style={styles.container}>
            <Text>List utilisateur</Text>
         </View>
   );
};

export default ListUser;
const styles = StyleSheet.create({
   container: {
      flex: 1,
      padding: 20,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
   }
})
