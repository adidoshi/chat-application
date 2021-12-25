import React, { useState } from "react";
import { Field } from "formik";
import {
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  InputGroup,
  Button,
  InputRightElement,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

function ChakraPasswordInp(props) {
  const [show, setShow] = useState(false);

  const handleClick = () => {
    setShow(!show);
  };
  const { label, name, ...rest } = props;
  return (
    <Field name={name}>
      {({ field, form }) => {
        return (
          <FormControl isInvalid={form.errors[name] && form.touched[name]}>
            <FormLabel htmlFor={name}>{label}</FormLabel>
            <InputGroup>
              <Input
                type={show ? "text" : "password"}
                id={name}
                {...rest}
                {...field}
                mb={2}
                value={props.val}
                placeholder={props.holder}
              />
              <InputRightElement>
                <Button me={2} size="sm" h="1.75rem" onClick={handleClick}>
                  {show ? <ViewOffIcon /> : <ViewIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage fontWeight="400" fontSize="md" mb={2}>
              {form.errors[name]}
            </FormErrorMessage>
          </FormControl>
        );
      }}
    </Field>
  );
}

export default ChakraPasswordInp;
