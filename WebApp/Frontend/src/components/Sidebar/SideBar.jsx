import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { logoutAdmin } from "../../redux/actions/auth.actions";
import SidebarMenu from "./SidebarMenu";
import dashimg from "./mydash.svg";
import user2 from "./user2.svg";
import logo from "../../assets/logo.jpeg";

const routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    image: "/images/dashmenu.svg",
    img2: dashimg,
  },

  {
    path: "/all-users-data",
    name: "All Users",
    image: "/images/plus.svg",
    img2: user2,
  },
  // {
  //   path: "/appointments",
  //   name: "Appointments",
  //   image: "/images/appointt.svg",
  // },
  // {
  //   path: "/file-manager",
  //   name: "Reports",
  //   image: "/images/folder-medical-solid 1.svg",
  //   img2: repo,
  //   subRoutes: [
  //     {
  //       path: "/reports/patients",
  //       name: "Patient Reports ",
  //       image: "/images/plus.svg",
  //     },
  //     {
  //       path: "/reports/appointments",
  //       name: "Appointment Reports",
  //       image: "/images/appointt.svg",
  //     },
  //   ],
  // },
  // {
  //   path: "/setting",
  //   name: "Utilities",
  //   image: "/images/plus.svg",
  //   img2: util2,
  //   exact: true,
  //   subRoutes: [
  //     {
  //       path: "/attorney-officer",
  //       name: "Attorney office",
  //       image: "/images/usold.svg",
  //     },
  //     {
  //       path: "/mri-facility",
  //       name: "MRI Facility",
  //       image: "/images/usold.svg",
  //     },
  //     // {
  //     //   path: "/speciality",
  //     //   name: "Specialty ",
  //     //   image: "/images/usold.svg",
  //     // },
  //     {
  //       path: "/specialist",
  //       name: "Specialist ",
  //       image: "/images/usold.svg",
  //     },
  //   ],
  // },
  {
    path: "/",
    name: "Logout",
    image: "/images/logout.svg",
  },
];

const SideBar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);
  const dispatch = useDispatch();
  // const inputAnimation = {
  //   hidden: {
  //     width: 0,
  //     padding: 0,
  //     transition: {
  //       duration: 0.2,
  //     },
  //   },
  //   show: {
  //     width: "140px",
  //     padding: "5px 15px",
  //     transition: {
  //       duration: 0.2,
  //     },
  //   },
  // };

  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.5,
      },
    },
  };

  const [hideimg, setHideimg] = useState(true);
  const [showimg, setShowimg] = useState(false);

  return (
    <>
      <div className='flex'>
        <motion.div
          animate={{
            width: isOpen ? "260px" : "60px",

            transition: {
              duration: 0.5,
              type: "spring",
              damping: 10,
            },
          }}
          className={`sidebar `}>
          <div className='top_section'>
            <AnimatePresence>
              {isOpen && (
                <motion.h1
                  variants={showAnimation}
                  initial='hidden'
                  animate='show'
                  exit='hidden'
                  className='logo'>
                  <img src={logo} alt='' />
                </motion.h1>
              )}
            </AnimatePresence>

            <div className='bars'>
              <FaBars onClick={toggle} />
            </div>
          </div>

          <section className='routes'>
            {routes.map((route, index) => {
              if (route.subRoutes) {
                return (
                  <SidebarMenu
                    setIsOpen={setIsOpen}
                    route={route}
                    showAnimation={showAnimation}
                    isOpen={isOpen}
                    key={index}
                  />
                );
              }
              return (
                <NavLink
                  to={route.path}
                  key={index}
                  onClick={(e) => {
                    route.name === "Logout" && dispatch(logoutAdmin());
                    setShowimg(true);
                    setHideimg();
                  }}
                  className='link'>
                  <div className='icon'>
                    {hideimg ? (
                      <img src={route.image} className='svgMy' alt=''></img>
                    ) : null}
                    {showimg ? (
                      <img src={route.img2} className='svgMy' alt=''></img>
                    ) : null}
                  </div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        variants={showAnimation}
                        initial='hidden'
                        animate='show'
                        exit='hidden'
                        style={{ color: "#000" }}
                        onClick={() => {
                          setShowimg(true);
                          setHideimg(false);
                        }}
                        className={
                          route.name === "Logout"
                            ? "link_text lougoutclr"
                            : "link_text"
                        }>
                        {route.name}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </NavLink>
              );
            })}
          </section>
        </motion.div>

        <main style={{ width: "100%", paddingLeft: "20px" }}>{children}</main>
      </div>
    </>
  );
};

export default SideBar;
