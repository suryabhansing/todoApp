import {StyleSheet, Text, View, SafeAreaView, ScrollView} from 'react-native';
import React, {useState} from 'react';
import CustomeHeader from '../components/CustomeHeader';
import IconType from '../constants/IconType';
import Colors from '../constants/Colors';
import DropDownComponent from '../components/DropDownComponent';
import {useFormik} from 'formik';
import {WINDOW_HEIGHT, WINDOW_WIDTH} from '../utils/ScreenLayout';

import DynamicForm from '../components/DynamicForm';
import {addFormRequestSchema} from '../utils/ValidationShema';
const DropDownScreen = () => {
  const [selectedId, setSelectedId] = useState('');

  const educationArray = [
    {label: '1oth', value: 1},
    {label: '12th', value: 2},
    {label: 'Graduation', value: 3},
  ];

  const formik = useFormik({
    enableReinitialize: 'true',
    initialValues: {
      inputField: [],
    },
    validationSchema: addFormRequestSchema(selectedId || ''),
    onSubmit: (values, {resetForm}) => {
      handleSubmit(values, resetForm);
    },
  });

  const handleSubmit = async (values, resetForm) => {};
  /*function for adding */
  const dyamicInput = id => {
    const exists = formik?.values?.inputField.some(field => field.id === id);
    if (exists) return;

    switch (id) {
      case 1:
        formik.setFieldValue(`inputField`, [
          ...formik?.values?.inputField,
          {
            id: id,
            roll_No: '',
            percentage: '',
            passing_year: '',
            school_name: '',
          },
        ]);
        break;
      case 2:
        formik.setFieldValue(`inputField`, [
          ...formik?.values?.inputField,
          {id: id, roll_no: '', percentage: ''},
        ]);
        break;
      case 3:
        formik.setFieldValue(`inputField`, [
          ...formik?.values?.inputField,
          {id: id, enrollment_no: '', cgpa: '', university: '', email: ''},
        ]);
        break;

      default:
        break;
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.screenBackground}}>
      <CustomeHeader
        leftIconPress={() => console.log('back pressed')}
        headerTitle={'Drop down screen'}
        lefIconName={'chevron-back'}
        lefIconType={IconType.Ionicons}
        rightIconName={'home'}
        rightIcontype={IconType.AntDesign}
        rightIconPress={() => console.log('Home pressed')}
      />
      <ScrollView>
        <View
          style={{
            marginHorizontal: WINDOW_WIDTH * 0.09,
            marginTop: WINDOW_HEIGHT * 0.02,
            rowGap: 10,
          }}>
          <DropDownComponent
            title={'education'}
            required={true}
            value={selectedId}
            data={educationArray}
            onChange={val => {
              setSelectedId(val?.value);
              dyamicInput(val?.value);
            }}
          />

          {<DynamicForm formik={formik} selectedId={selectedId} />}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DropDownScreen;

const styles = StyleSheet.create({});
