import Link from 'next/link';
import styles from './page.module.css';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

const classes = [
  { id: 'std-10', title: '10th Standard', icon: '📚', desc: 'Samacheer Kalvi Guide & MCQ', color: '#0071e3' },
  { id: 'std-11', title: '11th Standard', icon: '🧬', desc: 'Subject-wise Notes & Books', color: '#14b8a6' },
  { id: 'std-12', title: '12th Standard', icon: '🎓', desc: 'Board Exam Preparation Kit', color: '#06b6d4' },
  { id: 'tnpsc', title: 'TNPSC Exams', icon: '🏛️', desc: 'Group 1, 2, 4 & VAO Notes', color: '#8b5cf6' },
  { id: 'tet', title: 'TET Exam', icon: '👨‍🏫', desc: 'Paper 1 & 2 Study Material', color: '#ec4899' },
];

const tabs = [
  { id: 'textbooks', label: '📘 Textbooks' },
  { id: 'notes', label: '📝 Notes' },
  { id: 'mcqs', label: '❓ MCQs' },
  { id: 'pyqs', label: '📄 Previous Year Questions' },
  { id: 'updates', label: '📢 Exam Updates' },
];

const competitiveExams = [
  { name: 'TNPSC Group 1', mcqs: '2,500+', notes: '150+', icon: '🥇' },
  { name: 'TNPSC Group 2', mcqs: '3,200+', notes: '200+', icon: '🥈' },
  { name: 'TNPSC Group 4', mcqs: '5,000+', notes: '350+', icon: '🥉' },
  { name: 'VAO', mcqs: '1,800+', notes: '120+', icon: '🏘️' },
  { name: 'TET Paper 1', mcqs: '2,100+', notes: '180+', icon: '📝' },
  { name: 'TET Paper 2', mcqs: '2,400+', notes: '190+', icon: '📖' },
];

const subjects = [
  { name: 'Tamil', books: 24, mcqs: 1200, notes: 85, icon: '📖' },
  { name: 'English', books: 18, mcqs: 950, notes: 60, icon: '📝' },
  { name: 'Maths', books: 32, mcqs: 2100, notes: 110, icon: '🔢' },
  { name: 'Science', books: 28, mcqs: 1800, notes: 95, icon: '🔬' },
  { name: 'Social Science', books: 22, mcqs: 1400, notes: 75, icon: '🌍' },
  { name: 'Physics', books: 16, mcqs: 1100, notes: 55, icon: '⚛️' },
  { name: 'Chemistry', books: 14, mcqs: 980, notes: 48, icon: '🧪' },
  { name: 'Biology', books: 19, mcqs: 1250, notes: 65, icon: '🧬' },
];

const contentFeed = [
  { title: '12th Physics Vol-1 Samacheer Book', type: 'PDF', subject: 'Physics', class: '12th', badge: 'New', icon: '📚' },
  { title: 'TNPSC Group-4 General Tamil MCQ', type: 'MCQ', subject: 'Tamil', class: 'TNPSC', badge: 'Hot', icon: '❓' },
  { title: '10th Maths All Chapter Formulas', type: 'Notes', subject: 'Maths', class: '10th', badge: 'Popular', icon: '📝' },
  { title: 'TET Paper II Official Hall Ticket', type: 'Exam', subject: 'General', class: 'TET', badge: 'Live', icon: '📢' },
];

export default async function Home() {
  const isSupabaseConfigured = process.env.NEXT_PUBLIC_SUPABASE_URL &&
    !process.env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder');

  let dbMaterials: any[] = [];

  if (isSupabaseConfigured) {
    try {
      const { data } = await supabase
        .from('study_materials')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(4);
      dbMaterials = data || [];
    } catch (err) {
      console.error('Supabase fetch error:', err);
    }
  }

  return (
    <>
      {/* Hero Section */}
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
              <Link href="#class-selection" className="btn btn-primary">Start Studying</Link>
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

      {/* 1) STUDENT CLASS SELECTION */}
      <section id="class-selection" className={styles.classSelection}>
        <div className="container">
          <h2 className={styles.sectionTitleCenter}>Choose Your Class</h2>
          <div className={styles.classGrid}>
            {classes.map((item) => (
              <Link
                key={item.id}
                href={`/${item.id}`}
                className={styles.classCard}
                style={{ '--accent-color': item.color } as any}
              >
                <div className={styles.classIcon}>{item.icon}</div>
                <h3 className={styles.classTitle}>{item.title}</h3>
                <p className={styles.classDesc}>{item.desc}</p>
                <div className={styles.classArrow}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 2) CONTENT TYPE NAVIGATION */}
      <div className={styles.tabContainer}>
        <div className="container">
          <div className={styles.tabBar}>
            {tabs.map((tab) => (
              <button key={tab.id} className={styles.tabItem}>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 3) COMPETITIVE EXAM ZONE */}
      <section className={styles.examZone}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Competitive Exam Preparation</h2>
            <Link href="/exams" className={styles.viewAll}>View All Exams →</Link>
          </div>
          <div className={styles.examGrid}>
            {competitiveExams.map((exam, index) => (
              <div key={index} className={styles.examCard}>
                <div className={styles.examIcon}>{exam.icon}</div>
                <div className={styles.examContent}>
                  <h3>{exam.name}</h3>
                  <div className={styles.examMeta}>
                    <span><strong>{exam.mcqs}</strong> MCQs</span>
                    <span className={styles.dot}>•</span>
                    <span><strong>{exam.notes}</strong> Notes</span>
                  </div>
                  <button className={styles.startBtn}>Start Preparation</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7) SUBJECT EXPLORER IMPROVEMENT */}
      <section className={styles.subjectExplorer}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Subject Explorer</h2>
          <p className={styles.sectionSubtitle}>Browse quality materials by subject</p>

          <div className={styles.subjectGrid}>
            {subjects.map((subject) => (
              <div key={subject.name} className={styles.subjectCard}>
                <div className={styles.subjectIcon}>{subject.icon}</div>
                <div className={styles.subjectInfo}>
                  <h3 className={styles.subjectName}>{subject.name}</h3>
                  <div className={styles.subjectMetaGrid}>
                    <div className={styles.metaItem}>
                      <span className={styles.metaValue}>{subject.books}</span>
                      <span className={styles.metaLabel}>Books</span>
                    </div>
                    <div className={styles.metaItem}>
                      <span className={styles.metaValue}>{subject.mcqs}</span>
                      <span className={styles.metaLabel}>MCQs</span>
                    </div>
                    <div className={styles.metaItem}>
                      <span className={styles.metaValue}>{subject.notes}</span>
                      <span className={styles.metaLabel}>Notes</span>
                    </div>
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

      {/* 4) SMART CONTENT FEED */}
      <section className={styles.contentFeed}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Latest Updates</h2>
          <p className={styles.sectionSubtitle}>Smart feed for quick learning</p>

          <div className={styles.feedGrid}>
            {contentFeed.map((item, index) => (
              <div key={index} className={styles.feedCard}>
                <div className={styles.feedIcon}>{item.icon}</div>
                <div className={styles.feedContent}>
                  <div className={styles.feedHeader}>
                    <h3>{item.title}</h3>
                    <span className={`badge badge-${item.badge === 'New' ? 'success' : item.badge === 'Hot' ? 'primary' : 'info'}`}>
                      {item.badge}
                    </span>
                  </div>
                  <div className={styles.feedMeta}>
                    <span className={styles.feedTag}>{item.type}</span>
                    <span className={styles.dot}>•</span>
                    <span className={styles.feedTag}>{item.subject}</span>
                    <span className={styles.dot}>•</span>
                    <span className={styles.feedTag}>{item.class}</span>
                  </div>
                </div>
                <button className={styles.feedBtn}>Open</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5) STUDENT TRUST & AUTHORITY */}
      <section className={styles.trustSection}>
        <div className="container">
          <div className={styles.trustGrid}>
            <div className={styles.trustContent}>
              <h2 className={styles.trustTitle}>Trusted by Tamil Nadu Students</h2>
              <p className={styles.trustSubtitle}>Thousands of students achieve their goals with TNPSCTRB every day.</p>
              <div className={styles.trustStats}>
                <div className={styles.statBox}>
                  <strong>50k+</strong>
                  <span>Students</span>
                </div>
                <div className={styles.statBox}>
                  <strong>15k+</strong>
                  <span>MCQs</span>
                </div>
                <div className={styles.statBox}>
                  <strong>1k+</strong>
                  <span>Books</span>
                </div>
              </div>
            </div>
            <div className={styles.trustFeatures}>
              <div className={styles.featureItem}>
                <div className={styles.featureIcon}>✅</div>
                <div className={styles.featureText}>Samacheer Kalvi Aligned</div>
              </div>
              <div className={styles.featureItem}>
                <div className={styles.featureIcon}>✅</div>
                <div className={styles.featureText}>Updated Daily Content</div>
              </div>
              <div className={styles.featureItem}>
                <div className={styles.featureIcon}>✅</div>
                <div className={styles.featureText}>TNPSC & TET Focused</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6) QUICK ACTION BAR (Right Side) */}
      <div className={styles.quickActions}>
        <a href="#" className={styles.actionItem} title="Join Telegram">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
          </svg>
        </a>
        <a href="#" className={styles.actionItem} title="Download App">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
          </svg>
        </a>
        <a href="#" className={styles.actionItem} title="Saved Items">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
          </svg>
        </a>
        <a href="#" className={styles.actionItem} title="Help">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3M12 17h.01" />
          </svg>
        </a>
      </div>
    </>
  );
}
