import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

const getUserId = () => localStorage.getItem("user_id");

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
  const userId = getUserId();

  return useMutation({
    mutationFn: async ({
      postId,
      content,
    }: {
      postId: number;
      content: string;
    }) => {
      if (!userId) throw new Error("No hay usuario autenticado.");
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
  const userId = getUserId();

  return useMutation({
    mutationFn: async ({
      comentario_post_id,
      contenido,
    }: {
      comentario_post_id: number;
      contenido: string;
    }) => {
      if (!userId) throw new Error("No hay usuario autenticado.");
      const { data } = await axios.post(`${API_URL}/create_reply`, null, {
        params: { user_id: userId, comentario_post_id, contenido },
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

export const useSavedPosts = () => {
  const userId = getUserId();
  return useQuery({
    queryKey: ["savedPosts", userId],
    queryFn: async () => {
      if (!userId) throw new Error("No hay usuario autenticado.");
      const { data } = await axios.get(`${API_URL}/saved_posts/${userId}`);
      return data.posts;
    },
    enabled: !!userId,
  });
};

export const useFollowers = () => {
  const userId = getUserId();
  return useQuery({
    queryKey: ["followers", userId],
    queryFn: async () => {
      if (!userId) throw new Error("No hay usuario autenticado.");
      const { data } = await axios.get(`${API_URL}/getFollowers/${userId}`);
      return data.followers;
    },
    enabled: !!userId,
  });
};

export const useFollowing = () => {
  const userId = getUserId();
  return useQuery({
    queryKey: ["following", userId],
    queryFn: async () => {
      if (!userId) throw new Error("No hay usuario autenticado.");
      const { data } = await axios.get(`${API_URL}/getFollowed/${userId}`);
      return data.followed;
    },
    enabled: !!userId,
  });
};

export const useLoggedInUser = () => {
  const userId = getUserId();
  // const userId = 87171272;
  return useQuery({
    queryKey: ["loggedInUser", userId],
    queryFn: async () => {
      if (!userId) throw new Error("No hay usuario autenticado.");
      const { data } = await axios.get(`${API_URL}/user/${userId}`);
      return data.usuario;
    },
    enabled: !!userId,
  });
};

export const useFollowedUsers = () => {
  const userId = getUserId();
  return useQuery({
    queryKey: ["followedUsers", userId],
    queryFn: async () => {
      if (!userId) throw new Error("No hay usuario autenticado.");
      const response = await axios.get(`${API_URL}/getFollowed/${userId}`);
      return response.data.followed || [];
    },
    enabled: !!userId,
  });
};

export const useFollowUser = () => {
  const queryClient = useQueryClient();
  const userId = getUserId();

  return useMutation({
    mutationFn: async (followedId: number) => {
      if (!userId) throw new Error("No hay usuario autenticado.");
      await axios.post(`${API_URL}/follow_user`, {
        user_id: userId,
        followed_id: followedId,
        notificacion: true,
      });
    },
    onSuccess: (_, followedId) => {
      queryClient.invalidateQueries({ queryKey: ["following", userId] });
      queryClient.invalidateQueries({ queryKey: ["followers", followedId] });
    },
  });
};

export const useUnfollowUser = () => {
  const queryClient = useQueryClient();
  const userId = getUserId();

  return useMutation({
    mutationFn: async (followedId: number) => {
      if (!userId) throw new Error("No hay usuario autenticado.");
      await axios.delete(`${API_URL}/delete_follow`, {
        params: { user_id: userId, followed_id: followedId },
      });
    },
    onSuccess: (_, followedId) => {
      queryClient.invalidateQueries({ queryKey: ["following", userId] });
      queryClient.invalidateQueries({ queryKey: ["followers", followedId] });
    },
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      titulo,
      descripcion,
      archivos = [],
      clase = "",
      temas = [],
      examen = false,
      comunidad = 0,
    }: {
      titulo: string;
      descripcion: string;
      archivos?: string[];
      clase?: string;
      temas?: string[];
      examen?: boolean;
      comunidad?: number;
    }) => {
      const userId = getUserId();
      if (!userId) throw new Error("No hay usuario autenticado.");

      const params = {
        user_id: userId,
        titulo,
        descripcion,
        archivos: archivos.length > 0 ? archivos.join(",") : "",
        clase,
        temas: temas.length > 0 ? temas.join(",") : "",
        examen,
        comunidad,
      };

      const response = await axios.post(`${API_URL}/create_post`, null, {
        params,
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};

export const useReportPost = () => {
  const userId = localStorage.getItem("user_id");

  return useMutation({
    mutationFn: async (postId: number) => {
      if (!userId) throw new Error("No hay usuario autenticado.");

      await axios.post(
        `${API_URL}/report_post?user_id=${userId}&post_id=${postId}`
      );
    },
  });
};

export const useJoinedCommunities = () => {
  const userId = Number(localStorage.getItem("user_id"));

  return useQuery({
    queryKey: ["joinedCommunities", userId],
    queryFn: async () => {
      if (!userId) throw new Error("No hay usuario autenticado.");

      const { data } = await axios.get(`${API_URL}/user_communities/${userId}`);

      return data?.communities ?? [];
    },
    enabled: !!userId,
  });
};

export const useJoinCommunity = () => {
  const queryClient = useQueryClient();
  const userId = Number(localStorage.getItem("user_id"));

  return useMutation({
    mutationFn: async (communityId: number) => {
      if (!userId) throw new Error("No hay usuario autenticado.");

      await axios.post(`${API_URL}/join_community`, {
        user_id: userId,
        community_id: communityId,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["joinedCommunities", userId],
      });
    },
  });
};

const userId = localStorage.getItem("user_id");

export const useLeaveCommunity = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (communityId: number) => {
      if (!userId) throw new Error("No hay usuario autenticado.");
      await axios.post(`${API_URL}/leave_community`, {
        user_id: userId,
        community_id: communityId,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["joinedCommunities", userId],
      });
    },
  });
};

export const useReportCommunity = () => {
  return useMutation({
    mutationFn: async (communityId: number) => {
      if (!userId) throw new Error("No hay usuario autenticado.");
      await axios.post(`${API_URL}/report_community`, {
        user_id: userId,
        community_id: communityId,
      });
    },
  });
};

export const useCommunities = () => {
  return useQuery({
    queryKey: ["communities"],
    queryFn: async () => {
      const { data } = await axios.get(`${API_URL}/available_communities`);
      return data.communities;
    },
  });
};
