import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

import {Icon} from '@rneui/themed';
import {Dropdown} from 'react-native-element-dropdown';
import Colors from '../constants/Colors';

import IconType from '../constants/IconType';

import DropDownItemList from './DropDownItemList';
import {WINDOW_WIDTH} from '../utils/ScreenLayout';

const DropDownComponent = ({
  height,
  width,
  required,
  title,
  errorMessage,
  ...rest
}) => {
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

      <View
        style={{
          shadowOpacity: 1, // <- and this or yours opacity
          shadowRadius: 15,
          borderRadius: 5,
          borderWidth: 0.5,
          borderColor: Colors.gray,
          backgroundColor: Colors.inputLightShadow,
          width: width ? width : WINDOW_WIDTH * 0.82,
          height: height ? height : 50,
          flexDirection: 'row',
          justifyContent: 'space-between',

          paddingHorizontal: 12,
        }}>
        <View style={styles.inputView}>
          <Dropdown
            mode="modal"
            labelField={'label'}
            valueField={'value'}
            activeColor={Colors.skyBule}
            placeholder={'Select ...'}
            placeholderStyle={[styles.inputText, {color: Colors.pureBlack}]}
            selectedTextStyle={[
              styles.selectedTextStyle,
              {color: Colors.pureBlack},
            ]}
            style={[styles.inputText, {color: Colors.pureBlack}]}
            containerStyle={{
              backgroundColor: Colors.inputLightShadow,

              borderRadius: 8,
              padding: 8,
            }}
            renderItem={item => (
              <DropDownItemList item={item}></DropDownItemList>
            )}
            {...rest}
            maxHeight={300}
            renderRightIcon={() => (
              <Icon
                name={'caretdown'}
                size={20}
                type={IconType.AntDesign}
                color={Colors.gray}
              />
            )}
          />
        </View>
      </View>
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

export default DropDownComponent;

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
    fontFamily: Colors.fontFamilyBookMan,
  },
  inputText: {
    fontSize: 15,
    fontWeight: '300',
    textTransform: 'uppercase',
    fontFamily: Colors.fontFamilyBookMan,
  },
  selectedTextStyle: {
    fontSize: 15,
    textTransform: 'uppercase',
    fontFamily: Colors.fontFamilyBookMan,
  },
  errorMesage: {
    color: Colors.red,
    alignSelf: 'flex-start',
    marginLeft: 12,
    textTransform: 'uppercase',
    fontFamily: Colors.fontFamilyBookMan,
  },
});
