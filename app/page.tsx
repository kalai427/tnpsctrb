import Link from 'next/link';
import styles from './page.module.css';
import { supabase } from '@/lib/supabase';
import QuickLinksClient from '@/components/QuickLinksClient';

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
  const isSupabaseConfigured = process.env.NEXT_PUBLIC_SUPABASE_URL &&
    !process.env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder');

  let posts: any[] = [];
  let links: any[] = [];

  if (isSupabaseConfigured) {
    try {
      const { data: recentPostsData } = await supabase
        .from('study_materials')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);

      posts = recentPostsData || [];

      const { data: quickLinks } = await supabase
        .from('quick_links')
        .select('*')
        .order('position', { ascending: true });

      links = quickLinks || [];
    } catch (err) {
      console.error('Supabase fetch error:', err);
    }
  } else {
    // Fallback posts for demonstration when Supabase is not connected
    posts = [
      { id: 1, title: '12th Maths Volume 1 Full Guide', subject: 'Maths', standard: 'std-12', created_at: new Date().toISOString() },
      { id: 2, title: '10th Tamil Quarterly Question Paper', subject: 'Tamil', standard: 'std-10', created_at: new Date().toISOString() },
    ];
  }

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroContainer}>
          <div className={styles.heroContent}>
            <div className={styles.heroBadge}>ADMISSION OPEN FOR 2026</div>
            <h1 className={styles.heroTitle}>
              Master Your Exams, <span className={styles.highlight}>Secure Your Future.</span>
            </h1>
            <p className={styles.heroSubtitle}>
              The No.1 Educational Portal for Tamil Nadu Students. Access premium Study Materials,
              Previous Year Question Papers, and expert Career Guidance all in one place.
            </p>
            <div className={styles.heroActions}>
              <Link href="/std-12" className={styles.enrollBtn}>
                Explore Materials 🖱️
              </Link>
            </div>
          </div>

          <div className={styles.heroImageContainer}>
            <img
              src="/student_with_books.png"
              alt="Student"
              className={styles.heroImage}
            />
          </div>
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
                10th Standard <span className={styles.badge}>Hot</span>
              </div>
              <QuickLinksClient links={links} category="std-10" />
            </div>

            <div className={styles.sidebarWidget}>
              <div className={styles.widgetTitle}>
                11th Standard <span className={styles.badge}>New</span>
              </div>
              <QuickLinksClient links={links} category="std-11" />
            </div>

            <div className={styles.sidebarWidget}>
              <div className={styles.widgetTitle}>
                12th Standard <span className={styles.badge}>Live</span>
              </div>
              <QuickLinksClient links={links} category="std-12" />
            </div>

            <div className={styles.sidebarWidget}>
              <div className={styles.widgetTitle}>
                Important Links
              </div>
              <QuickLinksClient links={links} category="other" />
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
