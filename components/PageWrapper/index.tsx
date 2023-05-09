'use client';
import { motion } from 'framer-motion';
import styles from './page-wrapper.module.scss';

interface Props {
  children: React.ReactNode;
}

export default function PageWrapper({ children }: Props) {
  return (
    <motion.div
      className={styles['_']}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}>
      {children}
    </motion.div>
  );
}
