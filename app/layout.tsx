"use client";
import { useRef, useState } from "react";
import Header from "@/components/Header";
import "./globals.scss";
import styles from "./layout.module.scss";
import Footer from "@/components/Footer";
import Scrollbar from "@/components/Scrollbar";
import Intro from "@/components/Intro";
import { lato, caveat } from "./fonts";

const links = [
  { href: "/", label: "Who Am I", index: 0 },
  { href: "/jobs", label: "Jobs", index: 1 },
  { href: "/projects", label: "Projects", index: 2 },
  { href: "/skills", label: "Skills", index: 3 },
  { href: "/contact-me", label: "Contact Me", index: 4 },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activeSlide, setActiveSlide] = useState(() => 0);
  const [isIntroEnd, setIsIntroEnd] = useState(false);
  const contianerRef = useRef<any>(null!);

  // After intro end
  function introEndHandler() {
    contianerRef.current.style.opacity = "0";

    setTimeout(() => {
      setIsIntroEnd(true);
      contianerRef.current.style.opacity = "1";
    }, 1000);
  }

  return (
    <html lang="en">
      <body
        ref={contianerRef}
        className={`${caveat.variable} ${lato.variable}`}>
        {!isIntroEnd ? (
          <Intro callback={introEndHandler} />
        ) : (
          <div className={styles["main-container"]}>
            <Header
              links={links}
              activeLink={links[activeSlide]}
              setActiveLink={setActiveSlide}
            />
            <div className={`${styles["_container"]}`}>
              {children}

              <Scrollbar
                activeSlide={activeSlide}
                setActiveSlide={setActiveSlide}
                slidesCount={links.length}
              />
            </div>
            {/* <Footer /> */}
          </div>
        )}
      </body>
    </html>
  );
}
