import client from "./client";

const endPoint = "/listings";

export const getListings = () => {
  return client.get(endPoint);
};
