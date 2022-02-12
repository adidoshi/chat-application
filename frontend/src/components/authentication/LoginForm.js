import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import FormikControl from "../loginRegister/FormikControl";
import { Button, Center, useToast } from "@chakra-ui/react";
import axios from "axios";

const LoginForm = () => {
  const history = useHistory();
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const savedData = {
    email: "test@example.com",
    password: "test@123",
  };

  const iniitialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid Email Format").required("Required"),
    password: Yup.string()
      .min(6, "Password is too short - should be 6 chars minimum.")
      .required("Required"),
  });

  const onSubmit = async (values) => {
    setLoading(true);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/user/login",
        { email: values.email, password: values.password },
        config
      );
      toast({
        title: "Login successfull",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      history.go("/chats");
    } catch (error) {
      toast({
        title: "Error occured",
        description: error.response.data,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };

  return (
    <>
      <Formik
        initialValues={formData || iniitialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        enableReinitialize>
        {(formik) => {
          return (
            <Form>
              <FormikControl
                control="chakrainput"
                type="email"
                name="email"
                label="Email"
                holder="Enter your email"
                val={formik.values.email}
              />

              <FormikControl
                control="chakrapasswordinp"
                name="password"
                label="Password"
                holder="Enter a password"
                val={formik.values.password}
              />

              <Center>
                <Button type="submit" colorScheme="blue" variant="solid" my={1}>
                  Signin
                </Button>
              </Center>
              <Center>
                <Button
                  type="button"
                  isLoading={loading}
                  colorScheme="red"
                  variant="solid"
                  my={1}
                  onClick={() => setFormData(savedData)}>
                  Get Test User Credentials
                </Button>
              </Center>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default LoginForm;

// window.location.reload();
