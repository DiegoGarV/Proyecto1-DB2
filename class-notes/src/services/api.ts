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

export const usePostUser = (postId: number) => {
  return useQuery({
    queryKey: ["postUser", postId],
    queryFn: async () => {
      const { data } = await axios.get(`${API_URL}/post_user/${postId}`);
      return data;
    },
    enabled: !!postId,
  });
};

export const usePostComments = (postId: number) => {
  return useQuery({
    queryKey: ["postComments", postId],
    queryFn: async () => {
      const { data } = await axios.get(`${API_URL}/getPostComments/${postId}`);
      return data.comments;
    },
    enabled: !!postId,
  });
};

export const useCommentUser = (commentId: number) => {
  return useQuery({
    queryKey: ["commentUser", commentId],
    queryFn: async () => {
      const { data } = await axios.get(`${API_URL}/comment_user/${commentId}`);
      return data;
    },
    enabled: !!commentId,
  });
};
