import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  FlatList,
  TextInput,
} from "react-native";

const API_URL =
  "https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json";

export default function Home({ navigation }) {
  const [menu, setMenu] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setMenu(data.menu))
      .catch((err) => console.error(err));
  }, []);

  const categories = ["starters", "mains", "desserts", "drinks"];

  const filteredMenu = menu.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesCategory = selectedCategory
      ? item.category === selectedCategory
      : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <View style={styles.container}>
      {/* 1. Header */}
      <View style={styles.header}>
        <Image
          source={require("../assets/logo-lemon.jpg")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Pressable onPress={() => navigation.navigate("Profile")}>
          <Image
            source={require("../assets/profile.png")}
            style={styles.avatar}
          />
        </Pressable>
      </View>

      {/* 2. Hero Section */}
      <View style={styles.hero}>
        <Text style={styles.heroTitle}>Little Lemon</Text>
        <Text style={styles.heroSubtitle}>Chicago</Text>
        <Text style={styles.heroDesc}>
          We are a family owned Mediterranean restaurant...
        </Text>
        <TextInput
          style={styles.searchBar}
          placeholder="Search menu..."
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* 3. Menu Breakdown */}
      <View style={styles.breakdown}>
        <Text style={styles.breakdownTitle}>ORDER FOR DELIVERY!</Text>
        <View style={styles.categories}>
          {categories.map((cat) => (
            <Pressable
              key={cat}
              style={[
                styles.catBtn,
                selectedCategory === cat && styles.catBtnActive,
              ]}
              onPress={() =>
                setSelectedCategory(selectedCategory === cat ? "" : cat)
              }
            >
              <Text style={styles.catText}>{cat}</Text>
            </Pressable>
          ))}
        </View>
      </View>

      {/* 4. Food Menu List */}
      <FlatList
        data={filteredMenu}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.menuItem}>
            <View style={{ flex: 1 }}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemDesc} numberOfLines={2}>
                {item.description}
              </Text>
              <Text style={styles.itemPrice}>${item.price}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    marginTop: 25,
  },
  logo: { width: 150, height: 40 },
  avatar: { width: 40, height: 40, borderRadius: 20 },
  hero: { backgroundColor: "#495E57", padding: 15 },
  heroTitle: { fontSize: 28, color: "#F4CE14", fontWeight: "bold" },
  heroSubtitle: { fontSize: 20, color: "#fff" },
  heroDesc: { color: "#fff", marginVertical: 8 },
  searchBar: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 8,
    marginTop: 10,
  },
  breakdown: { padding: 15, borderBottomWidth: 1, borderColor: "#eee" },
  breakdownTitle: { fontWeight: "bold", fontSize: 16, marginBottom: 10 },
  categories: { flexDirection: "row", justifyContent: "space-between" },
  catBtn: { backgroundColor: "#EDEFEE", padding: 10, borderRadius: 12 },
  catBtnActive: { backgroundColor: "#495E57" },
  catText: { fontWeight: "bold" },
  menuItem: {
    flexDirection: "row",
    padding: 15,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  itemName: { fontSize: 18, fontWeight: "bold" },
  itemDesc: { color: "#666", marginVertical: 5 },
  itemPrice: { fontSize: 16, fontWeight: "bold", color: "#495E57" },
});
