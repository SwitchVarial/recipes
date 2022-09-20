import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
  FlatList,
  StatusBar,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function App() {
  const [keyword, setKeyword] = useState("");
  const [recipes, setRrecipes] = useState([]);

  const getRepositories = () => {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${keyword}`)
      .then((response) => response.json())
      .then((json) => setRrecipes(json.meals))
      .catch((error) => {
        Alert.alert("Error", error);
      });
  };

  const listSeparator = () => {
    return <View style={styles.separator} />;
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Recipes</Text>
        <Ionicons
          name="restaurant"
          size={26}
          color="black"
          style={{ marginTop: "10%" }}
        />
      </View>
      <View style={styles.listContainer}>
        <FlatList
          style={styles.list}
          keyExtractor={(item) => item.idMeal}
          renderItem={({ item }) => (
            <View style={styles.listRow}>
              <Image
                style={styles.listImage}
                source={{
                  uri: item.strMealThumb,
                }}
              />
              <View style={styles.listColumn}>
                <Text style={styles.listTitle}>{item.strMeal}</Text>
              </View>
            </View>
          )}
          data={recipes}
          ItemSeparatorComponent={listSeparator}
        />
      </View>
      <View style={styles.searchContainer}>
        <View style={styles.listRow}>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setKeyword(text)}
          />
          <Pressable style={styles.button} onPress={getRepositories}>
            <Ionicons name="search" size={24} color="white" />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  titleContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    flexDirection: "row",
  },
  searchContainer: {
    flex: 1,
    padding: "2%",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  listContainer: {
    flex: 9,
    width: "100%",
    padding: "2%",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  list: {
    width: "100%",
  },
  listRow: {
    flexDirection: "row",
  },
  listColumn: {
    marginLeft: "3%",
    width: 0,
    flexGrow: 1,
  },
  listImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  listTitle: {
    fontSize: 16,
    fontWeight: "bold",
    flexWrap: "wrap",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "mediumorchid",
    marginTop: "10%",
    marginRight: "2%",
  },
  separator: {
    height: 1,
    marginTop: "2%",
    marginBottom: "2%",
    width: "100%",
    backgroundColor: "#CED0CE",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: "mediumorchid",
  },
  input: {
    flex: 1,
    height: 50,
    padding: 10,
    borderRadius: 8,
    marginRight: "2%",
    borderColor: "mediumorchid",
    borderWidth: 2,
  },
});
