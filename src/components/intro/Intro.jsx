import "./intro.scss";
// import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { init } from "ityped";
import { useEffect, useRef } from "react";

export default function Intro() {
  const textRef = useRef();
  // useEffect(() => {
  //   init(textRef.current, {
  //     showCursor: false,
  //     backDelay: 1500,
  //     strings: [
  //       "Software Developer",
  //       "Backend Developer",
  //       "Frontend Developer",
  //     ],
  //   });
  // }, []);

  return (
    <div className="intro" id="intro">
      <div className="left">
        <div className="wrapper">
          <h3>Hi There, I'm</h3>
          <h1>Mr. Enyina Matthew</h1>
          <p>
            A Professional <span>Software Developer</span>
          </p>
          <div className="button">
            <button className="bl">
              <a href="#contact">Hire me</a>
            </button>
            <button className="br">
              <a href="#work">Work</a>
            </button>
          </div>
          <div className="down">
            <a href="#portfolio">
              <img src="assets/R.png" alt="" />
            </a>
          </div>
        </div>
      </div>

      <div className="right">
        <div className="imgContainer">
          <img src="assets/dp.jpg" alt="" />
        </div>
      </div>
    </div>
  );
}
