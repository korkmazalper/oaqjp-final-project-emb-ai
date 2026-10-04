import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Profile({ navigation }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    (async () => {
      const storedName = await AsyncStorage.getItem("firstName");
      const storedLastName = await AsyncStorage.getItem("lastName");
      const storedEmail = await AsyncStorage.getItem("email");
      const storedPhone = await AsyncStorage.getItem("phone");

      if (storedName) setFirstName(storedName);
      if (storedLastName) setLastName(storedLastName);
      if (storedEmail) setEmail(storedEmail);
      if (storedPhone) setPhone(storedPhone);
    })();
  }, []);

  const handleSave = async () => {
    await AsyncStorage.setItem("firstName", firstName);
    await AsyncStorage.setItem("lastName", lastName);
    await AsyncStorage.setItem("email", email);
    await AsyncStorage.setItem("phone", phone);
    alert("Changes saved!");
  };

  const handleLogout = async () => {
    await AsyncStorage.clear();
    navigation.replace("Onboarding");
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.sectionTitle}>Personal information</Text>

      <Text style={styles.avatarLabel}>Avatar</Text>
      <View style={styles.avatarContainer}>
        <Image
          source={require("../assets/profile.png")}
          style={styles.avatar}
        />
        <Pressable style={styles.changeBtn}>
          <Text style={styles.changeBtnText}>Change</Text>
        </Pressable>
        <Pressable style={styles.removeBtn}>
          <Text style={styles.removeBtnText}>Remove</Text>
        </Pressable>
      </View>

      <Text style={styles.label}>First name</Text>
      <TextInput
        style={styles.input}
        value={firstName}
        onChangeText={setFirstName}
      />

      <Text style={styles.label}>Last name</Text>
      <TextInput
        style={styles.input}
        value={lastName}
        onChangeText={setLastName}
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <Text style={styles.label}>Phone number</Text>
      <TextInput
        style={styles.input}
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />

      <Pressable style={styles.logoutBtn} onPress={handleLogout}>
        <Text style={styles.logoutBtnText}>Log out</Text>
      </Pressable>

      <View style={styles.actionRow}>
        <Pressable
          style={styles.discardBtn}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.discardText}>Discard changes</Text>
        </Pressable>
        <Pressable style={styles.saveBtn} onPress={handleSave}>
          <Text style={styles.saveText}>Save changes</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginVertical: 10 },
  avatarLabel: { color: "#666", fontSize: 12, marginTop: 10 },
  avatarContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  avatar: { width: 60, height: 60, borderRadius: 30, marginRight: 15 },
  changeBtn: {
    backgroundColor: "#495E57",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginRight: 10,
  },
  changeBtnText: { color: "#fff", fontWeight: "bold" },
  removeBtn: {
    borderWidth: 1,
    borderColor: "#495E57",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  removeBtnText: { color: "#495E57", fontWeight: "bold" },
  label: { marginTop: 12, color: "#666", fontSize: 12, fontWeight: "bold" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginTop: 4,
    fontSize: 16,
  },
  logoutBtn: {
    backgroundColor: "#F4CE14",
    padding: 12,
    borderRadius: 8,
    marginTop: 25,
    alignItems: "center",
  },
  logoutBtnText: { fontWeight: "bold", fontSize: 16 },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  discardBtn: {
    borderWidth: 1,
    borderColor: "#495E57",
    padding: 12,
    borderRadius: 8,
    flex: 0.48,
    alignItems: "center",
  },
  discardText: { color: "#495E57", fontWeight: "bold" },
  saveBtn: {
    backgroundColor: "#495E57",
    padding: 12,
    borderRadius: 8,
    flex: 0.48,
    alignItems: "center",
  },
  saveText: { color: "#fff", fontWeight: "bold" },
});
