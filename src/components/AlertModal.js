import {StyleSheet, Text, View, Modal} from 'react-native';
import React from 'react';
import {Icon} from '@rneui/base';
import Colors from '../constants/Colors';
import {WINDOW_WIDTH} from '../utils/ScreenLayout';
import CustomeButton from './CustomeButton';

const AlertModal = ({
  visible,
  iconName,
  iconColor,
  icontype,
  textToShow,
  cancelBtnPress,
  ConfirmBtnPress,
  Component,
}) => {
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          //   setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View
            style={[
              styles.modalView,
              {backgroundColor: Colors.screenBackground},
            ]}>
            <Icon name={iconName} type={icontype} size={80} color={iconColor} />
            <Text
              style={[
                styles.modalText,
                styles.cardHeadingTxt,
                {color: Colors.pureBlack},
              ]}>
              {textToShow}
            </Text>
            {Component && Component}

            <View
              style={{
                flexDirection: 'row',
                columnGap: 50,
                marginTop: 10,
              }}>
              <CustomeButton
                btnTitle={'cancel'}
                color={Colors.orange}
                buttonStyle={{width: WINDOW_WIDTH * 0.2}}
                onPress={() => cancelBtnPress()}
              />

              <CustomeButton
                btnTitle={'save'}
                color={Colors.aprroved}
                buttonStyle={{width: WINDOW_WIDTH * 0.2}}
                onPress={() => ConfirmBtnPress()}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default AlertModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,

    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    maxWidth: '65%',
    fontFamily: Colors.fontFamilyBookMan,
  },
  cardHeadingTxt: {
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 21,
    textTransform: 'uppercase',
    fontFamily: Colors.fontFamilyBookMan,
  },
});
