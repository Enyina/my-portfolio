import "./topbar.scss";
import AcUnitIcon from "@mui/icons-material/AcUnit";
// import  from '@mui/icons-material/Menu';

export default function Topbar({ openMenu, setOpenMenu }) {
  return (
    <div className={"topbar " + (openMenu && "active")}>
      <div className="wrapper">
        <div className="left">
          <a href="#intro" className="logo">
            <AcUnitIcon />
          </a>
          <h3>Matthew Enyina.</h3>
        </div>
        <div className="right">
          {/* <div className="inner"> */}
          <ul>
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="#portfolio">Portfolio</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
          </ul>

          <div className="menu" onClick={() => setOpenMenu(!openMenu)}>
            <span className="line1"></span>
            <span className="line2"></span>
            <span className="line3"></span>
          </div>
          {/* </div> */}
        </div>
      </div>
    </div>
  );
}
