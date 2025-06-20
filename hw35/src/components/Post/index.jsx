import { useState, useEffect } from "react";
import { get, post } from "../../utils";
import { useNavigate } from "react-router-dom";

const Post = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Func get posts with access token
  const fetchPosts = async (accessToken) => {
    try {
      const response = await get("post", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response;
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw error;
    }
  };

  // Func refresh token
  const refreshAccessToken = async (refreshToken) => {
    try {
      const response = await post(
        "login/get_new_token",
        { refresh: refreshToken },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      return response;
    } catch (error) {
      console.error("Error refreshing token:", error);
      throw error;
    }
  };

  // Main func load posts
  const loadPosts = async () => {
    try {
      setLoading(true);
      setError(null);

      let accessToken = localStorage.getItem("access_token");
      const refreshToken = localStorage.getItem("refresh_token");

      // if localstorage do not have accessToken or expired, try refresh to get new access token
      const shouldRefreshToken = !accessToken;

      if (shouldRefreshToken) {
        // Checking refreshToken is found or not
        if (!refreshToken) {
          navigate("/");
          throw new Error("No refresh token found. Please login again.");
        }

        try {
          console.log("Access token not found, attempting to refresh...");
          const tokenResponse = await refreshAccessToken(refreshToken);

          if (tokenResponse?.access) {
            // Save new token
            localStorage.setItem("access_token", tokenResponse.access);
            accessToken = tokenResponse.access;
            console.log("Successfully refreshed access token");
          } else {
            throw new Error("Invalid refresh token response");
          }
        } catch (refreshError) {
          // if refresh fail, delete tokens and re-login
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          navigate("/");
          throw new Error("Session expired. Please login again.");
        }
      }

      // Try fetch posts with accessToken (old or new accessToken)
      try {
        const postsData = await fetchPosts(accessToken);
        setPosts(postsData);
        console.log("Successfully fetched posts");
      } catch (fetchError) {
        // if fetch fail, try refresh again
        if (refreshToken && !shouldRefreshToken) {
          console.log(
            "Access token expired during fetch, attempting to refresh..."
          );

          try {
            const tokenResponse = await refreshAccessToken(refreshToken);

            if (tokenResponse?.access) {
              localStorage.setItem("access_token", tokenResponse.access);
              accessToken = tokenResponse.access;

              // Try re-fetch with new token 
              const postsData = await fetchPosts(accessToken);
              setPosts(postsData);
              console.log("Successfully refreshed token and fetched posts");
            } else {
              throw new Error("Invalid refresh token response");
            }
          } catch (secondRefreshError) {
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            throw new Error("Session expired. Please login again.");
          }
        } else {
          throw fetchError;
        }
      }
    } catch (error) {
      console.error("Error in loadPosts:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Effect to load posts when component mount
  useEffect(() => {
    loadPosts();
  }, []);

  // Render loading state
  if (loading) {
    return <div>Loading posts...</div>;
  }

  // Render error state
  if (error) {
    return (
      <div>
        <h2>Error: {error}</h2>
        <button onClick={loadPosts}>Retry</button>
      </div>
    );
  }

  // Render posts
  return (
    <div>
      <h1>Welcome to the Post Page!</h1>
      <button onClick={loadPosts}>Refresh Posts</button>
      {posts && posts.length > 0 ? (
        <div>
          <h2>Posts ({posts.length})</h2>
          <pre>{JSON.stringify(posts, null, 2)}</pre>
        </div>
      ) : (
        <p>No posts available</p>
      )}
    </div>
  );
};

export default Post;
