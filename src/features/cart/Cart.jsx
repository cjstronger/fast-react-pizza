import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import LinkButton from "../../ui/LinkButton";
import Button from "../../ui/Button";
import CartItem from "./CartItem";
import { clearItems, getCart } from "./CartSlice";
import EmptyCart from "./EmptyCart";

function Cart() {
  const username = useSelector((state) => state.user.username);
  const cart = useSelector(getCart);
  const dispatch = useDispatch();

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-4 py-2">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      <h2 className="py-4 text-xl font-bold">Your cart, {username}</h2>
      <ul className="divide-y divide-stone-200">
        {cart.map((item) => (
          <CartItem item={item} key={item.pizzaId} />
        ))}
      </ul>
      <div className="flex gap-2">
        <Button type="primary" to="/order/new">
          Order pizzas
        </Button>
        <Button type="secondary" onClick={() => dispatch(clearItems())}>
          Clear cart
        </Button>
      </div>
    </div>
  );
}

export default Cart;
