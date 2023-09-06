import { easeInOut, motion } from "framer-motion";

const container = {
  show: {
    transition: {
      staggerChildren: 1.2,
    },
  },
};

const containerLetter = {
  animate: {
    transition: {
      staggerChildren: 0.3,
      delayChildren: 2,
    },
  },
};

const animatebgwhite = {
  hidden: {
    y: "100%",
  },
  show: {
    y: 0,
    transition: {
      ease: [0.6, 0.01, 0.05, 0.95],
      duration: 1.6,
    },
  },
};

const animatebgdark = {
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
      duration: 1.6,
      delay: 4.4,
    },
  },
  exit: {
    opacity: 0,
  },
};

const animatebgletter = {
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
      duration: 1.6,
    },
  },
};

const letter = {
  initial: {
    y: 400,
  },
  animate: {
    y: 0,
    transition: {
      ease: easeInOut,
      duration: 1.2,
    },
  },
  exit: {
    opacity: 0,
  },
};

const Loader = ({ setLoader }: { setLoader: (value: boolean) => void }) => {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      onAnimationComplete={() => setLoader(false)}
      className="w-full h-[100vh] bg-gray-100 relative overflow-hidden"
    >
      <motion.div
        variants={animatebgwhite}
        className="w-full h-full absolute top-0 left-0 bg-gray-950"
      />

      <div className="absolute top-0 left-0 grid grid-cols-1 w-full h-full">
        <Letter text="daaia" />
        <LetterCenter text="daaia" layoutID="letter" />
        <Letter text="daaia" />
      </div>

      <motion.div
        variants={animatebgdark}
        className="w-full h-full absolute top-0 left-0 bg-gray-100"
      />
    </motion.div>
  );
};

const Letter = ({ text }: { text: string }) => {
  return (
    <div className="grid whitespace-nowrap font-semibold italic text-[12vw] leading-tight text-gray-100 overflow-hidden">
      <div className={`flex animate-left`}>
        <Separate words={text} />
        <Separate words={text} />
        <Separate words={text} />
        <Separate words={text} />
      </div>
    </div>
  );
};

const LetterCenter = ({
  text,
  layoutID,
}: {
  text: string;
  layoutID: string;
}) => {
  return (
    <>
      <div className="grid relative whitespace-nowrap italic font-semibold text-[12vw] leading-tight text-gray-950 overflow-hidden">
        <motion.div
          variants={animatebgletter}
          className="w-full h-full bg-gray-950p bg-gray-100 absolute top-0"
        />
        <div className={`flex z-10 animate-right`}>
          <Separate words={text} layoutID={layoutID} />
          <Separate words={text} layoutID={layoutID}/>
          <Separate words={text} layoutID={layoutID}/>
          <Separate words={text} layoutID={layoutID}/>
        </div>
      </div>
    </>
  );
};

const Separate = ({
  words,
  layoutID,
}: {
  words: string;
  layoutID?: string;
}) => {
  return (
    <div className="flex justify-center min-w-[100vw]">
      <motion.div
        variants={containerLetter}
        initial="initial"
        animate="animate"
        exit="exit"
        className="flex justify-around items-center w-full"
      >
        <motion.p variants={letter}>{words}</motion.p>
        <motion.p variants={letter} layoutId={layoutID}>
          {words}
        </motion.p>
        <motion.p variants={letter}>{words}</motion.p>
      </motion.div>
    </div>
  );
};

export default Loader;
