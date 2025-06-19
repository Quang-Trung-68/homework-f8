import { get, post } from "../src/utils";

const { access_token, refresh_token } = localStorage;

const onMount = async () => {
  try {
    const response = await onPost();
    console.log(response);
    if (response == null || !localStorage["access_token"]) {
      try {
        const newResponse = await onGetNewToken();
        console.log(newResponse);
        localStorage.access_token = newResponse.access;
        console.log("Save new access token!!!");
      } catch (error) {
        console.log(error);
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const onPost = async () => {
  try {
    const posts = await get("post", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    console.log(posts);
    return posts;
  } catch (error) {
    console.log(error);
  }
};

const onGetNewToken = async () => {
  try {
    const newToken = await post(
      "login/get_new_token",
      {
        refresh: `${refresh_token}`,
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    return newToken;
  } catch (error) {
    console.log(error);
  }
};

onMount();
// onPost()
console.log(refresh_token);
console.log(access_token);
