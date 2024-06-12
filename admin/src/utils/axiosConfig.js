export const base_url = "https://localhost:7112/api/";

export const getTokenFromLocalStorage = () => {
  return localStorage.getItem("customer")
    ? JSON.parse(localStorage.getItem("customer"))
    : null;
};

export const getConfig = () => {
  const tokenData = getTokenFromLocalStorage();
  return {
    headers: {
      Authorization: `Bearer ${tokenData !== null ? tokenData.token : ""}`,
      UserId: `${tokenData !== null ? tokenData.id : ""}`,
      Accept: "application/json",
    },
  };
};