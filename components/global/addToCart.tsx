// components/global/addToCart.tsx
// 'use client';
// import { useRouter } from 'next/navigation';
// import { isLoggedIn } from '@/utils/auth';
// import React, { useEffect, useMemo } from 'react';
// import { useSelector, useDispatch } from 'react-redux';

// import { RootState } from '@/redux/store';
// import { useCreateSubscriptionMutation } from '@/redux/slices/subscription/subscriptionSlice';
// import { useCreateCheckoutSessionMutation } from '@/redux/slices/payment/paymentSlice';
// import {
//   setCart,
//   addToCart,
//   removeFromCart,
//   clearCart,
// } from '@/redux/slices/cart/cartLocalStrogeSlice';
// import { getCookie } from '@/utils/cookies';

// import {
//   useAddToCartMutation,
//   useRemoveQuantityMutation,
//   useGetAllAssetsQuery,
//   useClearAllCartMutation,
// } from '@/redux/slices/cart/cartApiSlice';
// import { getErrorMessage } from '@/utils/errorHandler';

// const CartPage = () => {
//   const router = useRouter();
//   const dispatch = useDispatch();
//   const cartItems = useSelector((state: RootState) => state.cart.items);
//   const [createSubscription] = useCreateSubscriptionMutation();
//   const [createCheckoutSession] = useCreateCheckoutSessionMutation();
//   const userId = getCookie('UserId');
//   const { data: backendData, refetch } = useGetAllAssetsQuery(
//     { OwnerType: 'user', OwnerId: userId || '' },
//     { skip: !userId },
//   );

//   console.log(backendData, 'backendData');

//   const [addToCartApi] = useAddToCartMutation();
//   const [removeQuantityApi] = useRemoveQuantityMutation();
//   const [clearAllCartApi] = useClearAllCartMutation();
//   // Sync backend cart to Redux
//   useEffect(() => {
//     if (userId && backendData?.data?.Items) {
//       console.log('backendData?.data?.Items', backendData?.data?.Items);

//       const formattedCart = backendData.data.Items.map((item: any) => ({
//         id: item.App._id,
//         name: item.App.Name,
//         price: item.App.PricePerMonth,
//         qty: item.Quantity,
//         subtotal: item.TotalPrice,
//       }));
//       dispatch(setCart(formattedCart));
//     }
//   }, [backendData, userId, dispatch]);
//   const handleAdd = async (id: string) => {
//     if (userId) {
//       await addToCartApi({
//         OwnerType: 'user',
//         OwnerId: userId,
//         AppId: id,
//         Quantity: 1,
//       }).unwrap();
//       refetch();
//     } else {
//       dispatch(addToCart({ id, qty: 1 }));
//     }
//   };
//   const handleRemove = async (id: string) => {
//     if (userId) {
//       await removeQuantityApi({
//         OwnerType: 'user',
//         OwnerId: userId,
//         AppId: id,
//       }).unwrap();
//       refetch();
//     } else {
//       dispatch(removeFromCart(id));
//     }
//   };
//   const handleClear = async () => {
//     if (userId) {
//       await clearAllCartApi({ OwnerType: 'user', OwnerId: userId }).unwrap();
//       refetch();
//     }
//     dispatch(clearCart());
//   };
//   const localTotal = useMemo(() => {
//     return cartItems.reduce((acc, item) => acc + (item.price || 0) * item.qty, 0);
//   }, [cartItems]);

//   // console.log(cartItems);

//   const handleProceed = async () => {
//     if (!isLoggedIn()) {
//       router.push('/ind-login?redirect=cart');
//       return;
//     }

//     if (!userId || cartItems.length === 0) return;

//     try {
//       // 1️⃣ Create subscription
//       const subRes = await createSubscription({
//         SubscriberType: 'user',
//         SubscriberId: userId,
//         // Apps: cartItems.map((item) => ({ AppId: item.id })),
//         Apps: cartItems.map((item) => ({ AppId: item.id, Quantity: item.qty })),
//       }).unwrap();

//       if (!subRes.status) throw new Error('Subscription creation failed');

//       // 2️⃣ Create checkout session (Stripe hosted page)
//       const checkoutRes = await createCheckoutSession({
//         subscriptionId: subRes.data._id,
//       }).unwrap();

//       if (!checkoutRes.status) throw new Error('Checkout session creation failed');

//       // 3️⃣ Redirect to Stripe-hosted checkout
//       window.location.href = checkoutRes.data.url;
//     } catch (err: unknown) {
//       console.error(getErrorMessage(err));
//     }
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-semibold mb-6">Cart</h1>
//       {cartItems.length === 0 ? (
//         <p>No items in cart</p>
//       ) : (
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* Left side: Product Table */}
//           <div className="lg:col-span-2">
//             <table className="w-full border-collapse">
//               <thead>
//                 <tr className="border-b border-[#D0D5DD]  text-lg">
//                   <th className="text-left py-3 font-normal ">Product Details</th>
//                   <th className="text-left py-3 font-normal">Price</th>
//                   <th className="text-left py-3 font-normal">Quantity</th>
//                   <th className="text-left py-3 font-normal">Subtotal</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {cartItems.map((item) => (
//                   <tr key={item.id} className="border-b border-[#D0D5DD]">
//                     <td className="flex items-center gap-3 py-4">
//                       <div className="w-16 h-16 bg-red-900"></div>
//                       <span className="text-base font-normal">{item.name}</span>
//                     </td>
//                     <td className="text-base font-normal">${item.price}</td>
//                     <td>
//                       <div className="flex items-center gap-2">
//                         <button
//                           onClick={() => handleRemove(item.id)}
//                           className="px-2 flex items-center text-xl font-normal cursor-pointer hover:bg-red-400 transition-all "
//                         >
//                           -
//                         </button>
//                         <span className="px-3 py-1   bg-[#D0D5DD]">{item.qty}</span>
//                         <button
//                           onClick={() => handleAdd(item.id)}
//                           className="px-2 flex items-center text-xl font-normal cursor-pointer hover:bg-red-400 transition-all "
//                         >
//                           +
//                         </button>
//                       </div>
//                     </td>
//                     <td>${userId ? item.subtotal : (item.price || 0) * item.qty}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//           {/* Right side: Cart Summary */}
//           <div className="bg-[#FFEECA] p-6 rounded-md h-fit">
//             <h2 className="text-3xl font-normal mb-4">
//               Cart Total <span className="ml-1">({cartItems.length})</span>
//             </h2>
//             <div className="flex justify-between flex-col py-2 border-b pb-7">
//               <span className="text-xl">SubTotal</span>
//               <span className="text-lg">
//                 ${userId ? backendData?.data?.GrandTotal || 0 : localTotal}
//               </span>
//             </div>
//             <div className="flex justify-between flex-col py-2 mt-5  pb-4">
//               <span className="text-xl">Total</span>
//               <span className="text-lg">
//                 ${userId ? backendData?.data?.GrandTotal || 0 : localTotal}
//               </span>
//             </div>
//             <button
//               onClick={handleProceed}
//               className="w-full mb-3 bg-white font-medium text-2xl text-black py-2 rounded mt-4 cursor-pointer hover:bg-gray-100"
//             >
//               Proceed to Checkout
//             </button>
//             <button
//               onClick={handleClear}
//               className="w-full cursor-pointer text-lg bg-red-500 text-white py-2 rounded mt-2 hover:bg-red-600"
//             >
//               Clear Cart
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };
// export default CartPage;
// ============ lint fix 7 oct ==================
// components/global/addToCart.tsx
// 'use client';
// import { useRouter } from 'next/navigation';
// import { isLoggedIn } from '@/utils/auth';
// import React, { useEffect, useMemo } from 'react';
// import { useSelector, useDispatch } from 'react-redux';

// import { RootState } from '@/redux/store';
// import { useCreateSubscriptionMutation } from '@/redux/slices/subscription/subscriptionSlice';
// import { useCreateCheckoutSessionMutation } from '@/redux/slices/payment/paymentSlice';
// import {
//   setCart,
//   addToCart,
//   removeFromCart,
//   clearCart,
// } from '@/redux/slices/cart/cartLocalStrogeSlice';
// import { getCookie } from '@/utils/cookies';

// import {
//   useAddToCartMutation,
//   useRemoveQuantityMutation,
//   useGetAllAssetsQuery,
//   useClearAllCartMutation,
//   CartItemResponse,
// } from '@/redux/slices/cart/cartApiSlice';
// import { getErrorMessage } from '@/utils/errorHandler';

// interface FormattedCartItem {
//   id: string;
//   name: string;
//   price?: number;
//   qty: number;
//   subtotal?: number;
// }

// const CartPage = () => {
//   const router = useRouter();
//   const dispatch = useDispatch();
//   const cartItems = useSelector((state: RootState) => state.cart.items) as FormattedCartItem[];
//   const [createSubscription] = useCreateSubscriptionMutation();
//   const [createCheckoutSession] = useCreateCheckoutSessionMutation();
//   const userId = getCookie('UserId');

//   const { data: backendData, refetch } = useGetAllAssetsQuery(
//     { OwnerType: 'user', OwnerId: userId || '' },
//     { skip: !userId },
//   );

//   const [addToCartApi] = useAddToCartMutation();
//   const [removeQuantityApi] = useRemoveQuantityMutation();
//   const [clearAllCartApi] = useClearAllCartMutation();

//   // Sync backend cart to Redux
//   useEffect(() => {
//     if (userId && backendData?.data?.Items) {
//       const formattedCart: FormattedCartItem[] = backendData.Items.map(
//         (item: CartItemResponse) => ({
//           id: item.App._id,
//           name: item.App.Name,
//           price: item.App.PricePerMonth ?? 0,
//           qty: item.Quantity,
//           subtotal: item.TotalPrice,
//         }),
//       );
//       dispatch(setCart(formattedCart));
//     }
//   }, [backendData, userId, dispatch]);

//   const handleAdd = async (id: string) => {
//     if (userId) {
//       try {
//         await addToCartApi({
//           OwnerType: 'user',
//           OwnerId: userId,
//           AppId: id,
//           Quantity: 1,
//         }).unwrap();
//         refetch();
//       } catch (err: unknown) {
//         console.error(getErrorMessage(err));
//       }
//     } else {
//       dispatch(addToCart({ id, qty: 1 }));
//     }
//   };

//   const handleRemove = async (id: string) => {
//     if (userId) {
//       try {
//         await removeQuantityApi({
//           OwnerType: 'user',
//           OwnerId: userId,
//           AppId: id,
//         }).unwrap();
//         refetch();
//       } catch (err: unknown) {
//         console.error(getErrorMessage(err));
//       }
//     } else {
//       dispatch(removeFromCart(id));
//     }
//   };

//   const handleClear = async () => {
//     if (userId) {
//       try {
//         await clearAllCartApi({ OwnerType: 'user', OwnerId: userId }).unwrap();
//         refetch();
//       } catch (err: unknown) {
//         console.error(getErrorMessage(err));
//       }
//     }
//     dispatch(clearCart());
//   };

//   const localTotal = useMemo(() => {
//     return cartItems.reduce((acc, item) => acc + (item.price || 0) * item.qty, 0);
//   }, [cartItems]);

//   // const handleProceed = async () => {
//   //   if (!isLoggedIn()) {
//   //     router.push('/ind-login?redirect=cart');
//   //     return;
//   //   }

//   //   if (!userId || cartItems.length === 0) return;

//   //   try {
//   //     const subRes = await createSubscription({
//   //       SubscriberType: 'user',
//   //       SubscriberId: userId,
//   //       Apps: cartItems.map((item) => ({ AppId: item.id, Quantity: item.qty })),
//   //     }).unwrap();

//   //     if (!subRes.status) throw new Error('Subscription creation failed');

//   //     const checkoutRes = await createCheckoutSession({
//   //       subscriptionId: subRes.data._id,
//   //     }).unwrap();

//   //     if (!checkoutRes.status) throw new Error('Checkout session creation failed');

//   //     window.location.href = checkoutRes.data.url;
//   //   } catch (err: unknown) {
//   //     console.error(getErrorMessage(err));
//   //   }
//   // };

//   const handleProceed = async () => {
//     if (!isLoggedIn()) {
//       router.push('/ind-login?redirect=cart');
//       return;
//     }

//     if (!userId || cartItems.length === 0) return;

//     try {
//       // Create subscription
//       const subRes = await createSubscription({
//         SubscriberType: 'user',
//         SubscriberId: userId,
//         Apps: cartItems.map((item) => ({ AppId: item.id, Quantity: item.qty })),
//       }).unwrap();

//       // Handle case when API returns an array of subscriptions
//       const subscription = Array.isArray(subRes.data) ? subRes.data[0] : subRes.data;

//       if (!subscription || !('_id' in subscription)) {
//         throw new Error('Subscription creation failed');
//       }

//       const subscriptionId = subscription._id;

//       // Create checkout session
//       const checkoutRes = await createCheckoutSession({ subscriptionId }).unwrap();

//       if (!checkoutRes.status) throw new Error('Checkout session creation failed');

//       window.location.href = checkoutRes.data.url;
//     } catch (err: unknown) {
//       console.error(getErrorMessage(err));
//     }
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-semibold mb-6">Cart</h1>
//       {cartItems.length === 0 ? (
//         <p>No items in cart</p>
//       ) : (
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* Left side: Product Table */}
//           <div className="lg:col-span-2">
//             <table className="w-full border-collapse">
//               <thead>
//                 <tr className="border-b border-[#D0D5DD]  text-lg">
//                   <th className="text-left py-3 font-normal ">Product Details</th>
//                   <th className="text-left py-3 font-normal">Price</th>
//                   <th className="text-left py-3 font-normal">Quantity</th>
//                   <th className="text-left py-3 font-normal">Subtotal</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {cartItems.map((item) => (
//                   <tr key={item.id} className="border-b border-[#D0D5DD]">
//                     <td className="flex items-center gap-3 py-4">
//                       <div className="w-16 h-16 bg-red-900"></div>
//                       <span className="text-base font-normal">{item.name}</span>
//                     </td>
//                     <td className="text-base font-normal">${item.price}</td>
//                     <td>
//                       <div className="flex items-center gap-2">
//                         <button
//                           onClick={() => handleRemove(item.id)}
//                           className="px-2 flex items-center text-xl font-normal cursor-pointer hover:bg-red-400 transition-all "
//                         >
//                           -
//                         </button>
//                         <span className="px-3 py-1   bg-[#D0D5DD]">{item.qty}</span>
//                         <button
//                           onClick={() => handleAdd(item.id)}
//                           className="px-2 flex items-center text-xl font-normal cursor-pointer hover:bg-red-400 transition-all "
//                         >
//                           +
//                         </button>
//                       </div>
//                     </td>
//                     <td>${userId ? item.subtotal : (item.price || 0) * item.qty}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//           {/* Right side: Cart Summary */}
//           <div className="bg-[#FFEECA] p-6 rounded-md h-fit">
//             <h2 className="text-3xl font-normal mb-4">
//               Cart Total <span className="ml-1">({cartItems.length})</span>
//             </h2>
//             <div className="flex justify-between flex-col py-2 border-b pb-7">
//               <span className="text-xl">SubTotal</span>
//               <span className="text-lg">${userId ? backendData?.GrandTotal || 0 : localTotal}</span>
//             </div>
//             <div className="flex justify-between flex-col py-2 mt-5  pb-4">
//               <span className="text-xl">Total</span>
//               <span className="text-lg">${userId ? backendData?.GrandTotal || 0 : localTotal}</span>
//             </div>
//             <button
//               onClick={handleProceed}
//               className="w-full mb-3 bg-white font-medium text-2xl text-black py-2 rounded mt-4 cursor-pointer hover:bg-gray-100"
//             >
//               Proceed to Checkout
//             </button>
//             <button
//               onClick={handleClear}
//               className="w-full cursor-pointer text-lg bg-red-500 text-white py-2 rounded mt-2 hover:bg-red-600"
//             >
//               Clear Cart
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CartPage;
// ===
// ===
// ===
// components/global/addToCart.tsx
// 'use client';
// import { useRouter } from 'next/navigation';
// import { isLoggedIn } from '@/utils/auth';
// import React, { useEffect, useMemo } from 'react';
// import { useSelector, useDispatch } from 'react-redux';

// import { RootState } from '@/redux/store';
// import { useCreateSubscriptionMutation } from '@/redux/slices/subscription/subscriptionSlice';
// import { useCreateCheckoutSessionMutation } from '@/redux/slices/payment/paymentSlice';
// import {
//   setCart,
//   addToCart,
//   removeFromCart,
//   clearCart,
// } from '@/redux/slices/cart/cartLocalStrogeSlice';
// import { getCookie } from '@/utils/cookies';

// import {
//   useAddToCartMutation,
//   useRemoveQuantityMutation,
//   useGetAllAssetsQuery,
//   useClearAllCartMutation,
// } from '@/redux/slices/cart/cartApiSlice';
// import { getErrorMessage } from '@/utils/errorHandler';

// // ---------- TypeScript Types ----------
// interface BackendApp {
//   _id: string;
//   Name: string;
//   PricePerMonth: number;
// }

// interface BackendCartItem {
//   App: BackendApp;
//   Quantity: number;
//   TotalPrice: number;
// }

// interface BackendData {
//   Items?: BackendCartItem[];
//   GrandTotal?: number;
// }

// // ---------- Component ----------
// const CartPage = () => {
//   const router = useRouter();
//   const dispatch = useDispatch();
//   const cartItems = useSelector((state: RootState) => state.cart.items);
//   const [createSubscription] = useCreateSubscriptionMutation();
//   const [createCheckoutSession] = useCreateCheckoutSessionMutation();
//   const userId = getCookie('UserId');

//   const { data: backendData, refetch } = useGetAllAssetsQuery<BackendData>(
//     { OwnerType: 'user', OwnerId: userId || '' },
//     { skip: !userId },
//   );

//   console.log(backendData, 'backendData');

//   const [addToCartApi] = useAddToCartMutation();
//   const [removeQuantityApi] = useRemoveQuantityMutation();
//   const [clearAllCartApi] = useClearAllCartMutation();

//   // Sync backend cart to Redux
//   useEffect(() => {
//     if (userId && backendData?.Items) {
//       const formattedCart = backendData.Items.map((item: BackendCartItem) => ({
//         id: item.App._id,
//         name: item.App.Name,
//         price: item.App.PricePerMonth,
//         qty: item.Quantity,
//         subtotal: item.TotalPrice,
//       }));
//       dispatch(setCart(formattedCart));
//     }
//   }, [backendData, userId, dispatch]);

//   const handleAdd = async (id: string) => {
//     if (userId) {
//       await addToCartApi({
//         OwnerType: 'user',
//         OwnerId: userId,
//         AppId: id,
//         Quantity: 1,
//       }).unwrap();
//       refetch();
//     } else {
//       dispatch(addToCart({ id, qty: 1 }));
//     }
//   };

//   const handleRemove = async (id: string) => {
//     if (userId) {
//       await removeQuantityApi({
//         OwnerType: 'user',
//         OwnerId: userId,
//         AppId: id,
//       }).unwrap();
//       refetch();
//     } else {
//       dispatch(removeFromCart(id));
//     }
//   };

//   const handleClear = async () => {
//     if (userId) {
//       await clearAllCartApi({ OwnerType: 'user', OwnerId: userId }).unwrap();
//       refetch();
//     }
//     dispatch(clearCart());
//   };

//   const localTotal = useMemo(() => {
//     return cartItems.reduce((acc, item) => acc + (item.price || 0) * item.qty, 0);
//   }, [cartItems]);

//   const handleProceed = async () => {
//     if (!isLoggedIn()) {
//       router.push('/ind-login?redirect=cart');
//       return;
//     }

//     if (!userId || cartItems.length === 0) return;

//     try {
//       // 1️⃣ Create subscription
//       const subRes = await createSubscription({
//         SubscriberType: 'user',
//         SubscriberId: userId,
//         Apps: cartItems.map((item) => ({ AppId: item.id, Quantity: item.qty })),
//       }).unwrap();

//       if (!subRes.status) throw new Error('Subscription creation failed');

//       // 2️⃣ Create checkout session (Stripe hosted page)
//       const checkoutRes = await createCheckoutSession({
//         subscriptionId: subRes.data._id,
//       }).unwrap();

//       if (!checkoutRes.status) throw new Error('Checkout session creation failed');

//       // 3️⃣ Redirect to Stripe-hosted checkout
//       window.location.href = checkoutRes.data.url;
//     } catch (err: unknown) {
//       console.error(getErrorMessage(err));
//     }
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-semibold mb-6">Cart</h1>
//       {cartItems.length === 0 ? (
//         <p>No items in cart</p>
//       ) : (
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* Left side: Product Table */}
//           <div className="lg:col-span-2">
//             <table className="w-full border-collapse">
//               <thead>
//                 <tr className="border-b border-[#D0D5DD]  text-lg">
//                   <th className="text-left py-3 font-normal ">Product Details</th>
//                   <th className="text-left py-3 font-normal">Price</th>
//                   <th className="text-left py-3 font-normal">Quantity</th>
//                   <th className="text-left py-3 font-normal">Subtotal</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {cartItems.map((item) => (
//                   <tr key={item.id} className="border-b border-[#D0D5DD]">
//                     <td className="flex items-center gap-3 py-4">
//                       <div className="w-16 h-16 bg-red-900"></div>
//                       <span className="text-base font-normal">{item.name}</span>
//                     </td>
//                     <td className="text-base font-normal">${item.price}</td>
//                     <td>
//                       <div className="flex items-center gap-2">
//                         <button
//                           onClick={() => handleRemove(item.id)}
//                           className="px-2 flex items-center text-xl font-normal cursor-pointer hover:bg-red-400 transition-all "
//                         >
//                           -
//                         </button>
//                         <span className="px-3 py-1   bg-[#D0D5DD]">{item.qty}</span>
//                         <button
//                           onClick={() => handleAdd(item.id)}
//                           className="px-2 flex items-center text-xl font-normal cursor-pointer hover:bg-red-400 transition-all "
//                         >
//                           +
//                         </button>
//                       </div>
//                     </td>
//                     <td>${userId ? item.subtotal : (item.price || 0) * item.qty}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//           {/* Right side: Cart Summary */}
//           <div className="bg-[#FFEECA] p-6 rounded-md h-fit">
//             <h2 className="text-3xl font-normal mb-4">
//               Cart Total <span className="ml-1">({cartItems.length})</span>
//             </h2>
//             <div className="flex justify-between flex-col py-2 border-b pb-7">
//               <span className="text-xl">SubTotal</span>
//               <span className="text-lg">${userId ? backendData?.GrandTotal || 0 : localTotal}</span>
//             </div>
//             <div className="flex justify-between flex-col py-2 mt-5  pb-4">
//               <span className="text-xl">Total</span>
//               <span className="text-lg">${userId ? backendData?.GrandTotal || 0 : localTotal}</span>
//             </div>
//             <button
//               onClick={handleProceed}
//               className="w-full mb-3 bg-white font-medium text-2xl text-black py-2 rounded mt-4 cursor-pointer hover:bg-gray-100"
//             >
//               Proceed to Checkout
//             </button>
//             <button
//               onClick={handleClear}
//               className="w-full cursor-pointer text-lg bg-red-500 text-white py-2 rounded mt-2 hover:bg-red-600"
//             >
//               Clear Cart
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CartPage;
// =============
// =============
// =============
// components/global/addToCart.tsx
// =========
// =========
// =========
// =========
// components/global/addToCart.tsx
// components/global/addToCart.tsx
// 'use client';
// import { useRouter } from 'next/navigation';
// import { isLoggedIn } from '@/utils/auth';
// import React, { useEffect, useMemo } from 'react';
// import { useSelector, useDispatch } from 'react-redux';

// import { RootState } from '@/redux/store';
// import { useCreateSubscriptionMutation } from '@/redux/slices/subscription/subscriptionSlice';
// import { useCreateCheckoutSessionMutation } from '@/redux/slices/payment/paymentSlice';
// import {
//   setCart,
//   addToCart,
//   removeFromCart,
//   clearCart,
// } from '@/redux/slices/cart/cartLocalStrogeSlice';
// import { getCookie } from '@/utils/cookies';
// import { getErrorMessage } from '@/utils/errorHandler';

// import {
//   useAddToCartMutation,
//   useRemoveQuantityMutation,
//   useGetAllAssetsQuery,
//   useClearAllCartMutation,
//   // CartDataResponse,
//   CartItemResponse,
// } from '@/redux/slices/cart/cartApiSlice';

// const CartPage = () => {
//   const router = useRouter();
//   const dispatch = useDispatch();
//   const cartItems = useSelector((state: RootState) => state.cart.items);

//   const [createSubscription] = useCreateSubscriptionMutation();
//   const [createCheckoutSession] = useCreateCheckoutSessionMutation();
//   const userId = getCookie('UserId');

//   // Backend cart query
//   const { data: backendData, refetch } = useGetAllAssetsQuery(
//     { OwnerType: 'user', OwnerId: userId || '' },
//     { skip: !userId },
//   );

//   console.log(backendData, 'backendData');

//   const [addToCartApi] = useAddToCartMutation();
//   const [removeQuantityApi] = useRemoveQuantityMutation();
//   const [clearAllCartApi] = useClearAllCartMutation();

//   // Sync backend cart to Redux
//   useEffect(() => {
//     if (userId && backendData?.Items) {
//       const formattedCart = backendData.Items.map((item: CartItemResponse) => ({
//         id: item.App._id,
//         name: item.App.Name,
//         price: item.App.PricePerMonth,
//         qty: item.Quantity,
//         subtotal: item.TotalPrice,
//       }));
//       dispatch(setCart(formattedCart));
//     }
//   }, [backendData, userId, dispatch]);

//   // Handle add item
//   const handleAdd = async (id: string) => {
//     if (userId) {
//       await addToCartApi({
//         OwnerType: 'user',
//         OwnerId: userId,
//         AppId: id,
//         Quantity: 1,
//       }).unwrap();
//       refetch();
//     } else {
//       dispatch(addToCart({ id, qty: 1 }));
//     }
//   };

//   // Handle remove item
//   const handleRemove = async (id: string) => {
//     if (userId) {
//       await removeQuantityApi({
//         OwnerType: 'user',
//         OwnerId: userId,
//         AppId: id,
//       }).unwrap();
//       refetch();
//     } else {
//       dispatch(removeFromCart(id));
//     }
//   };

//   // Handle clear cart
//   const handleClear = async () => {
//     if (userId) {
//       await clearAllCartApi({ OwnerType: 'user', OwnerId: userId }).unwrap();
//       refetch();
//     }
//     dispatch(clearCart());
//   };

//   // Local total for non-logged-in users
//   const localTotal = useMemo(() => {
//     return cartItems.reduce((acc, item) => acc + (item.price || 0) * item.qty, 0);
//   }, [cartItems]);

//   const handleProceed = async () => {
//     if (!isLoggedIn()) {
//       router.push('/ind-login?redirect=cart');
//       return;
//     }

//     if (!userId || cartItems.length === 0) return;

//     try {
//       const subRes = await createSubscription({
//         SubscriberType: 'user',
//         SubscriberId: userId,
//         Apps: cartItems.map((item) => ({ AppId: item.id, Quantity: item.qty })),
//       }).unwrap();

//       if (!subRes.status || !subRes.data?._id) {
//         throw new Error('Subscription creation failed or no subscription ID returned');
//       }

//       const checkoutRes = await createCheckoutSession({
//         subscriptionId: subRes.data._id, // Now correctly typed as Subscription
//       }).unwrap();

//       if (!checkoutRes.status || !checkoutRes.data?.url) {
//         throw new Error('Checkout session creation failed or no URL returned');
//       }

//       window.location.href = checkoutRes.data.url;
//     } catch (err: unknown) {
//       console.error(getErrorMessage(err));
//     }
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-semibold mb-6">Cart</h1>
//       {cartItems.length === 0 ? (
//         <p>No items in cart</p>
//       ) : (
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* Product Table */}
//           <div className="lg:col-span-2">
//             <table className="w-full border-collapse">
//               <thead>
//                 <tr className="border-b border-[#D0D5DD] text-lg">
//                   <th className="text-left py-3 font-normal">Product Details</th>
//                   <th className="text-left py-3 font-normal">Price</th>
//                   <th className="text-left py-3 font-normal">Quantity</th>
//                   <th className="text-left py-3 font-normal">Subtotal</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {cartItems.map((item) => (
//                   <tr key={item.id} className="border-b border-[#D0D5DD]">
//                     <td className="flex items-center gap-3 py-4">
//                       <div className="w-16 h-16 bg-red-900"></div>
//                       <span className="text-base font-normal">{item.name}</span>
//                     </td>
//                     <td className="text-base font-normal">${item.price}</td>
//                     <td>
//                       <div className="flex items-center gap-2">
//                         <button
//                           onClick={() => handleRemove(item.id)}
//                           className="px-2 flex items-center text-xl font-normal cursor-pointer hover:bg-red-400 transition-all"
//                         >
//                           -
//                         </button>
//                         <span className="px-3 py-1 bg-[#D0D5DD]">{item.qty}</span>
//                         <button
//                           onClick={() => handleAdd(item.id)}
//                           className="px-2 flex items-center text-xl font-normal cursor-pointer hover:bg-red-400 transition-all"
//                         >
//                           +
//                         </button>
//                       </div>
//                     </td>
//                     <td>${userId ? item.subtotal : (item.price || 0) * item.qty}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           {/* Cart Summary */}
//           <div className="bg-[#FFEECA] p-6 rounded-md h-fit">
//             <h2 className="text-3xl font-normal mb-4">
//               Cart Total <span className="ml-1">({cartItems.length})</span>
//             </h2>
//             <div className="flex justify-between flex-col py-2 border-b pb-7">
//               <span className="text-xl">SubTotal</span>
//               <span className="text-lg">${userId ? backendData?.GrandTotal || 0 : localTotal}</span>
//             </div>
//             <div className="flex justify-between flex-col py-2 mt-5 pb-4">
//               <span className="text-xl">Total</span>
//               <span className="text-lg">${userId ? backendData?.GrandTotal || 0 : localTotal}</span>
//             </div>
//             <button
//               onClick={handleProceed}
//               className="w-full mb-3 bg-white font-medium text-2xl text-black py-2 rounded mt-4 cursor-pointer hover:bg-gray-100"
//             >
//               Proceed to Checkout
//             </button>
//             <button
//               onClick={handleClear}
//               className="w-full cursor-pointer text-lg bg-red-500 text-white py-2 rounded mt-2 hover:bg-red-600"
//             >
//               Clear Cart
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CartPage;
// ==================
// components/global/addToCart.tsx
// 'use client';
// import { useRouter } from 'next/navigation';
// import { isLoggedIn } from '@/utils/auth';
// import React, { useEffect, useMemo } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { toast } from 'react-hot-toast';

// import { RootState } from '@/redux/store';
// import { useCreateSubscriptionMutation } from '@/redux/slices/subscription/subscriptionSlice';
// import { useCreateCheckoutSessionMutation } from '@/redux/slices/payment/paymentSlice';
// import {
//   setCart,
//   addToCart,
//   removeFromCart,
//   clearCart,
// } from '@/redux/slices/cart/cartLocalStrogeSlice';
// import { getCookie } from '@/utils/cookies';
// import { getErrorMessage } from '@/utils/errorHandler';

// import {
//   useAddToCartMutation,
//   useRemoveQuantityMutation,
//   useGetAllAssetsQuery,
//   useClearAllCartMutation,
//   CartItemResponse,
// } from '@/redux/slices/cart/cartApiSlice';

// const CartPage = () => {
//   const router = useRouter();
//   const dispatch = useDispatch();
//   const cartItems = useSelector((state: RootState) => state.cart.items);

//   const [createSubscription] = useCreateSubscriptionMutation();
//   const [createCheckoutSession] = useCreateCheckoutSessionMutation();
//   const userId = getCookie('UserId');

//   // Backend cart query
//   const { data: backendData, refetch, isLoading, error } = useGetAllAssetsQuery(
//     { OwnerType: 'user', OwnerId: userId || '' },
//     { skip: !userId },
//   );

//   // Sync backend cart to Redux
//   useEffect(() => {
//     if (userId && backendData?.Items) {
//       const formattedCart = backendData.Items.map((item: CartItemResponse) => ({
//         id: item.App._id,
//         name: item.App.Name,
//         price: item.App.PricePerMonth || 0, // Fallback to 0 if undefined
//         qty: item.Quantity,
//         subtotal: item.TotalPrice || (item.App.PricePerMonth || 0) * item.Quantity, // Fallback calculation
//       }));
//       dispatch(setCart(formattedCart));
//     }
//   }, [backendData, userId, dispatch]);

//   // Merge local cart to backend on login
//   useEffect(() => {
//     const mergeLocalCartToBackend = async () => {
//       if (userId && cartItems.length > 0 && !backendData) {
//         // If backend cart is empty, sync local cart to backend
//         for (const item of cartItems) {
//           try {
//             await addToCartApi({
//               OwnerType: 'user',
//               OwnerId: userId,
//               AppId: item.id,
//               Quantity: item.qty,
//             }).unwrap();
//           } catch (err) {
//             toast.error('Failed to sync local cart to backend');
//           }
//         }
//         refetch();
//       }
//     };
//     mergeLocalCartToBackend();
//   }, [userId, cartItems, backendData]);

//   // Handle add item
//   const [addToCartApi] = useAddToCartMutation();
//   const handleAdd = async (id: string) => {
//     try {
//       if (userId) {
//         await addToCartApi({
//           OwnerType: 'user',
//           OwnerId: userId,
//           AppId: id,
//           Quantity: 1,
//         }).unwrap();
//         toast.success('Item added to cart');
//         refetch();
//       } else {
//         dispatch(addToCart({ id, qty: 1 }));
//         toast.success('Item added to local cart');
//       }
//     } catch (err) {
//       toast.error('Failed to add item');
//     }
//   };

//   // Handle remove item
//   const [removeQuantityApi] = useRemoveQuantityMutation();
//   const handleRemove = async (id: string) => {
//     try {
//       if (userId) {
//         await removeQuantityApi({
//           OwnerType: 'user',
//           OwnerId: userId,
//           AppId: id,
//         }).unwrap();
//         toast.success('Item quantity reduced');
//         refetch();
//       } else {
//         dispatch(removeFromCart(id));
//         toast.success('Item removed from local cart');
//       }
//     } catch (err) {
//       toast.error('Failed to remove item');
//     }
//   };

//   // Handle clear cart
//   const [clearAllCartApi] = useClearAllCartMutation();
//   const handleClear = async () => {
//     try {
//       if (userId) {
//         await clearAllCartApi({ OwnerType: 'user', OwnerId: userId }).unwrap();
//         toast.success('Cart cleared');
//         refetch();
//       }
//       dispatch(clearCart());
//       toast.success('Local cart cleared');
//     } catch (err) {
//       toast.error('Failed to clear cart');
//     }
//   };

//   // Calculate total (fallback for backend issues)
//   const total = useMemo(() => {
//     if (userId && backendData?.GrandTotal) {
//       return backendData.GrandTotal;
//     }
//     return cartItems.reduce((acc, item) => acc + (item.price || 0) * item.qty, 0);
//   }, [cartItems, backendData, userId]);

//   const handleProceed = async () => {
//     if (!isLoggedIn()) {
//       router.push('/ind-login?redirect=cart');
//       return;
//     }

//     if (!userId || cartItems.length === 0) {
//       toast.error('Cart is empty or user not found');
//       return;
//     }

//     try {
//       const subRes = await createSubscription({
//         SubscriberType: 'user',
//         SubscriberId: userId,
//         Apps: cartItems.map((item) => ({ AppId: item.id, Quantity: item.qty })),
//       }).unwrap();

//       if (!subRes.status || !subRes.data?._id) {
//         throw new Error('Subscription creation failed');
//       }

//       const checkoutRes = await createCheckoutSession({
//         subscriptionId: subRes.data._id,
//       }).unwrap();

//       if (!checkoutRes.status || !checkoutRes.data?.url) {
//         throw new Error('Checkout session creation failed');
//       }

//       window.location.href = checkoutRes.data.url;
//     } catch (err: unknown) {
//       toast.error(getErrorMessage(err));
//     }
//   };

//   if (isLoading) return <p>Loading cart...</p>;
//   if (error) return <p>Error loading cart: {getErrorMessage(error)}</p>;

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-semibold mb-6">Cart</h1>
//       {cartItems.length === 0 ? (
//         <p>No items in cart</p>
//       ) : (
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* Product Table */}
//           <div className="lg:col-span-2">
//             <table className="w-full border-collapse">
//               <thead>
//                 <tr className="border-b border-[#D0D5DD] text-lg">
//                   <th className="text-left py-3 font-normal">Product Details</th>
//                   <th className="text-left py-3 font-normal">Price</th>
//                   <th className="text-left py-3 font-normal">Quantity</th>
//                   <th className="text-left py-3 font-normal">Subtotal</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {cartItems.map((item) => (
//                   <tr key={item.id} className="border-b border-[#D0D5DD]">
//                     <td className="flex items-center gap-3 py-4">
//                       <div className="w-16 h-16 bg-red-900"></div>
//                       <span className="text-base font-normal">{item.name || 'Unknown'}</span>
//                     </td>
//                     <td className="text-base font-normal">${item.price || 0}</td>
//                     <td>
//                       <div className="flex items-center gap-2">
//                         <button
//                           onClick={() => handleRemove(item.id)}
//                           className="px-2 flex items-center text-xl font-normal cursor-pointer hover:bg-red-400 transition-all"
//                         >
//                           -
//                         </button>
//                         <span className="px-3 py-1 bg-[#D0D5DD]">{item.qty}</span>
//                         <button
//                           onClick={() => handleAdd(item.id)}
//                           className="px-2 flex items-center text-xl font-normal cursor-pointer hover:bg-red-400 transition-all"
//                         >
//                           +
//                         </button>
//                       </div>
//                     </td>
//                     <td>${item.subtotal || (item.price || 0) * item.qty}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           {/* Cart Summary */}
//           <div className="bg-[#FFEECA] p-6 rounded-md h-fit">
//             <h2 className="text-3xl font-normal mb-4">
//               Cart Total <span className="ml-1">({cartItems.length})</span>
//             </h2>
//             <div className="flex justify-between flex-col py-2 border-b pb-7">
//               <span className="text-xl">SubTotal</span>
//               <span className="text-lg">${total}</span>
//             </div>
//             <div className="flex justify-between flex-col py-2 mt-5 pb-4">
//               <span className="text-xl">Total</span>
//               <span className="text-lg">${total}</span>
//             </div>
//             <button
//               onClick={handleProceed}
//               className="w-full mb-3 bg-white font-medium text-2xl text-black py-2 rounded mt-4 cursor-pointer hover:bg-gray-100"
//             >
//               Proceed to Checkout
//             </button>
//             <button
//               onClick={handleClear}
//               className="w-full cursor-pointer text-lg bg-red-500 text-white py-2 rounded mt-2 hover:bg-red-600"
//             >
//               Clear Cart
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CartPage;
// ==============
// ==============
// ==============
// components/global/addToCart.tsx
// 'use client';
// import { useRouter } from 'next/navigation';
// import { isLoggedIn } from '@/utils/auth';
// import React, { useEffect, useMemo } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { toast } from 'react-hot-toast';

// import { RootState } from '@/redux/store';
// import { useCreateSubscriptionMutation } from '@/redux/slices/subscription/subscriptionSlice';
// import { useCreateCheckoutSessionMutation } from '@/redux/slices/payment/paymentSlice';
// import {
//   setCart,
//   addToCart,
//   removeFromCart,
//   clearCart,
// } from '@/redux/slices/cart/cartLocalStrogeSlice';
// import { getCookie } from '@/utils/cookies';
// import { getErrorMessage } from '@/utils/errorHandler';

// import {
//   useAddToCartMutation,
//   useRemoveQuantityMutation,
//   useGetAllAssetsQuery,
//   useClearAllCartMutation,
//   CartItemResponse,
// } from '@/redux/slices/cart/cartApiSlice';

// const CartPage = () => {
//   const router = useRouter();
//   const dispatch = useDispatch();
//   const cartItems = useSelector((state: RootState) => state.cart.items);

//   const [createSubscription] = useCreateSubscriptionMutation();
//   const [createCheckoutSession] = useCreateCheckoutSessionMutation();
//   const userId = getCookie('UserId');

//   // Backend cart query
//   const {
//     data: backendData,
//     refetch,
//     isLoading,
//     error,
//   } = useGetAllAssetsQuery({ OwnerType: 'user', OwnerId: userId || '' }, { skip: !userId });

//   console.log(backendData, '======== backendData ==========');

//   // Sync backend cart to Redux
//   useEffect(() => {
//     if (userId && backendData?.Items) {
//       const formattedCart = backendData.Items.map((item: CartItemResponse) => ({
//         id: item.App._id,
//         name: item.App.Name,
//         price: item.App.PricePerMonth || 0, // Fallback to 0 if undefined
//         qty: item.Quantity,
//         subtotal: item.TotalPrice || (item.App.PricePerMonth || 0) * item.Quantity, // Fallback calculation
//       }));
//       dispatch(setCart(formattedCart));
//     }
//   }, [backendData, userId, dispatch]);

//   // Merge local cart to backend on login
//   useEffect(() => {
//     const mergeLocalCartToBackend = async () => {
//       if (userId && cartItems.length > 0 && !backendData) {
//         // If backend cart is empty, sync local cart to backend
//         for (const item of cartItems) {
//           try {
//             await addToCartApi({
//               OwnerType: 'user',
//               OwnerId: userId,
//               AppId: item.id,
//               Quantity: item.qty,
//             }).unwrap();
//           } catch (err) {
//             toast.error('Failed to sync local cart to backend');
//           }
//         }
//         refetch();
//       }
//     };
//     mergeLocalCartToBackend();
//   }, [userId, cartItems, backendData]);

//   // Handle add item
//   const [addToCartApi] = useAddToCartMutation();
//   const handleAdd = async (id: string) => {
//     try {
//       if (userId) {
//         await addToCartApi({
//           OwnerType: 'user',
//           OwnerId: userId,
//           AppId: id,
//           Quantity: 1,
//         }).unwrap();
//         toast.success('Item added to cart');
//         refetch();
//       } else {
//         dispatch(addToCart({ id, qty: 1 }));
//         toast.success('Item added to local cart');
//       }
//     } catch (err) {
//       toast.error('Failed to add item');
//     }
//   };

//   // Handle remove item
//   const [removeQuantityApi] = useRemoveQuantityMutation();
//   const handleRemove = async (id: string) => {
//     try {
//       if (userId) {
//         await removeQuantityApi({
//           OwnerType: 'user',
//           OwnerId: userId,
//           AppId: id,
//         }).unwrap();
//         toast.success('Item quantity reduced');
//         refetch();
//       } else {
//         dispatch(removeFromCart(id));
//         toast.success('Item removed from local cart');
//       }
//     } catch (err) {
//       toast.error('Failed to remove item');
//     }
//   };

//   // Handle clear cart
//   const [clearAllCartApi] = useClearAllCartMutation();
//   const handleClear = async () => {
//     try {
//       if (userId) {
//         await clearAllCartApi({ OwnerType: 'user', OwnerId: userId }).unwrap();
//         toast.success('Cart cleared');
//         refetch();
//       }
//       dispatch(clearCart());
//       toast.success('Local cart cleared');
//     } catch (err) {
//       toast.error('Failed to clear cart');
//     }
//   };

//   // Calculate total (fallback for backend issues)
//   const total = useMemo(() => {
//     if (userId && backendData?.GrandTotal) {
//       return backendData.GrandTotal;
//     }
//     return cartItems.reduce((acc, item) => acc + (item.price || 0) * item.qty, 0);
//   }, [cartItems, backendData, userId]);

//   const handleProceed = async () => {
//     if (!isLoggedIn()) {
//       router.push('/ind-login?redirect=cart');
//       return;
//     }

//     if (!userId || cartItems.length === 0) {
//       toast.error('Cart is empty or user not found');
//       return;
//     }

//     try {
//       const subRes = await createSubscription({
//         SubscriberType: 'user',
//         SubscriberId: userId,
//         Apps: cartItems.map((item) => ({ AppId: item.id, Quantity: item.qty })),
//       }).unwrap();

//       if (!subRes.status || !subRes.data?._id) {
//         throw new Error('Subscription creation failed');
//       }

//       const checkoutRes = await createCheckoutSession({
//         subscriptionId: subRes.data._id,
//       }).unwrap();

//       if (!checkoutRes.status || !checkoutRes.data?.url) {
//         throw new Error('Checkout session creation failed');
//       }

//       window.location.href = checkoutRes.data.url;
//     } catch (err: unknown) {
//       toast.error(getErrorMessage(err));
//     }
//   };

//   if (isLoading) return <p>Loading cart...</p>;
//   if (error) return <p>Error loading cart: {getErrorMessage(error)}</p>;

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-semibold mb-6">Cart</h1>
//       {cartItems.length === 0 ? (
//         <p>No items in cart</p>
//       ) : (
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* Product Table */}
//           <div className="lg:col-span-2">
//             <table className="w-full border-collapse">
//               <thead>
//                 <tr className="border-b border-[#D0D5DD] text-lg">
//                   <th className="text-left py-3 font-normal">Product Details</th>
//                   <th className="text-left py-3 font-normal">Price</th>
//                   <th className="text-left py-3 font-normal">Quantity</th>
//                   <th className="text-left py-3 font-normal">Subtotal</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {cartItems.map((item) => (
//                   <tr key={item.id} className="border-b border-[#D0D5DD]">
//                     <td className="flex items-center gap-3 py-4">
//                       <div className="w-16 h-16 bg-red-900"></div>
//                       <span className="text-base font-normal">{item.name || 'Unknown'}</span>
//                     </td>
//                     <td className="text-base font-normal">${item.price || 0}</td>
//                     <td>
//                       <div className="flex items-center gap-2">
//                         <button
//                           onClick={() => handleRemove(item.id)}
//                           className="px-2 flex items-center text-xl font-normal cursor-pointer hover:bg-red-400 transition-all"
//                         >
//                           -
//                         </button>
//                         <span className="px-3 py-1 bg-[#D0D5DD]">{item.qty}</span>
//                         <button
//                           onClick={() => handleAdd(item.id)}
//                           className="px-2 flex items-center text-xl font-normal cursor-pointer hover:bg-red-400 transition-all"
//                         >
//                           +
//                         </button>
//                       </div>
//                     </td>
//                     <td>${item.subtotal || (item.price || 0) * item.qty}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           {/* Cart Summary */}
//           <div className="bg-[#FFEECA] p-6 rounded-md h-fit">
//             <h2 className="text-3xl font-normal mb-4">
//               Cart Total <span className="ml-1">({cartItems.length})</span>
//             </h2>
//             <div className="flex justify-between flex-col py-2 border-b pb-7">
//               <span className="text-xl">SubTotal</span>
//               <span className="text-lg">${total}</span>
//             </div>
//             <div className="flex justify-between flex-col py-2 mt-5 pb-4">
//               <span className="text-xl">Total</span>
//               <span className="text-lg">${total}</span>
//             </div>
//             <button
//               onClick={handleProceed}
//               className="w-full mb-3 bg-white font-medium text-2xl text-black py-2 rounded mt-4 cursor-pointer hover:bg-gray-100"
//             >
//               Proceed to Checkout
//             </button>
//             <button
//               onClick={handleClear}
//               className="w-full cursor-pointer text-lg bg-red-500 text-white py-2 rounded mt-2 hover:bg-red-600"
//             >
//               Clear Cart
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CartPage;
// ====================
// ====================
// ====================
'use client';
import { useRouter } from 'next/navigation';
import { isLoggedIn } from '@/utils/auth';
import React, { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast';

import { RootState } from '@/redux/store';
import { useCreateSubscriptionMutation } from '@/redux/slices/subscription/subscriptionSlice';
import { useCreateCheckoutSessionMutation } from '@/redux/slices/payment/paymentSlice';
import {
  setCart,
  addToCart,
  removeFromCart,
  clearCart,
} from '@/redux/slices/cart/cartLocalStrogeSlice';
import { getCookie } from '@/utils/cookies';
import { getErrorMessage } from '@/utils/errorHandler';

import {
  useAddToCartMutation,
  useRemoveQuantityMutation,
  useGetAllAssetsQuery,
  useClearAllCartMutation,
  CartItemResponse,
} from '@/redux/slices/cart/cartApiSlice';

const CartPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const [createSubscription] = useCreateSubscriptionMutation();
  const [createCheckoutSession] = useCreateCheckoutSessionMutation();
  const userId = getCookie('UserId');

  // Move API hooks to top level
  const [addToCartApi] = useAddToCartMutation();
  const [removeQuantityApi] = useRemoveQuantityMutation();
  const [clearAllCartApi] = useClearAllCartMutation();

  // Backend cart query
  const {
    data: backendData,
    refetch,
    isLoading,
    error,
  } = useGetAllAssetsQuery({ OwnerType: 'user', OwnerId: userId || '' }, { skip: !userId });

  console.log(backendData, '======== backendData ==========');

  // Sync backend cart to Redux
  useEffect(() => {
    if (userId && backendData?.Items) {
      const formattedCart = backendData.Items.map((item: CartItemResponse) => ({
        id: item.App._id,
        name: item.App.Name,
        price: item.App.PricePerMonth || 0,
        qty: item.Quantity,
        subtotal: item.TotalPrice || (item.App.PricePerMonth || 0) * item.Quantity,
      }));
      dispatch(setCart(formattedCart));
    }
  }, [backendData, userId, dispatch]);

  // Merge local cart to backend on login
  useEffect(() => {
    const mergeLocalCartToBackend = async () => {
      if (userId && !isLoading && backendData?.Items?.length === 0 && cartItems.length > 0) {
        // If backend cart is empty, sync local cart to backend
        for (const item of cartItems) {
          try {
            await addToCartApi({
              OwnerType: 'user',
              OwnerId: userId,
              AppId: item.id,
              Quantity: item.qty,
            }).unwrap();
          } catch (err) {
            toast.error('Failed to sync local cart to backend');
            console.error('Sync error:', err);
          }
        }
        refetch();
      }
    };

    mergeLocalCartToBackend();
  }, [userId, cartItems, backendData, isLoading, addToCartApi, refetch]);

  // Handle add item - with optimistic update
  const handleAdd = async (id: string) => {
    if (!userId) {
      dispatch(addToCart({ id, qty: 1 }));
      toast.success('Item added to local cart');
      return;
    }

    // Optimistic update first
    dispatch(addToCart({ id, qty: 1 }));

    try {
      await addToCartApi({
        OwnerType: 'user',
        OwnerId: userId,
        AppId: id,
        Quantity: 1,
      }).unwrap();
      toast.success('Item added to cart');
      // refetch() will sync via the sync useEffect
    } catch (err) {
      // Revert optimistic update
      dispatch(removeFromCart(id));
      toast.error('Failed to add item');
      console.error('Add to cart error:', err);
    }
  };

  // Handle remove item - with optimistic update
  const handleRemove = async (id: string) => {
    if (!userId) {
      dispatch(removeFromCart(id));
      toast.success('Item removed from local cart');
      return;
    }

    // Optimistic update first
    dispatch(removeFromCart(id));

    try {
      await removeQuantityApi({
        OwnerType: 'user',
        OwnerId: userId,
        AppId: id,
      }).unwrap();
      toast.success('Item quantity reduced');
    } catch (err) {
      // Revert optimistic update
      dispatch(addToCart({ id, qty: 1 }));
      toast.error('Failed to remove item');
      console.error('Remove from cart error:', err);
    }
  };

  // Handle clear cart
  const handleClear = async () => {
    try {
      if (userId) {
        await clearAllCartApi({ OwnerType: 'user', OwnerId: userId }).unwrap();
        refetch();
        toast.success('Cart cleared');
      }
      dispatch(clearCart());
    } catch (err) {
      toast.error('Failed to clear cart');
      console.error('Clear cart error:', err);
    }
  };

  // Calculate total
  const total = useMemo(() => {
    if (userId && backendData?.GrandTotal) {
      return backendData.GrandTotal;
    }
    return cartItems.reduce((acc, item) => acc + (item.price || 0) * item.qty, 0);
  }, [cartItems, backendData, userId]);

  const handleProceed = async () => {
    if (!isLoggedIn()) {
      router.push('/ind-login?redirect=cart');
      return;
    }

    if (!userId || cartItems.length === 0) {
      toast.error('Cart is empty or user not found');
      return;
    }

    try {
      const subRes = await createSubscription({
        SubscriberType: 'user',
        SubscriberId: userId,
        Apps: cartItems.map((item) => ({ AppId: item.id, Quantity: item.qty })),
      }).unwrap();

      if (!subRes.status || !subRes.data?._id) {
        throw new Error('Subscription creation failed');
      }

      const checkoutRes = await createCheckoutSession({
        subscriptionId: subRes.data._id,
      }).unwrap();

      if (!checkoutRes.status || !checkoutRes.data?.url) {
        throw new Error('Checkout session creation failed');
      }

      window.location.href = checkoutRes.data.url;
    } catch (err: unknown) {
      toast.error(getErrorMessage(err));
    }
  };

  if (isLoading) return <p>Loading cart...</p>;
  if (error) return <p>Error loading cart: {getErrorMessage(error)}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Cart</h1>
      {cartItems.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Product Table */}
          <div className="lg:col-span-2">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-[#D0D5DD] text-lg">
                  <th className="text-left py-3 font-normal">Product Details</th>
                  <th className="text-left py-3 font-normal">Price</th>
                  <th className="text-left py-3 font-normal">Quantity</th>
                  <th className="text-left py-3 font-normal">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id} className="border-b border-[#D0D5DD]">
                    <td className="flex items-center gap-3 py-4">
                      <div className="w-16 h-16 bg-red-900"></div>
                      <span className="text-base font-normal">{item.name || 'Unknown'}</span>
                    </td>
                    <td className="text-base font-normal">${item.price || 0}</td>
                    <td>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleRemove(item.id)}
                          className="px-2 flex items-center text-xl font-normal cursor-pointer hover:bg-red-400 transition-all"
                          disabled={item.qty <= 1}
                        >
                          -
                        </button>
                        <span className="px-3 py-1 bg-[#D0D5DD] min-w-[2rem] text-center">
                          {item.qty}
                        </span>
                        <button
                          onClick={() => handleAdd(item.id)}
                          className="px-2 flex items-center text-xl font-normal cursor-pointer hover:bg-red-400 transition-all"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td>${item.subtotal || (item.price || 0) * item.qty}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Cart Summary */}
          <div className="bg-[#FFEECA] p-6 rounded-md h-fit">
            <h2 className="text-3xl font-normal mb-4">
              Cart Total <span className="ml-1">({cartItems.length})</span>
            </h2>
            <div className="flex justify-between flex-col py-2 border-b pb-7">
              <span className="text-xl">SubTotal</span>
              <span className="text-lg">${total}</span>
            </div>
            <div className="flex justify-between flex-col py-2 mt-5 pb-4">
              <span className="text-xl">Total</span>
              <span className="text-lg">${total}</span>
            </div>
            <button
              onClick={handleProceed}
              className="w-full mb-3 bg-white font-medium text-2xl text-black py-2 rounded mt-4 cursor-pointer hover:bg-gray-100"
              disabled={cartItems.length === 0}
            >
              Proceed to Checkout
            </button>
            <button
              onClick={handleClear}
              className="w-full cursor-pointer text-lg bg-red-500 text-white py-2 rounded mt-2 hover:bg-red-600 disabled:bg-gray-400"
              disabled={cartItems.length === 0}
            >
              Clear Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
