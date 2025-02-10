import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const [openDropdowns, setOpenDropdowns] = useState({});

  const toggleDropdown = (key) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const sidebarNav = [
    {
      name: "Dashboard",
      href: "/",
      icon: "fa-solid fa-house",
    },
    {
      name: "People Management",
      key: "people",
      icon: "fa-solid fa-user-cog",
      href: "/Users",
      href2: "/vendor_management",
      children: [
        {
          name: "User's Management",
          href: "/Users",
          icon: "fa-solid fa-users",
        },
        {
          name: "Staff Management",
          href: "/vendor_management",
          icon: "fa-solid fa-users-cog",
        },
        {
          name: "Query Management",
          href: "/Query",
          icon: "fa-solid fa-question-circle",
        },
        {
          name: "Push Notification",
          href: "/Notification",
          icon: "fa-solid fa-bell",
        },
      ],
    },
    {
      name: "Category Management",
      href: "/category_management",
      icon: "fa-solid fa-shopping-bag",
    },
    {
      name: "Product Management",
      href: "/product_management",
      icon: "fa-solid fa-shopping-cart",
    },
    {
      name: "Document Template",
      href: "/document_management",
      icon: "fa-solid fa-file-invoice-dollar",
    },
    {
      name: "Task Management",
      href: "/task_management",
      icon: "fa-solid fa-tasks",
    },
    {
      name: "Chat Management",
      href: "/chat_management",
      icon: "fa-solid fa-message",
    },
    {
      name: "Content Management",
      key: "content",
      icon: "fa-solid fa-info-circle",
      children: [
        { name: "About Us", href: "/AboutUs", icon: "fa-solid fa-circle-user" },
        {
          name: "T&C",
          href: "/TandC",
          icon: "fa-solid fa-file-invoice-dollar",
        },
        {
          name: "Privacy Policy",
          href: "/PrivacyPolicy",
          icon: "fa-solid fa-shield-halved",
        },
        { name: "FAQ", href: "/FAQ", icon: "fa-solid fa-clipboard-question" },
      ],
    },
    {
      name: "Payment Management",
      key: "payment",
      icon: "fa-solid fa-money-bill-wave-alt",
      children: [
        {
          name: "Subscription Plan",
          href: "/Subscription",
          icon: "fa-solid fa-hand-holding-dollar",
        },
        {
          name: "Transaction",
          href: "/Transaction",
          icon: "fa-solid fa-rotate",
        },
      ],
    },
    {
      name: "Logout",
      href: "/Login",
      icon: "fa-solid fa-sign-out",
      buttonClick: () => {
        localStorage?.removeItem("token-vexors-admin");
      },
    },
  ];

  return (
    <div className="sidebar-wrapper shadow-left">
      <ul className="sidebar-list list-unstyled">
        {sidebarNav?.map((item) => (
          <li
            key={item.name}
            className={location.pathname === item?.href || item?.href2 ? "active" : ""}
          >
            {item.children ? (
              <div
                className="custom-sidebar-dropdown"
                onClick={() => toggleDropdown(item.key)}
              >
                <span>
                  <i className={item.icon}></i>
                </span>
                <span>{item.name}</span>
                <span className="toggle-icon">
                  {openDropdowns[item.key] ? "▲" : "▼"}
                </span>
              </div>
            ) : (
              <Link to={item.href}>
                <span>
                  <i className={item.icon}></i>
                </span>
                <span>{item.name}</span>
              </Link>
            )}

            {item.children && openDropdowns[item.key] && (
              <div className="custom-sidebar-content">
                <ul className="sidebar-list list-unstyled p-0">
                  {item.children.map((child) => (
                    <li
                      key={child.name}
                      className={
                        location.pathname === child.href ? "active" : ""
                      }
                    >
                      <Link to={child.href}>
                        <span>
                          <i className={child.icon}></i>
                        </span>
                        <span>{child.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
