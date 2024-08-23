import * as Yup from 'yup';

export const getEducationFormSchema = selectedId => {
  switch (selectedId) {
    case 1:
      return Yup.object({
        roll_No: Yup.string().required('Roll number is required'),
        percentage: Yup.number()
          .required('Percentage is required')
          .min(0, 'Percentage must be at least 0')
          .max(100, 'Percentage cannot exceed 100'),
        passing_year: Yup.string().required('Passing year is required'),
        school_name: Yup.string().required('School name is required'),
      });
    case 2:
      return Yup.object({
        roll_no: Yup.string().required('Roll number is required'),
        percentage: Yup.number()
          .required('Percentage is required')
          .min(0, 'Percentage must be at least 0')
          .max(100, 'Percentage cannot exceed 100'),
      });
    case 3:
      return Yup.object({
        enrollment_no: Yup.string().required('Enrollment number is required'),
        cgpa: Yup.number()
          .required('CGPA is required')
          .min(0, 'CGPA must be at least 0')
          .max(10, 'CGPA cannot exceed 10'),
        university: Yup.string().required('University is required'),
        email: Yup.string()
          .email('Invalid email address')
          .required('Email is required'),
      });
    default:
      return Yup.object({}); // Return an empty object if no valid id is found
  }
};

export const addFormRequestSchema = selectedId => {
  return Yup.object().shape({
    inputField: Yup.array().of(getEducationFormSchema(selectedId)),
  });
};
