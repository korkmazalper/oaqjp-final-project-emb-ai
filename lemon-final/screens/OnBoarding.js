import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Onboarding({ navigation }) {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");

  const isEmailValid = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isFormValid = firstName.trim().length > 0 && isEmailValid(email);

  const handleNext = async () => {
    if (isFormValid) {
      await AsyncStorage.setItem("userToken", "true");
      await AsyncStorage.setItem("firstName", firstName);
      await AsyncStorage.setItem("email", email);
      navigation.replace("Home");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.header}>
        <Image
          source={require("../assets/logo-lemon.jpg")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <View style={styles.hero}>
        <Text style={styles.title}>Little Lemon</Text>
        <Text style={styles.subtitle}>Chicago</Text>
        <Text style={styles.desc}>
          We are a family owned Mediterranean restaurant, focused on traditional
          recipes served with a modern twist.
        </Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>First Name *</Text>
        <TextInput
          style={styles.input}
          value={firstName}
          onChangeText={setFirstName}
          placeholder="First Name"
        />

        <Text style={styles.label}>Email *</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholder="Email"
        />

        <Pressable
          style={[styles.btn, !isFormValid && styles.btnDisabled]}
          disabled={!isFormValid}
          onPress={handleNext}
        >
          <Text style={styles.btnText}>Next</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#DEE3E9",
  },
  header: {
    height: 70,
    backgroundColor: "#DEE3E9",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 10,
  },
  logo: {
    width: 180,
    height: 45,
  },
  hero: {
    backgroundColor: "#495E57",
    padding: 20,
  },
  title: {
    fontSize: 36,
    color: "#F4CE14",
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 24,
    color: "#FFFFFF",
    marginTop: -5,
  },
  desc: {
    color: "#FFFFFF",
    fontSize: 14,
    marginTop: 10,
    lineHeight: 20,
  },
  form: {
    padding: 20,
    flex: 1,
    justifyContent: "flex-start",
  },
  label: {
    fontSize: 18,
    marginTop: 15,
    color: "#333333",
    fontWeight: "600",
  },
  input: {
    borderWidth: 1.5,
    borderColor: "#495E57",
    backgroundColor: "#EDEFEE",
    borderRadius: 8,
    padding: 12,
    marginTop: 8,
    fontSize: 16,
  },
  btn: {
    backgroundColor: "#495E57",
    padding: 14,
    borderRadius: 8,
    marginTop: 30,
    alignItems: "center",
  },
  btnDisabled: {
    backgroundColor: "#A1A1A1",
  },
  btnText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
});
