'use client';
import { useState } from 'react';
import PageWrapper from '@/components/PageWrapper';
import styles from './jobs.module.scss';

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
      'Making reliable and efficient web apps.',
      'Deciding the tech stack of every project and reviewing code.',
      'Finding the best practices and creating, clean, easy to read and reusable components.',
    ],
  },
  {
    id: 3,
    title: 'Fucking Apple',
    role: 'Front-End Developer',
    date: 'jun 2020, aug 2022',
    keys: [
      'Making reliable and efficient web apps.',
      'Deciding the tech stack of every project and reviewing code.',
      'Finding the best practices and creating, clean, easy to read and reusable components.',
    ],
  },
];

const page = () => {
  const [active, setActive] = useState(null!);

  return (
    <PageWrapper>
      <div className={styles['_']}>
        <h1>Where I've Worked</h1>

        <ul className={styles['_jobs-list']}>
          {jobs.map((job) => (
            <li className={styles['_job']} key={job.id}>
              {job.title}
            </li>
          ))}
        </ul>
      </div>
    </PageWrapper>
  );
};

export default page;
