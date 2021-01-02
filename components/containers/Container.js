import React from 'react';
import { StyleSheet, View } from 'react-native';
import { scaleSize } from 'theme/mixins';

const CONTAINER_PADDING = scaleSize(8);

export const Container = (props) => {
  return (
    <View style={{ ...styles.container, ...props.style }}>
      {props.children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: CONTAINER_PADDING,
  },
});
