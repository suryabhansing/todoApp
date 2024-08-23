import {StyleSheet, View, TextInput} from 'react-native';
import React from 'react';
import Colors from '../constants/Colors';
import {Icon} from '@rneui/base';
import IconType from '../constants/IconType';
import {WINDOW_HEIGHT, WINDOW_WIDTH} from '../utils/ScreenLayout';

const SearchBar = ({
  searchHeight,
  searchWidth,
  onChangeText,
  onRightIconPress,
  placeholderText,
  value,
  onSearchIconPress,
}) => {
  return (
    <View style={styles.searchView}>
      <View
        style={{
          shadowOpacity: 1, // <- and this or yours opacity
          shadowRadius: 15,
          borderRadius: 5,
          backgroundColor: Colors.lightShadow,
          width: searchWidth ? searchWidth : 200,
          height: searchHeight ? searchHeight : 50,

          borderColor: Colors.gray,
          borderWidth: 0.8,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            flex: 1,
          }}>
          <View style={{marginLeft: 10, width: '85%'}}>
            <TextInput
              placeholder={placeholderText.toUpperCase()}
              onChangeText={onChangeText}
              placeholderTextColor={Colors.searchTxtColor}
              value={value}
              style={styles.inputView}
            />
          </View>
          <View style={{width: '10%'}}>
            <Icon
              name="cross"
              type={IconType.Entypo}
              onPress={onRightIconPress}
              color={Colors.gray}
              size={30}
            />
          </View>
        </View>
      </View>
      {onSearchIconPress && (
        <View style={{justifyContent: 'center', marginLeft: 10}}>
          <Icon
            name="search"
            type={IconType.Ionicons}
            color={Colors.gray}
            onPress={onSearchIconPress}
            size={30}
          />
        </View>
      )}
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  searchView: {
    marginTop: WINDOW_HEIGHT * 0.02,
    marginHorizontal: WINDOW_WIDTH * 0.05,
    flexDirection: 'row',
  },
  inputView: {
    marginLeft: 0,
    fontSize: 15,
    color: Colors.pureBlack,
    fontWeight: '600',
    lineHeight: 21,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
});
