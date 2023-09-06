import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const navbar = [
  {
    name: "Home",
    link: "home",
  },
  {
    name: "About Us",
    link: "about",
  },
  {
    name: "Service",
    link: "service",
  },
  {
    name: "Blog",
    link: "blog",
  },
  {
    name: "Contact",
    link: "contact",
  },
];

const main = {
  initial: {
    scale: 0,
    duration: 0.01,
  },
  animate: {
    scale: 1,
    transition: {
      ease: [0.25, 1, 0.5, 1],
      duration: 0.01,
    },
  },
  exit: {
    scale: 0,
    transition: {
      duration: 0.1,
    },
  },
};

const container = {
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.1,
      staggerDirection: -1,
    },
  },
};

const mainNavbar = {
  hidden: {
    y: "-100%",
  },
  show: {
    y: 0,
    transition: {
      ease: [0.6, 0.01, 0.05, 0.95],
      duration: 0.6,
    },
  },
  exit: {
    y: "-100%",
    transition: {
      ease: [0.6, 0.01, 0.05, 0.95],
      duration: 1.6,
    },
  },
};

const menuNavbar = {
  hidden: {
    y: -400,
    opacity: 0,
  },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      ease: [0.6, 0.01, 0.05, 0.95],
      duration: 1.6,
    },
  },
  exit: {
    y: -400,
    opacity: 0,
    transition: {
      ease: [0.6, 0.01, 0.05, 0.95],
      duration: 0.8,
    },
  },
};

const Sidebar = ({ buttonSidebar }: { buttonSidebar: boolean }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const navbarHandler = (navbar: string) => {
    navigate(`/#${navbar}`, { state: { targetID: navbar } });
  };
  return (
    <>
      <div className="fixed w-full h-24 top-0 left-0 z-40 mix-blend-difference">
        <div className="container">
          <div className="flex justify-end items-center h-full">
            <button onClick={() => setIsOpen(!isOpen)}>
              <Circle buttonSidebar={buttonSidebar} isOpen={isOpen} />
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="sidebar"
            variants={container}
            initial="hidden"
            animate="show"
            exit="exit"
            onClick={() => setIsOpen(!isOpen)}
            className="w-full h-full fixed top-0 left-0 z-30"
          >
            <motion.div
              variants={mainNavbar}
              className="w-full h-full bg-gray-950 p-2 lg:p-16"
            >
              <nav className="text-gray-100 h-full flex justify-center items-center flex-col">
                {navbar.map((navbar, index) => (
                  <div
                    key={index}
                    onClick={() => navbarHandler(navbar.link.toLowerCase())}
                    className="space-x-10 flex justify-center items-center"
                  >
                    <motion.p variants={menuNavbar} className="paragraf">
                      (0{index + 1})
                    </motion.p>
                    <motion.p
                      variants={menuNavbar}
                      className="cursor-pointer text-[14vw] md:text-[16vw] lg:text-[10vw] md:leading-[16vh] font-montserrat uppercase font-bold text-gray-100 lg:text-gray-800 hover:text-gray-100"
                    >
                      {navbar.name}
                    </motion.p>
                  </div>
                ))}
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const Circle = ({
  buttonSidebar,
  isOpen,
}: {
  buttonSidebar: boolean;
  isOpen: boolean;
}) => {
  return (
    <motion.div
      variants={main}
      key="sidebar_button"
      initial="initial"
      animate={buttonSidebar ? "animate" : ""}
      exit="exit"
      className="w-16 h-16 cursor-pointer rounded-full flex justify-center items-center duration-500 bg-gray-100 mix-blend-difference"
    >
      <Burger isOpen={isOpen} />
    </motion.div>
  );
};

const Burger = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-2">
      {/* <span className="w-6 h-[2px] bg-gray-100 rounded-full mix-blend-difference" />
      <span className="w-6 h-[2px] bg-gray-100 rounded-full mix-blend-difference" /> */}
      <span className="mix-blend-difference text-gray-100 paragraf">
        {isOpen ? "exit" : "menu"}
      </span>
    </div>
  );
};

export default Sidebar;
