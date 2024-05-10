import React from "react";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { deleteItem } from "./CartSlice";

export default function DeleteItem({ pizzaId }) {
  const dispatch = useDispatch();
  return (
    <Button type="small" onClick={() => dispatch(deleteItem(pizzaId))}>
      Delete
    </Button>
  );
}
