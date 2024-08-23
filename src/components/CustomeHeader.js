import {StyleSheet, TouchableOpacity, Text, View} from 'react-native';
import React from 'react';
import {Header, Icon} from '@rneui/base';
import Colors from '../constants/Colors';

const CustomeHeader = ({
  lefIconName,
  lefIconType,
  rightIconName,
  rightIcontype,
  headerTitle,
  leftIconPress,
  rightIconPress,
  ...rest
}) => {
  return (
    <Header
      leftComponent={
        <View style={styles.headerRight}>
          <TouchableOpacity onPress={leftIconPress}>
            <Icon
              name={lefIconName ? lefIconName : null}
              type={lefIconType ? lefIconType : null}
              color={Colors.black2}
            />
          </TouchableOpacity>
        </View>
      }
      centerComponent={
        <View style={{width: '120%', alignItems: 'center'}}>
          <Text
            numberOfLines={1}
            style={[styles.headerText, {color: Colors.pureBlack}]}>
            {headerTitle}
          </Text>
        </View>
      }
      centerContainerStyle={{}}
      rightComponent={
        <View style={styles.headerRight}>
          <TouchableOpacity onPress={rightIconPress}>
            <Icon
              name={rightIconName ? rightIconName : null}
              type={rightIcontype ? rightIcontype : null}
              color={Colors.purple}
            />
          </TouchableOpacity>
        </View>
      }
      containerStyle={{
        backgroundColor: Colors.screenBackground,

        justifyContent: 'space-around',
        borderBottomColor: Colors.headerBottom,
        borderBottomWidth: 0.5,
      }}
      {...rest}
    />
  );
};

export default CustomeHeader;

const styles = StyleSheet.create({
  headerText: {
    fontSize: 19,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
});
