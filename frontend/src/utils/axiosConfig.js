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

export const getQuantityCart = (userId) => {
  var cart = localStorage.getItem('cart');
  if (cart) {
    try {
      const parsedCart = JSON.parse(cart);
      const userCart = parsedCart[userId];
      if (userCart) {
        const count = Object.keys(userCart).length;
        return count;
      }
    } catch (error) {
      console.error("Error parsing cart:", error);
    }
  }
  return 0;
};

export const addCartLocalStorage = (userId, productName) => {
  let cart;
  try {
    cart = localStorage.getItem('cart');
    if (cart === null) {
      cart = {};
    } else {
      cart = JSON.parse(cart);
    }
  } catch (e) {
    console.error('Error parsing cart from localStorage:', e);
    cart = {};
  }
  if (productName) {
    if (cart[userId]) {
      if (cart[userId][productName]) {
        cart[userId][productName] += 1;
      } else {
        cart[userId][productName] = 1;
      }
    } else {
      cart[userId] = {
        [productName]: 1
      };
    }
  }

  localStorage.setItem('cart', JSON.stringify(cart));
};