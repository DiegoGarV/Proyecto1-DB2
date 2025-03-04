import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

export const usePosts = () => {
  return useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const { data } = await axios.get(`${API_URL}/availablePosts`);
      return data.availablePosts;
    },
  });
};
