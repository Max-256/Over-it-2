import React, { useContext, useState } from "react";
import { StyleSheet, Image } from "react-native";
import * as Yup from "yup";
import jwtDecode from "jwt-decode";

import Screen from "../components/Screen";
import {
  ErrorMessage,
  Form,
  FormField,
  SubmitButton,
} from "../components/forms";
import auth from "../api/auth";
import AuthContext from "../auth/context";
import authStorage from "../auth/storage";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

function LoginScreen(props) {
  const authContext = useContext(AuthContext);
  const [loginFailed, setLoginFailed] = useState(false);

  const handleSubmit = async ({ email, password }) => {
    const result = await auth.login(email, password);
    if (!result.ok) return setLoginFailed(true);

    const user = jwtDecode(result.data);
    authContext.setUser(user);
    authStorage.storeToken(result.data);
  };

  return (
    <Screen style={styles.container}>
      <Image style={styles.logo} source={require("../assets/logo-red.png")} />

      <Form
        initialValues={{ email: "", password: "" }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <ErrorMessage error="Invalid email or password" visible={loginFailed} />
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="email"
          keyboardType="email-address"
          name="email"
          placeholder="Email"
          textContentType="emailAddress"
        />
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="lock"
          name="password"
          placeholder="Password"
          secureTextEntry
          textContentType="password"
        />
        <SubmitButton title="Login" />
      </Form>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  logo: {
    width: 80,
    height: 80,
    alignSelf: "center",
    marginTop: 50,
    marginBottom: 20,
  },
});

export default LoginScreen;
