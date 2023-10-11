import { Button, Flex, Box } from "@chakra-ui/react";
import React, { ChangeEvent } from "react";
import FormInput from "../../components/formComponents/FormInput";
import FormSelect from "../../components/formComponents/FormSelect";
import { useFormik } from "formik";
import * as Yup from "yup";
import { PageNumbers } from "../../interface/home";
import { IRequisitionDetails } from "../../interface/forms";
import { genderOptions, urgencyOptions } from "./constants";
import { useData } from "./DataProvider";

const RequisitionDetailsForm: React.FC<{
  handleTab: (n: PageNumbers) => void;
}> = ({ handleTab }) => {
  const store = useData();

  const {
    handleChange,
    errors,
    touched,
    handleBlur,
    handleSubmit,
    values,
    setFieldTouched,
    setFieldValue,
    isValid,
  } = useFormik<IRequisitionDetails>({
    initialValues: {
      ...(store?.state.requisitionDetails as IRequisitionDetails),
    },
    validationSchema: Yup.object().shape({
      requisitionTitle: Yup.string().required("Requisition title is required"),
      noOfOpenings: Yup.number()
        .typeError("Enter a valid number")
        .required("Number of openings is required")
        .positive("Enter a valid number")
        .min(1, "Enter a valid number"),
      urgency: Yup.string().required("Urgency is required"),
      gender: Yup.string().required("Gender is required"),
    }),
    onSubmit: (values) => {
      handleTab(1);
    },
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    handleChange(e);
    store?.setState((prev) => {
      const state = { ...prev };
      switch (name) {
        case "requisitionTitle":
          state.requisitionDetails.requisitionTitle = value;
          break;
        case "noOfOpenings":
          state.requisitionDetails.noOfOpenings = parseInt(value);
          break;
      }
      return state;
    });
  };

  const handleFieldChange = (field: string, value: any) => {
    const name = field;
    setFieldValue(name, value);
    store?.setState((prev) => {
      const state = { ...prev };
      switch (name) {
        case "gender":
          state.requisitionDetails.gender = value;
          break;
        case "urgency":
          state.requisitionDetails.urgency = value;
          break;
      }
      return state;
    });
  };

  return (
    <Box width="100%" as="form" onSubmit={handleSubmit as any}>
      <Box width="100%">
        <FormInput
          tab="requisitionDetails"
          label="Requisition Title"
          placeholder="Enter requisition title"
          name="requisitionTitle"
          onChange={handleInputChange}
          onBlur={handleBlur}
          value={values?.requisitionTitle}
          error={errors?.requisitionTitle}
          touched={touched?.requisitionTitle}
        />
        <FormInput
          tab="requisitionDetails"
          label="Number of openings"
          placeholder="Enter number of openings"
          name="noOfOpenings"
          onChange={handleInputChange}
          onBlur={handleBlur}
          value={values?.noOfOpenings}
          error={errors?.noOfOpenings}
          touched={touched?.noOfOpenings}
        />
        <FormSelect
          tab="requisitionDetails"
          label="Gender"
          name="gender"
          placeholder="Select gender"
          options={genderOptions}
          onChange={handleFieldChange}
          onBlur={setFieldTouched}
          error={errors.gender}
          touched={touched.gender}
          value={values.gender}
        />
        <FormSelect
          tab="requisitionDetails"
          label="Urgency"
          name="urgency"
          placeholder="Select urgency"
          options={urgencyOptions}
          onChange={handleFieldChange}
          onBlur={setFieldTouched}
          error={errors.urgency}
          touched={touched.urgency}
          value={values.urgency}
        />
        <Flex w="100%" justify="flex-end" mt="4rem">
          <Button colorScheme="red" type="submit">
            Next
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default RequisitionDetailsForm;
