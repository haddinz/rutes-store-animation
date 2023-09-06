import {
  motion,
  useInView,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import { Building, Consulting, Furniture, Paint } from "../assets/icon";

const dataService = [
  {
    title: "Contruction Management",
    icon: <Building />,
    desc: "Construction managers plan all stages of the project, including budget setting, scheduling, and resource allocation. They also identify potential risks and develop mitigation strategies",
  },
  {
    title: "Interior Design",
    icon: <Paint />,
    desc: "Successful interior design projects are the result of close collaboration between designers and clients. Designers need to understand their clients' tastes, requirements, and budget constraints to create spaces that align with their vision",
  },
  {
    title: "Furniture Design",
    icon: <Furniture />,
    desc: "Designers often push the boundaries of creativity and innovation in furniture design. They may experiment with novel materials, manufacturing techniques, and design concepts to create unique and groundbreaking pieces",
  },
  {
    title: "Consulting Contruction",
    icon: <Consulting />,
    desc: "Consultants explore opportunities to optimize project value by identifying cost-effective alternatives for materials, methods, and design decisions while maintaining project quality and functionality",
  },
];

const container = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const main = {
  initial: {
    y: 100,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      ease: [0.25, 1, 0.5, 1],
      duration: 1.6,
    },
  },
};

const Service = () => {
  const myRef = useRef(null);
  const inView = useInView(myRef, { once: true, margin: "-50%" });
  const { scrollYProgress } = useScroll({
    target: myRef,
    offset: ["start end", "end start"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [-100, 400]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [100, 0, -200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);
  const letter = useSpring(x, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
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
      id="service"
      className="snap-none md:snap-start w-full min-h-[80vh] bg-gray-950 flex flex-col justify-between py-5 relative overflow-hidden"
    >
      <motion.div style={{ x: letter }} className="hidden md:block absolute top-24 left-14">
        <h1 className="font-montserrat font-semibold text-[15vw] leading-10 text-gray-900 opacity-30">
          service
        </h1>
      </motion.div>
      <motion.div ref={myRef} style={{ y: mainLine, opacity }} className="container">
        <motion.div variants={main} className="mt-28 mb-10">
          <h3 className="h3">Service</h3>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
          {dataService.map((data, index) => (
            <motion.div
              variants={main}
              key={index}
              className="flex flex-col text-gray-100 space-y-5"
            >
              <div className="md:h-32 space-y-2">
                <div>{data.icon}</div>
                <p className="font-poppins font-semibold uppercase text-base md:text-lg">
                  {data.title}
                </p>
              </div>
              <div>
                <p className="paragraf ">{data.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Service;
