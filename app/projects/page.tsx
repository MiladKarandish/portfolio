"use client";

import { Fragment, useEffect, useState } from "react";
import PageWrapper from "@/components/PageWrapper";
import styles from "./projects.module.scss";
import { motion } from "framer-motion";

interface Project {
  id: number;
  title: string;
  link: string;
  at?: string;
  techs: string[];
  description: string;
  keys?: string[];
}

const projects: Project[] = [
  {
    id: 1,
    title: "Image Cutter",
    link: "https://old-image-cutter.vercel.app/",
    techs: ["HTML Canvas", "JavaScript"],
    description:
      "A tool built with HTML Canvas that can be used to crop images. It’s mostly like cropper.js but I developed it from 0 to 100. the reason I built it over was first we didn’t want to relay on libraires that much and second we wanted something lighter.",
    keys: ["I developed it from 0 to 100", "No library used"],
  },
  {
    id: 2,
    title: "Guess game with bot",
    link: "https://guess-game-sigma.vercel.app/",
    techs: ["HTML", "CSS", "JavaScript"],
    description:
      "I got inspiration from an Android game to make this project(lingolish). I created it using React. It has 3 level hardness that can be choose. You and a bot will guess words until one of you guess the right word.",
  },
  {
    id: 3,
    title: "Cyber Dash",
    link: "https://cyber-react-sass.vercel.app/",
    techs: ["React", "Sass", "Chart.js"],
    description:
      "a website for scoring and showing NFTs. Technologies used in this project: Node.js, React, sass, Material UI, Chart.js.",
  },
];

const Jobs = () => {
  const [activeProject, setactiveProject] = useState<Project>(projects[0]);
  const [isSmallScreen, setsIsSmallScreen] = useState<boolean>(false);

  const projectDataRenderer = (project: Project) => {
    return (
      <>
        <h2 onClick={() => window.open(project.link, "_blank")}>
          {project.title}
        </h2>

        <ul className={styles["_techs"]}>
          {project.techs &&
            project.techs.map((tech) => <li key={tech}>{tech}</li>)}
        </ul>

        <span>{project.description}</span>

        <ul className={styles["_keys"]}>
          {project.keys && project.keys.map((key) => <li key={key}>{key}</li>)}
        </ul>
      </>
    );
  };

  useEffect(() => {
    const sizeHandler = () => {
      if (window.innerWidth <= 650) {
        setsIsSmallScreen(true);
      } else {
        setsIsSmallScreen(false);
      }
    };

    sizeHandler();

    window.addEventListener("resize", sizeHandler);

    return () => {
      window.removeEventListener("resize", sizeHandler);
    };
  }, []);

  return (
    <PageWrapper>
      <div className={`${styles["_"]}`}>
        <h1>What I've Created</h1>

        <div className={styles["_container"]}>
          <ul className={styles["_list"]}>
            {projects.map((project) => (
              <li
                key={project.id}
                className={styles["_job"]}
                style={{
                  color:
                    project.id === activeProject.id
                      ? "var(--text-active-color-2)"
                      : "",
                }}
                onClick={() => setactiveProject(project)}>
                {project.id === activeProject.id && (
                  <motion.div
                    layoutId="jobs-underline"
                    className={styles["underline"]}
                  />
                )}

                {project.title}
              </li>
            ))}
          </ul>

          <div className={`has-scroll ${styles["_data"]}`}>
            {!isSmallScreen
              ? projectDataRenderer(activeProject)
              : projects.map((project) => (
                  <Fragment key={project.id}>
                    {projectDataRenderer(project)}
                  </Fragment>
                ))}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Jobs;
