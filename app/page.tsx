import Link from 'next/link';
import styles from './page.module.css';
import { supabase } from '@/lib/supabase';
import HomeContent from '@/components/HomeContent';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const isSupabaseConfigured = process.env.NEXT_PUBLIC_SUPABASE_URL &&
    !process.env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder');

  let posts: any[] = [];

  if (isSupabaseConfigured) {
    try {
      const { data: studyMaterials } = await supabase
        .from('study_materials')
        .select('*')
        .order('created_at', { ascending: false });

      posts = studyMaterials || [];
    } catch (err) {
      console.error('Supabase fetch error:', err);
    }
  } else {
    // Fallback for demo
    posts = [
      { id: 1, title: '12th Maths Volume 1 Full Guide 2026', subject: 'Maths', standard: 'std-12', created_at: new Date().toISOString(), download_count: 5420 },
      { id: 2, title: '10th Tamil Quarterly Exam Original Question Paper', subject: 'Tamil', standard: 'std-10', created_at: new Date().toISOString(), download_count: 3210 },
      { id: 3, title: '11th Physics Important 5 Mark Questions', subject: 'Physics', standard: 'std-11', created_at: new Date().toISOString(), download_count: 2150 },
      { id: 4, title: '12th English Way To Success Guide Full', subject: 'English', standard: 'std-12', created_at: new Date().toISOString(), download_count: 8900 },
      { id: 5, title: '10th Science Unit 5 Notes PDF', subject: 'Science', standard: 'std-10', created_at: new Date().toISOString(), download_count: 1200 },
    ];
  }

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Free Study Materials for <span className={styles.highlight}>10th, 11th & 12th</span> Students
          </h1>
          <p className={styles.heroSubtitle}>
            Download textbooks, question papers, notes & guides instantly.
            The most trusted educational portal for Tamil Nadu students.
          </p>
          <div className={styles.heroActions}>
            <a href="#std-10" className={`${styles.heroBtn} ${styles.btn10}`}>10th Standard</a>
            <a href="#std-11" className={`${styles.heroBtn} ${styles.btn11}`}>11th Standard</a>
            <a href="#std-12" className={`${styles.heroBtn} ${styles.btn12}`}>12th Standard</a>
          </div>
        </div>
      </section>

      <HomeContent initialPosts={posts} />
    </>
  );
}
