import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import Button from "../components/Button";
import { getListings } from "../api/listings";

import Card from "../components/Card";
import colors from "../config/colors";
import Screen from "../components/Screen";
import AppText from "../components/Text";

function ListingsScreen({ navigation }) {
  const [listings, setListings] = useState([]);
  const [error, setError] = useState(false);

  const LoadListings = async () => {
    const response = await getListings();
    if (!response.ok) {
      return setError(true);
    }

    setError(false);
    setListings(response.data);
  };

  useEffect(() => {
    LoadListings();
  }, []);

  return (
    <Screen style={styles.screen}>
      {error && (
        <>
          <AppText>Could not retrieve the listings.</AppText>
          <Button title="retry" onPress={LoadListings} />
        </>
      )}
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
    padding: 5,
    backgroundColor: colors.light,
  },
});

export default ListingsScreen;
