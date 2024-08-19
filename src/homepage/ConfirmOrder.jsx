import React from "react";
import { FaRegCheckCircle } from "react-icons/fa";

import { useAppContext } from "../appcontext";

const ConfirmOrder = ({ setShowModal }) => {
  const { cartItems, handleClearCart } = useAppContext();
  const startNewOrder = () => {
    setShowModal(false);
    handleClearCart();
  };
  const totalPrice = cartItems.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);
  const totalItems = cartItems.reduce((total, item) => {
    return total + item.quantity;
  }, 0);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center ">
      <div className=" bg-white p-6 rounded-lg">
        <div>
          <div className="flex flex-col gap-3 mb-4">
            <FaRegCheckCircle className="text-3xl text-green-700" />
            <h1 className="text-3xl font-bold">Order Confirmed</h1>
            <p className="text-xs">We hope you enjoy your food!</p>
          </div>
          <div>
            {cartItems.map((item) => {
              return (
                <div key={item.id} className="bg-slate-300 p-4">
                  
                  <div className="p-1 items-center">
                    <p className="text-sm font-semibold"> {item.name}</p>
                    <div className="flex justify-between">
                      <div className="flex gap-2">
                        <p className="text-orange-700 text-sm">{item.quantity}x</p>
                        <p className="text-gray-600 text-sm mb-1">@ ${item.price}</p>
                      </div>
                      <p className=" font-semibold text-sm">
                        ${item.quantity * item.price}
                      </p>
                    </div>
                   
                  </div>
                  <hr />
                </div>
              );
            })}
            <div className="flex justify-between bg-slate-300 p-5">
              <p className="text-xs">Order Total</p>
              <p className="font-bold">${totalPrice}</p>
            </div>
          </div>
          <div className=" p-3">
            <button
              onClick={startNewOrder}
              className="bg-orange-700 rounded-xl items-center text-white p-2 w-60"
            >
              Start New Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmOrder;
