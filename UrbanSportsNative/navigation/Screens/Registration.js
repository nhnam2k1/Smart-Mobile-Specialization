import { StatusBar } from "expo-status-bar";
import react, { useState } from "react";
import backgroundImage from "../../assets/background.png";
import logoImage from "../../assets/logo.png";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

export default function RegistrationScreen(props) {
  const [user, setUserAccountDetails] = useState({
    username: "",
    password: "",
  });

  //save new account to local storage
  const saveCredentials = async () => {
    try {
      await AsyncStorage.setItem("username", user.username);
      await AsyncStorage.setItem("password", user.password);
      console.log("Credentials saved successfully.");
    } catch (error) {
      console.error("Error saving credentials:", error);
    }
  };

  const [repeatPassword, setRepeatPassword] = useState("");
  const [success, setSuccess] = useState("");

  const handleLogin = () => {
    if (
      user.username !== "" &&
      user.password !== "" &&
      user.password === repeatPassword
    ) {
      saveCredentials();
      setSuccess("Account created");
    } else {
      setSuccess("Failed");
    }
  };

  const goToLogin = () => {
    //open register screen
    props.goGoToRegister(false);
  };

  const keyboardVerticalOffset = Platform.OS === "ios" ? 40 : -120;

  return (
    <ImageBackground
      source={backgroundImage}
      resizeMode="cover"
      style={{ flex: 1 }}
      overlayColor="rgba(128, 128, 128, 0.9)"
    >
      <View style={styles.logoContainer}>
        <ImageBackground
          source={logoImage}
          resizeMode="cover"
          style={{ flex: 1 }}
          overlayColor="rgba(128, 128, 128, 0.9)"
        ></ImageBackground>
      </View>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={keyboardVerticalOffset}
      >
        <ScrollView>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
              <View style={styles.formContainer}>
                <Text style={styles.formTitle}>Create Account</Text>

                <TextInput
                  style={styles.input}
                  placeholder="Enter email"
                  placeholderTextColor="white"
                  onChangeText={(text) =>
                    setUserAccountDetails({ ...user, username: text })
                  }
                />
                <TextInput
                  style={styles.input}
                  placeholder="Enter password"
                  placeholderTextColor="white"
                  onChangeText={(text) =>
                    setUserAccountDetails({ ...user, password: text })
                  }
                  secureTextEntry
                />
                <TextInput
                  style={styles.input}
                  placeholder="Repeat password"
                  placeholderTextColor="white"
                  onChangeText={(text) => setRepeatPassword(text)}
                  secureTextEntry
                />

                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                  <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.newAccountButton}
                  onPress={goToLogin}
                >
                  <Text style={styles.buttonText}>Log In</Text>
                </TouchableOpacity>
                <Text style={styles.formTitle}>{success}</Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  coverImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: null,
    width: null,
  },
  input: {
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 12,
    backgroundColor: "rgba(175, 168, 172, 0.9)",
    borderRadius: 50,
  },
  formContainer: {
    marginTop: 400,
    width: 350,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: 188,
    height: 38,
    backgroundColor: "#69C123",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 13,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  formTitle: {
    color: "white",
    fontSize: 28,
    marginBottom: 22,
    fontWeight: "bold",
  },
  logoContainer: {
    position: "absolute",
    width: 160,
    height: 70,
    top: 20,
    right: 20,
  },
  //change this later
  newAccountButton: {
    width: 188,
    height: 38,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    borderRadius: 50,
  },
});
