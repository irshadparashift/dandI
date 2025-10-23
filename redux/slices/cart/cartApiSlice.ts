// // redux/slices/cart/cartApiSlice.ts
// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import { getCookie } from '@/utils/cookies'; // 👈 yeh aapka helper hai

// type CartItemResponse = {
//   _id: string;
//   App: {
//     _id: string;
//     Name: string;
//     PricePerMonth?: number;
//     Description?: string;
//   };
//   Quantity: number;
//   TotalPrice?: number;
// };

// type GetAllAssetsResponse = {
//   status: boolean;
//   message: string;
//   data: {
//     _id: string;
//     OwnerType: string;
//     OwnerId: string;
//     Items: CartItemResponse[];
//     GrandTotal?: number;
//     createdAt: string;
//     updatedAt: string;
//     __v?: number;
//   };
// };

// export const cartApi = createApi({
//   reducerPath: 'cartApi',
//   baseQuery: fetchBaseQuery({
//     baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
//     prepareHeaders: (headers) => {
//       const token = getCookie('UserToken'); // 👈 cookie se token
//       if (token) {
//         headers.set('Authorization', `Bearer ${token}`);
//       }
//       headers.set('Content-Type', 'application/json');
//       return headers;
//     },
//   }),
//   endpoints: (builder) => ({
//     addToCart: builder.mutation<
//       {
//         status: boolean;
//         message: string;
//         data: {
//           OwnerType: string;
//           OwnerId: string;
//           Items: { AppId: string; Quantity: number; _id: string }[];
//           _id: string;
//           createdAt: string;
//           updatedAt: string;
//           __v: number;
//         };
//       },
//       { OwnerType: string; OwnerId: string; AppId: string; Quantity: number }
//     >({
//       query: (body) => ({
//         url: '/api/cart/add',
//         method: 'POST',
//         body,
//       }),
//     }),

//     // 1. Get All Assets
//     getAllAssets: builder.query<
//       {
//         status: boolean;
//         message: string;
//         data: {
//           AppId: string;
//           Quantity: number;
//           _id: string;
//         }[];
//       },
//       { OwnerType: string; OwnerId: string }
//     >({
//       query: ({ OwnerType, OwnerId }) => ({
//         url: `/api/cart?OwnerType=${OwnerType}&OwnerId=${OwnerId}`, // Dynamic URL
//         method: 'GET',
//       }),
//     }),

//     // 2. Remove Quantity from Cart
//     removeQuantity: builder.mutation<
//       {
//         status: boolean;
//         message: string;
//         data: { _id: string; OwnerType: string; OwnerId: string; Items: any[] };
//       },
//       { OwnerType: string; OwnerId: string; AppId: string }
//     >({
//       query: ({ OwnerType, OwnerId, AppId }) => ({
//         url: `/api/cart/remove`,
//         method: 'DELETE',
//         body: { OwnerType, OwnerId, AppId },
//       }),
//     }),

//     // 3. Clear All Cart

//     clearAllCart: builder.mutation<
//       {
//         status: boolean;
//         message: string;
//         data: any;
//       },
//       { OwnerType: string; OwnerId: string }
//     >({
//       query: ({ OwnerType, OwnerId }) => ({
//         url: `/api/cart/clear`,
//         method: 'DELETE',
//         body: { OwnerType, OwnerId },
//       }),
//     }),
//   }),
// });

// export const {
//   useAddToCartMutation,
//   useGetAllAssetsQuery,
//   useRemoveQuantityMutation,
//   useClearAllCartMutation,
// } = cartApi;
// ====================== after lint 7 oct

// redux/slices/cart/cartApiSlice.ts
// redux/slices/cart/cartApiSlice.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getCookie } from '@/utils/cookies';

// ✅ Cart item as stored in backend
export interface CartItemResponse {
  _id: string;
  App: {
    _id: string;
    Name: string;
    PricePerMonth?: number;
    Description?: string;
  };
  Quantity: number;
  TotalPrice?: number;
}

// ✅ Full cart object as returned by backend
export interface CartDataResponse {
  _id: string;
  OwnerType: string;
  OwnerId: string;
  Items: CartItemResponse[];
  GrandTotal?: number;
  createdAt: string;
  updatedAt: string;
  __v?: number;
  data?: any;
}

// ✅ Add to cart response
export interface AddToCartResponse {
  status: boolean;
  message: string;
  data: {
    OwnerType: string;
    OwnerId: string;
    Items: { AppId: string; Quantity: number; _id: string }[];
    _id: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
}

// ✅ Remove quantity response
export interface RemoveQuantityResponse {
  status: boolean;
  message: string;
  data: CartDataResponse;
}

// ✅ Clear cart response
export interface ClearCartResponse {
  status: boolean;
  message: string;
  data: CartDataResponse;
}

export const cartApi = createApi({
  reducerPath: 'cartApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    prepareHeaders: (headers) => {
      const token = getCookie('UserToken');
      if (token) headers.set('Authorization', `Bearer ${token}`);
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  tagTypes: ['Cart'],
  endpoints: (builder) => ({
    // Add item to cart
    addToCart: builder.mutation<
      AddToCartResponse,
      { OwnerType: string; OwnerId: string; AppId: string; Quantity: number }
    >({
      query: (body) => ({
        url: '/cart/add',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Cart'],
    }),

    // Get all assets in cart
    getAllAssets: builder.query<CartDataResponse, { OwnerType: string; OwnerId: string }>({
      query: ({ OwnerType, OwnerId }) => ({
        url: `/cart?OwnerType=${OwnerType}&OwnerId=${OwnerId}`,
        method: 'GET',
      }),
      providesTags: ['Cart'],
    }),

    // Remove quantity from cart
    removeQuantity: builder.mutation<
      RemoveQuantityResponse,
      { OwnerType: string; OwnerId: string; AppId: string }
    >({
      query: ({ OwnerType, OwnerId, AppId }) => ({
        url: `/cart/remove`,
        method: 'DELETE',
        body: { OwnerType, OwnerId, AppId },
      }),
    }),

    // Clear all cart
    clearAllCart: builder.mutation<ClearCartResponse, { OwnerType: string; OwnerId: string }>({
      query: ({ OwnerType, OwnerId }) => ({
        url: `/cart/clear`,
        method: 'DELETE',
        body: { OwnerType, OwnerId },
      }),
    }),
  }),
});

export const {
  useAddToCartMutation,
  useGetAllAssetsQuery,
  useRemoveQuantityMutation,
  useClearAllCartMutation,
} = cartApi;
