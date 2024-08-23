import {StyleSheet, Text, View} from 'react-native';
import React, {memo} from 'react';
import Colors from '../constants/Colors';

const DropDownItemList = ({item}) => {
  return (
    <View style={styles.listView} key={item?.value}>
      {item?.label && (
        <Text
          numberOfLines={2}
          style={[styles.inputText, {marginLeft: 10, color: Colors.pureBlack}]}>
          {item.label}
        </Text>
      )}
    </View>
  );
};

// Custom comparison function for React.memo
function areEqual(prevProps, nextProps) {
  return prevProps.item === nextProps.item;
}

export default memo(DropDownItemList, areEqual);

const styles = StyleSheet.create({
  listView: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 3,
  },
  inputText: {
    fontSize: 15,
    fontWeight: '300',
    textTransform: 'uppercase',
    fontFamily: Colors.fontFamilyBookMan,
  },
});
