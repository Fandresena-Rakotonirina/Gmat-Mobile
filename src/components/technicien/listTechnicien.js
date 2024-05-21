import React, { useState } from 'react';
import { Text, View ,StyleSheet} from 'react-native';

const ListTechnicien = ({ navigation }) => {

   return (
      <View style={styles.container}>
         <Text>List technicien !!!</Text>
      </View>
   );
};

export default ListTechnicien;
const styles = StyleSheet.create({
   container: {
      flex: 1,
      padding: 20,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
   }
})
