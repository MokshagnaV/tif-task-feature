import { Button, Flex, Box } from "@chakra-ui/react";
import React, { ChangeEvent } from "react";
import FormInput from "../../components/formComponents/FormInput";
import { useFormik } from "formik";
import * as Yup from "yup";
import { PageNumbers } from "../../interface/home";
import { IJobDetails } from "../../interface/forms";
import { useData } from "./DataProvider";

const JobDetailsForm: React.FC<{
  handleTab: (n: PageNumbers) => void;
}> = ({ handleTab }) => {
  const store = useData();
  const { handleChange, errors, touched, handleBlur, handleSubmit, values } =
    useFormik<IJobDetails>({
      initialValues: {
        ...(store?.state.jobDetails as IJobDetails),
      },
      validationSchema: Yup.object().shape({
        jobTitle: Yup.string().required("Job Title is required"),
        jobDetails: Yup.string().required("Job Details is required"),
        jobLocation: Yup.string().required("Job Location is required"),
        /* The below is not required because 'It states that jobPosition is 
         a required field in the form, and any field in the form is not using this value
         so, we cannot see any errors on UI. But Formik will consider that form is incomplete and 
         doesn't triggers onSubmit'. The instruction to go to next tab lies in onSubmit*/
        // jobPosition: Yup.string().required("Job position is required"),
      }),
      onSubmit: (values) => {
        console.log({ values });
        handleTab(2);
      },
    });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    handleChange(e);
    store?.setState((prev) => {
      const state = { ...prev };
      switch (name) {
        case "jobTitle":
          state.jobDetails.jobTitle = value;
          break;
        case "jobDetails":
          state.jobDetails.jobDetails = value;
          break;
        case "jobLocation":
          state.jobDetails.jobLocation = value;
          break;
      }
      return state;
    });
  };

  return (
    <Box width="100%" as="form" onSubmit={handleSubmit as any}>
      <Box width="100%">
        <FormInput
          tab="jobDetails"
          label="Job Title"
          placeholder="Enter job title"
          name="jobTitle"
          onChange={handleInputChange}
          onBlur={handleBlur}
          value={values?.jobTitle}
          error={errors?.jobTitle}
          touched={touched?.jobTitle}
        />
        <FormInput
          tab="jobDetails"
          label="Job Details"
          placeholder="Enter job details"
          name="jobDetails"
          onChange={handleInputChange}
          onBlur={handleBlur}
          value={values?.jobDetails}
          error={errors?.jobDetails}
          touched={touched?.jobDetails}
        />
        <FormInput
          tab="jobDetails"
          label="Job Location"
          name="jobLocation"
          placeholder="Enter job location"
          onChange={handleInputChange}
          onBlur={handleBlur}
          error={errors.jobLocation}
          touched={touched.jobLocation}
          value={values.jobLocation}
        />
        <Flex w="100%" justify="flex-end" mt="4rem" gap="20px">
          <Button colorScheme="gray" type="button" onClick={() => handleTab(0)}>
            Previous
          </Button>
          <Button colorScheme="red" type="submit">
            Next
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default JobDetailsForm;
