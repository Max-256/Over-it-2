import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { getListings } from "../api/listings";

import Card from "../components/Card";
import colors from "../config/colors";
import Screen from "../components/Screen";

function ListingsScreen({ navigation }) {
  const [listings, setListings] = useState([]);

  const LoadListings = async () => {
    const { data } = await getListings();
    setListings(data);
  };

  useEffect(() => {
    LoadListings();
  }, []);

  return (
    <Screen style={styles.screen}>
      <FlatList
        data={listings}
        keyExtractor={(listing) => listing.id.toString()}
        renderItem={({ item }) => (
          <Card
            title={item.title}
            subTitle={"$" + item.price}
            imageUrl={item.images[0].url}
            onPress={() => navigation.navigate("ListingDetails", item)}
          />
        )}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 3,
    backgroundColor: colors.light,
  },
});

export default ListingsScreen;
