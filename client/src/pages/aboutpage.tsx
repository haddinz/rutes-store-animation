import { useRef } from "react";
import {
  motion,
  useInView,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

const container = {
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const mainLine = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      ease: [0.25, 1, 0.5, 1],
      duration: 2.6,
    },
  },
};

const mainImage = {
  initial: {
    y: 100,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      ease: [0.25, 1, 0.5, 1],
      duration: 1.8,
    },
  },
};

const About = () => {
  const myRef = useRef(null);
  const inView = useInView(myRef, { once: true, margin: "-50%" });
  const { scrollYProgress } = useScroll({
    target: myRef,
    offset: ["start end", "end start"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [-100, 400]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [100, 0, -300]);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.4, 0.5, 0.6, 1],
    [0, 1, 1, 1, 0]
  );
  const letter = useSpring(x, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  const headline = useSpring(y, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      id="about"
      variants={container}
      initial="initial"
      animate={inView ? "animate" : ""}
      className="snap-none md:snap-start w-full h-[100vh] relative bg-gray-950 overflow-x-hidden no-scrollbar"
    >
      <motion.div
        style={{ x: letter }}
        className="hidden md:block absolute top-24 left-20"
      >
        <h1 className="font-montserrat font-semibold text-[15vw] leading-10 text-gray-900 opacity-30">
          about
        </h1>
      </motion.div>
      <motion.div
        ref={myRef}
        style={{ y: headline, opacity }}
        className="container"
      >
        <div className="grid grid-cols-1 gap-5 md:gap-24 text-gray-100 relative">
          <div className="flex flex-col lg:flex-row justify-between mt-28 mb-10">
            <motion.div>
              <motion.h3 variants={mainLine} className="h3">
                About Us
              </motion.h3>
              <motion.h2 variants={mainLine} className="h2 mt-5 mb-8">
                We are the leaders <br />
                in the constuctions industry
              </motion.h2>
              <motion.p variants={mainLine} className="paragraf max-w-xl">
                Our unwavering focus on innovation keeps us ahead of the curve.
                Whether it's adopting the latest technology or pioneering
                sustainable construction practices, we're dedicated to shaping
                the future of the industry. Our clients trust us to deliver not
                just buildings but also innovative solutions
              </motion.p>
            </motion.div>
            <div className="mt-10 lg:mt-0">
              <button className="paragraf py-3 px-6 border border-gray-100">
                see all projects
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-center relative">
            <div className="relative md:absolute md:top-5 md:left-0">
              <motion.div
                variants={mainImage}
                className="w-full h-full absolute top-0 left-0 bg-gray-950 bg-opacity-30 z-[3]"
              />
              <motion.img
                variants={mainImage}
                alt="bed-room"
                src="./images/about1.jpg"
                className="relative object-cover object-center h-60 w-[24rem] z-[2]"
              />
              <motion.div
                variants={mainImage}
                className="w-full h-full border-2 border-gray-800 absolute -top-16 left-36"
              />
            </div>

            <div className="relative md:absolute md:-top-20 md:left-[27vw] z-[4]">
              <motion.div
                variants={mainImage}
                className="w-full h-full absolute top-0 left-0 bg-gray-950 bg-opacity-30"
              />
              <motion.img
                variants={mainImage}
                alt="bed-room"
                src="./images/about2.jpg"
                className="object-cover object-center h-60 w-[24rem]"
              />
            </div>

            <div className="relative md:absolute md:top-20 md:right-0">
              <motion.div
                variants={mainImage}
                className="w-full h-full absolute top-0 left-0 bg-gray-950 bg-opacity-30 z-[3]"
              />
              <motion.img
                variants={mainImage}
                alt="bed-room"
                src="./images/about3.jpg"
                className="object-cover object-center h-60 w-[24rem] relative z-[2]"
              />
              <motion.div
                variants={mainImage}
                className="w-full h-full border-2 border-gray-800 absolute -top-8 -left-20"
              />
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default About;
