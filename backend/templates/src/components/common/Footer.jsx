import React from "react";
import { Link } from "react-router-dom";
import { FacebookIcon, InstagramIcon, TwitterIcon } from "./Icons";

const Footer = ({ darkMode }) => {
  return (
    <footer
      className={`transition-colors duration-300 ${
        darkMode ? "bg-slate-800 text-white" : "bg-gray-600 text-slate-100"
      }
      }`}
    >
      <div className="grid justify-center items-center text-center p-6 space-y-6">
        <ul className="flex flex-col md:flex-row md:space-x-12 space-y-4 md:space-y-0">
          <li>
            <a href="/" className="hover:text-slate-400">
              Inicio
            </a>
          </li>
          <li>
            <Link to="/Faq" className="hover:text-slate-400">
              FAQ
            </Link>
          </li>
          <li>
            <a
              href="mailto:Contacto@cookhub.com"
              className="hover:text-slate-400"
            >
              Contacto@cookhub.com
            </a>
          </li>
          <li>
            <a href="tel:+1234567890" className="hover:text-slate-400">
              +123 456 7890
            </a>
          </li>
        </ul>
        <div className="flex justify-center space-x-6">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
            <img src={FacebookIcon} alt="Facebook" className="h-6 w-6" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
          >
            <img src={TwitterIcon} alt="Twitter" className="h-6 w-6" />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <img src={InstagramIcon} alt="Instagram" className="h-6 w-6" />
          </a>
        </div>
        <div className="mt-6 border-t border-gray-600 pt-4 text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Cookhub. Todos los derechos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
