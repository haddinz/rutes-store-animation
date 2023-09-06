import { useRef, useState, useEffect } from "react";
import {
  AnimatePresence,
  MotionValue,
  motion,
  useInView,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

const dataHomepage = [
  {
    id: 1,
    name: "homepage-building",
    img: "./images/homepage.jpg",
  },
  {
    id: 2,
    name: "homepage2-building",
    img: "./images/homepage1.jpg",
  },
  {
    id: 3,
    name: "homepage3-building",
    img: "./images/homepage2.jpg",
  },
  {
    id: 4,
    name: "homepage4-building",
    img: "./images/homepage3.jpg",
  },
];

const container = {
  show: {
    transition: {
      staggerChildren: 0.4,
    },
  },
};

const titlehomepage = {
  initial: {
    y: 100,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 1.8,
      ease: [0.6, 0.01, 0.05, 0.95],
    },
  },
};

const numberhomepage = {
  hidden: {
    y: 100,
  },
  show: {
    y: 0,
    transition: {
      duration: 2.2,
      ease: [0.6, 0.01, 0.05, 0.95],
    },
  },
};

const linehomepage = {
  hidden: {
    scaleY: 0,
  },
  show: {
    scaleY: 1,
    originY: "bottom",
    transition: {
      duration: 2.4,
      ease: [0.6, 0.01, 0.05, 0.95],
    },
  },
};

const bghomepage = {
  initial: {
    scale: 1.3,
    opacity: 0,
  },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 1.4,
      ease: [0.6, 0.01, 0.05, 0.95],
      delay: 0.6,
    },
  },
  exit: {
    scale: 1.2,
    opacity: 0,
    transition: {
      duration: 0.6,
      ease: [0.6, 0.01, 0.05, 0.95],
    },
  },
};

const Homepage = () => {
  const [count, setCount] = useState<number>(0);
  useEffect(() => {
    const timeOut = setInterval(() => {
      if (count >= dataHomepage.length - 1) {
        setCount(0);
      } else setCount(count + 1);
    }, 5000);

    return () => clearInterval(timeOut);
  }, [count]);

  //==================================================================

  const myref = useRef(null);
  const inView = useInView(myref, { once: true, margin: "-50%" });
  const { scrollYProgress } = useScroll({
    target: myref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0, 0]);
  const headline = useSpring(y, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <AnimatePresence>
      <motion.div
        key="homepage"
        ref={myref}
        id="home"
        variants={container}
        initial="hidden"
        animate={inView ? "show" : " "}
        exit="exit"
        className="snap-none md:snap-center w-full h-[100vh] relative bg-gray-950 flex flex-col justify-between"
      >
        <div className="container">
          <Head count={count} opacity={opacity} headline={headline} />
        </div>
        <div className="w-full h-full flex justify-center items-center absolute top-0 left-0 overflow-hidden">
          <div className="w-full h-full">
            <div className="w-full h-full bg-gray-950 bg-opacity-70 absolute top-0 left-0 z-[2]" />
            <AnimatePresence>
              <motion.div
                key={dataHomepage[count].id}
                variants={bghomepage}
                initial="initial"
                animate="animate"
                exit="exit"
                className="z-[1] h-full w-full overflow-hidden"
              >
                <motion.img
                  alt={dataHomepage[count].name}
                  src={dataHomepage[count].img}
                  className="object-cover h-full w-full object-center"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

const Head = ({
  count,
  opacity,
  headline,
}: {
  count: number;
  opacity: MotionValue;
  headline: MotionValue;
}) => {
  return (
    <div className="w-full h-full z-[3] relative">
      <div className="grid grid-cols-4 h-full items-center lg:items-end">
        <motion.div
          initial="initial"
          animate="animate"
          style={{ opacity, y: headline }}
          className="lg:mb-20 col-span-3"
        >
          <motion.h3 variants={titlehomepage} className="h3">
            architecture
          </motion.h3>
          <Reveal text="Setting the Right" />
          <Reveal text="Standart in Concrete" />
          <Reveal text="Constructions" />
        </motion.div>
        <div className="lg:mb-20 flex flex-col items-end">
          <div className="flex flex-col justify-center items-center space-y-5">
            {["01", "02", "03", "04"].map((data, index) => (
              <div key={index} className="overflow-hidden">
                <motion.div
                  variants={numberhomepage}
                  className={`h-6 w-6 flex justify-center items-center`}
                >
                  <p
                    className={`paragraf ${
                      index === count
                        ? "text-orange-500 font-semibold"
                        : " text-gray-100"
                    }`}
                  >
                    {data}
                  </p>
                </motion.div>
              </div>
            ))}
            <motion.div
              variants={linehomepage}
              className="w-1 h-36 bg-orange-100 bg-opacity-30 rounded-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const Reveal = ({ text }: { text: string }) => {
  return (
    <div>
      <motion.div
        variants={titlehomepage}
        className="flex title-homepage text-gray-100"
      >
        {text}
      </motion.div>
    </div>
  );
};

export default Homepage;
