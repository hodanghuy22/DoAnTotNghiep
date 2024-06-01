export const base_url = "https://localhost:7112/api/";

const getTokenFromLocalStorage = localStorage.getItem("customer")
  ? JSON.parse(localStorage.getItem("customer"))
  : null;

export const config = {
  headers: {
    Authorization: `Bearer ${
      getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : ""
    }`,
    UserId: `${
      getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.id : ""
    }`,
    Accept: "application/json",
  },
};