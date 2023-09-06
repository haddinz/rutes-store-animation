import { Start } from "../assets/icon";

const fotoabout = [
  {
    alt: "review-about",
    image: "./images/a1.png",
  },
  {
    alt: "review-about",
    image: "./images/a2.png",
  },
  {
    alt: "review-about",
    image: "./images/a3.png",
  },
  {
    alt: "review-about",
    image: "./images/a4.png",
  },
  {
    alt: "review-about",
    image: "./images/a5.png",
  },
];

const Review = () => {
  return (
    <div className="snap-start w-full h-[100vh] relative bg-gray-100">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 h-full">
          <div className="flex justify-center flex-col space-y-5">
            <span className="title">Luxury Interior</span>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((index) => (
                <span key={index}>
                  <Start />
                </span>
              ))}
            </div>
            <span className="paragraf">Excellent 5000+ reviews</span>

            <div className="relative h-20">
              {fotoabout.map((data, index) => (
                <div
                  key={index}
                  className="absolute bottom-0"
                  style={{ left: `${index * 42}px` }}
                >
                  <img alt={data.alt} src={data.image} />
                </div>
              ))}
            </div>

            <div>
              <p className="paragraf max-w-xs">Peoples successsfully got</p>
              <p className="paragraf max-w-xs">this dream place</p>
            </div>
          </div>

          <div className="col-span-1 md:col-span-2 flex items-center">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
