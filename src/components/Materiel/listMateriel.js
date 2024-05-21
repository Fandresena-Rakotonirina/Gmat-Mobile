import React, { useState } from 'react';
import { Text, View ,StyleSheet} from 'react-native';

const ListMateriel = () => {

   return (
      <View style={styles.container}>
         <Text>List materiel</Text>
      </View>
   );
};

export default ListMateriel;
const styles = StyleSheet.create({
   container: {
      flex: 1,
      padding: 20,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
   }
})
