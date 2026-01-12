import Link from 'next/link';
import styles from './page.module.css';
import { getLatestUpdates, getExamStats } from '@/lib/study-materials';

const streams = [
  { id: 'std-10', title: '10th Standard', icon: '📖', desc: 'Samacheer Kalvi Books & Notes' },
  { id: 'std-11', title: '11th Standard', icon: '📘', desc: 'Subject-wise Study Materials' },
  { id: 'std-12', title: '12th Standard', icon: '🎓', desc: 'Board Exam Preparation Kit' },
  { id: 'tnpsc', title: 'TNPSC Exam', icon: '🏛️', desc: 'Group 1, 2, 4 & VAO Coaching' },
  { id: 'tet', title: 'TET Exam', icon: '👩‍🏫', desc: 'Teacher Eligibility Test Material' },
  { id: 'trb', title: 'TRB Exam', icon: '📝', desc: 'Secondary & PG Assistant Exams' },
];

const subjects = [
  {
    name: 'Tamil',
    icon: '📖',
    items: [
      { type: 'Textbook', label: '📘 Textbooks', color: '#e6f0ff' },
      { type: 'Notes', label: '📝 Notes', color: '#f0fdf4' },
      { type: 'MCQ', label: '❓ MCQs', color: '#fff7ed' },
      { type: 'PYQ', label: '📄 PYQs', color: '#f5f3ff' },
      { type: 'Update', label: '📢 Updates', color: '#fdf2f8' }
    ]
  },
  {
    name: 'English',
    icon: '📝',
    items: [
      { type: 'Textbook', label: '📘 Textbooks', color: '#e6f0ff' },
      { type: 'Notes', label: '📝 Notes', color: '#f0fdf4' },
      { type: 'MCQ', label: '❓ MCQs', color: '#fff7ed' },
      { type: 'PYQ', label: '📄 PYQs', color: '#f5f3ff' },
      { type: 'Update', label: '📢 Updates', color: '#fdf2f8' }
    ]
  },
  {
    name: 'Maths',
    icon: '🔢',
    items: [
      { type: 'Textbook', label: '📘 Textbooks', color: '#e6f0ff' },
      { type: 'Notes', label: '📝 Notes', color: '#f0fdf4' },
      { type: 'MCQ', label: '❓ MCQs', color: '#fff7ed' },
      { type: 'PYQ', label: '📄 PYQs', color: '#f5f3ff' },
      { type: 'Update', label: '📢 Updates', color: '#fdf2f8' }
    ]
  },
  {
    name: 'Science',
    icon: '🔬',
    items: [
      { type: 'Textbook', label: '📘 Textbooks', color: '#e6f0ff' },
      { type: 'Notes', label: '📝 Notes', color: '#f0fdf4' },
      { type: 'MCQ', label: '❓ MCQs', color: '#fff7ed' },
      { type: 'PYQ', label: '📄 PYQs', color: '#f5f3ff' },
      { type: 'Update', label: '📢 Updates', color: '#fdf2f8' }
    ]
  },
  {
    name: 'Social Science',
    icon: '🌍',
    items: [
      { type: 'Textbook', label: '📘 Textbooks', color: '#e6f0ff' },
      { type: 'Notes', label: '📝 Notes', color: '#f0fdf4' },
      { type: 'MCQ', label: '❓ MCQs', color: '#fff7ed' },
      { type: 'PYQ', label: '📄 PYQs', color: '#f5f3ff' },
      { type: 'Update', label: '📢 Updates', color: '#fdf2f8' }
    ]
  },
  {
    name: 'Physics',
    icon: '⚛️',
    items: [
      { type: 'Textbook', label: '📘 Textbooks', color: '#e6f0ff' },
      { type: 'Notes', label: '📝 Notes', color: '#f0fdf4' },
      { type: 'MCQ', label: '❓ MCQs', color: '#fff7ed' },
      { type: 'PYQ', label: '📄 PYQs', color: '#f5f3ff' },
      { type: 'Update', label: '📢 Updates', color: '#fdf2f8' }
    ]
  },
  {
    name: 'Chemistry',
    icon: '🧪',
    items: [
      { type: 'Textbook', label: '📘 Textbooks', color: '#e6f0ff' },
      { type: 'Notes', label: '📝 Notes', color: '#f0fdf4' },
      { type: 'MCQ', label: '❓ MCQs', color: '#fff7ed' },
      { type: 'PYQ', label: '📄 PYQs', color: '#f5f3ff' },
      { type: 'Update', label: '📢 Updates', color: '#fdf2f8' }
    ]
  },
  {
    name: 'Biology',
    icon: '🧬',
    items: [
      { type: 'Textbook', label: '📘 Textbooks', color: '#e6f0ff' },
      { type: 'Notes', label: '📝 Notes', color: '#f0fdf4' },
      { type: 'MCQ', label: '❓ MCQs', color: '#fff7ed' },
      { type: 'PYQ', label: '📄 PYQs', color: '#f5f3ff' },
      { type: 'Update', label: '📢 Updates', color: '#fdf2f8' }
    ]
  },
];

export default async function Home() {
  // --- FETCH DATA FROM SUPABASE (STEP 1) ---
  const [latestUpdates, tnpscExams, tetExams, trbExams] = await Promise.all([
    getLatestUpdates(),
    getExamStats('TNPSC'),
    getExamStats('TET'),
    getExamStats('TRB')
  ]);

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
                Textbooks, Notes, MCQs, Previous Year Questions and Exam Updates for 10th, 11th, 12th, TNPSC, TET and TRB — curated by experienced educators. No hidden costs, pure academic focus.
              </p>
              <div className={styles.heroActions}>
                <Link href="#streams" className="btn btn-primary">Explore Study Materials</Link>
                <div className={styles.heroStats}>
                  <span>Samacheer Kalvi Aligned</span>
                  <span className={styles.dot}>•</span>
                  <span>Daily Updated</span>
                </div>
              </div>
            </div>
            <div className={styles.heroRight}>
              <div className={styles.heroImageContainer}>
                <img
                  src="/professor_hero.png"
                  alt="Professor teaching Tamil Nadu students in a library"
                  className={styles.heroImage}
                />
                <div className={styles.imageOverlay}>
                  <span>Academy Excellence</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Choose Your Stream */}
      <section id="streams" className={styles.streamsSection}>
        <div className="container">
          <h2 className={styles.sectionTitleLarge}>Choose Your Stream</h2>
          <div className={styles.streamGrid}>
            {streams.map((stream) => (
              <Link key={stream.id} href={`/${stream.id}`} className={styles.streamCard}>
                <div className={styles.streamIcon}>{stream.icon}</div>
                <h3>{stream.title}</h3>
                <p>{stream.desc}</p>
                <div className={styles.streamArrow}>→</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Subject Explorer */}
      <section className={styles.subjectSection}>
        <div className="container">
          <h2 className={styles.sectionTitleLarge}>Explore by Subject</h2>
          <p className={styles.sectionDesc}>Access all types of study materials for your subjects</p>
          <div className={styles.subjectGrid}>
            {subjects.map((subject) => (
              <div key={subject.name} className={styles.subjectCard}>
                <div className={styles.subjectHeader}>
                  <div className={styles.subjectIcon}>{subject.icon}</div>
                  <h3>{subject.name}</h3>
                </div>
                <div className={styles.subjectItems}>
                  {subject.items.map((item, idx) => (
                    <Link key={idx} href={`/subject/${subject.name.toLowerCase()}/${item.type.toLowerCase()}`} className={styles.subjectItemLink} style={{ backgroundColor: item.color }}>
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Competitive Exam Zone */}
      <section className={styles.competitiveSection}>
        <div className="container">
          <h2 className={styles.sectionTitleLarge}>Competitive Exam Preparation</h2>

          {/* TNPSC Group */}
          <div className={styles.examGroup}>
            <div className={styles.examGroupHeader}>
              <h3 className={styles.examGroupTitle}>TNPSC Exams</h3>
              <div className={styles.examLine}></div>
            </div>
            <div className={styles.examGrid}>
              {tnpscExams.map((exam, index) => (
                <div key={index} className={styles.examCard}>
                  <div className={styles.examHeader}>
                    <span className={styles.examIcon}>{exam.icon}</span>
                    <h3>{exam.name}</h3>
                  </div>
                  <div className={styles.examStats}>
                    <span><strong>{exam.mcqs}</strong> MCQs</span>
                    <span className={styles.dot}>•</span>
                    <span><strong>{exam.notes}</strong> Notes</span>
                  </div>
                  <button className={styles.prepBtn}>Start Preparation</button>
                </div>
              ))}
            </div>
          </div>

          {/* TET Group */}
          <div className={styles.examGroup}>
            <div className={styles.examGroupHeader}>
              <h3 className={styles.examGroupTitle}>TET Exams</h3>
              <div className={styles.examLine}></div>
            </div>
            <div className={styles.examGrid}>
              {tetExams.map((exam, index) => (
                <div key={index} className={styles.examCard}>
                  <div className={styles.examHeader}>
                    <span className={styles.examIcon}>{exam.icon}</span>
                    <h3>{exam.name}</h3>
                  </div>
                  <div className={styles.examStats}>
                    <span><strong>{exam.mcqs}</strong> MCQs</span>
                    <span className={styles.dot}>•</span>
                    <span><strong>{exam.notes}</strong> Notes</span>
                  </div>
                  <button className={styles.prepBtn}>Start Preparation</button>
                </div>
              ))}
            </div>
          </div>

          {/* TRB Exams Block - Requested Label */}
          <div className={styles.examGroup}>
            <div className={styles.examGroupHeader}>
              <h3 className={styles.examGroupTitle}>TRB Exams</h3>
              <div className={styles.examLine}></div>
            </div>
            <div className={styles.examGrid}>
              {trbExams.map((exam, index) => (
                <div key={index} className={styles.examCard}>
                  <div className={styles.examHeader}>
                    <span className={styles.examIcon}>{exam.icon}</span>
                    <h3>{exam.name}</h3>
                  </div>
                  <div className={styles.examStats}>
                    <span><strong>{exam.mcqs}</strong> MCQs</span>
                    <span className={styles.dot}>•</span>
                    <span><strong>{exam.notes}</strong> Notes</span>
                  </div>
                  <button className={styles.prepBtn}>Start Preparation</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why TNPSCTRBR */}
      <section className={styles.whySection}>
        <div className="container">
          <div className={styles.whyGrid}>
            <div className={styles.whyContent}>
              <h2 className={styles.whyTitle}>A Trusted Academic Resource</h2>
              <p className={styles.whyDesc}>Why thousands of students and teachers choose TNPSCTRB for their daily study.</p>
              <ul className={styles.whyList}>
                <li>
                  <div className={styles.check}>✓</div>
                  <div>
                    <strong>Government Syllabus Aligned</strong>
                    <p>All materials are mapped to Samacheer Kalvi standards for TN school education.</p>
                  </div>
                </li>
                <li>
                  <div className={styles.check}>✓</div>
                  <div>
                    <strong>Expert Curated Content</strong>
                    <p>Notes and MCQs are reviewed by academic professors and coaching experts.</p>
                  </div>
                </li>
                <li>
                  <div className={styles.check}>✓</div>
                  <div>
                    <strong>100% Free Access</strong>
                    <p>Public portal committed to providing quality education resources without any fees.</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className={styles.whyVisual}>
              <div className={styles.trustedSticker}>
                <strong>50,000+</strong>
                <span>Daily Learners</span>
              </div>
              <div className={styles.samacheerBadge}>
                Academy Certified Material
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Updates */}
      <section className={styles.updatesSection}>
        <div className="container">
          <h2 className={styles.sectionTitleLarge}>Latest Updates</h2>
          <div className={styles.updatesGrid}>
            {latestUpdates.map((update, index) => (
              <div key={index} className={styles.updateItem}>
                <div className={styles.updateTypeBadge} style={{ backgroundColor: update.badgeColor, color: update.textColor }}>
                  {update.type}
                </div>
                <div className={styles.updateInfo}>
                  <h3>{update.title}</h3>
                  <div className={styles.updateMeta}>
                    <span className={styles.metaTag}>{update.tag}</span>
                    <span className={styles.dot}>•</span>
                    <span>{update.date}</span>
                  </div>
                </div>
                <button className={styles.openBtn}>Open Full Content</button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
