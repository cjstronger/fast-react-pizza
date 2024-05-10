import { useState } from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { clearItems, getCart, getTotalPrice } from "../cart/CartSlice";
import EmptyCart from "../cart/EmptyCart";
import store from "../../store";
import { formatCurrency } from "../../utils/helpers";
import { fetchAddress } from "../user/userSlice";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const newCart = useSelector(getCart);
  const cart = newCart;
  const navigation = useNavigation();
  const {
    username,
    status: addressStatus,
    address,
    position,
    error: addressError,
  } = useSelector((state) => state.user);
  const addressLoading = addressStatus === "loading";
  const isSubmitting = navigation.state === "submitting";
  const totalCartPrice = useSelector(getTotalPrice);
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priorityPrice;
  const dispatch = useDispatch();

  const newErrors = useActionData();

  if (cart.length === 0) return <EmptyCart />;

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>

      <Form method="POST">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input
            type="text"
            name="customer"
            required
            className="input grow"
            defaultValue={username}
          />
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input type="tel" name="phone" required className="input w-full" />
          </div>
          {newErrors?.phone && (
            <p className="mt-2 rounded-full bg-red-200 px-2 text-red-700">
              {newErrors.phone}
            </p>
          )}
        </div>

        <div className="relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              disabled={addressLoading}
              defaultValue={address}
              type="text"
              name="address"
              required
              className="input w-full"
            />
            {addressStatus === "error" && (
              <p className=" mt-2 rounded-full bg-red-200 px-2 text-red-700">
                {addressError}
              </p>
            )}
          </div>
          <span className="absolute right-1 top-[35px] sm:top-[3px]  md:top-[5px]">
            {!position.longitude && (
              <Button
                disabled={addressLoading}
                type="small"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(fetchAddress());
                }}
              >
                Get Position
              </Button>
            )}
          </span>
        </div>

        <div className="mb-8 flex items-center gap-4 font-semibold">
          <input
            className="h-6 w-6 accent-yellow-400 focus:outline-none 
          focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>

        <div>
          <Button type="primary" disabled={isSubmitting || addressLoading}>
            Order now {formatCurrency(totalPrice)}
          </Button>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="position"
            value={
              position.longitude
                ? `${position.latitude},${position.longitude}`
                : ""
            }
          />
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const actionData = await request.formData();
  const data = Object.fromEntries(actionData);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
  };

  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone = "The number entered was not a valid phone number.";

  if (Object.keys(errors).length > 0) return errors;

  const newOrder = await createOrder(order);

  store.dispatch(clearItems());

  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
