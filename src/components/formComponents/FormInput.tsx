import React, { ChangeEvent } from "react";
import { Input } from "@chakra-ui/react";
import FormWrapper from "./FormWrapper";
import { IFormInputProps } from "@src/interface/forms";
import { useData } from "@src/containers/home/DataProvider";

const FormInput = React.forwardRef<HTMLInputElement, IFormInputProps>(
  (
    {
      tab,
      name,
      label,
      placeholder,
      type,
      value,
      onChange,
      onBlur,
      error,
      touched,
      inputProps = {},
      children,
      helperText,
      wrapperProps = {},
    },
    ref
  ) => {
    const store = useData();
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      // As onChange is an optional parameter
      onChange && onChange(e);

      const value = e.target.value;
      store?.setState((prev) => {
        const state = { ...prev };
        state[tab][name] = value;
        return state;
      });
    };

    return (
      <FormWrapper
        isInvalid={Boolean(error && touched)}
        wrapperProps={wrapperProps}
        helperText={helperText}
        label={label}
        touched={touched}
        error={error as string}
      >
        <Input
          name={name}
          placeholder={placeholder}
          type={type}
          value={value}
          onChange={(e) => handleChange(e)}
          onBlur={onBlur}
          // styles
          width="100%"
          maxHeight="none !important"
          minW="272px"
          height="45px"
          fontSize="0.875rem"
          fontWeight="500"
          px="20px"
          border="1px solid #c0bcd7"
          bg="inputBg"
          borderRadius="10px"
          focusBorderColor="primary"
          errorBorderColor="errorRed"
          _placeholder={{
            color: "text.placeholder",
          }}
          ref={ref}
          {...inputProps}
        />
        {children}
      </FormWrapper>
    );
  }
);

FormInput.displayName = "FormInput";

export default FormInput;
