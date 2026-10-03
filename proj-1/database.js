import { Platform } from "react-native";
import * as SQLite from "expo-sqlite";

let db = null;
if (Platform.OS !== "web") {
  db = SQLite.openDatabase("little_lemon");
}

export async function createTable() {
  return new Promise((resolve, reject) => {
    if (Platform.OS === "web") {
      resolve(true);
      return;
    }
    db.transaction(
      (tx) => {
        tx.executeSql(
          "create table if not exists menuitems (id integer primary key not null, uuid text, title text, price text, category text);",
        );
      },
      reject,
      resolve,
    );
  });
}

export async function getMenuItems() {
  return new Promise((resolve) => {
    if (Platform.OS === "web") {
      const stored = localStorage.getItem("menuitems");
      resolve(stored ? JSON.parse(stored) : []);
      return;
    }
    db.transaction((tx) => {
      tx.executeSql("select * from menuitems", [], (_, { rows }) => {
        resolve(rows._array);
      });
    });
  });
}

export function saveMenuItems(menuItems) {
  if (Platform.OS === "web") {
    localStorage.setItem("menuitems", JSON.stringify(menuItems));
    return;
  }
  db.transaction((tx) => {
    const placeholders = menuItems.map(() => "(?, ?, ?, ?)").join(", ");
    const sql = `insert into menuitems (uuid, title, price, category) values ${placeholders}`;

    const values = menuItems.flatMap((item) => [
      item.id || item.uuid,
      item.title,
      item.price,
      item.category,
    ]);

    tx.executeSql(sql, values);
  });
}

export async function filterByQueryAndCategories(query, activeCategories) {
  return new Promise((resolve, reject) => {
    if (Platform.OS === "web") {
      const stored = localStorage.getItem("menuitems");
      let items = stored ? JSON.parse(stored) : [];

      // Metin Arama Filtresi
      if (query) {
        items = items.filter((item) =>
          item.title.toLowerCase().includes(query.toLowerCase()),
        );
      }

      // Kategori Filtresi
      if (activeCategories.length > 0) {
        items = items.filter((item) =>
          activeCategories.includes(item.category),
        );
      }

      resolve(items);
      return;
    }

    db.transaction((tx) => {
      let sql = "select * from menuitems where title like ?";
      let params = [`%${query}%`];

      if (activeCategories.length > 0) {
        const categoryPlaceholders = activeCategories.map(() => "?").join(", ");
        sql += ` and category in (${categoryPlaceholders})`;
        params.push(...activeCategories);
      }

      tx.executeSql(
        sql,
        params,
        (_, { rows }) => {
          resolve(rows._array);
        },
        (_, error) => {
          reject(error);
        },
      );
    });
  });
}
