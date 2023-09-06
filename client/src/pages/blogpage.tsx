import {
  motion,
  useInView,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef, useState } from "react";
import { Arrow } from "../assets/icon";

const dataBlogs = [
  {
    no: 1,
    img: "./images/blog1.jpg",
    title: "Something i nedd to tell you",
    desc: "Is a sentence that is used when someone wants to communicate an important or significant piece of information to another person. It implies that the speaker has something on their mind that they feel is important to share or discuss with the listener. This phrase is often used to preface a conversation or message that may contain news, advice, a confession, or any other kind of communication that the speaker believes is relevant or necessary for the listener to know. It reflects the speaker's intention to be open and honest in their communication with the other person",
  },
  {
    no: 2,
    img: "./images/blog2.jpg",
    title: "Are you doing the right way?",
    desc: "It is used to seek confirmation or clarification regarding the correctness of someone's actions, decisions, or behaviors. This question is often asked to ensure that one is on the right track and making the right choices in a particular context. It can be used in various situations, such as in discussions, evaluations, or when giving advice.",
  },
  {
    no: 3,
    img: "./images/blog3.jpg",
    title: "Why you should always first",
    desc: "Continuous learning is the cornerstone of personal and professional development. In a rapidly evolving world, where new technologies emerge, industries transform, and societal dynamics shift, the ability to acquire new knowledge and skills becomes increasingly vital. It is a lifelong journey that transcends formal education and extends into our everyday lives. Embracing a commitment to learning empowers individuals to stay adaptable and relevant in their careers, seize opportunities for growth, and contribute to innovation and progress in their respective fields. Furthermore, continuous learning fosters personal growth by encouraging curiosity, critical thinking, and a deeper understanding of the world. It fuels creativity and enhances problem-solving abilities, enabling individuals to address challenges with resilience and ingenuity. ",
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
      ease: [0.25, 1, 0.5, 1],
      duration: 0.8,
    },
  },
};

const reveal = {
  initial: {
    y: "100%",
  },
  animate: {
    y: 0,
    transition: {
      ease: [0.25, 1, 0.5, 1],
      duration: 1.2,
      delay: 1.2,
    },
  },
};

const mainReveal = {
  initial: {
    y: 200,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      ease: [0.25, 1, 0.5, 1],
      duration: 1.2,
      delay: 1.2,
    },
  },
};

const buttonReveal = {
  initial: {
    y: "100%",
  },
  animate: {
    y: 0,
    transition: {
      ease: [0.25, 1, 0.5, 1],
      duration: 1.2,
      delay: 2.4,
    },
  },
};

const bgopacity = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      ease: [0.25, 1, 0.5, 1],
      duration: 0.8,
    },
  },
};

const Blog = () => {
  const [readmore, setReadmore] = useState<number[]>([]);
  const readmoreHandler = (index: number) => {
    if (readmore.includes(index)) {
      setReadmore(readmore.filter((item) => item !== index));
    } else {
      setReadmore([...readmore, index]);
    }
  };

  //===================================================================

  const myref = useRef(null);
  const inView = useInView(myref, { once: true, margin: "-50%" });
  const { scrollYProgress } = useScroll({
    target: myref,
    offset: ["start end", "end start"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [-100, 400]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [100, 0, -300]);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.5, 0.7, 1],
    [0, 1, 1, 1, 0]
  );
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
      initial="hidden"
      animate={inView ? "show" : ""}
      id="blog"
      className="snap-none md:snap-start w-full min-h-[100vh] bg-gray-950 flex flex-col justify-between pt-5 pb-12 relative overflow-hidden"
    >
      <motion.div
        variants={bgopacity}
        className="w-full h-full bg-gray-100 top-0 left-0 absolute"
      />
      <motion.div style={{ x: letter }} className="hidden md:block absolute top-32 left-32">
        <h1 className="font-montserrat font-semibold text-[15vw] leading-10 text-gray-200 opacity-30">
          blogs
        </h1>
      </motion.div>
      <motion.div
        ref={myref}
        style={{ y: mainLine, opacity }}
        className="container"
      >
        <Title />
        <motion.div
          initial="initial"
          animate={inView ? "animate" : ""}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 relative"
        >
          {dataBlogs.map((data) => (
            <div key={data.no} className="relative">
              <div className="relative h-48 w-full overflow-hidden">
                <motion.div
                  variants={reveal}
                  className="absolute top-0 left-0 w-full h-full bg-opacity-50 bg-gray-950  z-[2]"
                />
                <motion.img
                  variants={reveal}
                  alt={data.title}
                  src={data.img}
                  className="relative object-cover object-center h-full w-full z[1]"
                />
                <motion.div
                  variants={buttonReveal}
                  className="absolute bottom-0 right-0 bg-orange-500 p-2 z-[3]"
                >
                  <Arrow />
                </motion.div>
              </div>
              <motion.div variants={mainReveal} className="overflow-hidden">
                <p className="font-poppins font-semibold uppercase text-base md:text-lg text-gray-950 mt-3 mb-5">
                  {data.title}
                </p>
                <p className="paragraf text-justify">
                  {readmore.includes(data.no)
                    ? data.desc
                    : `${data.desc.slice(0, 120)}...`}
                  <span
                    onClick={() => readmoreHandler(data.no)}
                    className="text-blue-500 cursor-pointer"
                  >
                    {readmore.includes(data.no) ? " read less" : " read more"}
                  </span>
                </p>
              </motion.div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const Title = () => {
  return (
    <div className="grid grid-cols-1 gap-24 text-gray-950 relative">
      <div className="flex flex-col lg:flex-row justify-between mt-10 mb-14">
        <div>
          <motion.h3 variants={main} className="h3">
            Our Blogs
          </motion.h3>
          <motion.h2 variants={main} className="h2 mt-5 mb-8">
            Set your Amazing <br />
            constuctions with us
          </motion.h2>
          <motion.p variants={main} className="paragraf max-w-xl">
            Our unwavering commitment to environmental responsibility and
            sustainability manifests in our eco-conscious construction
            practices, paving the way for eco-friendly structures that align
            with the principles of a greener future
          </motion.p>
        </div>
        <div className="mt-10 lg:mt-0">
          <button className="paragraf py-3 px-6 border border-gray-950">
            see all blogs
          </button>
        </div>
      </div>
    </div>
  );
};

export default Blog;
