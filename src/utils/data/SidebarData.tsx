import { MdOutlineDashboardCustomize, MdDashboard } from "react-icons/md";
import {
  FaUserAlt,
  FaUserCog,
  FaBuysellads,
  FaQuestionCircle,
} from "react-icons/fa";
import { AiTwotoneShop, AiFillSetting } from "react-icons/ai";
import { SiLogstash } from "react-icons/si";
import { BiCategory } from "react-icons/bi";
import { MdHomeWork, MdRealEstateAgent, MdNotifications } from "react-icons/md";
import { RiAdvertisementFill, RiHome8Fill, RiHome7Fill } from "react-icons/ri";
import { GiVerticalBanner } from "react-icons/gi";
import { ImOffice } from "react-icons/im";
export const AdminSideBar = [
  {
    title: "Dashboard",
    links: [
      {
        name: "dashboard",
        link: "dashboard",
        icon: <MdDashboard size={22} className=" text-[#bdcadf]" />,
      },
    ],
  },
  {
    title: "Lists",
    links: [
      {
        name: "listings",
        link: "listings",
        icon: <MdRealEstateAgent size={18} className=" text-[#bdcadf]" />,
      },
      {
        name: "categories",
        link: "category",
        icon: <BiCategory size={19} className=" text-[#bdcadf]" />,
      },
      {
        name: "subCategory",
        link: "subCategory",
        icon: <BiCategory size={19} className=" text-[#bdcadf]" />,
      },
      {
        name: "users",
        link: "users",
        icon: <FaUserAlt size={16} className=" text-[#bdcadf]" />,
      },
      {
        name: "featured listings",
        link: "featured",
        icon: <FaBuysellads size={18} className=" text-[#bdcadf]" />,
      },
      {
        name: "banks",
        link: "banks",
        icon: <FaBuysellads size={18} className=" text-[#bdcadf]" />,
      },
    ],
  },
  {
    title: "Requests",
    links: [
      {
        name: "listing request",
        link: "listing-request",
        icon: <MdRealEstateAgent size={20} className=" text-[#bdcadf]" />,
      },
      {
        name: "Featured ads",
        link: "featured-request",
        icon: <RiAdvertisementFill size={20} className=" text-[#bdcadf]" />,
      },
      {
        link: "notification",
        name: "notifications",
        icon: <MdNotifications size={20} className=" text-[#bdcadf]" />,
      },
    ],
  },
  {
    title: "User",
    links: [
      {
        name: "profile",
        link: "profile",
        icon: <FaUserCog size={20} className=" text-[#bdcadf]" />,
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
        icon: <MdDashboard size={22} className=" text-[#96a0af]" />,
      },
    ],
  },
  {
    title: "Lists",
    titleAm: "ዝርዝሮች",
    links: [
      {
        name: "properties",
        link: "properties",
        nameAm: "ንብረቶች",
        icon: <MdHomeWork size={18} className=" text-[#96a0af]" />,
      },
      {
        name: "agents",
        link: "agents",
        nameAm: "ወኪሎች",
        icon: <FaUserAlt size={18} className=" text-[#96a0af]" />,
      },
      {
        name: "sold properties",
        link: "sold",
        nameAm: "የተሸጡ ንብረቶች",
        icon: <MdHomeWork size={18} className=" text-[#96a0af]" />,
      },
      {
        name: "rented properties",
        link: "rented",
        nameAm: "የተከራዩ ንብረቶች",
        icon: <RiHome7Fill size={18} className=" text-[#96a0af]" />,
      },
      {
        name: "featured properties",
        link: "featured",
        nameAm: "ተለይተው የቀረቡ ንብረቶች",
        icon: <RiHome8Fill size={18} className=" text-[#96a0af]" />,
      },
    ],
  },
  {
    title: "Services",
    titleAm: "አገልግሎቶች",
    links: [
      {
        name: "property ads",
        link: "ads",
        nameAm: "የንብረት ማስታወቂያዎች",
        icon: <FaBuysellads size={20} className=" text-[#96a0af]" />,
      },
      {
        name: "Banner ads",
        link: "banner",
        nameAm: "የባነር ማስታወቂያዎች",
        icon: <GiVerticalBanner size={20} className=" text-[#96a0af]" />,
      },
      {
        name: "FAQ",
        link: "faq",
        nameAm: "የሚጠየቁ ጥያቄዎች",
        icon: <FaQuestionCircle size={20} className=" text-[#96a0af]" />,
      },

      {
        link: "notification",
        name: "notifications",
        nameAm: "ማሳወቂያዎች",
        icon: <MdNotifications size={20} className=" text-[#96a0af]" />,
      },
    ],
  },
  {
    title: "User",
    titleAm: "ተጠቃሚ",
    links: [
      {
        name: "profile",
        link: "profile",
        nameAm: "መገለጫ",
        icon: <FaUserCog size={20} className=" text-[#96a0af]" />,
      },
    ],
  },
];
