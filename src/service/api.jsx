import axios from "axios";

export const Api = axios.create({
  baseURL: "https://fakestoreapi.com/products",
});

export const GetProducts= async () => {
    try {
      const response = await Api.get("/");
      if (response.status !== 200) {
        throw new Error("Error");
      } else {
        return response.data;
      }
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  };
