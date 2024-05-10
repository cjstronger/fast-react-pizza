import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";
import { deleteItem } from "./CartSlice";
import DeleteItem from "./DeleteItem";
import UpdateItemQuantity from "./UpdateItemQuantity";

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;
  const dispatch = useDispatch();

  return (
    <li className="flex items-center justify-between py-4 font-semibold">
      <p>
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-center gap-4">
        <p>{formatCurrency(totalPrice)}</p>
        <UpdateItemQuantity id={pizzaId} />
        <DeleteItem pizzaId={pizzaId} />
      </div>
    </li>
  );
}

export default CartItem;
