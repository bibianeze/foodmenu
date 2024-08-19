// import React from 'react'
import "../styles/product.css";
import { useAppContext } from "../appcontext";
import { useState } from "react";
import SingleProduct from "./SingleProduct";
import { products } from "../../data";

import Cart from "./Cart";



const Products = () => {
  const [productsList, setProductsList] = useState(products);
  const { cartItems } = useAppContext();

  const getCartDetails = () => {
    return cartItems.reduce((acc, item) => {
      acc[item.id] = { quantity: item.quantity };
      return acc;
    }, {});
  };

  const cartDetails = getCartDetails();

  return (
    <div>
      <h1 className="text-4xl font-bold p-4">Dessert</h1>
      <section className="  grid lg:grid-cols-[70%,30%] ">
        <div className="grid grid-cols-1 gap-6 p-5 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 ">
          {productsList.map((product) => {
            const isInCart = cartDetails[product.id] ? true : false;
            const quantity = isInCart ? cartDetails[product.id].quantity : 0;
            return (
              <SingleProduct
                key={product.id}
                {...product}
                add={isInCart}
                quantity={quantity}
              />
            );
          })}
        </div>
        <div>
          <Cart />
        </div>
       
      </section>
    </div>
  );
};

export default Products;
