import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./ui/home";
import Menu, { loader as menuLoader } from "./features/menu/Menu";
import AppLayout from "./ui/AppLayout";
import Cart from "./features/cart/Cart";
import CreateOrder, {
  action as orderAction,
} from "./features/order/CreateOrder";
import Order, { orderLoader } from "./features/order/Order";
import Error from "./ui/Error";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/menu",
        element: <Menu />,
        loader: menuLoader,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      { path: "/order/new", action: orderAction, element: <CreateOrder /> },
      { path: "/order/:orderID", loader: orderLoader, element: <Order /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router}></RouterProvider>;
}
