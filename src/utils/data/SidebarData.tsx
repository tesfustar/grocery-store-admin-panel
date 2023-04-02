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
} from "react-icons/fa";
import { AiTwotoneShop, AiFillSetting } from "react-icons/ai";
import { RiAdminFill } from "react-icons/ri";
import { BiCategory } from "react-icons/bi";
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
export const AdminSideBar = [
  {
    title: "Dashboard",
    titleAm: "ዳሽቦርድ",
    links: [
      {
        name: "dashboard",
        nameAm: "ዳሽቦርድ",
        link: "dashboard",
        icon: <MdDashboard size={22} className=" text-[#bdcadf]" />,
      },
    ],
  },
  {
    title: "Product Management",
    titleAm: "የምርት አስተዳደር",
    links: [
      {
        name: "products",
        nameAm: "ምርቶች",
        link: "products",
        icon: <RiStoreFill size={18} className=" text-[#bdcadf]" />,
      },
      {
        name: "top-deals",
        nameAm: "ከፍተኛ ቅናሾች",
        link: "top-deals",
        icon: <RiStoreFill size={18} className=" text-[#bdcadf]" />,
      },
      {
        name: "categories",
        nameAm: "ምድቦች",
        link: "categories",
        icon: <BiCategory size={19} className=" text-[#bdcadf]" />,
      },
    ],
  },
  {
    title: "Branch Management",
    titleAm: "የቅርንጫፍ አስተዳደር",
    links: [
      {
        name: "Branches",
        nameAm: "ቅርንጫፎች",
        link: "branches",
        icon: <IoMdGitBranch size={22} className=" text-[#bdcadf]" />,
      },
    ],
  },
  {
    title: "Order Management",
    titleAm: "የትዕዛዝ አስተዳደር",
    links: [
      {
        name: "orders",
        nameAm: "ትዕዛዞች",
        link: "orders",
        icon: <MdLocalGroceryStore size={18} className=" text-[#bdcadf]" />,
      },
    ],
  },
  {
    title: "User Management",
    titleAm: "የተጠቃሚ አስተዳደር",
    links: [
      {
        name: "customers",
        nameAm: "ደንበኞች",
        link: "customers",
        icon: <FaUserAlt size={16} className=" text-[#bdcadf]" />,
      },
      {
        name: "deliveries",
        nameAm: "አድራሾች",
        link: "deliveries",
        icon: <MdDeliveryDining size={18} className=" text-[#bdcadf]" />,
      },
      {
        name: "Branch Admin",
        nameAm: "አድራሾች",
        link: "branch-admin",
        icon: <RiAdminFill size={18} className=" text-[#bdcadf]" />,
      },

      
    ],
  },
  {
    title: "Setting",
    titleAm: "ቅንብሮች",
    links: [
      {
        name: "banners",
        nameAm: "ባነሮች",
        link: "banners",
        icon: <FaBuysellads size={18} className=" text-[#bdcadf]" />,
      },
      {
        name: "coupons",
        nameAm: "ኩፖኖች",
        link: "coupons",
        icon: <RiCoupon2Fill size={18} className=" text-[#bdcadf]" />,
      },
    ],
  },
  {
    title: "Notifications",
    titleAm: "ማሳወቂያዎች",
    links: [
      {
        link: "notifications",
        nameAm: "ማሳወቂያዎች",
        name: "notifications",
        icon: <MdNotifications size={20} className=" text-[#bdcadf]" />,
      },
    ],
  },
];

//sTORE MANAGER LINKS\
export const StoreManagerSideBar = [
  {
    title: "Dashboard",
    titleAm: "ዳሽቦርድ",
    links: [
      {
        name: "dashboard",
        nameAm: "ዳሽቦርድ",
        link: "dashboard",
        icon: <MdDashboard size={22} className=" text-[#bdcadf]" />,
      },
    ],
  },
  {
    title: "Product Management",
    titleAm: "የምርት አስተዳደር",
    links: [
      {
        name: "products",
        nameAm: "ምርቶች",
        link: "products",
        icon: <RiStoreFill size={18} className=" text-[#bdcadf]" />,
      },
    ],
  },
  {
    title: "Order Management",
    titleAm: "የትዕዛዝ አስተዳደር",
    links: [
      {
        name: "orders",
        nameAm: "ትዕዛዞች",
        link: "orders",
        icon: <MdLocalGroceryStore size={18} className=" text-[#bdcadf]" />,
      },
    ],
  },

  {
    title: "Setting",
    titleAm: "ቅንብሮች",
    links: [
      {
        name: "banners",
        nameAm: "ባነሮች",
        link: "banners",
        icon: <FaBuysellads size={18} className=" text-[#bdcadf]" />,
      },
      {
        name: "coupons",
        nameAm: "ኩፖኖች",
        link: "coupons",
        icon: <RiCoupon2Fill size={18} className=" text-[#bdcadf]" />,
      },
    ],
  },
  {
    title: "Notifications",
    titleAm: "ማሳወቂያዎች",
    links: [
      {
        link: "notifications",
        nameAm: "ማሳወቂያዎች",
        name: "notifications",
        icon: <MdNotifications size={20} className=" text-[#bdcadf]" />,
      },
    ],
  },
];;
