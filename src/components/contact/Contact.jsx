import { useState } from "react";
import "./contact.scss";
import GitHubIcon from "@mui/icons-material/GitHub";
import CallIcon from "@mui/icons-material/Call";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
// import { useForm } from "@formspree/react";

export default function Contact() {
  const [message, setMessage] = useState(false);
  // let [state, handleSubmit] = useForm("xwkzwqbk");
  // if (state.succeeded) {
  //   setMessage(true);
  // }
  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage(true);
  };

  return (
    <div className="contact" id="contact">
      <div className="left">
        <img src="assets/shake.svg" alt="" />
      </div>
      <div className="right">
        <h2>Contact.</h2>
        <form
          action="https://formspree.io/f/xwkzwqbk"
          method="POST"
          // onSubmit={handleSubmit}
        >
          <input type="email" name="Email" placeholder="Email" />
          <textarea name="message" placeholder="Message"></textarea>
          <button type="submit" onClick={(e) => handleSubmit}>
            Send
          </button>
          {message && <span>Thanks for reaching out, I'll reply ASAP 🙂</span>}
        </form>

        <div className="alt">
          <p>
            <a href="tel:+2348061313069">
              <CallIcon />
            </a>
          </p>
          <p>
            <a href="https://www.linkedin.com/in/enyina-matthew/">
              <LinkedInIcon />
            </a>
          </p>
          <p>
            <a href="https://github.com/Enyina">
              <GitHubIcon />
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
