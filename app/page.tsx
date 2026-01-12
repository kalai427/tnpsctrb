import Link from 'next/link';
import styles from './page.module.css';

const streams = [
  { id: 'std-10', title: '10th Standard', icon: '📖', desc: 'Samacheer Kalvi Books & Notes' },
  { id: 'std-11', title: '11th Standard', icon: '📘', desc: 'Subject-wise Study Materials' },
  { id: 'std-12', title: '12th Standard', icon: '🎓', desc: 'Board Exam Preparation Kit' },
  { id: 'tnpsc', title: 'TNPSC Exam', icon: '🏛️', desc: 'Group 1, 2, 4 & VAO Coaching' },
  { id: 'tet', title: 'TET Exam', icon: '👩‍🏫', desc: 'Teacher Eligibility Test Material' },
  { id: 'trb', title: 'TRB Exam', icon: '📝', desc: 'Secondary & PG Assistant Exams' },
];

const subjects = [
  { name: 'Tamil', icon: '📖' },
  { name: 'English', icon: '📝' },
  { name: 'Maths', icon: '🔢' },
  { name: 'Science', icon: '🔬' },
  { name: 'Social Science', icon: '🌍' },
  { name: 'Physics', icon: '⚛️' },
  { name: 'Chemistry', icon: '🧪' },
  { name: 'Biology', icon: '🧬' },
];

const competitiveExams = [
  { name: 'TNPSC Group 1', mcqs: '2,500+', notes: '150+', icon: '🏛️' },
  { name: 'TNPSC Group 2', mcqs: '3,200+', notes: '200+', icon: '🏛️' },
  { name: 'TNPSC Group 4', mcqs: '5,000+', notes: '350+', icon: '🏛️' },
  { name: 'VAO', mcqs: '1,800+', notes: '120+', icon: '🏘️' },
  { name: 'TET Paper 1', mcqs: '2,100+', notes: '180+', icon: '📝' },
  { name: 'TET Paper 2', mcqs: '2,400+', notes: '190+', icon: '📖' },
  { name: 'TRB Secondary Teacher', mcqs: '1,500+', notes: '100+', icon: '👨‍🏫' },
  { name: 'TRB PG Assistant', mcqs: '2,000+', notes: '140+', icon: '👨‍🎓' },
  { name: 'TRB BT Assistant', mcqs: '1,800+', notes: '120+', icon: '🧑‍🏫' },
];

const latestUpdates = [
  { title: '12th Physics Vol-1 Samacheer Book', type: 'PDF', date: 'Jan 12, 2026', tag: 'New' },
  { title: 'TNPSC Group-4 General Tamil MCQ', type: 'MCQ', date: 'Jan 11, 2026', tag: 'Hot' },
  { title: '10th Maths Model Question Paper', type: 'Exam', date: 'Jan 10, 2026', tag: 'Trending' },
];

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroContent}>
            <div className={styles.heroLeft}>
              <h1 className={styles.heroTitle}>
                Free Learning Resources for Tamil Nadu Students & Teachers
              </h1>
              <p className={styles.heroSubtitle}>
                Textbooks, Notes, MCQs, Previous Year Questions and Exam Updates for 10th, 11th, 12th, TNPSC, TET and TRB — curated by experienced educators.
              </p>
              <Link href="#streams" className="btn btn-primary">Explore Study Materials</Link>
            </div>
            <div className={styles.heroRight}>
              {/* Professor Academy Visual Placeholder */}
              <div className={styles.visualAcademy}>
                <div className={styles.academyBox}>
                  <span style={{ fontSize: '5rem' }}>👨‍🏫</span>
                  <div className={styles.academyOverlay}>
                    <span className={styles.academyTag}>Academic Center</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 1) Choose Your Stream */}
      <section id="streams" className={styles.streamsSection}>
        <div className="container">
          <h2 className="section-title">Choose Your Stream</h2>
          <div className={styles.streamGrid}>
            {streams.map((stream) => (
              <Link key={stream.id} href={`/${stream.id}`} className={styles.streamCard}>
                <div className={styles.streamIcon}>{stream.icon}</div>
                <h3>{stream.title}</h3>
                <p>{stream.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 2) Subject Explorer */}
      <section className={styles.subjectSection}>
        <div className="container">
          <h2 className="section-title">Explore by Subject</h2>
          <div className={styles.subjectGrid}>
            {subjects.map((subject) => (
              <div key={subject.name} className={styles.subjectCard}>
                <div className={styles.subjectIcon}>{subject.icon}</div>
                <h3>{subject.name}</h3>
                <ul className={styles.contentTypeList}>
                  <li>Textbooks</li>
                  <li>Notes</li>
                  <li>MCQs</li>
                  <li>PYQs</li>
                  <li>Exam Updates</li>
                </ul>
                <button className={styles.viewSubjectBtn}>Access Materials</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3) Competitive Exams */}
      <section className={styles.competitiveSection}>
        <div className="container">
          <h2 className="section-title">Competitive Exam Zone</h2>
          <div className={styles.examGrid}>
            {competitiveExams.map((exam, index) => (
              <div key={index} className={styles.examCard}>
                <div className={styles.examHeader}>
                  <span className={styles.examIcon}>{exam.icon}</span>
                  <h3>{exam.name}</h3>
                </div>
                <div className={styles.examStats}>
                  <span><strong>{exam.mcqs}</strong> MCQs</span>
                  <span><strong>{exam.notes}</strong> Notes</span>
                </div>
                <button className={styles.prepBtn}>Start Preparation</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4) Why TNPSCTRBR */}
      <section className={styles.whySection}>
        <div className="container">
          <div className={styles.whyGrid}>
            <div className={styles.whyContent}>
              <h2 className={styles.whyTitle}>Why TNPSCTRB?</h2>
              <ul className={styles.whyList}>
                <li>
                  <span className={styles.check}>✓</span>
                  <div>
                    <strong>Samacheer Kalvi Aligned</strong>
                    <p>All school materials follow the latest SCERT Tamil Nadu syllabus.</p>
                  </div>
                </li>
                <li>
                  <span className={styles.check}>✓</span>
                  <div>
                    <strong>TNPSC, TET & TRB Focused</strong>
                    <p>Dedicated zones for every major competitive exam in Tamil Nadu.</p>
                  </div>
                </li>
                <li>
                  <span className={styles.check}>✓</span>
                  <div>
                    <strong>Free Access for All</strong>
                    <p>No subscriptions, no logins. Pure education for everyone.</p>
                  </div>
                </li>
                <li>
                  <span className={styles.check}>✓</span>
                  <div>
                    <strong>Updated Daily</strong>
                    <p>Our educators update content and news every single day.</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className={styles.trustedBox}>
              <div className={styles.trustStat}>
                <strong>50k+</strong>
                <span>Students & Teachers</span>
              </div>
              <p>Trusted across Tamil Nadu for quality study materials.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5) Latest Updates */}
      <section className={styles.updatesSection}>
        <div className="container">
          <h2 className="section-title">Latest Updates</h2>
          <div className={styles.updatesGrid}>
            {latestUpdates.map((update, index) => (
              <div key={index} className={styles.updateItem}>
                <div className={styles.updateBadge}>
                  <span className={`badge badge-${update.tag === 'New' ? 'success' : 'primary'}`}>{update.tag}</span>
                </div>
                <div className={styles.updateInfo}>
                  <h3>{update.title}</h3>
                  <div className={styles.updateMeta}>
                    <span>{update.type}</span>
                    <span className={styles.dot}>•</span>
                    <span>{update.date}</span>
                  </div>
                </div>
                <button className={styles.openBtn}>Open</button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
