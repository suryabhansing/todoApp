import React from 'react';
import Input from './Input';
import DataNotFound from './DataNotFound';
import {View} from 'react-native';

const DynamicForm = ({formik, selectedId}) => {
  const inputFields = formik?.values?.inputField || [];

  // Find the object that matches the selectedId
  const selectedField = inputFields.find(field => field?.id === selectedId);

  if (!selectedField) {
    return (
      <View>
        <DataNotFound />
      </View>
    );
  }

  return (
    <>
      {Object.keys(selectedField).map((key, index) => {
        // Skip the 'id' key
        if (key === 'id') return null;

        // Access the error message directly
        const fieldName = `inputField.${inputFields.findIndex(
          field => field.id === selectedId,
        )}.${key}`;
        const dummyArr = fieldName.split('.');
        const errorFieldName = dummyArr[dummyArr.length - 1];

        return (
          <Input
            key={index}
            multiline
            title={key}
            value={selectedField[key] || ''}
            onChangeText={txt => {
              const newValues = inputFields.map(field =>
                field.id === selectedId ? {...field, [key]: txt} : field,
              );
              formik.setFieldValue('inputField', newValues);
            }}
            errorMessage={formik?.errors?.inputField?.[0]?.[errorFieldName]}
          />
        );
      })}
    </>
  );
};

export default DynamicForm;
