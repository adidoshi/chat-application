import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import FormikControl from "../loginRegister/FormikControl";
import {
  Button,
  Center,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";

const SignupForm = () => {
  const history = useHistory();
  const [pic, setPic] = useState();
  const [picLoading, setPicLoading] = useState(false);
  const toast = useToast();

  const iniitialValues = {
    name: "",
    newEmail: "",
    newPassword: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    newEmail: Yup.string().email("Invalid Email Format").required("Required"),
    newPassword: Yup.string()
      .min(6, "Password is too short - should be 6 chars minimum.")
      .required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
      .required("Required"),
  });

  const onSubmit = async (values, onSubmitProps) => {
    setPicLoading(true);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/user/register",
        {
          name: values.name,
          email: values.newEmail,
          password: values.newPassword,
          pic,
        },
        config
      );
      toast({
        title: "Registration successfull",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      localStorage.setItem("userInfo", JSON.stringify(data));

      setPicLoading(false);
      history.go("/chats");
    } catch (error) {
      toast({
        title: "Error occured",
        description: error.response.data.message,
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
    }
    onSubmitProps.resetForm({});
  };

  const postDetails = (pics) => {
    setPicLoading(true);
    if (pics === undefined) {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "chat-application");
      data.append("cloud_name", "splashcloud");
      fetch("https://api.cloudinary.com/v1_1/splashcloud/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());

          setPicLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setPicLoading(false);
        });
    } else {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
      return;
    }
  };

  return (
    <>
      <Formik
        initialValues={iniitialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}>
        {(formik) => {
          return (
            <Form>
              <FormikControl
                control="chakrainput"
                type="text"
                name="name"
                label="First Name"
                holder="Enter your name"
                val={formik.values.name}
              />
              <FormikControl
                control="chakrainput"
                type="email"
                name="newEmail"
                label="Email"
                holder="Enter your email"
                val={formik.values.newEmail}
              />

              <FormikControl
                control="chakrapasswordinp"
                name="newPassword"
                label="Password"
                holder="Create a new password"
                val={formik.values.newPassword}
              />

              <FormikControl
                control="chakrapasswordinp"
                name="confirmPassword"
                label="Confirm Password"
                val={formik.values.confirmPassword}
              />

              <FormControl>
                <FormLabel>Upload your picture</FormLabel>
                <Input
                  type="file"
                  p={1}
                  mb={1}
                  accept="image/*"
                  onChange={(e) => postDetails(e.target.files[0])}
                />
              </FormControl>

              <Center>
                <Button
                  type="submit"
                  colorScheme="blue"
                  variant="solid"
                  isLoading={picLoading}
                  my={1}>
                  Register
                </Button>
                <Button
                  type="reset"
                  ms={2}
                  colorScheme="blue"
                  variant="outline">
                  Reset
                </Button>
              </Center>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default SignupForm;
