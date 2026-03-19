import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import "./styles/Navbar.css";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);
export let smoother: ScrollSmoother;

interface NavbarProps {
  isHomeView: boolean;
}

const Navbar = ({ isHomeView }: NavbarProps) => {
  const navigate = useNavigate();
  useEffect(() => {
    smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.7,
      speed: 1.7,
      effects: true,
      autoResize: true,
      ignoreMobileResize: true,
    });

    smoother.scrollTop(0);
    smoother.paused(true);

    let links = document.querySelectorAll(".header ul a");
    links.forEach((elem) => {
      let element = elem as HTMLAnchorElement;
      element.addEventListener("click", (e) => {
        if (window.innerWidth > 1024) {
          e.preventDefault();
          let elem = e.currentTarget as HTMLAnchorElement;
          let section = elem.getAttribute("data-href");
          smoother.scrollTo(section, true, "top top");
        }
      });
    });
    window.addEventListener("resize", () => {
      ScrollSmoother.refresh(true);
    });
  }, []);
  return (
    <>
      <div className="header">
        <a href="/#" className="navbar-title" data-cursor="disable">
          UK
        </a>
        <a
          href="mailto:umesh.kes123@gmail.com"
          className="navbar-connect"
          data-cursor="disable"
        >
          umesh.kes123@gmail.com
        </a>
        <ul>
          <li>
            <a
              data-href="#about"
              href="#about"
              onClick={(e) => {
                if (!isHomeView) {
                  e.preventDefault();
                  navigate("/");
                  setTimeout(() => {
                    smoother.scrollTo("#about", true, "top top");
                  }, 100);
                }
              }}
            >
              <HoverLinks text="ABOUT" />
            </a>
          </li>
          <li>
            <a
              data-href="#work"
              href="#work"
              onClick={(e) => {
                if (!isHomeView) {
                  e.preventDefault();
                  navigate("/");
                  setTimeout(() => {
                    smoother.scrollTo("#work", true, "top top");
                  }, 100);
                }
              }}
            >
              <HoverLinks text="WORK" />
            </a>
          </li>
          <li>
            <a
              data-href="#research"
              href="#research"
              onClick={(e) => {
                e.preventDefault();
                navigate("/research");
                // Scroll to top on research view
                window.scrollTo(0, 0);
              }}
            >
              <HoverLinks text="RESEARCH" />
            </a>
          </li>
          <li>
            <a
              data-href="#contact"
              href="#contact"
              onClick={(e) => {
                if (!isHomeView) {
                  e.preventDefault();
                  navigate("/");
                  setTimeout(() => {
                    smoother.scrollTo("#contact", true, "top top");
                  }, 100);
                }
              }}
            >
              <HoverLinks text="CONTACT" />
            </a>
          </li>
        </ul>
      </div>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
