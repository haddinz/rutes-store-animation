import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";

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

const navbarpage = {
  hidden: {
    y: -200,
  },
  show: {
    y: 0,
    transition: {
      ease: [0.6, 0.01, 0.05, 0.95],
      duration: 1.2,
    },
  },
};

const Navbar = ({ isScrollingUp }: { isScrollingUp: boolean }) => {
  const navigate = useNavigate();
  const navbarHandler = (navbar: string) => {
    navigate(`/#${navbar}`, { state: { targetID: navbar } });
  };
  return (
    <motion.div
      variants={navbarpage}
      initial="hidden"
      animate="show"
      className={`w-full h-20 fixed left-0 z-40 transform origin-top duration-700 ${
        isScrollingUp ? `top-0` : ` -top-20`
      }`}
    >
      <div className="container h-full">
        <div className="grid grid-cols-3 gap-5 items-center h-full text-gray-100">
          <div className="col-span-1">
            <Link to="/" className="text-xl font-bold font-montserrat">
              homedaaia
            </Link>
          </div>
          <div className="col-span-2">
            <div className="hidden lg:flex justify-end items-center">
              <nav className="text-gray-100 space-x-10 flex">
                {navbar.map((navbar, index) => (
                  <div
                    key={index}
                    onClick={() => navbarHandler(navbar.link.toLowerCase())}
                    className="cursor-pointer paragraf"
                  >
                    {navbar.name}
                  </div>
                ))}
              </nav>
            </div>
            <div className="block lg:hidden"></div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Navbar;
