import { useRef } from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Youtube } from "../assets/icon";
import { useInView, motion } from "framer-motion";

const container = {
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const main = {
  initial: {
    y: 70,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      ease: [0.6, 0.01, 0.05, 0.95],
      duration: 1.2,
    },
  },
};

const mainLine = {
  initial: {
    scale: 0,
  },
  animate: {
    scale: 1,
    transition: {
      ease: [0.6, 0.01, 0.05, 0.95],
      duration: 1.8,
    },
  },
};

const Footer = () => {
  const myref = useRef(null);
  const inView = useInView(myref, { once: true });

  return (
    <div className="snap-none md:snap-end w-full bg-gray-950 relative py-7 md:py-12 overflow-hidden">
      <motion.div
        ref={myref}
        variants={container}
        initial="initial"
        animate={inView ? "animate" : ""}
        className="container"
      >
        <motion.div variants={main} className="my-8 md:my-14">
          <h2 className="text-xl font-bold font-montserrat text-gray-100">
            homedaaia
          </h2>
        </motion.div>
        <motion.div
          variants={main}
          className="grid grid-cols-1 md:grid-cols-3 gap-10"
        >
          <div>
            <p className="paragraf max-w-sm text-gray-100">
              A architecture company is a business entity that specializes in
              the planning and design of buildings and the built environment. An
              architecture firm plays a central role in transforming ideas into
              concrete designs that can be realized as physical structures.
            </p>
          </div>

          <div className="flex justify-around my-10 md:my-0">
            <div className="space-y-5">
              <p className="paragraf font-semibold text-gray-100">Quick Link</p>
              <nav className="paragraf text-gray-100 flex flex-col space-y-2">
                <span>Home</span>
                <span>About Us</span>
                <span>Service</span>
                <span>Blogs</span>
                <span>Contact</span>
              </nav>
            </div>

            <div className="space-y-5">
              <p className="paragraf font-semibold text-gray-100">Useful</p>
              <nav className="paragraf text-gray-100 flex flex-col space-y-2">
                <span>Privacy Policy</span>
                <span>Projects</span>
                <span>Legal</span>
                <span>FAQ</span>
              </nav>
            </div>
          </div>

          <div className="flex flex-col">
            <label className="paragraf font-semibold text-gray-100">
              Gets Lates Informations
            </label>
            <input
              type="email"
              id="email"
              placeholder="example@gmail.com"
              className="focus:outline-none border-b-2 border-orange-500 py-4 paragraf text-gray-100 bg-transparent w-full"
            />
            <button className="w-full p-3 border border-orange-800 text-gray-100 mt-5 bg-orange-500">
              subscribe
            </button>
          </div>
        </motion.div>

        <motion.div
          variants={mainLine}
          className="w-full h-[1.5px] rounded-full bg-gray-400 mt-10 mb-8"
        />

        <motion.div
          variants={main}
          className="grid md:grid-cols-2 space-y-5 md:space-y-0"
        >
          <div className="place-self-center md:place-self-start flex items-center">
            <Link
              to="https://dribbble.com/shots/19022813-Homely-Architecture-Landing-Page"
              target="_blank"
              className="text-gray-100 paragraf"
            >
              @ 2023 Copyright ~ Inspirations Design
            </Link>
          </div>

          <div className="place-self-center md:place-self-end">
            <div className="flex space-x-7 justify-center items-center">
              <Facebook />
              <Twitter />
              <Youtube />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Footer;
