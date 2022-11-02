import "./works.scss";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useState } from "react";

export default function Works() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const data = [
    {
      id: "1",
      icon: "./assets/globe.png",
      title: "Backend Development",
      desc: "Server-side development using Node.js, Typescript , MongoDB, PostgreSQL and MySQL",
      img: "assets/node.jpg",
    },
    {
      id: "2",
      icon: "./assets/mobile.png",
      title: "Frontend Development",
      desc: "Client-side Apps using React.js",
      img: "assets/OIP (2).jpg",
    },
  ];
  const handleClick = (way) => {
    way === "left"
      ? setCurrentSlide(currentSlide > 0 ? currentSlide - 1 : data.length - 1)
      : setCurrentSlide(currentSlide < data.length - 1 ? currentSlide + 1 : 0);
  };
  return (
    <div className="work" id="work">
      <div
        className="slider"
        style={{ transform: `translateX(-${currentSlide * 100}vw)` }}
      >
        {data.map((d) => (
          <div className="container">
            <div className="item">
              <div className="left">
                <div className="leftContainer">
                  <div className="imgContainer">
                    <img src={d.icon} alt="" />
                  </div>
                  <h2>{d.title}</h2>
                  <p>{d.desc}</p>
                  <span>Projects</span>
                </div>
              </div>
              <div className="right">
                <img src={d.img} alt="" />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="arrow left" onClick={() => handleClick("left")}>
        <ArrowBackIosIcon />
      </div>
      <div className="arrow right" onClick={() => handleClick("right")}>
        <ArrowForwardIosIcon />
      </div>
    </div>
  );
}
