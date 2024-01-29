import React from 'react';
import {StyleSheet, View} from 'react-native';

const DashedLine = () => {
  const dottedLineDots = Array.from({length: 100}, (_, index) => {
    return <View key={index} style={styles.dottedLineDot}></View>;
  });
  return <View style={styles.dottedLineContainer}>{dottedLineDots}</View>;
};
const styles = StyleSheet.create({
  dottedLineContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    paddingBottom: 20,
    // marginLeft: 5,
    // marginRight: 5,
  },
  dottedLineDot: {
    width: 2,
    height: 2,
    backgroundColor: '#00000033',
    borderRadius: 100,
    marginLeft: 2.5,
  },
});

export default DashedLine;
