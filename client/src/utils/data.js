export const allCategories = [
  { id: 1, title: "All", category: "all" },
  { id: 2, title: "Silk Thread", category: "silkthread" },
  { id: 3, title: "Kundan", category: "kundan" },
  { id: 4, title: "3D Kundan", category: "3dkundan" },
  { id: 5, title: "Lakshmi Coin", category: "lakshmicoin" },
  { id: 6, title: "Name Bangles", category: "namebangles" },
  { id: 7, title: "Multi Color", category: "multicolor" },
];

export const categoriesOptions = [
  { id: 1, title: "Silk Thread", value: "silkthread" },
  { id: 2, title: "Kundan", value: "kundan" },
  { id: 3, title: "3D Kundan", value: "3dkundan" },
  { id: 4, title: "Lakshmi Coin", value: "lakshmicoin" },
  { id: 5, title: "Name Bangles", value: "namebangles" },
  { id: 6, title: "Multi Color", value: "multicolor" },
];

export const sizes = [
  { id: 1, size: "5.0", enabled: true },
  { id: 2, size: "5.5", enabled: true },
  { id: 3, size: "6.0", enabled: true },
  { id: 4, size: "6.5", enabled: true },
  { id: 5, size: "7.0", enabled: true },
  { id: 6, size: "7.5", enabled: true },
];

export const msToDateTime = (ms) => {
  const date = new Date(ms);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear().toString();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");
  return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
};

export const dashboardLinks = [
  {
    id: 1,
    title: "Home",
    link: "/dashboard/home",
  },
  {
    id: 2,
    title: "Orders",
    link: "/dashboard/orders",
  },
  {
    id: 3,
    title: "Items",
    link: "/dashboard/items",
  },
  {
    id: 4,
    title: "Add Item ",
    link: "/dashboard/newItem",
  },
  {
    id: 5,
    title: "Users",
    link: "/dashboard/users",
  },
  // {
  //   id: 6,
  //   title: "Settings",
  //   link: "/dashboard/settings",
  // },
];
