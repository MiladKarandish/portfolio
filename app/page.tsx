'use client';
import { useRef, useState } from 'react';
import styles from './page.module.scss';
import PageWrapper from '@/components/PageWrapper';

export default function Home() {
  return (
    <PageWrapper>
      <main className={styles.main}>
        <div className={styles['_showcase']}>
          <h1>Milad Karandish</h1>
          <h2>Frton-End Developer</h2>
          <h3>JavaScript</h3>
        </div>
      </main>
    </PageWrapper>
  );
}
