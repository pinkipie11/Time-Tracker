import { useEffect, useState } from "react";
import { useRef } from "react";
import { motion } from "framer-motion";
// Components
import SubMenu from "./SubMenu";
// React icons
import { IoIosArrowBack } from "react-icons/io";
import { SlSettings } from "react-icons/sl";
import { TfiTimer } from "react-icons/tfi";
import { TbReport } from "react-icons/tb";
import { MdInsights } from "react-icons/md";
import { RiAdminLine } from "react-icons/ri";
import { MdManageHistory } from "react-icons/md";
import { useMediaQuery } from "react-responsive";
import { MdMenu } from "react-icons/md";
import { NavLink, useLocation, useRoutes } from "react-router-dom";

const Sidebar = () => {
  let isTabletMid = useMediaQuery({ query: "(max-width: 768px)" });
  // Sidebar open state
  const [open, setOpen] = useState(isTabletMid ? false : true);
  const sidebarRef = useRef();
  const { pathname } = useLocation();

  useEffect(() => {
    if (isTabletMid) {
      // mobile
      setOpen(false);
    } else {
      // laptop
      setOpen(true);
    }
  }, [isTabletMid]);

  // pathname change -> close sidebar (only mobile view)
  useEffect(() => {
    isTabletMid && setOpen(false);
  }, [pathname]);

  const Nav_animation = isTabletMid
    ? {
        open: {
          x: 0,
          width: "16rem",
          transition: {
            damping: 40,
          },
        },
        closed: {
          x: -250,
          width: 0,
          transition: {
            damping: 40,
            delay: 0.15,
          },
        },
      }
    : {
        // System view
        open: {
          width: "16rem",
          transition: {
            damping: 40,
          },
        },
        closed: {
          width: "4rem",
          transition: {
            damping: 40,
          },
        },
      };

  const subMenusList = [
    {
      // main menu names
      name: "manage",
      // react icons
      icon: MdManageHistory,
      // submenus
      menus: ["projects", "clients", "team", "tags", "billable rates"],
    },
    {
      name: "admin",
      icon: RiAdminLine,
      menus: ["organization", "subscription"],
    },
  ];

  return (
    <div>
      <div
        onClick={() => setOpen(false)}
        className={`md:hidden fixed inset-0 max-h-screen z-[998] bg-black/50 ${
          open ? "block" : "hidden"
        } `}
      ></div>
      <motion.div
        ref={sidebarRef}
        variants={Nav_animation}
        initial={{ x: isTabletMid ? -250 : 0 }}
        animate={open ? "open" : "closed"}
        className=" bg-white text-gray shadow-xl z-[999] max-w-[16rem]  w-[16rem] 
            overflow-hidden md:relative fixed
         h-screen "
      >
        <div className="flex items-center gap-3 font-medium border-b py-3 border-slate-300  mx-3">
          <img
            src="https://img.icons8.com/arcade/64/timer.png"
            width={45}
            alt=""
          />
          <span className="text-xl whitespace-pre">Time Tracker</span>
        </div>
        {/* Menus */}
        <div className="flex flex-col  h-full">
          {/* first */}
          <ul className="whitespace-pre px-2.5 text-[0.9rem] py-5 flex flex-col gap-1  font-medium overflow-x-hidden scrollbar-thin scrollbar-track-white scrollbar-thumb-slate-100   md:h-[68%] h-[70%]">
            <li>
              <NavLink to={"/"} className="link">
                <TfiTimer size={23} className="min-w-max" />
                Timer
              </NavLink>
            </li>
            <li>
              <NavLink to={"/reports"} className="link">
                <TbReport size={23} className="min-w-max" />
                Reports
              </NavLink>
            </li>
            <li>
              <NavLink to={"/insights"} className="link">
                <MdInsights size={23} className="min-w-max" />
                Insights
              </NavLink>
            </li>
            {/* second */}

            {/* with submenu */}
            {/* mobile view most show submenus */}
            {(open || isTabletMid) && (
              <div className="border-y py-5 border-slate-300 ">
                <small className="pl-3 text-slate-500 inline-block mb-2">
                  Product categories
                </small>
                {subMenusList?.map((menu) => (
                  <div key={menu.name} className="flex flex-col gap-1">
                    <SubMenu data={menu} />
                  </div>
                ))}
              </div>
            )}
            <li>
              <NavLink to={"/settings"} className="link">
                <SlSettings size={23} className="min-w-max" />
                Settings
              </NavLink>
            </li>
          </ul>
          {open && (
            <div className="flex-1 text-sm z-50  max-h-48 my-auto whitespace-pre w-full font-medium  ">
              <div className="flex border-y border-slate-300 p-4 items-center justify-between">
                <div>
                  <p>Free Trial</p>
                  <small>No-cost $0/month</small>
                </div>
                <p className="text-teal-500 py-1.5 px-3 text-xs bg-teal-50 rounded-xl">
                  Upgrade
                </p>
              </div>
            </div>
          )}
        </div>

        <motion.div
          onClick={() => {
            setOpen(!open);
          }}
          animate={
            open
              ? {
                  // x: 0,
                  // y: 0,
                  rotate: 0,
                }
              : {
                  // x: -10,
                  // y: -200,
                  rotate: 180,
                }
          }
          transition={{ duration: 0 }}
          className="absolute w-fit h-fit md:block z-50 hidden right-2 bottom-3 cursor-pointer"
        >
          <IoIosArrowBack size={25} />
        </motion.div>
      </motion.div>
      <div className="m-3 md:hidden" onClick={() => setOpen(true)}>
        <MdMenu size={25} />
      </div>
    </div>
  );
};

export default Sidebar;
