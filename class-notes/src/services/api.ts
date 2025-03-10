import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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

export const useCommentReplies = (commentId: number) => {
  return useQuery({
    queryKey: ["commentReplies", commentId],
    queryFn: async () => {
      const { data } = await axios.get(
        `${API_URL}/getCommentReplies/${commentId}`
      );
      return data.replies;
    },
    enabled: !!commentId,
  });
};

export const useCreateComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      userId,
      postId,
      content,
    }: {
      userId: number;
      postId: number;
      content: string;
    }) => {
      const { data } = await axios.post(
        `${API_URL}/create_comentario?user_id=${userId}&post_id=${postId}&contenido=${encodeURIComponent(
          content
        )}`
      );

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["postComments"] });
    },
  });
};

export const useCreateReply = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      user_id,
      comentario_post_id,
      contenido,
    }: {
      user_id: number;
      comentario_post_id: number;
      contenido: string;
    }) => {
      const { data } = await axios.post(`${API_URL}/create_reply`, null, {
        params: { user_id, comentario_post_id, contenido },
      });
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["commentReplies", variables.comentario_post_id],
      });
    },
  });
};
