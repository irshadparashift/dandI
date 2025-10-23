// ========================= old  sideBar.tsx
//components/dashboard/Sidebar.tsx
// 'use client';
// import { createPortal } from 'react-dom';
// import Image from 'next/image';
// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import { FaBars, FaTimes } from 'react-icons/fa';
// import { FiLogOut } from 'react-icons/fi';
// import { useMobileSidebar } from '@/hooks/useMobileSidebar';
// import { deleteCookie } from '@/utils/cookies';
// import { useRouter } from 'next/navigation';
// import { useState } from 'react';

// // import { useGetUserQuery } from '@/redux/slices/Auth/authSlice';
// import {
//   SubscriptionApp,
//   useGetUserSubscriptionByUserQuery,
// } from '@/redux/slices/subscription/subscriptionSlice';

// import { useDispatch } from 'react-redux';
// import { setAssetId } from '@/redux/slices/global/globalSlice';

// import { setCookie } from '@/utils/cookies';

// type SidebarProps = {
//   isExpanded: boolean;
//   isDesktop: boolean;
//   toggleSidebar: () => void;
// };

// type NavItem = {
//   iconSrc: string;
//   label: string;
//   href: string;
//   baseBg: string;
//   hoverBg: string;
//   text: string;
// };

// type BottomItem = {
//   iconSrc: string;
//   label: string;
//   href: string;
// };

// const bottomItems: BottomItem[] = [
//   { iconSrc: '/sidebar/settingsIcon.svg', label: 'Settings', href: '/settings' },
//   { iconSrc: '/sidebar/cultureIcon.svg', label: 'Add Apps', href: '/all-app-courses' },
//   { iconSrc: '/sidebar/cultureIcon.svg', label: 'Logout', href: '/Support' },
// ];

// type SidebarContentProps = {
//   isExpanded: boolean;
//   onLinkClick: () => void;
//   currentPath: string;
// };

// function SidebarContent({ isExpanded, onLinkClick, currentPath }: SidebarContentProps) {
//   const dispatch = useDispatch();
//   const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
//   const router = useRouter();
//   // const { data: UserData, error: UserDataError, isLoading: UserDataLoading } = useGetUserQuery();
//   const {
//     data: UserSubcription,
//     error: UserSubcriptionError,
//     isLoading: UserSubcriptionLoading,
//   } = useGetUserSubscriptionByUserQuery();

//   console.log(UserSubcription, 'UserSubcription');

//   if (UserSubcriptionLoading) return <p>Loading...</p>;
//   if (UserSubcriptionError) return <p>Something went wrong</p>;

//   // const navItemsFromSubscription: NavItem[] =
//   //   UserSubcription?.data?.flatMap((sub) =>
//   //     sub.Apps.map((app: SubscriptionApp) => ({
//   //       iconSrc: '/sidebar/leadershipIcon.svg',
//   //       label: app.AppId.Name,
//   //       // href: `/${app.AppId.Name.toLowerCase()}App`,
//   //       href: `/dynamicApps/${app.AppId.Name.toLowerCase()}`,
//   //       // href: `/dynamicApps/${app.AppId.Name.toLowerCase()}?id=${app.AppId._id}`,
//   //       baseBg: 'bg-[#f8f8f8]',
//   //       hoverBg: 'hover:bg-[#dcdcdc]',
//   //       text: 'text-black',
//   //     })),
//   //   ) || [];

//   const navItemsFromSubscription: NavItem[] = Array.from(
//     new Map(
//       UserSubcription?.data?.flatMap((sub) =>
//         sub.Apps.map((app: SubscriptionApp) => [
//           app.AppId._id,
//           {
//             iconSrc: '/sidebar/leadershipIcon.svg',
//             label: app.AppId.Name,
//             href: `/dynamicApps/${app.AppId.Name.toLowerCase()}`,
//             baseBg: 'bg-[#f8f8f8]',
//             hoverBg: 'hover:bg-[#dcdcdc]',
//             text: 'text-black',
//           },
//         ]),
//       ) || [],
//     ).values(),
//   );

//   const handleLogout = () => {
//     // delete auth cookie (replace "token" with your actual cookie name)
//     deleteCookie('UserToken');
//     deleteCookie('isSubscribed');

//     // redirect to login
//     router.push('/');
//   };

//   return (
//     <div className="flex flex-col h-full">
//       {/* Scrollable nav section */}
//       <nav className="flex-1 min-h-0 overflow-y-auto px-2 pt-2">
//         <ul className="space-y-[10px]">
//           <li className="flex items-center justify-center md:justify-start gap-3 px-2 py-2 rounded-lg transition-colors duration-200">
//             <Link href="/dashboard">
//               <div className="flex items-center justify-center md:justify-start gap-3">
//                 <Image
//                   src="/sidebar/leadershipIcon.svg"
//                   alt="Dashboard"
//                   width={20}
//                   height={20}
//                   className="shrink-0"
//                 />
//                 {isExpanded && <span className="truncate">Dashboard</span>}
//               </div>
//             </Link>
//           </li>

//           {navItemsFromSubscription.map((item) => (
//             <li key={item.href}>
//               <Link
//                 href={item.href}
//                 onClick={() => {
//                   onLinkClick();
//                   // 🔥 Find the correct assetId for this app dynamically
//                   const matchedApp = UserSubcription?.data
//                     ?.flatMap((sub) => sub.Apps)
//                     .find((app) => app.AppId.Name.toLowerCase() === item.label.toLowerCase());

//                   if (matchedApp?.AppId?._id) {
//                     dispatch(setAssetId(matchedApp.AppId._id));
//                     setCookie('assetId', matchedApp.AppId._id); // ✅ persist assetId
//                   }
//                 }}
//                 className={`flex items-center justify-center md:justify-start gap-3 px-2 py-2 rounded-lg transition-colors duration-200
//                     ${item.baseBg} ${item.hoverBg} ${item.text}
//                     ${currentPath === item.href ? 'ring-1 ring-offset-1 ring-gray-400' : ''}`}
//               >
//                 <Image
//                   src={item.iconSrc}
//                   alt={item.label}
//                   width={20}
//                   height={20}
//                   className="shrink-0"
//                 />
//                 {isExpanded && <span className="truncate">{item.label}</span>}
//               </Link>
//             </li>
//           ))}
//         </ul>
//       </nav>

//       {/* Bottom fixed section (always visible) */}
//       <div className="shrink-0 border-t border-gray-200 bg-white">
//         <ul className="space-y-1 py-1">
//           {bottomItems.map((item) =>
//             item.label === 'Logout' ? (
//               <li key="logout">
//                 <button
//                   onClick={() => setShowLogoutConfirm(true)} // ✅ open popup instead
//                   className="w-full flex items-center gap-3 px-4 py-1 rounded-lg hover:bg-gray-100 text-gray-700"
//                 >
//                   <FiLogOut className="w-5 h-5 shrink-0" />
//                   {isExpanded && <span className="truncate">Logout</span>}
//                 </button>
//               </li>
//             ) : (
//               <li key={item.href}>
//                 <Link
//                   href={item.href}
//                   onClick={onLinkClick}
//                   className={`flex items-center gap-3 px-4 py-1 rounded-lg hover:bg-gray-100 text-gray-700
//             ${currentPath === item.href ? 'bg-gray-100 font-medium' : ''}`}
//                 >
//                   <Image
//                     src={item.iconSrc}
//                     alt={item.label}
//                     width={20}
//                     height={20}
//                     className="shrink-0"
//                   />
//                   {isExpanded && <span className="truncate">{item.label}</span>}
//                 </Link>
//               </li>
//             ),
//           )}
//         </ul>

//         {showLogoutConfirm &&
//           createPortal(
//             <div className="fixed inset-0 z-[9999] flex items-center justify-center  bg-black/80 backdrop-blur-sm">
//               <div className="bg-white rounded-lg shadow-lg p-6 w-80 mx-4">
//                 <h2 className="text-lg font-semibold text-gray-800 mb-4">Confirm Logout</h2>
//                 <p className="text-gray-600 mb-6">Are you sure you want to log out?</p>
//                 <div className="flex justify-end gap-3">
//                   <button
//                     onClick={() => setShowLogoutConfirm(false)}
//                     className="cursor-pointer px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     onClick={() => {
//                       setShowLogoutConfirm(false);
//                       handleLogout();
//                     }}
//                     className="cursor-pointer px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
//                   >
//                     Logout
//                   </button>
//                 </div>
//               </div>
//             </div>,
//             document.body,
//           )}
//       </div>
//     </div>
//   );
// }

// export default function Sidebar({ isExpanded, isDesktop, toggleSidebar }: SidebarProps) {
//   const { isMobileOpen, closeMobile } = useMobileSidebar();
//   const pathname: string = usePathname(); // ✅ force pathname as string

//   // Desktop sidebar
//   if (isDesktop) {
//     return (
//       <aside
//         className={`fixed left-0 top-0 z-30 h-full bg-white border-r border-gray-200 shadow-sm transition-all duration-300 ease-in-out
//           ${isExpanded ? 'w-60' : 'w-16'}`}
//       >
//         <div className="flex flex-col h-full">
//           {/* Header */}
//           <div className="shrink-0 flex items-center justify-between px-4 border-b border-gray-200 h-14">
//             {isExpanded && (
//               <h1 className="text-lg font-bold text-gray-900 truncate">D&I Platform</h1>
//             )}
//             <button
//               onClick={toggleSidebar}
//               className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors"
//               aria-label={isExpanded ? 'Collapse sidebar' : 'Expand sidebar'}
//             >
//               {isExpanded ? <FaTimes className="w-4 h-4" /> : <FaBars className="w-4 h-4" />}
//             </button>
//           </div>

//           {/* Content (scrollable nav + bottom fixed) */}
//           <div className="flex-1 min-h-0">
//             <SidebarContent isExpanded={isExpanded} onLinkClick={() => {}} currentPath={pathname} />
//           </div>
//         </div>
//       </aside>
//     );
//   }

//   // Mobile sidebar
//   return (
//     <>
//       {isMobileOpen && (
//         <div
//           className="fixed inset-0 bg-black/50 z-40 md:hidden"
//           onClick={closeMobile}
//           aria-hidden="true"
//         />
//       )}

//       <aside
//         className={`fixed top-0 left-0 z-50 h-full w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out md:hidden
//           ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}`}
//       >
//         <div className="flex flex-col h-full">
//           {/* Header */}
//           <div className="shrink-0 flex items-center justify-between p-4 border-b border-gray-200 h-16">
//             <h2 className="text-lg font-bold text-gray-900">D&I Platform</h2>
//             <button
//               onClick={closeMobile}
//               className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
//               aria-label="Close menu"
//             >
//               <FaTimes className="w-4 h-4" />
//             </button>
//           </div>

//           {/* Content (scrollable nav + bottom fixed) */}
//           <div className="flex-1 min-h-0">
//             <SidebarContent isExpanded={true} onLinkClick={closeMobile} currentPath={pathname} />
//           </div>
//         </div>
//       </aside>
//     </>
//   );
// }

// Chatgpt new sidebar
// 'use client';
// import { createPortal } from 'react-dom';
// import Image from 'next/image';
// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import { FaBars, FaTimes } from 'react-icons/fa';
// import { FiLogOut } from 'react-icons/fi';
// import { useMobileSidebar } from '@/hooks/useMobileSidebar';
// import { deleteCookie, setCookie } from '@/utils/cookies';
// import { useRouter } from 'next/navigation';
// import { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { setAssetId } from '@/redux/slices/global/globalSlice';
// import {
//   SubscriptionApp,
//   useGetUserSubscriptionByUserQuery,
// } from '@/redux/slices/subscription/subscriptionSlice';

// type SidebarProps = {
//   isExpanded: boolean;
//   isDesktop: boolean;
//   toggleSidebar: () => void;
// };

// type NavItem = {
//   iconSrc: string;
//   label: string;
//   href: string;
//   baseBg: string;
//   hoverBg: string;
//   text: string;
// };

// type BottomItem = {
//   iconSrc: string;
//   label: string;
//   href: string;
// };

// const bottomItems: BottomItem[] = [
//   { iconSrc: '/sidebar/settingsIcon.svg', label: 'Settings', href: '/settings' },
//   { iconSrc: '/sidebar/cultureIcon.svg', label: 'Add Apps', href: '/all-app-courses' },
//   { iconSrc: '/sidebar/cultureIcon.svg', label: 'Logout', href: '/Support' },
// ];

// //  '/sidebar/leadershipIcon.svg', -
// //  '/sidebar/cultureIcon.svg',
// //  '/sidebar/diversityIcon.svg',
// //  '/sidebar/equityIcon.svg',
// //  '/sidebar/inclusionIcon.svg',
// //  '/sidebar/organizationIcon.svg',
// //  '/sidebar/swotIcon.svg',
// //  '/sidebar/talentIcon.svg',
// //  '/sidebar/BelongingsIcon.svg',

// type SidebarContentProps = {
//   isExpanded: boolean;
//   onLinkClick: () => void;
//   currentPath: string;
// };

// function SidebarContent({ isExpanded, onLinkClick, currentPath }: SidebarContentProps) {
//   const dispatch = useDispatch();
//   const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
//   const router = useRouter();

//   const {
//     data: UserSubcription,
//     error: UserSubcriptionError,
//     isLoading: UserSubcriptionLoading,
//   } = useGetUserSubscriptionByUserQuery();

//   if (UserSubcriptionLoading) return <p>Loading...</p>;
//   if (UserSubcriptionError) return <p>Something went wrong</p>;

//   const navItemsFromSubscription: NavItem[] = Array.from(
//     new Map(
//       UserSubcription?.data?.flatMap((sub) =>
//         sub.Apps.map((app: SubscriptionApp) => [
//           app.AppId._id,
//           {
//             iconSrc: '/sidebar/leadershipIcon.svg',
//             label: app.AppId.Name,
//             href: `/dynamicApps/${app.AppId.Name.toLowerCase()}`,
//             baseBg: 'bg-gray-100',
//             hoverBg: 'hover:bg-gray-200',
//             text: 'text-black',
//           },
//         ]),
//       ) || [],
//     ).values(),
//   );

//   const handleLogout = () => {
//     deleteCookie('UserToken');
//     deleteCookie('isSubscribed');
//     router.push('/');
//   };

//   return (
//     <div className="flex flex-col h-full">
//       {/* Scrollable nav section */}
//       <nav className="flex-1 min-h-0 overflow-y-auto px-2 pt-2">
//         <ul className="space-y-2">
//           {/* Dashboard button */}
//           <li>
//             <Link href="/dashboard" className="w-full">
//               <div
//                 className={`flex items-center justify-center md:justify-start gap-3
//                 px-4 py-2 rounded-lg cursor-pointer w-full
//                 bg-gray-100 hover:bg-gray-200 transition-all duration-200
//                 ${currentPath === '/dashboard' ? 'ring-1 ring-offset-1 ring-gray-400' : ''}
//                 hover:shadow-sm active:scale-95`}
//               >
//                 <Image
//                   src="/sidebar/leadershipIcon.svg"
//                   alt="Dashboard"
//                   width={20}
//                   height={20}
//                   className="shrink-0"
//                 />
//                 {isExpanded && <span className="truncate font-medium">Dashboard</span>}
//               </div>
//             </Link>
//           </li>

//           {/* Dynamic subscription items */}
//           {navItemsFromSubscription.map((item) => (
//             <li key={item.href}>
//               <Link
//                 href={item.href}
//                 onClick={() => {
//                   onLinkClick();
//                   const matchedApp = UserSubcription?.data
//                     ?.flatMap((sub) => sub.Apps)
//                     .find((app) => app.AppId.Name.toLowerCase() === item.label.toLowerCase());
//                   if (matchedApp?.AppId?._id) {
//                     dispatch(setAssetId(matchedApp.AppId._id));
//                     setCookie('assetId', matchedApp.AppId._id);
//                   }
//                 }}
//                 className={`flex items-center justify-center md:justify-start gap-3
//                   px-4 py-2 rounded-lg cursor-pointer w-full
//                   ${item.baseBg} ${item.hoverBg} ${item.text}
//                   ${currentPath === item.href ? 'ring-1 ring-offset-1 ring-gray-400' : ''}
//                   hover:shadow-sm active:scale-95 transition-all duration-200`}
//               >
//                 <Image
//                   src={item.iconSrc}
//                   alt={item.label}
//                   width={20}
//                   height={20}
//                   className="shrink-0"
//                 />
//                 {isExpanded && <span className="truncate font-medium">{item.label}</span>}
//               </Link>
//             </li>
//           ))}
//         </ul>
//       </nav>

//       {/* Bottom fixed section */}
//       <div className="shrink-0 border-t border-gray-200 bg-white px-2 py-2">
//         <ul className="space-y-1">
//           {bottomItems.map((item) =>
//             item.label === 'Logout' ? (
//               <li key="logout">
//                 <button
//                   onClick={() => setShowLogoutConfirm(true)}
//                   className="w-full flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 text-gray-700 transition-all duration-200 hover:shadow-sm active:scale-95"
//                 >
//                   <FiLogOut className="w-5 h-5 shrink-0" />
//                   {isExpanded && <span className="truncate font-medium">Logout</span>}
//                 </button>
//               </li>
//             ) : (
//               <li key={item.href}>
//                 <Link
//                   href={item.href}
//                   onClick={onLinkClick}
//                   className={`flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 text-gray-700 transition-all duration-200 hover:shadow-sm active:scale-95 ${
//                     currentPath === item.href ? 'bg-gray-100 font-medium' : ''
//                   }`}
//                 >
//                   <Image
//                     src={item.iconSrc}
//                     alt={item.label}
//                     width={20}
//                     height={20}
//                     className="shrink-0"
//                   />
//                   {isExpanded && <span className="truncate font-medium">{item.label}</span>}
//                 </Link>
//               </li>
//             ),
//           )}
//         </ul>

//         {/* Logout confirmation modal */}
//         {showLogoutConfirm &&
//           createPortal(
//             <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm">
//               <div className="bg-white rounded-lg shadow-lg p-6 w-80 mx-4">
//                 <h2 className="text-lg font-semibold text-gray-800 mb-4">Confirm Logout</h2>
//                 <p className="text-gray-600 mb-6">Are you sure you want to log out?</p>
//                 <div className="flex justify-end gap-3">
//                   <button
//                     onClick={() => setShowLogoutConfirm(false)}
//                     className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     onClick={() => {
//                       setShowLogoutConfirm(false);
//                       handleLogout();
//                     }}
//                     className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
//                   >
//                     Logout
//                   </button>
//                 </div>
//               </div>
//             </div>,
//             document.body,
//           )}
//       </div>
//     </div>
//   );
// }

// export default function Sidebar({ isExpanded, isDesktop, toggleSidebar }: SidebarProps) {
//   const { isMobileOpen, closeMobile } = useMobileSidebar();
//   const pathname: string = usePathname();

//   // Desktop sidebar
//   if (isDesktop) {
//     return (
//       <aside
//         className={`fixed left-0 top-0 z-30 h-full bg-white border-r border-gray-200 shadow-sm transition-all duration-300 ease-in-out
//           ${isExpanded ? 'w-60' : 'w-16'}`}
//       >
//         <div className="flex flex-col h-full">
//           {/* Header */}
//           <div className="shrink-0 flex items-center justify-between px-4 border-b border-gray-200 h-14">
//             {isExpanded && (
//               <h1 className="text-lg font-bold text-gray-900 truncate">D&I Platform</h1>
//             )}
//             <button
//               onClick={toggleSidebar}
//               className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors"
//               aria-label={isExpanded ? 'Collapse sidebar' : 'Expand sidebar'}
//             >
//               {isExpanded ? <FaTimes className="w-4 h-4" /> : <FaBars className="w-4 h-4" />}
//             </button>
//           </div>

//           {/* Content */}
//           <div className="flex-1 min-h-0">
//             <SidebarContent isExpanded={isExpanded} onLinkClick={() => {}} currentPath={pathname} />
//           </div>
//         </div>
//       </aside>
//     );
//   }

//   // Mobile sidebar
//   return (
//     <>
//       {isMobileOpen && (
//         <div
//           className="fixed inset-0 bg-black/50 z-40 md:hidden"
//           onClick={closeMobile}
//           aria-hidden="true"
//         />
//       )}

//       <aside
//         className={`fixed top-0 left-0 z-50 h-full w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out md:hidden
//           ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}`}
//       >
//         <div className="flex flex-col h-full">
//           {/* Header */}
//           <div className="shrink-0 flex items-center justify-between p-4 border-b border-gray-200 h-16">
//             <h2 className="text-lg font-bold text-gray-900">D&I Platform</h2>
//             <button
//               onClick={closeMobile}
//               className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
//               aria-label="Close menu"
//             >
//               <FaTimes className="w-4 h-4" />
//             </button>
//           </div>

//           {/* Content */}
//           <div className="flex-1 min-h-0">
//             <SidebarContent isExpanded={true} onLinkClick={closeMobile} currentPath={pathname} />
//           </div>
//         </div>
//       </aside>
//     </>
//   );
// }

// icon code withour color

// 'use client';
// import { createPortal } from 'react-dom';
// import Image from 'next/image';
// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import { FaBars, FaTimes } from 'react-icons/fa';
// import { FiLogOut } from 'react-icons/fi';
// import { useMobileSidebar } from '@/hooks/useMobileSidebar';
// import { deleteCookie, setCookie } from '@/utils/cookies';
// import { useRouter } from 'next/navigation';
// import { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { setAssetId } from '@/redux/slices/global/globalSlice';
// import {
//   SubscriptionApp,
//   useGetUserSubscriptionByUserQuery,
// } from '@/redux/slices/subscription/subscriptionSlice';

// type SidebarProps = {
//   isExpanded: boolean;
//   isDesktop: boolean;
//   toggleSidebar: () => void;
// };

// type NavItem = {
//   iconSrc: string;
//   label: string;
//   href: string;
//   baseBg: string;
//   hoverBg: string;
//   text: string;
// };

// type BottomItem = {
//   iconSrc: string;
//   label: string;
//   href: string;
// };

// const bottomItems: BottomItem[] = [
//   { iconSrc: '/sidebar/settingsIcon.svg', label: 'Settings', href: '/settings' },
//   { iconSrc: '/sidebar/cultureIcon.svg', label: 'Add Apps', href: '/all-app-courses' },
//   { iconSrc: '/sidebar/cultureIcon.svg', label: 'Logout', href: '/Support' },
// ];

// type SidebarContentProps = {
//   isExpanded: boolean;
//   onLinkClick: () => void;
//   currentPath: string;
// };

// function SidebarContent({ isExpanded, onLinkClick, currentPath }: SidebarContentProps) {
//   const dispatch = useDispatch();
//   const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
//   const router = useRouter();

//   const {
//     data: UserSubcription,
//     error: UserSubcriptionError,
//     isLoading: UserSubcriptionLoading,
//   } = useGetUserSubscriptionByUserQuery();

//   if (UserSubcriptionLoading) return <p>Loading...</p>;
//   if (UserSubcriptionError) return <p>Something went wrong</p>;

//   // ✅ App name to icon mapping
//   const appIcons: Record<string, string> = {
//     leadership: '/sidebar/leadershipIcon.svg',
//     culture: '/sidebar/cultureIcon.svg',
//     diversity: '/sidebar/diversityIcon.svg',
//     equity: '/sidebar/equityIcon.svg',
//     inclusion: '/sidebar/inclusionIcon.svg',
//     organization: '/sidebar/organizationIcon.svg',
//     swot: '/sidebar/swotIcon.svg',
//     talentdevelopment: '/sidebar/talentIcon.svg',
//     belongings: '/sidebar/BelongingsIcon (1).svg',
//   };

//   // ✅ Create Nav Items dynamically from subscription data
//   const navItemsFromSubscription: NavItem[] = Array.from(
//     new Map(
//       UserSubcription?.data?.flatMap((sub) =>
//         sub.Apps.map((app: SubscriptionApp) => {
//           const appName = app.AppId.Name.toLowerCase();

//           return [
//             app.AppId._id,
//             {
//               iconSrc: appIcons[appName] || '/sidebar/defaultIcon.svg',
//               label: app.AppId.Name,
//               href: `/dynamicApps/${appName}`,
//               baseBg: 'bg-gray-100',
//               hoverBg: 'hover:bg-gray-200',
//               text: 'text-black',
//             },
//           ];
//         }),
//       ) || [],
//     ).values(),
//   );

//   const handleLogout = () => {
//     deleteCookie('UserToken');
//     deleteCookie('isSubscribed');
//     router.push('/');
//   };

//   return (
//     <div className="flex flex-col h-full">
//       {/* Scrollable nav section */}
//       <nav className="flex-1 min-h-0 overflow-y-auto px-2 pt-2">
//         <ul className="space-y-2">
//           {/* Dashboard */}
//           <li>
//             <Link href="/dashboard" className="w-full">
//               <div
//                 className={`flex items-center justify-start md:justify-start gap-3
//                 px-4 py-2 rounded-lg cursor-pointer w-full
//                 bg-gray-100 hover:bg-gray-200 transition-all duration-200
//                 ${currentPath === '/dashboard' ? 'ring-1 ring-offset-1 ring-gray-400' : ''}
//                 hover:shadow-sm active:scale-95`}
//               >
//                 <Image
//                   src="/sidebar/dashboradicon.svg"
//                   alt="Dashboard"
//                   width={20}
//                   height={20}
//                   className="shrink-0"
//                 />
//                 {isExpanded && <span className="truncate font-medium">Dashboard</span>}
//               </div>
//             </Link>
//           </li>

//           {/* Dynamic App Links */}
//           {navItemsFromSubscription.map((item) => (
//             <li key={item.href}>
//               <Link
//                 href={item.href}
//                 onClick={() => {
//                   onLinkClick();
//                   const matchedApp = UserSubcription?.data
//                     ?.flatMap((sub) => sub.Apps)
//                     .find((app) => app.AppId.Name.toLowerCase() === item.label.toLowerCase());
//                   if (matchedApp?.AppId?._id) {
//                     dispatch(setAssetId(matchedApp.AppId._id));
//                     setCookie('assetId', matchedApp.AppId._id);
//                   }
//                 }}
//                 className={`flex items-center justify-start  gap-3
//                   px-4 py-2 rounded-lg cursor-pointer w-full
//                   ${item.baseBg} ${item.hoverBg} ${item.text}
//                   ${currentPath === item.href ? 'ring-1 ring-offset-1 ring-gray-400' : ''}
//                   hover:shadow-sm active:scale-95 transition-all duration-200`}
//               >
//                 <Image
//                   src={item.iconSrc}
//                   alt={item.label}
//                   width={20}
//                   height={20}
//                   className="shrink-0"
//                 />
//                 {isExpanded && <span className="truncate font-medium">{item.label}</span>}
//               </Link>
//             </li>
//           ))}
//         </ul>
//       </nav>

//       {/* Bottom Section */}
//       <div className="shrink-0 border-t border-gray-200 bg-white px-2 py-2">
//         <ul className="space-y-1">
//           {bottomItems.map((item) =>
//             item.label === 'Logout' ? (
//               <li key="logout">
//                 <button
//                   onClick={() => setShowLogoutConfirm(true)}
//                   className="w-full flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 text-gray-700 transition-all duration-200 hover:shadow-sm active:scale-95"
//                 >
//                   <FiLogOut className="w-5 h-5 shrink-0" />
//                   {isExpanded && <span className="truncate font-medium">Logout</span>}
//                 </button>
//               </li>
//             ) : (
//               <li key={item.href}>
//                 <Link
//                   href={item.href}
//                   onClick={onLinkClick}
//                   className={`flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 text-gray-700 transition-all duration-200 hover:shadow-sm active:scale-95 ${
//                     currentPath === item.href ? 'bg-gray-100 font-medium' : ''
//                   }`}
//                 >
//                   <Image
//                     src={item.iconSrc}
//                     alt={item.label}
//                     width={20}
//                     height={20}
//                     className="shrink-0"
//                   />
//                   {isExpanded && <span className="truncate font-medium">{item.label}</span>}
//                 </Link>
//               </li>
//             ),
//           )}
//         </ul>

//         {/* Logout Confirmation Modal */}
//         {showLogoutConfirm &&
//           createPortal(
//             <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm">
//               <div className="bg-white rounded-lg shadow-lg p-6 w-80 mx-4">
//                 <h2 className="text-lg font-semibold text-gray-800 mb-4">Confirm Logout</h2>
//                 <p className="text-gray-600 mb-6">Are you sure you want to log out?</p>
//                 <div className="flex justify-end gap-3">
//                   <button
//                     onClick={() => setShowLogoutConfirm(false)}
//                     className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     onClick={() => {
//                       setShowLogoutConfirm(false);
//                       handleLogout();
//                     }}
//                     className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
//                   >
//                     Logout
//                   </button>
//                 </div>
//               </div>
//             </div>,
//             document.body,
//           )}
//       </div>
//     </div>
//   );
// }

// export default function Sidebar({ isExpanded, isDesktop, toggleSidebar }: SidebarProps) {
//   const { isMobileOpen, closeMobile } = useMobileSidebar();
//   const pathname: string = usePathname();

//   // Desktop Sidebar
//   if (isDesktop) {
//     return (
//       <aside
//         className={`fixed left-0 top-0 z-30 h-full bg-white border-r border-gray-200 shadow-sm transition-all duration-300 ease-in-out
//           ${isExpanded ? 'w-60' : 'w-16'}`}
//       >
//         <div className="flex flex-col h-full">
//           {/* Header */}
//           <div className="shrink-0 flex items-center justify-between px-4 border-b border-gray-200 h-14">
//             {isExpanded && (
//               <h1 className="text-lg font-bold text-gray-900 truncate">D&I Platform</h1>
//             )}
//             <button
//               onClick={toggleSidebar}
//               className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors"
//               aria-label={isExpanded ? 'Collapse sidebar' : 'Expand sidebar'}
//             >
//               {isExpanded ? <FaTimes className="w-4 h-4" /> : <FaBars className="w-4 h-4" />}
//             </button>
//           </div>

//           {/* Content */}
//           <div className="flex-1 min-h-0">
//             <SidebarContent isExpanded={isExpanded} onLinkClick={() => {}} currentPath={pathname} />
//           </div>
//         </div>
//       </aside>
//     );
//   }

//   // Mobile Sidebar
//   return (
//     <>
//       {isMobileOpen && (
//         <div
//           className="fixed inset-0 bg-black/50 z-40 md:hidden"
//           onClick={closeMobile}
//           aria-hidden="true"
//         />
//       )}

//       <aside
//         className={`fixed top-0 left-0 z-50 h-full w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out md:hidden
//           ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}`}
//       >
//         <div className="flex flex-col h-full">
//           {/* Header */}
//           <div className="shrink-0 flex items-center justify-between p-4 border-b border-gray-200 h-16">
//             <h2 className="text-lg font-bold text-gray-900">D&I Platform</h2>
//             <button
//               onClick={closeMobile}
//               className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
//               aria-label="Close menu"
//             >
//               <FaTimes className="w-4 h-4" />
//             </button>
//           </div>

//           {/* Content */}
//           <div className="flex-1 min-h-0">
//             <SidebarContent isExpanded={true} onLinkClick={closeMobile} currentPath={pathname} />
//           </div>
//         </div>
//       </aside>
//     </>
//   );
// }

'use client';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaBars, FaTimes } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import { useMobileSidebar } from '@/hooks/useMobileSidebar';
import { deleteCookie, setCookie } from '@/utils/cookies';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setAssetId } from '@/redux/slices/global/globalSlice';
import {
  SubscriptionApp,
  useGetUserSubscriptionByUserQuery,
} from '@/redux/slices/subscription/subscriptionSlice';

type SidebarProps = {
  isExpanded: boolean;
  isDesktop: boolean;
  toggleSidebar: () => void;
};

type NavItem = {
  iconSrc: string;
  label: string;
  href: string;
  baseBg: string;
  hoverBg: string;
  text: string;
};

type BottomItem = {
  iconSrc: string;
  label: string;
  href: string;
};

const bottomItems: BottomItem[] = [
  { iconSrc: '/sidebar/settingsIcon.svg', label: 'Settings', href: '/settings' },
  { iconSrc: '/sidebar/cultureIcon.svg', label: 'Add Apps', href: '/all-app-courses' },
  { iconSrc: '/sidebar/cultureIcon.svg', label: 'Logout', href: '/Support' },
];

type SidebarContentProps = {
  isExpanded: boolean;
  onLinkClick: () => void;
  currentPath: string;
};

function SidebarContent({ isExpanded, onLinkClick, currentPath }: SidebarContentProps) {
  const dispatch = useDispatch();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const router = useRouter();

  const {
    data: UserSubcription,
    error: UserSubcriptionError,
    isLoading: UserSubcriptionLoading,
  } = useGetUserSubscriptionByUserQuery();

  if (UserSubcriptionLoading) return <p>Loading...</p>;
  if (UserSubcriptionError) return <p>Something went wrong</p>;

  const appIcons: Record<string, string> = {
    leadership: '/sidebar/leadershipIcon.svg',
    culture: '/sidebar/cultureIcon.svg',
    diversity: '/sidebar/diversityIcon.svg',
    equity: '/sidebar/equityIcon.svg',
    inclusion: '/sidebar/inclusionIcon.svg',
    organization: '/sidebar/organizationIcon.svg',
    swot: '/sidebar/swotIcon.svg',
    talentdevelopment: '/sidebar/talentIcon.svg',
    belongings: '/sidebar/belongingicon.svg',
  };

  // Colors mapping for each app
  const appColors: Record<string, { baseBg: string; hoverBg: string; text: string }> = {
    leadership: {
      baseBg: 'bg-[#8E4B3E]', // deep brick red
      hoverBg: 'hover:bg-[#A45C4E]', // softer lighter tone
      text: 'text-white', // better contrast
    },
    culture: {
      baseBg: 'bg-[#6B7FB2]', // slate blue
      hoverBg: 'hover:bg-[#8095C8]', // lighter hover
      text: 'text-white',
    },
    diversity: {
      baseBg: 'bg-[#E68A5C]', // warm orange
      hoverBg: 'hover:bg-[#F09C72]', // subtle lighter
      text: 'text-white',
    },
    equity: {
      baseBg: 'bg-[#9FAF75]', // olive green
      hoverBg: 'hover:bg-[#B4C58A]', // lighter muted
      text: 'text-gray-900', // dark text for contrast
    },
    inclusion: {
      baseBg: 'bg-[#6DC7A6]', // mint green
      hoverBg: 'hover:bg-[#84D9B9]', // lighter mint
      text: 'text-gray-900',
    },
    organization: {
      baseBg: 'bg-[#B0B8C5]', // neutral gray-blue
      hoverBg: 'hover:bg-[#C6CFDB]', // light neutral hover
      text: 'text-gray-900',
    },
    swot: {
      baseBg: 'bg-[#4F8885]', // teal
      hoverBg: 'hover:bg-[#66A09D]', // lighter teal
      text: 'text-white',
    },
    talentdevelopment: {
      baseBg: 'bg-[#56B8C9]', // aqua blue
      hoverBg: 'hover:bg-[#6FD1E2]', // lighter aqua
      text: 'text-gray-900',
    },
    belongings: {
      baseBg: 'bg-[#9B8FBF]', // lavender purple
      hoverBg: 'hover:bg-[#B2A6D6]', // lighter lavender
      text: 'text-white',
    },
  };

  const navItemsFromSubscription: NavItem[] = Array.from(
    new Map(
      UserSubcription?.data?.flatMap((sub) =>
        sub.Apps.map((app: SubscriptionApp) => {
          const appName = app.AppId.Name.toLowerCase();
          const colors = appColors[appName] || {
            baseBg: 'bg-gray-100',
            hoverBg: 'hover:bg-gray-200',
            text: 'text-black',
          };
          return [
            app.AppId._id,
            {
              iconSrc: appIcons[appName] || '/sidebar/defaultIcon.svg',
              label: app.AppId.Name,
              href: `/dynamicApps/${appName}`,
              baseBg: colors.baseBg,
              hoverBg: colors.hoverBg,
              text: colors.text,
            },
          ];
        }),
      ) || [],
    ).values(),
  );

  const handleLogout = () => {
    deleteCookie('UserToken');
    deleteCookie('isSubscribed');
    router.push('/');
  };

  return (
    <div className="flex flex-col h-full">
      {/* Scrollable nav section */}
      <nav className="flex-1 min-h-0 overflow-y-auto px-2 pt-2">
        <ul className="space-y-2">
          {/* Dashboard */}
          <li>
            <Link href="/dashboard" className="w-full">
              <div
                className={`flex items-center justify-start md:justify-start gap-3
                px-4 py-2 rounded-lg cursor-pointer w-full
                bg-[#4A90E2] hover:bg-[#5BA2F3] text-white
                ${currentPath === '/dashboard' ? 'ring-1 ring-offset-1 ring-gray-400' : ''}
                hover:shadow-sm active:scale-95 transition-all duration-200`}
              >
                <Image
                  src="/sidebar/dashboradicon.svg"
                  alt="Dashboard"
                  width={20}
                  height={20}
                  className="shrink-0"
                />
                {isExpanded && <span className="truncate font-medium">Dashboard</span>}
              </div>
            </Link>
          </li>

          {/* Dynamic App Links */}
          {navItemsFromSubscription.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={() => {
                  onLinkClick();
                  const matchedApp = UserSubcription?.data
                    ?.flatMap((sub) => sub.Apps)
                    .find((app) => app.AppId.Name.toLowerCase() === item.label.toLowerCase());
                  if (matchedApp?.AppId?._id) {
                    dispatch(setAssetId(matchedApp.AppId._id));
                    setCookie('assetId', matchedApp.AppId._id);
                  }
                }}
                className={`flex items-center justify-start gap-3
                  px-4 py-2 rounded-lg cursor-pointer w-full
                  ${item.baseBg} ${item.hoverBg} ${item.text}
                  ${currentPath === item.href ? 'ring-1 ring-offset-1 ring-gray-400' : ''}
                  hover:shadow-sm active:scale-95 transition-all duration-200`}
              >
                <Image
                  src={item.iconSrc}
                  alt={item.label}
                  width={20}
                  height={20}
                  className="shrink-0"
                />
                {isExpanded && <span className="truncate font-medium">{item.label}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Bottom Section */}
      <div className="shrink-0 border-t border-gray-200 bg-white px-2 py-2">
        <ul className="space-y-1">
          {bottomItems.map((item) =>
            item.label === 'Logout' ? (
              <li key="logout">
                <button
                  onClick={() => setShowLogoutConfirm(true)}
                  className="w-full flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 text-gray-700 transition-all duration-200 hover:shadow-sm active:scale-95"
                >
                  <FiLogOut className="w-5 h-5 shrink-0" />
                  {isExpanded && <span className="truncate font-medium">Logout</span>}
                </button>
              </li>
            ) : (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onLinkClick}
                  className={`flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 text-gray-700 transition-all duration-200 ${
                    currentPath === item.href ? 'bg-gray-100 font-medium' : ''
                  }`}
                >
                  <Image
                    src={item.iconSrc}
                    alt={item.label}
                    width={20}
                    height={20}
                    className="shrink-0"
                  />
                  {isExpanded && <span className="truncate font-medium">{item.label}</span>}
                </Link>
              </li>
            ),
          )}
        </ul>

        {/* Logout Confirmation Modal */}
        {showLogoutConfirm &&
          createPortal(
            <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm">
              <div className="bg-white rounded-lg shadow-lg p-6 w-80 mx-4">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Confirm Logout</h2>
                <p className="text-gray-600 mb-6">Are you sure you want to log out?</p>
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setShowLogoutConfirm(false)}
                    className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      setShowLogoutConfirm(false);
                      handleLogout();
                    }}
                    className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>,
            document.body,
          )}
      </div>
    </div>
  );
}

export default function Sidebar({ isExpanded, isDesktop, toggleSidebar }: SidebarProps) {
  const { isMobileOpen, closeMobile } = useMobileSidebar();
  const pathname: string = usePathname();

  // Desktop Sidebar
  if (isDesktop) {
    return (
      <aside
        className={`fixed left-0 top-0 z-30 h-full bg-white border-r border-gray-200 shadow-sm transition-all duration-300 ease-in-out
          ${isExpanded ? 'w-60' : 'w-16'}`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="shrink-0 flex items-center justify-between px-4 border-b border-gray-200 h-14">
            {isExpanded && (
              <h1 className="text-lg font-bold text-gray-900 truncate">D&I Platform</h1>
            )}
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors"
              aria-label={isExpanded ? 'Collapse sidebar' : 'Expand sidebar'}
            >
              {isExpanded ? <FaTimes className="w-4 h-4" /> : <FaBars className="w-4 h-4" />}
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 min-h-0">
            <SidebarContent isExpanded={isExpanded} onLinkClick={() => {}} currentPath={pathname} />
          </div>
        </div>
      </aside>
    );
  }

  // Mobile Sidebar
  return (
    <>
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={closeMobile}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out md:hidden
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="shrink-0 flex items-center justify-between p-4 border-b border-gray-200 h-16">
            <h2 className="text-lg font-bold text-gray-900">D&I Platform</h2>
            <button
              onClick={closeMobile}
              className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
              aria-label="Close menu"
            >
              <FaTimes className="w-4 h-4" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 min-h-0">
            <SidebarContent isExpanded={true} onLinkClick={closeMobile} currentPath={pathname} />
          </div>
        </div>
      </aside>
    </>
  );
}

// ===================
// ===================
// ===================
// ===================
// ========================= sideBar.tsx
//components/dashboard/Sidebar.tsx
// 'use client';
// import { createPortal } from 'react-dom';
// import Image from 'next/image';
// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import { FaBars, FaTimes } from 'react-icons/fa';
// import { FiLogOut } from 'react-icons/fi';
// import { useMobileSidebar } from '@/hooks/useMobileSidebar';
// import { deleteCookie } from '@/utils/cookies';
// import { useRouter } from 'next/navigation';
// import { useState } from 'react';
// import { SubscriptionResponse } from '@/redux/slices/subscription/subscriptionSlice';

// // import { useGetUserQuery } from '@/redux/slices/Auth/authSlice';
// import {
//   SubscriptionApp,
//   useGetUserSubscriptionByUserQuery,
// } from '@/redux/slices/subscription/subscriptionSlice';

// import { useDispatch } from 'react-redux';
// import { setAssetId } from '@/redux/slices/global/globalSlice';

// import { setCookie } from '@/utils/cookies';

// type SidebarProps = {
//   isExpanded: boolean;
//   isDesktop: boolean;
//   toggleSidebar: () => void;
//   userSubscription: SubscriptionResponse; // ✅ strong type
// };

// type NavItem = {
//   iconSrc: string;
//   label: string;
//   href: string;
//   baseBg: string;
//   hoverBg: string;
//   text: string;
// };

// type BottomItem = {
//   iconSrc: string;
//   label: string;
//   href: string;
// };

// const bottomItems: BottomItem[] = [
//   { iconSrc: '/sidebar/settingsIcon.svg', label: 'Settings', href: '/settings' },
//   { iconSrc: '/sidebar/cultureIcon.svg', label: 'Support', href: '/Support' },
//   { iconSrc: '/sidebar/cultureIcon.svg', label: 'Logout', href: '/Support' },
// ];

// type SidebarContentProps = {
//   isExpanded: boolean;
//   onLinkClick: () => void;
//   currentPath: string;
//   userSubscription: SubscriptionResponse; // ✅ strong type
// };

// function SidebarContent({ isExpanded, onLinkClick, currentPath }: SidebarContentProps) {
//   const dispatch = useDispatch();
//   const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
//   const router = useRouter();
//   // const { data: UserData, error: UserDataError, isLoading: UserDataLoading } = useGetUserQuery();
//   const {
//     data: UserSubcription,
//     error: UserSubcriptionError,
//     isLoading: UserSubcriptionLoading,
//   } = useGetUserSubscriptionByUserQuery();

//   console.log(UserSubcription, 'UserSubcription');

//   if (UserSubcriptionLoading) return <p>Loading...</p>;
//   if (UserSubcriptionError) return <p>Something went wrong</p>;

//   // const navItemsFromSubscription: NavItem[] =
//   //   UserSubcription?.data?.flatMap((sub) =>
//   //     sub.Apps.map((app: SubscriptionApp) => ({
//   //       iconSrc: '/sidebar/leadershipIcon.svg',
//   //       label: app.AppId.Name,
//   //       // href: `/${app.AppId.Name.toLowerCase()}App`,
//   //       href: `/dynamicApps/${app.AppId.Name.toLowerCase()}`,
//   //       // href: `/dynamicApps/${app.AppId.Name.toLowerCase()}?id=${app.AppId._id}`,
//   //       baseBg: 'bg-[#f8f8f8]',
//   //       hoverBg: 'hover:bg-[#dcdcdc]',
//   //       text: 'text-black',
//   //     })),
//   //   ) || [];

//   // const navItemsFromSubscription: NavItem[] = Array.from(
//   //   new Map(
//   //     UserSubcription?.data?.flatMap((sub) =>
//   //       sub.Apps.map((app: SubscriptionApp) => [
//   //         app.AppId._id,
//   //         {
//   //           iconSrc: '/sidebar/leadershipIcon.svg',
//   //           label: app.AppId.Name,
//   //           href: `/dynamicApps/${app.AppId.Name.toLowerCase()}`,
//   //           baseBg: 'bg-[#f8f8f8]',
//   //           hoverBg: 'hover:bg-[#dcdcdc]',
//   //           text: 'text-black',
//   //         },
//   //       ]),
//   //     ) || [],
//   //   ).values(),
//   // );

//   const navItemsFromSubscription: NavItem[] = Array.from(
//     new Map(
//       userSubscription.data?.flatMap((sub) =>
//         sub.Apps.map((app: SubscriptionApp) => [
//           app.AppId._id,
//           {
//             iconSrc: '/sidebar/leadershipIcon.svg',
//             label: app.AppId.Name,
//             href: `/dynamicApps/${app.AppId.Name.toLowerCase()}`,
//             baseBg: 'bg-[#f8f8f8]',
//             hoverBg: 'hover:bg-[#dcdcdc]',
//             text: 'text-black',
//           },
//         ]),
//       ) || [],
//     ).values(),
//   );

//   const handleLogout = () => {
//     // delete auth cookie (replace "token" with your actual cookie name)
//     deleteCookie('UserToken');
//     deleteCookie('isSubscribed');

//     // redirect to login
//     router.push('/');
//   };

//   return (
//     <div className="flex flex-col h-full">
//       {/* Scrollable nav section */}
//       <nav className="flex-1 min-h-0 overflow-y-auto px-2 pt-2">
//         <ul className="space-y-[10px]">
//           {navItemsFromSubscription.map((item) => (
//             <li key={item.href}>
//               <Link
//                 href={item.href}
//                 onClick={() => {
//                   onLinkClick();
//                   // 🔥 Find the correct assetId for this app dynamically
//                   const matchedApp = UserSubcription?.data
//                     ?.flatMap((sub) => sub.Apps)
//                     .find((app) => app.AppId.Name.toLowerCase() === item.label.toLowerCase());

//                   if (matchedApp?.AppId?._id) {
//                     dispatch(setAssetId(matchedApp.AppId._id));
//                     setCookie('assetId', matchedApp.AppId._id); // ✅ persist assetId
//                   }
//                 }}
//                 className={`flex items-center justify-center md:justify-start gap-3 px-2 py-2 rounded-lg transition-colors duration-200
//                     ${item.baseBg} ${item.hoverBg} ${item.text}
//                     ${currentPath === item.href ? 'ring-1 ring-offset-1 ring-gray-400' : ''}`}
//               >
//                 <Image
//                   src={item.iconSrc}
//                   alt={item.label}
//                   width={20}
//                   height={20}
//                   className="shrink-0"
//                 />
//                 {isExpanded && <span className="truncate">{item.label}</span>}
//               </Link>
//             </li>
//           ))}
//         </ul>
//       </nav>

//       {/* Bottom fixed section (always visible) */}
//       <div className="shrink-0 border-t border-gray-200 bg-white">
//         <ul className="space-y-1 py-1">
//           {bottomItems.map((item) =>
//             item.label === 'Logout' ? (
//               <li key="logout">
//                 <button
//                   onClick={() => setShowLogoutConfirm(true)} // ✅ open popup instead
//                   className="w-full flex items-center gap-3 px-4 py-1 rounded-lg hover:bg-gray-100 text-gray-700"
//                 >
//                   <FiLogOut className="w-5 h-5 shrink-0" />
//                   {isExpanded && <span className="truncate">Logout</span>}
//                 </button>
//               </li>
//             ) : (
//               <li key={item.href}>
//                 <Link
//                   href={item.href}
//                   onClick={onLinkClick}
//                   className={`flex items-center gap-3 px-4 py-1 rounded-lg hover:bg-gray-100 text-gray-700
//             ${currentPath === item.href ? 'bg-gray-100 font-medium' : ''}`}
//                 >
//                   <Image
//                     src={item.iconSrc}
//                     alt={item.label}
//                     width={20}
//                     height={20}
//                     className="shrink-0"
//                   />
//                   {isExpanded && <span className="truncate">{item.label}</span>}
//                 </Link>
//               </li>
//             ),
//           )}
//         </ul>

//         {showLogoutConfirm &&
//           createPortal(
//             <div className="fixed inset-0 z-[9999] flex items-center justify-center  bg-black/80 backdrop-blur-sm">
//               <div className="bg-white rounded-lg shadow-lg p-6 w-80 mx-4">
//                 <h2 className="text-lg font-semibold text-gray-800 mb-4">Confirm Logout</h2>
//                 <p className="text-gray-600 mb-6">Are you sure you want to log out?</p>
//                 <div className="flex justify-end gap-3">
//                   <button
//                     onClick={() => setShowLogoutConfirm(false)}
//                     className="cursor-pointer px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     onClick={() => {
//                       setShowLogoutConfirm(false);
//                       handleLogout();
//                     }}
//                     className="cursor-pointer px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
//                   >
//                     Logout
//                   </button>
//                 </div>
//               </div>
//             </div>,
//             document.body,
//           )}
//       </div>
//     </div>
//   );
// }

// export default function Sidebar({ isExpanded, isDesktop, toggleSidebar }: SidebarProps) {
//   const { isMobileOpen, closeMobile } = useMobileSidebar();
//   const pathname: string = usePathname(); // ✅ force pathname as string

//   // Desktop sidebar
//   if (isDesktop) {
//     return (
//       <aside
//         className={`fixed left-0 top-0 z-30 h-full bg-white border-r border-gray-200 shadow-sm transition-all duration-300 ease-in-out
//           ${isExpanded ? 'w-60' : 'w-16'}`}
//       >
//         <div className="flex flex-col h-full">
//           {/* Header */}
//           <div className="shrink-0 flex items-center justify-between px-4 border-b border-gray-200 h-14">
//             {isExpanded && (
//               <h1 className="text-lg font-bold text-gray-900 truncate">D&I Platform</h1>
//             )}
//             <button
//               onClick={toggleSidebar}
//               className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors"
//               aria-label={isExpanded ? 'Collapse sidebar' : 'Expand sidebar'}
//             >
//               {isExpanded ? <FaTimes className="w-4 h-4" /> : <FaBars className="w-4 h-4" />}
//             </button>
//           </div>

//           {/* Content (scrollable nav + bottom fixed) */}
//           <div className="flex-1 min-h-0">
//             <SidebarContent
//               userSubscription={userSubscription as SubscriptionResponse}
//               isExpanded={isExpanded}
//               onLinkClick={() => {}}
//               currentPath={pathname}
//             />
//           </div>
//         </div>
//       </aside>
//     );
//   }

//   // Mobile sidebar
//   return (
//     <>
//       {isMobileOpen && (
//         <div
//           className="fixed inset-0 bg-black/50 z-40 md:hidden"
//           onClick={closeMobile}
//           aria-hidden="true"
//         />
//       )}

//       <aside
//         className={`fixed top-0 left-0 z-50 h-full w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out md:hidden
//           ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}`}
//       >
//         <div className="flex flex-col h-full">
//           {/* Header */}
//           <div className="shrink-0 flex items-center justify-between p-4 border-b border-gray-200 h-16">
//             <h2 className="text-lg font-bold text-gray-900">D&I Platform</h2>
//             <button
//               onClick={closeMobile}
//               className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
//               aria-label="Close menu"
//             >
//               <FaTimes className="w-4 h-4" />
//             </button>
//           </div>

//           {/* Content (scrollable nav + bottom fixed) */}
//           <div className="flex-1 min-h-0">
//             <SidebarContent isExpanded={true} onLinkClick={closeMobile} currentPath={pathname} />
//           </div>
//         </div>
//       </aside>
//     </>
//   );
// }
