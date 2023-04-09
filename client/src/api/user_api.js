import ApiManager from "./ApiManager";

export const user_login = async (data) => {
  try {
    console.log("in userlogin");
    const result = await ApiManager("/user/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      data: data,
    });
    console.log("result ", result);

    return result;
  } catch (error) {
    console.log("error", error);

    return error.response.data;
  }
};
