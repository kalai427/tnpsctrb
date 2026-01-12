import Link from 'next/link';
import styles from './page.module.css';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

const categories = [
  { title: "10th Standard", icon: "📚", link: "/std-10" },
  { title: "11th Standard", icon: "🧬", link: "/std-11" },
  { title: "12th Standard", icon: "🎓", link: "/std-12" },
  { title: "TNPSC / TET", icon: "🏛️", link: "/exams" },
];

const newsUpdates = [
  "⚡ 10th Public Exam Hall Tickets available for download from next week.",
  "⚡ New syllabus for 9th Standard to be implemented next academic year.",
  "⚡ TET Paper II results announced.",
  "⚡ NEET 2026 Registration starts on Feb 1st."
];

export default async function Home() {
  const { data: recentPostsData } = await supabase
    .from('study_materials')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(5);

  const posts = recentPostsData || [];

  const { data: quickLinks } = await supabase
    .from('quick_links')
    .select('*')
    .order('position', { ascending: true });

  const links = quickLinks || [];

  return (
    <>
      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>Your Success Starts Here</h1>
        <p className={styles.heroSubtitle}>
          The No.1 Educational Portal for Tamil Nadu Students. Study Materials, Question Papers, and Career Guidance.
        </p>
        <div className={styles.searchBar}>
          <input type="text" placeholder="Search for '12th Maths Question Paper'..." className={styles.searchInput} />
        </div>
      </section>

      <div className={styles.tickerContainer}>
        <span className={styles.tickerLabel}>FLASH NEWS</span>
        <div className={styles.tickerText}>
          {newsUpdates.join(" — ")}
        </div>
      </div>

      <div className="container">
        <h2 className="section-title">Explore Categories</h2>
        <div className={styles.categories}>
          {categories.map((cat, index) => (
            <Link key={index} href={cat.link} className={styles.categoryCard}>
              <div className={styles.catIcon}>{cat.icon}</div>
              <div className={styles.catTitle}>{cat.title}</div>
            </Link>
          ))}
        </div>

        <div className={styles.mainGrid}>
          <div className="main-content">
            <h2 className="section-title">Latest Updates</h2>
            <div className={styles.postList}>
              {posts.map((post) => (
                <div key={post.id} className={styles.postCard}>
                  <div className={styles.dateBox}>
                    <span className={styles.dateDay}>{new Date(post.created_at).getDate()}</span>
                    <span className={styles.dateMonth}>{new Date(post.created_at).toLocaleString('default', { month: 'short' })}</span>
                  </div>
                  <div className={styles.postContent}>
                    <h3><Link href={post.link || '#'}>{post.title}</Link></h3>
                    <p>{post.subject} material for {post.standard.replace('std-', '')}th Standard.</p>
                  </div>
                </div>
              ))}
              {posts.length === 0 && <p>No updates available yet.</p>}
            </div>
          </div>

          <aside className={styles.sidebar}>
            <div className={styles.sidebarWidget}>
              <div className={styles.widgetTitle}>
                Quick Links <span className={styles.badge}>Hot</span>
              </div>
              <ul className={styles.linkList}>
                {links.map((link) => (
                  <li key={link.id}>
                    <a href={link.url}>{link.title}</a>
                  </li>
                ))}
                {links.length === 0 && (
                  <>
                    <li><Link href="#">10th/11th/12th Text Books</Link></li>
                    <li><Link href="#">Public Exam Time Table</Link></li>
                    <li><Link href="#">Lesson Plan 2026</Link></li>
                    <li><Link href="#">PTA Model Question Papers</Link></li>
                  </>
                )}
              </ul>
            </div>

            <div className={styles.sidebarWidget}>
              <div className={styles.widgetTitle}>
                For Teachers
              </div>
              <ul className={styles.linkList}>
                <li><Link href="#">EMIS Login</Link></li>
                <li><Link href="#">TNSED Schools App</Link></li>
                <li><Link href="#">Forms & Downloads</Link></li>
              </ul>
            </div>

            <div className={styles.sidebarWidget}>
              <div className={styles.widgetTitle}>Connect With Us</div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                Join 50,000+ students on our Telegram channel for instant updates.
              </p>
              <button className="btn btn-primary" style={{ marginTop: '1rem', width: '100%' }}>Join Telegram</button>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
