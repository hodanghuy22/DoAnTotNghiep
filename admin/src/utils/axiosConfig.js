export const base_url = "https://localhost:7112/api/";

export const getTokenFromLocalStorage = () => {
  return localStorage.getItem("admin")
    ? JSON.parse(localStorage.getItem("admin"))
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