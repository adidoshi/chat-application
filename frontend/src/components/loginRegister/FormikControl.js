import React from "react";
import ChakraInput from "./ChakraInput";
import ChakraPasswordInp from "./ChakraPasswordInp";

function FormikControl(props) {
  const { control, ...rest } = props;

  switch (control) {
    case "chakrainput":
      return <ChakraInput {...rest} />;
    case "chakrapasswordinp":
      return <ChakraPasswordInp {...rest} />;
    default:
      return null;
  }
}

export default FormikControl;
