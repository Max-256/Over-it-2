import client from "./client";

const endPoint = "./listings";

export const getListings = () => {
  client.get(endPoint);
};
