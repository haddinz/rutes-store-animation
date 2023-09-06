import {
  useInView,
  motion,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import { useRef } from "react";

const container = {
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const main = {
  initial: {
    y: 70,
  },
  animate: {
    y: 0,
    transition: {
      ease: [0.6, 0.01, 0.05, 0.95],
      duration: 1.2,
    },
  },
};

const Contact = () => {
  const myref = useRef(null);
  const inView = useInView(myref, { once: true, margin: "-50%" });
  const { scrollYProgress } = useScroll({
    target: myref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [100, 0, -200]);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.4, 0.5, 0.6, 1],
    [0, 1, 1, 1, 0]
  );
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1]);
  const mainLine = useSpring(y, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      variants={container}
      initial="initial"
      animate={inView ? "animate" : ""}
      id="contact"
      className="snap-none md:snap-start w-full h-[80vh] bg-gray-950 bg-opacity-70 pt-5 pb-12 relative"
    >
      <motion.div
        ref={myref}
        style={{ y: mainLine, opacity }}
        className="container"
      >
        <div className="flex justify-center items-center flex-col h-full text-gray-100">
          <motion.h2 variants={main} className="h2">
            Let's work together
          </motion.h2>
          <motion.p
            variants={main}
            className="paragraf max-w-xl text-center mt-7 mb-16"
          >
            Let us know what you looking for in a agency. We'll take a look and
            see if this could be the start of something beautiful
          </motion.p>
          <motion.button
            variants={main}
            className="paragraf py-3 px-6 border-2 border-gray-100"
          >
            contact us
          </motion.button>
        </div>
      </motion.div>

      <div className="absolute top-0 left-0 h-full w-full -z-10 overflow-hidden">
        <motion.img
          style={{ scale }}
          alt="contact"
          src="./images/contact.jpg"
          className="object-cover object-center h-full w-full"
        />
      </div>
    </motion.div>
  );
};

export default Contact;

{
  /* <div className="grid grid-rows-2 md:grid-flow-col gap-5 bg-yellow-700">
          <div className="bg-red-700 h-20" />
          <div className="bg-yellow-700 h-20" />
          <div className="bg-green-700 h-full row-span-2" />
          <div className="bg-yellow-700 h-20" />
          <div className="bg-yellow-700 h-20" />
  </div> */
}
