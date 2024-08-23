import {StyleSheet, Text, View, TextInput} from 'react-native';
import React from 'react';
import {Icon} from '@rneui/themed';
import Colors from '../constants/Colors';
import IconType from '../constants/IconType';

const Input = ({title, required, errorMessage, ...rest}) => {
  return (
    <View style={{rowGap: 6}}>
      {title && (
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text
            style={[styles.title, {color: Colors.pureBlack, marginLeft: 5}]}>
            {title}
          </Text>
          {required && (
            <Icon
              name="asterisk"
              type={IconType.FontAwesome5}
              size={8}
              color={Colors.red}
              style={{marginLeft: 5}}
            />
          )}
        </View>
      )}

      <TextInput
        placeholder={'TYPE ...             '}
        placeholderTextColor={Colors.pureBlack}
        {...rest}
        style={[styles.inputText, {}]}></TextInput>

      {errorMessage && (
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={[styles.errorMesage, {marginLeft: 10}]}>
            {errorMessage}
          </Text>
        </View>
      )}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  inputView: {
    flex: 1,
    marginLeft: 8,
    marginRight: 8,
    justifyContent: 'center',
  },
  icon: {
    width: 20,
    height: 20,
  },
  title: {
    fontSize: 15,
    textTransform: 'uppercase',
  },
  inputText: {
    fontSize: 15,
    color: Colors.pureBlack,
    textAlign: 'center',
    borderRadius: 8,
    borderWidth: 1,
    fontWeight: '300',
    textTransform: 'uppercase',
  },
  errorMesage: {
    color: Colors.red,
    alignSelf: 'flex-start',
    marginLeft: 12,
    textTransform: 'uppercase',
  },
});
