import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  Pressable,
  Alert,
  StyleSheet,
} from "react-native";
import { validateEmail } from "../utils/EmailValidator";

const SubscribeScreen = () => {
  const [email, setEmail] = useState("");
  const isEmailValid = validateEmail(email);

  const handleSubscribe = () => {
    Alert.alert("Thanks for subscribing, stay tuned!");
    setEmail("");
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/little-lemon-logo-grey.png")}
        style={styles.logo}
        resizeMode="contain"
        accessible={true}
        accessibilityLabel="Little Lemon Logo"
      />
      <Text style={styles.title}>
        Subscribe to our newsletter for our latest delicious recipes!
      </Text>

      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Type your email"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Pressable
        style={[styles.button, !isEmailValid && styles.buttonDisabled]}
        onPress={handleSubscribe}
        disabled={!isEmailValid}
      >
        <Text style={styles.buttonText}>Subscribe</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
  },
  logo: {
    width: 100,
    height: 100,
    marginTop: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    textAlign: "center",
    color: "#333333",
    marginBottom: 24,
  },
  input: {
    height: 48,
    width: "100%",
    borderColor: "#333333",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#495E57",
    width: "100%",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonDisabled: {
    backgroundColor: "#CCCCCC",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default SubscribeScreen;
