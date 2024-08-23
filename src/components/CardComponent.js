import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import SeparatorComponent from './SeparatorComponent';
import Colors from '../constants/Colors';
import {WINDOW_HEIGHT, WINDOW_WIDTH} from '../utils/ScreenLayout';
import {Icon, Card} from '@rneui/themed';
import IconType from '../constants/IconType';

const CardComponent = ({
  headerName, //key for displaying header of card
  data, //contain key value pair to display data
  allData, //contain all data
  editButton,
  deleteButton,
  rightStatus,
  status,
  action,
}) => {
  return (
    <Card
      containerStyle={{
        borderRadius: 12,
        borderColor: Colors.gray,
        borderWidth: WINDOW_WIDTH * 0.001,
      }}>
      <View style={styles.cardContainer}>
        {headerName ? (
          <>
            <Text style={[styles.headingTxt, {color: Colors.purple}]}>
              {headerName}
            </Text>
            <SeparatorComponent
              separatorColor={Colors.gray2}
              separatorHeight={0.5}
            />
          </>
        ) : null}

        <View style={{flex: 1, alignContent: 'center'}}>
          {data.map((itm, index) => (
            <View
              key={index}
              style={{
                flex: 1,
                justifyContent: 'center',
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                {itm?.key && (
                  <Text
                    numberOfLines={2}
                    style={[
                      styles.cardHeadingTxt,
                      {color: Colors.pureBlack, maxWidth: '50%'},
                    ]}>
                    {itm.key} :{' '}
                  </Text>
                )}

                {itm?.component ? (
                  itm?.component
                ) : (
                  <Text
                    numberOfLines={2}
                    ellipsizeMode="tail"
                    style={[
                      styles.cardtext,
                      {
                        color: itm?.keyColor || Colors.pureBlack,
                      },
                    ]}>
                    {itm.value ? itm?.value : '- - -'}
                  </Text>
                )}
              </View>
            </View>
          ))}
        </View>

        {status && (
          <View style={styles.actionView}>
            {status[0]?.key && (
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text
                  style={[styles.cardHeadingTxt, {color: Colors.pureBlack}]}>
                  {status[0]?.key} :{' '}
                </Text>
                {status[0]?.value && (
                  <View style={{padding: 5}}>
                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={[
                        styles.cardtext,
                        {color: status[0]?.color || Colors.pureBlack},
                      ]}>
                      {status[0]?.value}
                    </Text>
                  </View>
                )}
                {status[0]?.component && status[0]?.component}
              </View>
            )}

            <View style={styles.actionView2}>
              {rightStatus && (
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  {rightStatus[0]?.key && (
                    <Text
                      style={[
                        styles.cardHeadingTxt,
                        {color: Colors.pureBlack},
                      ]}>
                      {rightStatus[0]?.key} :{' '}
                    </Text>
                  )}
                </View>
              )}

              {editButton && (
                <Icon
                  name={'edit'}
                  type={IconType.Feather}
                  color={Colors.aprroved}
                  style={styles.actionIcon}
                  onPress={action.bind(this, {
                    typeOfButton: 'edit',
                    itemData: allData,
                  })}
                />
              )}
              {deleteButton && (
                <Icon
                  name="delete"
                  type={IconType.AntDesign}
                  color={Colors.red}
                  onPress={action.bind(this, {
                    typeOfButton: 'delete',
                    itemData: allData,
                  })}
                />
              )}
            </View>
          </View>
        )}
      </View>
    </Card>
  );
};

export default CardComponent;

const styles = StyleSheet.create({
  headingTxt: {
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: 0.2,
    textTransform: 'uppercase',
    alignSelf: 'center',
    marginBottom: 2,
  },
  cardContainer: {
    margin: WINDOW_WIDTH * 0.03,
    flex: 1,
    rowGap: WINDOW_HEIGHT * 0.01,
  },

  cardtext: {
    fontSize: 12,
    fontWeight: '300',
    lineHeight: 20,
    textTransform: 'uppercase',
    flexShrink: 1,
  },
  actionView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionIcon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionView2: {
    maxWidth: '50%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    columnGap: 10,
  },
  cardHeadingTxt: {
    fontSize: 13,
    fontWeight: '600',
    lineHeight: 20,
    textTransform: 'uppercase',
  },
});
