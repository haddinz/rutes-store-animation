import { useRef, useState } from "react";
import { Minus, Plus } from "../assets/icon";
import {
  AnimatePresence,
  motion,
  useInView,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

const faq = [
  {
    id: 1,
    no: "01",
    ques: "What is the difference between modern and traditional architecture?",
    answering:
      "Early check-in and late check-out are subject to availability. Please contact our front desk for requestsModern architecture typically features clean lines, minimalistic design, and the use of contemporary materials such as glass and steel. Traditional architecture, on the other hand, often draws inspiration from historical styles and incorporates classic design elements.",
  },
  {
    id: 2,
    no: "02",
    ques: "How long does it take to design and construct a building?",
    answering:
      "The timeline for designing and constructing a building can vary significantly depending on factors such as the project's size, complexity, and location. Smaller projects may take a few months, while large-scale developments can take several years",
  },
  {
    id: 3,
    no: "03",
    ques: "How can I hire an architect for my project?",
    answering:
      "To hire an architect, start by researching local architectural firms or individual architects. Review their portfolios, check references, and meet with potential architects to discuss your project's requirements and budget",
  },
  {
    id: 4,
    no: "04",
    ques: "What are some famous architectural landmarks in the world",
    answering:
      "There are many iconic architectural landmarks globally, including the Eiffel Tower in Paris, the Taj Mahal in India, the Sydney Opera House in Australia, and the Great Wall of China, to name just a few",
  },
  {
    id: 5,
    no: "05",
    ques: "Why is architectural design important?",
    answering:
      "Architectural design plays a crucial role in shaping the built environment. It determines the functionality, aesthetics, and sustainability of a structure. Good architectural design can enhance the quality of life, energy efficiency, and overall well-being of the occupants",
  },
];

const container = {
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const main = {
  hidden: {
    y: 100,
    opacity: 0,
  },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      ease: [0.6, 0.01, 0.05, 0.95],
      duration: 1.2,
    },
  },
};

const question = {
  hidden: {
    scaleY: 0,
  },
  show: {
    scaleY: 1,
    originY: "top",
    transition: {
      ease: [0.6, 0.01, 0.05, 0.95],
      duration: 1.2,
    },
  },
  exit: {
    scaleY: 0,
    transition: {
      ease: [0.6, 0.01, 0.05, 0.95],
      duration: 0.8,
    },
  },
};

const Accordion = () => {
  const [selected, setSelected] = useState<number | null>(null);
  const accordionHandler = (id: number) => {
    if (selected === id) {
      return setSelected(null);
    }
    setSelected(id);
  };

  //=======================================================================

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
  const mainLine = useSpring(y, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate={inView ? "show" : ""}
      exit="exit"
      className="snap-none md:snap-start w-full h-[100vh] relative bg-gray-950"
    >
      <motion.div
        ref={myref}
        style={{ y: mainLine, opacity }}
        className="container "
      >
        <div className="flex justify-center flex-col h-full text-gray-100 space-y-10">
          <motion.div variants={main} className="flex justify-center">
            <h2 className="h2">
              Frequently Asked <span className="text-orange-500">Question</span>
            </h2>
          </motion.div>

          <div className="space-y-7">
            {faq.map((data) => (
              <div key={data.id}>
                <motion.div
                  variants={main}
                  onClick={() => accordionHandler(data.id)}
                  className="w-full py-4 font-poppins text-sm md:text-base lg:text-lg font-semibold border-b-2 border-gray-100 flex justify-between items-center cursor-pointer"
                >
                  <div className="mr-10 flex space-x-3">
                    <p>{data.no}.</p>
                    <p>{data.ques}</p>
                  </div>
                  {selected === data.id ? <Minus /> : <Plus />}
                </motion.div>
                <AnimatePresence>
                  {selected === data.id && (
                    <motion.div
                      key={data.no}
                      variants={question}
                      className="p-7 bg-orange-900"
                    >
                      <p className="paragraf">{data.answering}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Accordion;
