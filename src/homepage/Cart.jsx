import React from "react";
import { useAppContext } from "../appcontext";
import ConfirmOrder from "./ConfirmOrder";
import { useState } from "react";
import { MdOutlineCancel } from "react-icons/md";

const Cart = () => {
    const [showModal, setShowModal] = useState(false)
  const { cartItems, handleRemoveItem } = useAppContext();
  const totalItems = cartItems.reduce((total, item) => {
    return total + item.quantity;
  }, 0);

  const totalPrice = cartItems.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  if (cartItems.length === 0) {
    return (
      <div>
        <p>Cart is empty</p>
      </div>
    );
  }
  
  return (
    <div>
      <div className="bg-slate-200 p-5 rounded-xl ">
        <h1 className="text-2xl font-bold text-orange-700">
          Your Cart ({totalItems})
        </h1>
        <div>
          {cartItems.map((item) => {
            return (
              <div key={item.id} className="bg-slate-200">
                <div className="p-3">
                  <p className="text-l font-semibold"> {item.name}</p>
                  <div className="flex justify-between">
                    <div className="flex gap-2">
                      <p className="text-orange-700">{item.quantity}x</p>
                      <p className="text-gray-600">@ ${item.price}</p>
                      <p className="text-gray-700">
                        ${item.quantity * item.price}
                      </p>
                    </div>
                    <button onClick={() => handleRemoveItem(item)}>
                      <MdOutlineCancel />
                    </button>
                  </div>
                </div>
                <hr />
              </div>
            );
          })}
        </div>
        <div className="p-3">
          <div className="flex justify-between my-3">
            <p>Order Total</p>
            <p className="font-bold text-2xl">${totalPrice}</p>
          </div>
          <div className="flex flex-col gap-3">
            <button className="bg-slate-300">
              <p className="text-sm p-2">
                This is a <span className="font-semibold">carbon-neutral</span>{" "}
                delivery
              </p>
            </button>
            <button onClick={()=> setShowModal(true)} className="bg-orange-700 rounded-xl text-white p-2">
              Confirm Order
            </button>
          </div>
        </div>
      </div>
      {showModal && <ConfirmOrder setShowModal={setShowModal}/> }
    </div>
  );
};

export default Cart;
