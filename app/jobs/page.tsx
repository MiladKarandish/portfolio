'use client';

import { useState } from 'react';
import PageWrapper from '@/components/PageWrapper';
import styles from './jobs.module.scss';
import { motion } from 'framer-motion';

interface Job {
  id: number;
  title: string;
  role: string;
  date: string;
  keys: string[];
}

const jobs: Job[] = [
  {
    id: 1,
    title: 'Fortune Web Works',
    role: 'Front-End Developer',
    date: 'jun 2020, aug 2022',
    keys: [
      'Making reliable and efficient web apps.',
      'Deciding the tech stack of every project and reviewing code.',
      'Finding the best practices and creating, clean, easy to read and reusable components.',
    ],
  },
  {
    id: 2,
    title: 'Google',
    role: 'Front-End Developer',
    date: 'jun 2020, aug 2022',
    keys: [
      'Managing junior react developers.',
      'Developing reliable frontends which work perfectly with the APIs of electronic devices.',
      ' Working on an efficient workflow between frontend team, backend team and electronic engineers for achieving best results.',
    ],
  },
];

const Jobs = () => {
  const [activeJob, setactiveJob] = useState<Job>(jobs[0]);

  return (
    <PageWrapper>
      <div className={styles['_']}>
        <h1>Where I've Worked</h1>

        <div className={styles['_container']}>
          <ul className={styles['_list']}>
            {jobs.map((job) => (
              <li
                key={job.id}
                className={styles['_job']}
                style={{
                  color:
                    job.id === activeJob.id ? 'var(--text-active-color)' : '',
                }}
                onClick={() => setactiveJob(job)}>
                {job.id === activeJob.id && (
                  <motion.div
                    layoutId='projects-underline'
                    className={styles['underline']}
                  />
                )}

                {job.title}
              </li>
            ))}
          </ul>

          <div className={`has-scroll ${styles['_data']}`}>
            <div>
              <h2>{activeJob.role}</h2>
              <span> @ {activeJob.title}</span>
            </div>

            <div>
              <span>{activeJob.date}</span>
            </div>

            <ul>
              {activeJob.keys.map((key) => (
                <li key={key}>{key}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Jobs;
