import { Button, Flex, Box } from "@chakra-ui/react";
import React, { ChangeEvent } from "react";
import FormSelect from "../../components/formComponents/FormSelect";
import { useFormik } from "formik";
import * as Yup from "yup";
import { PageNumbers } from "../../interface/home";
import { IInterViewSettings } from "../../interface/forms";
import {
  interviewDurationOptions,
  interviewLanguageOptions,
  interviewModeOptions,
} from "./constants";
import { useData } from "./DataProvider";

const InterviewDetailsForm: React.FC<{
  handleTab: (n: PageNumbers) => void;
}> = ({ handleTab }) => {
  const store = useData();

  const {
    errors,
    touched,
    handleSubmit,
    values,
    setFieldTouched,
    setFieldValue,
  } = useFormik<IInterViewSettings>({
    initialValues: {
      ...(store?.state.interviewSettings as IInterViewSettings),
    },
    validationSchema: Yup.object().shape({
      interviewMode: Yup.string().required("Interview Mode is required"),
      interviewDuration: Yup.string().required(
        "Interview Duration is required"
      ),
      interviewLanguage: Yup.string().required(
        "Interview language is required"
      ),
    }),
    onSubmit: (values) => {
      console.log({ values });
      alert("Form successfully submitted");
    },
  });

  const handleChange = (field: string, value: any) => {
    const name = field;
    setFieldValue(name, value);
    store?.setState((prev) => {
      const state = { ...prev };
      switch (name) {
        case "interviewMode":
          state.interviewSettings.interviewMode = value;
          break;
        case "interviewDuration":
          state.interviewSettings.interviewDuration = value;
          break;
        case "interviewLanguage":
          state.interviewSettings.interviewLanguage = value;
      }
      return state;
    });
  };

  return (
    <Box width="100%" as="form" onSubmit={handleSubmit as any}>
      <Box width="100%">
        <FormSelect
          tab="interviewSettings"
          label="Interview Mode"
          placeholder="Select interview mode"
          name="interviewMode"
          options={interviewModeOptions}
          onChange={handleChange}
          onBlur={setFieldTouched}
          value={values?.interviewMode}
          error={errors?.interviewMode}
          touched={touched?.interviewMode}
        />
        <FormSelect
          tab="interviewSettings"
          label="Interview Duration"
          placeholder="Select interview duration"
          name="interviewDuration"
          options={interviewDurationOptions}
          onChange={handleChange}
          onBlur={setFieldTouched}
          value={values?.interviewDuration}
          error={errors?.interviewDuration}
          touched={touched?.interviewDuration}
        />
        <FormSelect
          tab="interviewSettings"
          label="Job Location"
          name="interviewLanguage"
          placeholder="Select interview language"
          options={interviewLanguageOptions}
          onChange={handleChange}
          onBlur={setFieldTouched}
          error={errors.interviewLanguage}
          touched={touched.interviewLanguage}
          value={values.interviewLanguage}
        />
        <Flex w="100%" justify="flex-end" mt="4rem" gap="20px">
          <Button colorScheme="gray" type="button" onClick={() => handleTab(1)}>
            Previous
          </Button>
          <Button colorScheme="red" type="submit">
            Submit
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default InterviewDetailsForm;
