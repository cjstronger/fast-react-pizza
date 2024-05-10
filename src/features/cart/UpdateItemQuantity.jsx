import React from "react";
import Button from "../../ui/Button";
import { decItem, getCurrentQuantityById, incItem } from "./CartSlice";
import { useDispatch, useSelector } from "react-redux";

export default function UpdateItemQuantity({ id }) {
  const dispatch = useDispatch();
  const currentQuantity = useSelector(getCurrentQuantityById(id));
  return (
    <div className="flex items-center justify-center gap-1 md:gap-3">
      <Button type="round" onClick={() => dispatch(incItem(id))}>
        +
      </Button>
      <p>{currentQuantity}</p>
      <Button type="round" onClick={() => dispatch(decItem(id))}>
        -
      </Button>
    </div>
  );
}
