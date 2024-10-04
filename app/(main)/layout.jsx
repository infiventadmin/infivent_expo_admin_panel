// import React from "react";
// import Header from "@/components/Header";
// import Sidebar from "@/components/Sidebar";
// import styles from "@/styles/app/(main)/layout.module.scss";

// export const metadata = {
//   title: "Admin Panel",
//   description: "Reactor World Expo Admin Panel",
// };

// const sidebarNavItems = [
//   {
//     icon: (
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         width="24"
//         height="24"
//         viewBox="0 0 24 24"
//         fill="#423A8E"
//         stroke="#423A8E"
//         strokeWidth="2"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         className="lucide lucide-layout-dashboard"
//       >
//         <rect width="7" height="9" x="3" y="3" rx="1" />
//         <rect width="7" height="5" x="14" y="3" rx="1" />
//         <rect width="7" height="9" x="14" y="12" rx="1" />
//         <rect width="7" height="5" x="3" y="16" rx="1" />
//       </svg>
//     ),
//     title: "DASHBOARD",
//     href: "/home",
//   },
//   {
//     icon: (
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         width="28"
//         height="28"
//         viewBox="0 0 24 24"
//         fill="#423A8E"
//         stroke="#423A8E"
//         strokeWidth="2"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         className="lucide lucide-user"
//       >
//         <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
//         <circle cx="12" cy="7" r="4" />
//       </svg>
//     ),
//     title: "EXHIBITOR",
//     href: "/exhibitors",
//   },
//   {
//     icon: (
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         width="28"
//         height="28"
//         viewBox="0 0 24 24"
//         fill="#423A8E"
//         stroke="#e5e5f2"
//         strokeWidth="1"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         className="lucide lucide-menu-square"
//       >
//         <rect width="18" height="18" x="3" y="3" rx="2" />
//         <path d="M7 8h10" />
//         <path d="M7 12h10" />
//         <path d="M7 16h10" />
//       </svg>
//     ),
//     title: "OEM",
//     href: "/oem",
//   },
//   {
//     icon: (
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         width="28"
//         height="28"
//         viewBox="0 0 24 24"
//         fill="#423A8E"
//         stroke="#423A8E"
//         strokeWidth="2"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         className="lucide lucide-user"
//       >
//         <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
//         <circle cx="12" cy="7" r="4" />
//       </svg>
//     ),
//     title: "DELEGATES",
//     href: "/delegates",
//   },
//   {
//     icon: (
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         width="28"
//         height="28"
//         viewBox="0 0 24 24"
//         fill="#423A8E"
//         stroke="#423A8E"
//         strokeWidth="2"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         className="lucide lucide-user"
//       >
//         <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
//         <circle cx="12" cy="7" r="4" />
//       </svg>
//     ),
//     title: "VISITORS",
//     href: "/visitors",
//   },
//   {
//     icon: (
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         width="28"
//         height="28"
//         viewBox="0 0 24 24"
//         fill="#423A8E"
//         stroke="#423A8E"
//         strokeWidth="2"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         className="lucide lucide-user"
//       >
//         <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
//         <circle cx="12" cy="7" r="4" />
//       </svg>
//     ),
//     title: "SPEAKERS",
//     href: "/speakers",
//   },
//   {
//     icon: (
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         width="28"
//         height="28"
//         viewBox="0 0 24 24"
//         fill="#423A8E"
//         stroke="#b0d0ed"
//         strokeWidth="1"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         className="lucide lucide-shopping-bag"
//       >
//         <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
//         <path d="M3 6h18" />
//         <path d="M16 10a4 4 0 0 1-8 0" />
//       </svg>
//     ),
//     title: "VENDORS",
//     href: "/vendors",
//   },
//   {
//     icon: (
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         width="28"
//         height="28"
//         viewBox="0 0 24 24"
//         fill="#423A8E"
//         stroke="#b0d0ed"
//         strokeWidth="1"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         className="lucide lucide-book-minus"
//       >
//         <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
//         <path d="M9 10h6" />
//       </svg>
//     ),
//     title: "SESSIONS",
//     href: "/sessions",
//   },
//   {
//     icon: (
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         width="28"
//         height="28"
//         viewBox="0 0 24 24"
//         fill="#423A8E"
//         stroke="#b0d0ed"
//         strokeWidth="1"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         className="lucide lucide-home"
//       >
//         <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
//         <polyline points="9 22 9 12 15 12 15 22" />
//       </svg>
//     ),
//     title: "STALLS",
//     href: "/stalls",
//   },
//   {
//     icon: (
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         width="28"
//         height="28"
//         viewBox="0 0 24 24"
//         fill="#423A8E"
//         stroke="#b0d0ed"
//         strokeWidth="1"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         className="lucide lucide-home"
//       >
//         <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
//         <polyline points="9 22 9 12 15 12 15 22" />
//       </svg>
//     ),
//     title: "Settings",
//     href: "/settings",
//   },
// ];

// const layout = ({ children }) => {
//   return (
//     <>
//       <div className={styles.main}>
//         <div className={styles.header}>
//           <Header />
//         </div>
//         <div className="flex">
//           <div className={styles.sidenav}>
//             <Sidebar items={sidebarNavItems} />
//           </div>
//           <div className={styles.container}>
//             <div className={styles.child}>{children}</div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default layout;
"use client";

import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import styles from "@/styles/app/(main)/layout.module.scss";
import supabase from "@/supabase/config";
const sidebarNavItems = [
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="#423A8E"
        stroke="#423A8E"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-layout-dashboard"
      >
        <rect width="7" height="9" x="3" y="3" rx="1" />
        <rect width="7" height="5" x="14" y="3" rx="1" />
        <rect width="7" height="9" x="14" y="12" rx="1" />
        <rect width="7" height="5" x="3" y="16" rx="1" />
      </svg>
    ),
    title: "DASHBOARD",
    href: "/home",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="#423A8E"
        stroke="#423A8E"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-user"
      >
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
    title: "EXHIBITOR",
    href: "/exhibitors",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="#423A8E"
        stroke="#e5e5f2"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-menu-square"
      >
        <rect width="18" height="18" x="3" y="3" rx="2" />
        <path d="M7 8h10" />
        <path d="M7 12h10" />
        <path d="M7 16h10" />
      </svg>
    ),
    title: "OEM",
    href: "/oem",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="#423A8E"
        stroke="#423A8E"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-user"
      >
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
    title: "DELEGATES",
    href: "/delegates",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="#423A8E"
        stroke="#423A8E"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-user"
      >
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
    title: "VISITORS",
    href: "/visitors",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="#423A8E"
        stroke="#423A8E"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-user"
      >
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
    title: "SPEAKERS",
    href: "/speakers",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="#423A8E"
        stroke="#b0d0ed"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-shopping-bag"
      >
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
        <path d="M3 6h18" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
    ),
    title: "VENDORS",
    href: "/vendors",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="#423A8E"
        stroke="#b0d0ed"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-book-minus"
      >
        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
        <path d="M9 10h6" />
      </svg>
    ),
    title: "SESSIONS",
    href: "/sessions",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="#423A8E"
        stroke="#b0d0ed"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-home"
      >
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    title: "STALLS",
    href: "/stalls",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="#423A8E"
        stroke="#b0d0ed"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-home"
      >
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    title: "SETTINGS",
    href: "/settings",
  },
];
const Layout = ({ children }) => {
  const [access, setAccess] = useState([]);
  const [filteredNavItems, setFilteredNavItems] = useState([]);

  useEffect(() => {
    const fetchUserAccess = async () => {
      const user = sessionStorage.getItem("User_id");
      // console.log("user", user);

      if (user) {
        const { data, error } = await supabase
          .from("user")
          .select("access")
          .eq("id", user)
          .single();

        if (!error && data) {
          // console.log("data", data);
          setAccess(JSON.parse(data.access));
        } else {
          console.log("error", error);
        }
      }
    };

    fetchUserAccess();
  }, []);

  useEffect(() => {
    if (access.length > 0) {
      const filteredItems = sidebarNavItems.filter((item) =>
        access.includes(item.title.toUpperCase())
      );
      setFilteredNavItems(filteredItems);
    }
  }, [access]);

  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <Header />
      </div>
      <div className="flex">
        <div className={styles.sidenav}>
          <Sidebar items={filteredNavItems} />{" "}
        </div>
        <div className={styles.container}>
          <div className={styles.child}>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
