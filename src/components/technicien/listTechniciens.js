import React, { useState } from 'react';
import { Text, View ,StyleSheet} from 'react-native';

const ListTechniciens = () => {

   return (
      <View style={styles.container}>
         <Text>List des techniciens</Text>
      </View>
   );
};

export default ListTechniciens;
const styles = StyleSheet.create({
   container: {
      flex: 1,
      padding: 20,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
   }
})
