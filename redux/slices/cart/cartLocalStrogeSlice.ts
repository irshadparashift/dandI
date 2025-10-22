// // redux/slices/cart/cartLocalStrogeSlice.ts
// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// interface CartItem {
//   id: string;
//   name?: string;
//   qty: number;
//   price?: number;
//   subtotal?: number;
// }

// interface CartState {
//   items: CartItem[];
// }

// const initialState: CartState = {
//   items: typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('cart') || '[]') : [],
// };

// const cartSlice = createSlice({
//   name: 'cart',
//   initialState,
//   reducers: {
//     addToCart: (state, action: PayloadAction<CartItem>) => {
//       const item = state.items.find((i) => i.id === action.payload.id);
//       if (item) item.qty += action.payload.qty;
//       else state.items.push(action.payload);
//       localStorage.setItem('cart', JSON.stringify(state.items));
//     },
//     removeFromCart: (state, action: PayloadAction<string>) => {
//       const item = state.items.find((i) => i.id === action.payload);
//       if (item && item.qty > 1) item.qty -= 1;
//       else state.items = state.items.filter((i) => i.id !== action.payload);
//       localStorage.setItem('cart', JSON.stringify(state.items));
//     },
//     setCart: (state, action: PayloadAction<CartItem[]>) => {
//       state.items = action.payload;
//       localStorage.setItem('cart', JSON.stringify(state.items));
//     },
//     clearCart: (state) => {
//       state.items = [];
//       localStorage.removeItem('cart');
//     },
//   },
// });

// export const { addToCart, removeFromCart, setCart, clearCart } = cartSlice.actions;
// export default cartSlice.reducer;
// ===============================
// ===============================
// ===============================
// redux/slices/cart/cartLocalStorageSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
  id: string;
  name?: string;
  qty: number;
  price?: number;
  subtotal?: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('cart') || '[]') : [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const item = state.items.find((i) => i.id === action.payload.id);
      if (item) {
        item.qty += action.payload.qty;
        item.subtotal = (item.price || 0) * item.qty; // Update subtotal
      } else {
        const newItem = {
          ...action.payload,
          subtotal: (action.payload.price || 0) * action.payload.qty,
        };
        state.items.push(newItem);
      }
      localStorage.setItem('cart', JSON.stringify(state.items));
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item && item.qty > 1) {
        item.qty -= 1;
        item.subtotal = (item.price || 0) * item.qty; // Update subtotal
      } else {
        state.items = state.items.filter((i) => i.id !== action.payload);
      }
      localStorage.setItem('cart', JSON.stringify(state.items));
    },
    setCart: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload.map((item) => ({
        ...item,
        subtotal: item.subtotal || (item.price || 0) * item.qty, // Ensure subtotal
      }));
      localStorage.setItem('cart', JSON.stringify(state.items));
    },
    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem('cart');
    },
  },
});

export const { addToCart, removeFromCart, setCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
