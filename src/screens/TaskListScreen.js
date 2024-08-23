import {
  StyleSheet,
  View,
  SafeAreaView,
  FlatList,
  RefreshControl,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useEffect} from 'react';
import Colors from '../constants/Colors';
import {WINDOW_WIDTH, WINDOW_HEIGHT} from '../utils/ScreenLayout';
import moment from 'moment';
import DataNotFound from '../components/DataNotFound';
import CardComponent from '../components/CardComponent';
import CustomeHeader from '../components/CustomeHeader';
import IconType from '../constants/IconType';
import FloatingAddButton from '../components/FloatingAddButton';
import AlertModal from '../components/AlertModal';
import Input from '../components/Input';
import SearchBar from '../components/SearchBar';

const TaskListScreen = ({navigation}) => {
  /*declare useState variable here */
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [taskId, setTaskId] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [text, setText] = useState('');
  const [listData, setListData] = useState([]);

  useEffect(() => {
    fetchTask();
  }, []);

  /*function for fetching data from asynstorage*/
  const fetchTask = async () => {
    const result = await AsyncStorage.getItem('todoList');
    if (result !== null) {
      setListData(JSON.parse(result));
    }
  };

  /*function for adding new data*/
  const storeNewData = async () => {
    const note = {id: Date.now(), data: text, time: Date.now()};
    const updateNotes = [...listData, note];
    setListData(updateNotes);
    await AsyncStorage.setItem('todoList', JSON.stringify(updateNotes));
    setText();
    setAddModalVisible(false);
  };

  /*function for deleting  data*/
  const deleteTask = async id => {
    const updateNotes = listData.filter(itm => itm?.id !== id);
    setListData(updateNotes);
    await AsyncStorage.setItem('todoList', JSON.stringify(updateNotes));
    setDeleteModalVisible(false);
    setTaskId('');
  };

  /*function for updating data*/
  const updateTask = async () => {
    const updatedArray = listData?.map(item =>
      item?.id === taskId ? {...item, data: text} : item,
    );
    setListData(updatedArray);
    await AsyncStorage.setItem('todoList', JSON.stringify(updatedArray));
    setUpdateModalVisible(false);
    setTaskId('');
    setText('');
  };

  /*function for refreshing the  data*/
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      fetchTask();
      setRefreshing(false);
    }, 2000);
  }, []);

  /* if we got no data for flatlist*/
  const renderEmptyComponent = () => (
    <View
      style={{
        height: WINDOW_HEIGHT * 0.6,
      }}>
      <DataNotFound />
    </View>
  );

  /*fucntion for handling the action button */
  const handleAction = actionButton => {
    switch (actionButton.typeOfButton) {
      case 'edit':
        setUpdateModalVisible(true);
        setTaskId(actionButton?.itemData?.id);
        setText(actionButton?.itemData?.data);

        break;
      case 'delete':
        setDeleteModalVisible(true), setTaskId(actionButton?.itemData?.id);
        break;

      default:
        break;
    }
  };

  /* flatlist render ui */
  const renderItem = ({item, index}) => {
    return (
      <View key={index}>
        <CardComponent
          headerName={`Task ${index + 1}`}
          allData={item}
          data={[
            {
              key: 'Task data',
              value: item?.data ?? '- - -',
            },
          ]}
          status={[
            {
              key: 'date',
              value: moment(item.time).format('DD-MM-YYYY'),
              color: Colors.pending,
            },
          ]}
          editButton={true}
          deleteButton={true}
          action={handleAction}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.screenBackground}}>
      <CustomeHeader
        leftIconPress={() => console.log('back pressed')}
        headerTitle={'To do list'}
        lefIconName={'chevron-back'}
        lefIconType={IconType.Ionicons}
        rightIconName={'home'}
        rightIcontype={IconType.AntDesign}
        rightIconPress={() => navigation.navigate('DropDownScreen')}
      />

      {/*Seacrh componenet */}
      <SearchBar
        searchHeight={WINDOW_HEIGHT * 0.06}
        searchWidth={WINDOW_WIDTH * 0.9}
        onChangeText={val => {
          setSearchText(val);
        }}
        placeholderText={'Search ...'}
        value={searchText}
        onRightIconPress={() => {
          setSearchText('');
        }}
      />

      <FlatList
        data={
          searchText
            ? listData.filter(item =>
                item.data.toLowerCase().includes(searchText.toLowerCase()),
              )
            : listData
        }
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={item => item?.id?.toString()}
        contentContainerStyle={{paddingBottom: 50}}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={renderEmptyComponent}
      />
      {/* modal view for ACTION */}
      {deleteModalVisible && (
        <AlertModal
          visible={deleteModalVisible}
          iconName={'delete-circle-outline'}
          icontype={IconType.MaterialCommunityIcons}
          iconColor={Colors.red}
          textToShow={'ARE YOU SURE YOU WANT TO DELETE THIS!!'}
          cancelBtnPress={() => setDeleteModalVisible(!deleteModalVisible)}
          ConfirmBtnPress={() => deleteTask(taskId)}
        />
      )}

      {addModalVisible && (
        <AlertModal
          visible={addModalVisible}
          iconName={'format-list-bulleted-add'}
          icontype={IconType.MaterialIcons}
          iconColor={Colors.aprroved}
          textToShow={'ARE YOU SURE YOU WANT TO add THIS!!'}
          cancelBtnPress={() => {
            setAddModalVisible(!addModalVisible), setText('');
          }}
          ConfirmBtnPress={() => storeNewData(text)}
          Component={
            <Input multiline value={text} onChangeText={txt => setText(txt)} />
          }
        />
      )}
      {updateModalVisible && (
        <AlertModal
          visible={updateModalVisible}
          iconName={'edit'}
          icontype={IconType.Feather}
          iconColor={Colors.aprroved}
          textToShow={'ARE YOU SURE YOU WANT TO update THIS!!'}
          cancelBtnPress={() => {
            setUpdateModalVisible(!updateModalVisible), setText('');
          }}
          ConfirmBtnPress={() => updateTask()}
          Component={
            <Input multiline value={text} onChangeText={txt => setText(txt)} />
          }
        />
      )}

      {/* View for floating button */}
      <View
        style={{
          marginTop: WINDOW_HEIGHT * 0.8,
          marginLeft: WINDOW_WIDTH * 0.8,
          position: 'absolute',
        }}>
        <FloatingAddButton
          backgroundColor={Colors.purple}
          onPress={() => {
            setAddModalVisible(true);
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default TaskListScreen;

const styles = StyleSheet.create({});
