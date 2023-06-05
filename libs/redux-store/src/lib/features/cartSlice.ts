import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { useAppDispatch, useAppSelector } from '../redux-store';
import { toast } from 'react-hot-toast';

type Item = {
  id: string;
  name: string;
  image: string;
  description: string;
  price: number;
  qty?: number | null;
};

type Cart = {
  items: Item[];
  discount: number;
  cartTotalQty: number;
  totalPrice: number;
  discountedPrice: number;
};

type Discount = {
  totalDiscount: number;
};

//initialValue of the auth slice
const initialState: Cart = {
  items: [],
  discount: 0,
  cartTotalQty: 0,
  totalPrice: 0,
  discountedPrice: 0,
};

export const CartSlice = createSlice({
  name: 'cart',
  initialState: initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Item>) => {
      const existingIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (existingIndex > -1) {
        state.items[existingIndex] = {
          ...state.items[existingIndex],
          qty: state.items[existingIndex].qty
            ? state.items[existingIndex].qty! + 1
            : null,
        };
        toast.success('Quantity increased');
      } else {
        state.items.push({ ...action.payload, qty: 1 });
        toast.success('Added to cart');
      }
    },
    totalPrice: (state) => {
      const { total, quantity } = state.items.reduce(
        (cartTotal, item) => {
          const { price } = item;
          let { qty } = item;
          if (!qty) qty = 1;
          const itemTotal = price * qty;
          cartTotal.total += itemTotal;
          cartTotal.quantity += qty;
          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );
      state.cartTotalQty = quantity;
      state.totalPrice = total;
    },
    decreaseCart: (state, action: PayloadAction<Item>) => {
      //getting the index of the item
      const itemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      //checking the qty is greater than 1 or if not then remove item
      if (state.items[itemIndex].qty && state.items[itemIndex].qty! > 1) {
        state.items[itemIndex].qty! -= 1;
        toast.success('Quantity decreased ');
      } else if (state.items[itemIndex].qty === 1) {
        const nextCartItems = state.items.filter(
          (item) => item.id !== action.payload.id
        );
        state.items = nextCartItems;
        toast.error('Product removed from cart');
      }
    },
    applyDiscount: (state, action: PayloadAction<Discount>) => {
      const discount = action.payload?.totalDiscount;
      state.discount = (state.totalPrice * discount) / 100;
      state.discountedPrice = state.totalPrice - state.discount;
    },
    resetCart: () => initialState,
  },
});
const { addToCart, totalPrice, decreaseCart, applyDiscount, resetCart } =
  CartSlice.actions;

//segregate the reducer from state to reduce re render on the state update

//to dispatch the events
export function useCartReducer() {
  const dispatch = useAppDispatch();
  return {
    addToCart: (payload: Item) => {
      dispatch(addToCart(payload));
      dispatch(totalPrice());
    },
    decreaseCart: (payload: Item) => {
      dispatch(decreaseCart(payload));
      dispatch(totalPrice());
    },
    applyDiscount: (payload: Discount) => {
      dispatch(applyDiscount(payload));
    },
    resetCart: () => {
      dispatch(resetCart());
    },
  };
}

export function useCartStore() {
  const { cartTotalQty, discount, items, totalPrice, discountedPrice } =
    useAppSelector((state) => state.cart);
  return {
    cartTotalQty,
    discount,
    items,
    totalPrice,
    discountedPrice,
  };
}

export default CartSlice.reducer;
