import Link from 'next/link';
import styles from './page.module.css';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

const standards = [
  { id: 'std-10', title: '10th Standard', icon: '📚', color: '#0071e3' },
  { id: 'std-11', title: '11th Standard', icon: '🧬', color: '#14b8a6' },
  { id: 'std-12', title: '12th Standard', icon: '🎓', color: '#06b6d4' },
  { id: 'tnpsc', title: 'TNPSC', icon: '🏛️', color: '#8b5cf6' },
  { id: 'tet', title: 'TET', icon: '👨‍🏫', color: '#ec4899' },
];

const subjects = [
  { name: 'Tamil', books: 24, mcqs: 1200, icon: '📖' },
  { name: 'English', books: 18, mcqs: 950, icon: '📝' },
  { name: 'Maths', books: 32, mcqs: 2100, icon: '🔢' },
  { name: 'Science', books: 28, mcqs: 1800, icon: '🔬' },
  { name: 'Social Science', books: 22, mcqs: 1400, icon: '🌍' },
  { name: 'Physics', books: 16, mcqs: 1100, icon: '⚛️' },
  { name: 'Chemistry', books: 14, mcqs: 980, icon: '🧪' },
  { name: 'Biology', books: 19, mcqs: 1250, icon: '🧬' },
];

const contentFeed = [
  { title: '10th Tamil Book – New', type: 'Book', badge: 'New', icon: '📚' },
  { title: '12th Chemistry MCQs', type: 'MCQ', badge: 'Hot', icon: '🧪' },
  { title: 'TNPSC Group-4 Notes', type: 'Notes', badge: 'Popular', icon: '📝' },
  { title: 'TET Paper II - 2024', type: 'Exam', badge: 'Live', icon: '📋' },
];

export default async function Home() {
  const isSupabaseConfigured = process.env.NEXT_PUBLIC_SUPABASE_URL &&
    !process.env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder');

  let recentMaterials: any[] = [];

  if (isSupabaseConfigured) {
    try {
      const { data } = await supabase
        .from('study_materials')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(4);
      recentMaterials = data || [];
    } catch (err) {
      console.error('Supabase fetch error:', err);
    }
  }

  return (
    <>
      {/* Hero Section - Study Dashboard Style */}
      <section className={styles.hero}>
        <div className={styles.heroContainer}>
          <div className={styles.heroLeft}>
            <h1 className={styles.heroTitle}>
              Everything Tamil Nadu Students Need to Succeed
            </h1>
            <p className={styles.heroSubtitle}>
              Textbooks, Notes, MCQs, and Exam Updates for 10th, 11th, 12th, TNPSC & TET.
            </p>
            <div className={styles.heroButtons}>
              <Link href="#explore" className="btn btn-primary">Start Studying</Link>
              <Link href="/syllabus" className="btn btn-secondary">Browse Syllabus</Link>
            </div>
          </div>

          <div className={styles.heroRight}>
            <div className={styles.dashboardCard}>
              <div className={styles.dashboardHeader}>
                <h3>Your Study Dashboard</h3>
                <span className={styles.dashboardBadge}>Live</span>
              </div>

              <div className={styles.dashboardStats}>
                <div className={styles.statItem}>
                  <div className={styles.statIcon}>📚</div>
                  <div className={styles.statInfo}>
                    <div className={styles.statValue}>1,240+</div>
                    <div className={styles.statLabel}>Books</div>
                  </div>
                </div>
                <div className={styles.statItem}>
                  <div className={styles.statIcon}>❓</div>
                  <div className={styles.statInfo}>
                    <div className={styles.statValue}>15,000+</div>
                    <div className={styles.statLabel}>MCQs</div>
                  </div>
                </div>
              </div>

              <div className={styles.progressSection}>
                <div className={styles.progressItem}>
                  <div className={styles.progressHeader}>
                    <span>10th Maths</span>
                    <span>75%</span>
                  </div>
                  <div className={styles.progressBar}>
                    <div className={styles.progressFill} style={{ width: '75%' }}></div>
                  </div>
                </div>
                <div className={styles.progressItem}>
                  <div className={styles.progressHeader}>
                    <span>12th Physics</span>
                    <span>45%</span>
                  </div>
                  <div className={styles.progressBar}>
                    <div className={styles.progressFill} style={{ width: '45%' }}></div>
                  </div>
                </div>
              </div>

              <div className={styles.examBadges}>
                <div className={styles.examBadge}>🏆 TNPSC Ready</div>
                <div className={styles.examBadge}>✅ TET Prepared</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Smart Navigation Block */}
      <section className={styles.smartNav} id="explore">
        <div className="container">
          <h2 className={styles.sectionTitle}>Choose Your Path</h2>
          <div className={styles.standardPills}>
            {standards.map((std) => (
              <Link
                key={std.id}
                href={`/${std.id}`}
                className={styles.pill}
                style={{ '--pill-color': std.color } as any}
              >
                <span className={styles.pillIcon}>{std.icon}</span>
                <span className={styles.pillText}>{std.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Subject Explorer */}
      <section className={styles.subjectExplorer}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Subject Explorer</h2>
          <p className={styles.sectionSubtitle}>Browse study materials by subject</p>

          <div className={styles.subjectGrid}>
            {subjects.map((subject) => (
              <div key={subject.name} className={styles.subjectCard}>
                <div className={styles.subjectIcon}>{subject.icon}</div>
                <div className={styles.subjectInfo}>
                  <h3 className={styles.subjectName}>{subject.name}</h3>
                  <div className={styles.subjectMeta}>
                    <span>{subject.books} Books</span>
                    <span className={styles.dot}>•</span>
                    <span>{subject.mcqs} MCQs</span>
                  </div>
                </div>
                <button className={styles.subjectBtn}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Content Feed */}
      <section className={styles.contentFeed}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Latest Updates</h2>
          <p className={styles.sectionSubtitle}>Fresh content added daily</p>

          <div className={styles.feedGrid}>
            {(recentMaterials.length > 0 ? recentMaterials : contentFeed).map((item, index) => (
              <div key={index} className={styles.feedCard}>
                <div className={styles.feedIcon}>{item.icon || '📄'}</div>
                <div className={styles.feedContent}>
                  <div className={styles.feedHeader}>
                    <h3>{item.title}</h3>
                    <span className={`badge badge-${item.badge === 'New' ? 'success' : item.badge === 'Hot' ? 'primary' : 'info'}`}>
                      {item.badge || item.type}
                    </span>
                  </div>
                  <p className={styles.feedType}>{item.type}</p>
                </div>
                <button className={styles.feedBtn}>Open</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sticky Study Toolbar */}
      <div className={styles.studyToolbar}>
        <a href="https://t.me/tnpsctrb" target="_blank" rel="noopener noreferrer" className={styles.toolbarBtn} title="Join Telegram">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
          </svg>
        </a>
        <button className={styles.toolbarBtn} title="Download App">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
          </svg>
        </button>
        <button className={styles.toolbarBtn} title="Bookmark">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
          </svg>
        </button>
        <button className={styles.toolbarBtn} title="Help">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3M12 17h.01" />
          </svg>
        </button>
      </div>
    </>
  );
}
