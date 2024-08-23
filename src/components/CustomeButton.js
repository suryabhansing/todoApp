import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Button} from '@rneui/themed';

const CustomeButton = ({btnTitle, onpress, ...rest}) => {
  return <Button title={btnTitle} onPress={onpress} {...rest} />;
};

export default CustomeButton;

const styles = StyleSheet.create({});
