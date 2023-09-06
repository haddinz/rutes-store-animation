import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import About from "./aboutpage";
import Homepage from "./homepage";
import Accordion from "../pages/accordionpage";
import Loadingpage from "../components/loadingpage";
import { motion, AnimatePresence } from "framer-motion";
import Service from "./servicepage";
import Project from "./projectpage";
import Blog from "./blogpage";
import Contact from "./contactpage";
import Sidebar from "../components/sidebar";

const Landingpage = () => {
  const { state: location } = useLocation();
  const { targetID } = location || {};

  //=========================================================

  const [loader, setLoader] = useState<boolean>(false);

  //=========================================================

  const [isScrollingUp, setIsScrollingUp] = useState<boolean>(true);
  const [buttonSidebar, setButtonSidebar] = useState<boolean>(false);

  // let topNavbar = window.scrollY || document.documentElement.scrollTop;
  const navbarScrollingHandler = () => {
    const valueScrolling = window.scrollY || document.documentElement.scrollTop;
    const navbarScrolling =
      valueScrolling < 600 ? setIsScrollingUp(true) : setIsScrollingUp(false);
    // topNavbar = valueScrolling; 
    // Leter fiture for update changes

    return navbarScrolling;
  };

  useEffect(() => {
    const goto = document.getElementById(targetID);
    const scrollIntoView = goto && goto.scrollIntoView({ behavior: "smooth" });

    const handleResize = () => {
      const screenWidth = window.innerWidth;
      const scaleSize =
        screenWidth > 1010 && isScrollingUp === true
          ? setButtonSidebar(false)
          : setButtonSidebar(true);

      return scaleSize;
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", navbarScrollingHandler);

    return () => {
      window.removeEventListener("scroll", navbarScrollingHandler);
      window.removeEventListener("resize", handleResize);
      scrollIntoView;
    };
  }, [targetID, isScrollingUp]);

  return (
    <AnimatePresence>
      {loader ? (
        <motion.div key="modal">
          <Loadingpage setLoader={setLoader} />
        </motion.div>
      ) : (
        <motion.section
          key="section"
          className="h-[100vh] w-full no-scrollbar relative"
        >
          <Navbar isScrollingUp={isScrollingUp} />
          <Sidebar buttonSidebar={buttonSidebar} />
          <Homepage />
          <About />
          <Service />
          <Project />
          <Blog />
          <Accordion />
          <Contact />
          <Footer />
        </motion.section>
      )}
    </AnimatePresence>
  );
};

export default Landingpage;
