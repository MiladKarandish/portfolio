'use client';

import { useState } from 'react';
import PageWrapper from '@/components/PageWrapper';
import styles from './projects.module.scss';
import { motion } from 'framer-motion';

interface Project {
  id: number;
  title: string;
  at?: string;
  techs: string[];
  description: string;
  keys?: string[];
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Canvas Selector',
    techs: [
      'Laravel',
      'Inertia',
      'React',
      'HTML Canvas',
      'Nginx',
      'Postgresql',
    ],
    description:
      'Aramesh organization is a Family Therapy clinic. The board wanted to turn a family assessment test that they had developed into a full-fledged web app. This project needed efficient approach and clarity in design for the therapists and practitioners to be able to employ the information derived from the te results in their practices and studies',
    keys: [
      'I developed a fully interactive chart package using canvas API.',
      'I used inertia.js to write single-page applications (SPA) using classic server-side routing and controllers.',
    ],
  },
  {
    id: 2,
    title: 'Google',
    techs: ['HTML', 'JavaScript'],
    description:
      'The main technologies are React, typescript, websockets, pwa and sass. We used WEBSOCKET to be able to live share the data about location, speed and much more in order to be able to monitor the drivers behavior and passengers security. We considered performance as a key substance in order to transfer enormous amount of data and render live location of drivers and their behavior. I worked hard on the workflow and communication between myself and other Front-End Developers, Back-End developers and designers in order to achieve the best performance and considering best practices',
  },
];

const Jobs = () => {
  const [activeProject, setactiveProject] = useState<Project>(projects[0]);

  return (
    <PageWrapper>
      <div className={`${styles['_']}`}>
        <h1>What I've Created</h1>

        <div className={styles['_container']}>
          <ul className={styles['_list']}>
            {projects.map((project) => (
              <li
                key={project.id}
                className={styles['_job']}
                style={{
                  color:
                    project.id === activeProject.id
                      ? 'var(--text-active-color)'
                      : '',
                }}
                onClick={() => setactiveProject(project)}>
                {project.id === activeProject.id && (
                  <motion.div
                    layoutId='jobs-underline'
                    className={styles['underline']}
                  />
                )}

                {project.title}
              </li>
            ))}
          </ul>

          <div className={`has-scroll ${styles['_data']}`}>
            <div>
              <h2>{activeProject.title}</h2>
            </div>

            <ul>
              {activeProject.techs &&
                activeProject.techs.map((tech) => <li key={tech}>{tech}</li>)}
            </ul>

            <div>
              <span>{activeProject.description}</span>
            </div>

            <ul>
              {activeProject.keys &&
                activeProject.keys.map((key) => <li key={key}>{key}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Jobs;
