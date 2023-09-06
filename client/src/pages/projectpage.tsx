import { useScroll, useTransform, motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Search } from "../assets/icon";

const dataProject = [
  {
    no: "01",
    title: "The tower of Space",
    img: "./images/project1.jpg",
    tag: "Building Project",
  },
  {
    no: "02",
    title: "residential area",
    img: "./images/project2.jpg",
    tag: "Building Project",
  },
  {
    no: "03",
    title: "Public Service Building",
    img: "./images/project3.jpg",
    tag: "Building Project",
  },
  {
    no: "04",
    title: "The Retro Hotel",
    img: "./images/project4.jpg",
    tag: "Building Project",
  },
];

const main = {
  initial: {
    y: 30,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      ease: [0.25, 1, 0.5, 1],
      duration: 1.6,
      delay: 1.8,
    },
  },
};

const reveal = {
  initial: {
    x: 0,
  },
  animate: {
    x: "100%",
    transition: {
      ease: [0.25, 1, 0.5, 1],
      duration: 1.6,
    },
  },
};

const mainImage = {
  hidden: {
    scale: 1,
    transition: {
      ease: [0.6, 0.01, 0.05, 0.95],
      duration: 1,
    },
  },
  show: {
    scale: 1,
    transition: {
      ease: [0.6, 0.01, 0.05, 0.95],
      duration: 1,
    },
  },
};

const mainIcon = {
  hidden: {
    scale: 0,
    transition: {
      ease: [0.6, 0.01, 0.05, 0.95],
      duration: 1,
    },
  },
  show: {
    scale: 1,
    transition: {
      ease: [0.6, 0.01, 0.05, 0.95],
      duration: 1,
    },
  },
};

const Project = () => {
  const myRef = useRef(null);
  const inView = useInView(myRef, { once: true, margin: "-50%" });
  const { scrollYProgress } = useScroll({
    target: myRef,
    offset: ["start end", "end start"],
  });
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.4, 0.5, 0.6, 1],
    [0, 1, 1, 1, 0]
  );

  return (
    <motion.div
      initial="initial"
      animate={inView ? "animate" : ""}
      className="snap-none md:snap-start w-full h-[100vh] bg-gray-950 py-5 relative overflow-hidden"
    >
      <div
        ref={myRef}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 h-full"
      >
        {dataProject.map((data) => (
          <motion.div
            key={data.no}
            style={{ opacity }}
            className="w-full h-full relative overflow-hidden"
          >
            <motion.div
              variants={reveal}
              className="absolute w-full h-full top-0 left-0 bg-gray-950 z-[5]"
            />
            <div className="w-full h-full absolute top-0 left-0 bg-gray-950 bg-opacity-80 p-5">
              <motion.h3 variants={main} className="h3">
                {data.no}
              </motion.h3>
              <motion.p
                variants={main}
                className="font-poppins font-semibold uppercase text-base md:text-lg text-gray-100 mt-3"
              >
                {data.title}
              </motion.p>
              <motion.div
                variants={mainImage}
                initial="hidden"
                whileHover="show"
                animate="hidden"
                className="w-full h-full flex justify-center items-center cursor-pointer"
              >
                <motion.span variants={mainIcon}>
                  <Search />
                </motion.span>
              </motion.div>
            </div>
            <motion.img
              alt={data.title}
              src={data.img}
              className="object-cover h-full w-full object-center"
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Project;
