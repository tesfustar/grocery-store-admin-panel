import {
  MdOutlineDashboardCustomize,
  MdDashboard,
  MdDeliveryDining,
} from "react-icons/md";
import {
  FaUserAlt,
  FaUserCog,
  FaBuysellads,
  FaQuestionCircle,
  FaCartArrowDown,
  FaStoreAlt,
} from "react-icons/fa";
import { AiTwotoneShop, AiFillSetting } from "react-icons/ai";
import {
  RiAdminFill,
  RiArrowDownSFill,
  RiArrowUpSFill,
  RiCoupon4Line,
} from "react-icons/ri";
import {
  BiCategory,
  BiChevronUp,
  BiChevronDown,
  BiStoreAlt,
} from "react-icons/bi";
import {
  MdLocalGroceryStore,
  MdHomeWork,
  MdRealEstateAgent,
  MdNotifications,
} from "react-icons/md";
import {
  RiStoreFill,
  RiHome8Fill,
  RiHome7Fill,
  RiCoupon2Fill,
} from "react-icons/ri";
import { GiVerticalBanner } from "react-icons/gi";
import { ImOffice } from "react-icons/im";
import { IoMdGitBranch } from "react-icons/io";
import {
  BsCartPlus,
  BsDot,
  BsFillCartCheckFill,
  BsFillCartXFill,
} from "react-icons/bs";
export const AdminSideBar = [
  {
    id: 1,
    hasSubMenu: false,
    title: "dashboard",
    name: "dashboard",
    nameAm: "ዳሽቦርድ",
    link: "dashboard",
    icon: <MdOutlineDashboardCustomize size={15} className=" text-[#bdcadf]" />,
  },
  {
    id: 2,
    hasSubMenu: true,
    title: "Product Management",
    name: "products",
    titleAm: "የምርት አስተዳደር",
    icon: <BiStoreAlt size={15} className=" text-[#bdcadf]" />,
    iconClosed: <RiArrowDownSFill size={18} className=" text-[#bdcadf]" />,
    iconOpened: <RiArrowUpSFill size={18} className=" text-[#bdcadf]" />,
    menus: [
      {
        name: "products",
        nameAm: "ምርቶች",
        link: "products",
        icon: <BsDot size={18} className=" text-[#bdcadf]" />,
      },
      {
        name: "top-deals",
        nameAm: "ከፍተኛ ቅናሾች",
        link: "top-deals",
        icon: <BsDot size={18} className=" text-[#bdcadf]" />,
      },
      {
        name: "categories",
        nameAm: "ምድቦች",
        link: "categories",
        icon: <BsDot size={19} className=" text-[#bdcadf]" />,
      },
    ],
  },
  {
    id: 3,
    hasSubMenu: true,
    title: "Branch Management",
    titleAm: "የቅርንጫፍ አስተዳደር",
    name: "Branches",
    icon: <IoMdGitBranch size={15} className=" text-[#bdcadf]" />,
    iconClosed: <RiArrowDownSFill size={18} className=" text-[#bdcadf]" />,
    iconOpened: <RiArrowUpSFill size={18} className=" text-[#bdcadf]" />,
    menus: [
      {
        name: "Branches",
        nameAm: "ቅርንጫፎች",
        link: "branches",
        icon: <BsDot size={18} className=" text-[#bdcadf]" />,
      },
    ],
  },
  {
    id: 4,
    hasSubMenu: true,
    title: "User Management",
    titleAm: "የተጠቃሚ አስተዳደር",
    name: "User Management",
    icon: <FaUserAlt size={13} className=" text-[#bdcadf]" />,
    iconClosed: <RiArrowDownSFill size={18} className=" text-[#bdcadf]" />,
    iconOpened: <RiArrowUpSFill size={18} className=" text-[#bdcadf]" />,
    menus: [
      {
        name: "customers",
        nameAm: "ደንበኞች",
        link: "customers",
        icon: <BsDot size={18} className=" text-[#bdcadf]" />,
      },
      {
        name: "deliveries",
        nameAm: "አድራሾች",
        link: "deliveries",
        icon: <BsDot size={18} className=" text-[#bdcadf]" />,
      },
      {
        name: "Branch Admin",
        nameAm: "የቅችንጫፍ አስተዳዳሪዎች",
        link: "branch-admin",
        icon: <BsDot size={18} className=" text-[#bdcadf]" />,
      },
    ],
  },
  {
    id: 5,
    hasSubMenu: true,
    title: "store Management",
    titleAm: "የተጠቃሚ አስተዳደር",
    name: "store Management",
    icon: <RiCoupon4Line size={15} className=" text-[#bdcadf]" />,
    iconClosed: <RiArrowDownSFill size={18} className=" text-[#bdcadf]" />,
    iconOpened: <RiArrowUpSFill size={18} className=" text-[#bdcadf]" />,
    menus: [
      {
        name: "Ads",
        nameAm: "ባነሮች",
        link: "banners",
        icon: <BsDot size={18} className=" text-[#bdcadf]" />,
      },
      {
        name: "coupons",
        nameAm: "ኩፖኖች",
        link: "coupons",
        icon: <BsDot size={18} className=" text-[#bdcadf]" />,
      },
      {
        name: "add coupons",
        nameAm: "ኩፖኖች",
        link: "coupons/add",
        icon: <BsDot size={18} className=" text-[#bdcadf]" />,
      },
    ],
  },
  {
    id: 6,
    hasSubMenu: true,
    title: "Order Management",
    titleAm: "የተጠቃሚ አስተዳደር",
    name: "Orders",
    icon: <RiCoupon4Line size={15} className=" text-[#bdcadf]" />,
    iconClosed: <RiArrowDownSFill size={18} className=" text-[#bdcadf]" />,
    iconOpened: <RiArrowUpSFill size={18} className=" text-[#bdcadf]" />,
    menus: [
      {
        name: "total order",
        nameAm: "ባነሮች",
        link: "orders",
        icon: <BsDot size={18} className=" text-[#bdcadf]" />,
      },
      {
        name: "pending orders",
        nameAm: "ኩፖኖች",
        link: "pending-orders",
        icon: <BsDot size={18} className=" text-[#bdcadf]" />,
      },
      {
        name: "delivered order",
        nameAm: "ባነሮች",
        link: "delivered-orders",
        icon: <BsDot size={18} className=" text-[#bdcadf]" />,
      },
    ],
  },
  {
    id: 7,
    hasSubMenu: true,
    title: "Request Management",
    titleAm: "የተጠቃሚ አስተዳደር",
    name: "Product request",
    icon: <RiCoupon4Line size={15} className=" text-[#bdcadf]" />,
    iconClosed: <RiArrowDownSFill size={18} className=" text-[#bdcadf]" />,
    iconOpened: <RiArrowUpSFill size={18} className=" text-[#bdcadf]" />,
    menus: [
      {
        name: "Product Request",
        nameAm: "የምርት ጥያቄዎች",
        link: "product/request",
        icon: <BsDot size={18} className=" text-[#bdcadf]" />,
      },
      {
        name: "pending orders",
        nameAm: "ኩፖኖች",
        link: "coupons",
        icon: <BsDot size={18} className=" text-[#bdcadf]" />,
      },
    ],
  },
  {
    id: 8,
    hasSubMenu: true,
    name: "Notifications",
    icon: <MdNotifications size={15} className=" text-[#bdcadf]" />,
    iconClosed: <RiArrowDownSFill size={18} className=" text-[#bdcadf]" />,
    iconOpened: <RiArrowUpSFill size={18} className=" text-[#bdcadf]" />,
    title: "Notifications",
    titleAm: "ማሳወቂያዎች",
    menus: [
      {
        link: "notifications",
        nameAm: "ማሳወቂያዎች",
        name: "notifications",
        icon: <BsDot size={18} className=" text-[#bdcadf]" />,
      },
    ],
  },
];

//STORE MANAGER LINKS\
export const StoreManagerSideBar = [
  {
    id: 1,
    hasSubMenu: false,
    title: "dashboard",
    name: "dashboard",
    nameAm: "ዳሽቦርድ",
    link: "dashboard",
    icon: <MdOutlineDashboardCustomize size={15} className=" text-[#bdcadf]" />,
  },
  {
    id: 2,
    hasSubMenu: true,
    title: "Product Management",
    name: "products",
    titleAm: "የምርት አስተዳደር",
    icon: <BiStoreAlt size={15} className=" text-[#bdcadf]" />,
    iconClosed: <RiArrowDownSFill size={18} className=" text-[#bdcadf]" />,
    iconOpened: <RiArrowUpSFill size={18} className=" text-[#bdcadf]" />,
    menus: [
      {
        name: "products",
        nameAm: "ምርቶች",
        link: "products",
        icon: <BsDot size={18} className=" text-[#bdcadf]" />,
      },
    ],
  },
  {
    id: 6,
    hasSubMenu: true,
    title: "Order Management",
    titleAm: "የተጠቃሚ አስተዳደር",
    name: "Orders",
    icon: <RiCoupon4Line size={15} className=" text-[#bdcadf]" />,
    iconClosed: <RiArrowDownSFill size={18} className=" text-[#bdcadf]" />,
    iconOpened: <RiArrowUpSFill size={18} className=" text-[#bdcadf]" />,
    menus: [
      {
        name: "total order",
        nameAm: "ባነሮች",
        link: "orders",
        icon: <BsDot size={18} className=" text-[#bdcadf]" />,
      },
      {
        name: "pending orders",
        nameAm: "ኩፖኖች",
        link: "coupons",
        icon: <BsDot size={18} className=" text-[#bdcadf]" />,
      },
      {
        name: "canceled orders",
        nameAm: "የተሰረዙ ትዕዛዞች",
        link: "canceled-orders",
        icon: <BsDot size={18} className=" text-[#bdcadf]" />,
      },
      {
        name: "pending orders",
        nameAm: "በመጠባበቅ ላይ ያሉ ትዕዛዞች",
        link: "canceled-orders",
        icon: <BsDot size={18} className=" text-[#bdcadf]" />,
      },
      {
        name: "completed orders",
        nameAm: "የተጠናቀቁ ትዕዛዞች",
        link: "canceled-orders",
        icon: <BsDot size={18} className=" text-[#bdcadf]" />,
      },
    ],
  },
  {
    id: 5,
    hasSubMenu: true,
    title: "store Management",
    titleAm: "የመደብር አስተዳደር",
    name: "store Management",
    icon: <RiCoupon4Line size={15} className=" text-[#bdcadf]" />,
    iconClosed: <RiArrowDownSFill size={18} className=" text-[#bdcadf]" />,
    iconOpened: <RiArrowUpSFill size={18} className=" text-[#bdcadf]" />,
    menus: [
      {
        name: "product request",
        nameAm: "የምርት ጥያቄ",
        link: "product/request",
        icon: <BsDot size={18} className=" text-[#bdcadf]" />,
      },
    ],
  },
  {
    id: 7,
    hasSubMenu: true,
    name: "Notifications",
    icon: <MdNotifications size={15} className=" text-[#bdcadf]" />,
    iconClosed: <RiArrowDownSFill size={18} className=" text-[#bdcadf]" />,
    iconOpened: <RiArrowUpSFill size={18} className=" text-[#bdcadf]" />,
    title: "Notifications",
    titleAm: "ማሳወቂያዎች",
    menus: [
      {
        link: "notifications",
        nameAm: "ማሳወቂያዎች",
        name: "notifications",
        icon: <MdNotifications size={20} className=" text-[#bdcadf]" />,
      },
    ],
  },
];
