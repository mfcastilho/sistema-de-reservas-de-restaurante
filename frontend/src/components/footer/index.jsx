import "./style.css";
import { FaGithub } from 'react-icons/fa';
import { FaLinkedin } from 'react-icons/fa';



const Footer = () => {
  return (
    <div className="footer">
      <div className="footer__container">
        <p className="footer--title">Developed by, Mario Frederico Castilho.</p>
        <div className="icons--box">
            <a target="_blank" rel="noopener noreferrer" href="https://github.com/mfcastilho">
                <FaGithub className="icon--styled" />
            </a>
            <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/mariofrederico">
                <FaLinkedin className="icon--styled" />
            </a>
        </div>
      </div>
    </div>
 
  );
};

export default Footer;
