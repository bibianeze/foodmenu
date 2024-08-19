import { BiCartAdd } from "react-icons/bi";
import { CiCirclePlus } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";
import { useState } from "react";
import { useAppContext } from "../appcontext";

const SingleProduct = ({
  image: { mobile, thumbnail },
  price,
  name,
  category,
  id,
  add,
  quantity,
}) => {
  const { handleAddToCart, handleDecrement, handleIncrement, cartItems } =
    useAppContext();

  return (
    <div>
      <div>
        <div className="relative ">
          <div>
            <img src={mobile} alt={name} className="rounded-lg " />
          </div>
          <div>
            {add ? (
              <div className="flex items-center  gap-6 rounded-2xl border-2 p-2 absolute left-1/2 -translate-x-1/2 -bottom-4  text-white bg-orange-700">
                <button
                  onClick={() => {
                    handleDecrement({ id, price, name });
                  }}
                >
                  <CiCircleMinus className="text-white" />
                </button>
                {<p> {quantity} </p>}
                <button
                  onClick={() => {
                    handleIncrement({ id, price, name });
                  }}
                >
                  <CiCirclePlus />
                </button>
              </div>
            ) : (
              <button
                onClick={() => handleAddToCart({ id, price, name })}
                className="flex items-center  gap-1 rounded-2xl border-2 p-1 absolute -bottom-4  bg-white left-1/2 -translate-x-1/2"
              >
                <BiCartAdd className="icon" />
                <span className="text-sm font-semibold">Add to Cart</span>
              </button>
            )}
          </div>
        </div>
        <div className="flex flex-col my-7 ">
          <p className="text-xs">{category} </p>
          <h3 className="text-sm font-semibold">{name} </h3>
          <h4 className="number font-semibold">${price}</h4>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
