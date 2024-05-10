import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTotalPrice, getTotalQuantity } from "./CartSlice";
import { formatCurrency } from "../../utils/helpers";

function CartOverview() {
  const totalPrice = useSelector(getTotalPrice);
  const quantity = useSelector(getTotalQuantity);

  if (!totalPrice) return null;
  return (
    <div className="flex items-center justify-between bg-stone-800 p-4 px-4 py-4 uppercase  text-stone-200 sm:px-6">
      <p className="space-x-4 text-sm font-semibold text-stone-300 sm:space-x-6 md:text-base">
        <span>
          {quantity} {`${quantity === 1 ? "Pizza" : "Pizzas"}`}
        </span>
        <span>{formatCurrency(totalPrice)} </span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
