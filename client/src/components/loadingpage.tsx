import { easeInOut, motion } from "framer-motion";

const container = {
  show: {
    transition: {
      staggerChildren: 1.4,
    },
  },
};

const animatebg = {
  hidden: {
    scaleY: 0,
    transition: {
      ease: easeInOut,
    },
  },
  show: {
    scaleY: "100%",
    originY: "center",
    transition: {
      ease: [0.6, 0.01, 0.05, 0.95],
      duration: 1.2,
    },
  },
  exit: {
    scaleY: 0,
    originY: "bottom",
    transition: {
      ease: easeInOut,
    },
  },
};

const Loadingpage = ({
  setLoader,
}: {
  setLoader: (value: boolean) => void;
}) => {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      exit="exit"
      onAnimationComplete={() => setLoader(false)}
      className="w-full h-[100vh] relative overflow-hidden"
    >
      <motion.div
        variants={animatebg}
        layoutId="dark-bg"
        className="bg-gray-950 w-full h-full absolute top-0 left-0"
      />
    </motion.div>
  );
};

export default Loadingpage;
