import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      state.cart.push(action.payload);
    },
    deleteItem(state, action) {
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    incItem(state, action) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity++;
      item.totalPrice = item.quantity * item.unitPrice;
    },
    decItem(state, action) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity >= 2 ? item.quantity-- : item.quantity;
      item.totalPrice = item.quantity * item.unitPrice;
    },
    clearItems(state) {
      state.cart = [];
    },
  },
});

export const { addItem, deleteItem, incItem, decItem, clearItems } =
  cartSlice.actions;

export const getTotalPrice = (state) =>
  state.cart.cart.reduce(
    (accItem, currItem) => accItem + currItem.totalPrice,
    0,
  );

export const getTotalQuantity = (state) =>
  state.cart.cart.reduce((accItem, currItem) => accItem + currItem.quantity, 0);

export const getCart = (state) => state.cart.cart;

export const getCurrentQuantityById = (id) => (state) =>
  state.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0;

export default cartSlice.reducer;
