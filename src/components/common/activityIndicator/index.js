import * as React from 'react';
import { Dimensions } from 'react-native';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
import styles from './styles';

const AIndicator = () => {

  const windowWidth = Dimensions.get('window').width;
  return (
    <ActivityIndicator animating={true} color={"#4772a8"} style={[styles.centered, {width: windowWidth * 0.8 }]} />
  );
};

export default AIndicator;
