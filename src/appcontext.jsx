import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext();
export const useAppContext = () => useContext(AppContext);

const AppProvider = ({ children }) => {
  const getItemsFromStorage = () => {
    const cart = JSON.parse(localStorage.getItem("cart"));
    return cart ? cart : [];
  };

  const [cartItems, setCartItems] = useState(getItemsFromStorage());
  console.log(cartItems);

  const handleAddToCart = (item) => {
    //if item is not in cart, add it
    // console.log(item);
    setCartItems([...cartItems, { ...item, quantity: 1 }]);
  };

  const handleIncrement = (item) => {
    const product = cartItems.find((p) => p.id === item.id);
    const currCartItems = cartItems.map((p) => {
      if (p.id === product.id) {
        return { ...p, quantity: product.quantity + 1 };
      } else {
        return p;
      }
    });
    //increment item quantity
    setCartItems(currCartItems);
    console.log(currCartItems);
  };
  const handleDecrement = (item) => {
    const product = cartItems.find((p) => p.id === item.id);
    if (product.quantity > 1) {
      const currCartItems = cartItems.map((p) => {
        if (p.id === product.id) {
          return { ...p, quantity: product.quantity - 1 };
        } else {
          return p;
        }
      });
      //increment item quantity
      setCartItems(currCartItems);
    } else {
      //remove from item from cart
      const currCartItems = cartItems.filter((p) => p.id !== item.id);
      setCartItems(currCartItems);
      console.log(currCartItems);
    }

    //decrement item quantity
  };
  const handleRemoveItem = (item) => {
    //remove item from cart
    setCartItems(cartItems.filter((p) => p.id !== item.id));
  };
  const handleClearCart = () =>{
    setCartItems([])
  }

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <AppContext.Provider
      value={{
        cartItems,
        handleAddToCart,
        handleDecrement,
        handleIncrement,
        handleRemoveItem,
        handleClearCart,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
