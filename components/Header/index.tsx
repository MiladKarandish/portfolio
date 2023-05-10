'use client';
import Link from 'next/link';
import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import styles from './header.module.scss';
import { motion } from 'framer-motion';

interface link {
  href: string;
  label: string;
  index: number;
}

interface Props {
  links: link[];
  activeLink: link;
  setActiveLink: React.Dispatch<React.SetStateAction<number>>;
}

export default function Header({ links, activeLink, setActiveLink }: Props) {
  const pathName = usePathname();
  const router = useRouter();

  useEffect(() => {
    activeLink && router.push(activeLink.href);
  }, [activeLink, pathName]);

  return (
    <header className={styles['_']}>
      <span>EN</span>
      {links.map((link) => (
        <button key={link.href} onClick={() => setActiveLink(link.index)}>
          {link.href === pathName && (
            <motion.span layoutId='underline' className={styles['underline']} />
          )}
          {link.label}
        </button>
      ))}
    </header>
  );
}
