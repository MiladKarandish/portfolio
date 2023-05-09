'use client';
import { useEffect, useState } from 'react';
import styles from './page.module.scss';
import PageWrapper from '@/components/PageWrapper';
import Image from 'next/image';
import githubIcon from '@/public/icons/github.svg';
import linkedinIcon from '@/public/icons/linkedin.svg';
import mailIcon from '@/public/icons/mail.svg';
import telegram from '@/public/icons/telegram.svg';

const techs = [
  'HTML',
  'CSS',
  'JavaScript',
  'React',
  'TypeScript',
  'Next',
  'Three',
];

const socials = [
  {
    href: 'https://github.com/MiladKarandish',
    label: 'github',
    icon: githubIcon,
  },
  {
    href: 'https://www.linkedin.com/in/miladkarandish',
    label: 'linkedin',
    icon: linkedinIcon,
  },
  { href: 'mailto:miladkaarandish@gmail.com', label: 'email', icon: mailIcon },
  {
    href: 'https://t.me/MiladKaarandish',
    label: 'telegram',
    icon: telegram,
  },
];

export default function Home() {
  const [tech, setTech] = useState(0);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      tech >= techs.length - 1 ? setTech(0) : setTech((prev) => prev + 1);
    }, 3000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [tech]);

  return (
    <PageWrapper>
      <main className={styles.main}>
        <div className={styles['_showcase']}>
          <h1>Milad Karandish</h1>
          <h2>Frton-End Developer</h2>

          {techs.map((item, index) => (
            <h3
              key={index}
              className={`${styles['_tech']} ${
                index === tech ? styles['active'] : ''
              } ${index === tech + 1 ? styles['next-active'] : ''}`}>
              {item}
            </h3>
          ))}
        </div>

        <div className={styles['_contact']}>
          {socials.map((social) => (
            <Image
              key={social.label}
              priority
              height={50}
              width={50}
              src={social.icon}
              alt={`contact me in ${social.label}`}
              onClick={() => window.open(social.href, '_blank')}
            />
          ))}
        </div>
      </main>
    </PageWrapper>
  );
}
