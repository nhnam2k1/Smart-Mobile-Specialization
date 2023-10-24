import react, { useState, useEffect } from "react";
import backgroundImage from "../../assets/background.png";
import logoImage from "../../assets/logo.png";
import RegistrationScreen from "./Registration";
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

export default function Login(props) {
  const [user, setUserAccountDetails] = useState({
    username: "a",
    password: "a",
  });
  // const [savedUser, setSavedUserAccountDetails] = useState({
  //   username: "a",
  //   password: "a",
  // });
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [success, setSuccess] = useState("");

  const [goToRegisterScreen, setGoToRegister] = useState(false);

  const handleLogin = () => {
    // Check if username and password are valid
    loadCredentials();
    if (user.username === username && user.password === password) {
      setSuccess("Login Successful");
      props.setLoggedInStatus(true);
    } else {
      setSuccess("Invalid username or password");
    }
  };

  const goToRegister = () => {
    //open register screen
    setGoToRegister(true);
  };
  useEffect(() => {
    // Load the username and password from AsyncStorage (if previously saved)
    loadCredentials();
  }, []);
  const loadCredentials = async () => {
    try {
      const storedUsername = await AsyncStorage.getItem("username");
      const storedPassword = await AsyncStorage.getItem("password");
      if (storedUsername && storedPassword) {
        setUsername(storedUsername);
        setPassword(storedPassword);
      }
    } catch (error) {
      console.error("Error loading credentials:", error);
    }
  };

  const keyboardVerticalOffset = Platform.OS === "ios" ? 40 : -120;
  return goToRegisterScreen ? (
    <RegistrationScreen goGoToRegister={setGoToRegister} />
  ) : (
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
                <Text style={styles.formTitle}>Log In</Text>

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

                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                  <Text style={styles.buttonText}>Log In</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.newAccountButton}
                  onPress={goToRegister}
                >
                  <Text style={styles.buttonText}>Create New Account</Text>
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
    marginTop: 430,
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
    marginBottom: 10,
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
  newAccountButton: {
    width: 188,
    height: 38,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    borderRadius: 50,
  },
});
