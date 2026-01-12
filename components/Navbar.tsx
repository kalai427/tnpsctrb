import Link from 'next/link';
import styles from './Navbar.module.css';

export default function Navbar() {
    return (
        <header className={styles.header}>
            {/* Top Bar */}
            <div className={styles.topBar}>
                <div className={styles.topBarContainer}>
                    <div className={styles.contactInfo}>
                        <span>📞 +91 7550100920</span>
                        <span>✉️ info@tnpsctrb.com</span>
                    </div>
                    <div className={styles.topActions}>
                        <div className={styles.socialIcons}>
                            <Link href="#">f</Link>
                            <Link href="#">t</Link>
                            <Link href="#">in</Link>
                            <Link href="#">y</Link>
                        </div>
                        <Link href="/planner" className={styles.plannerBtn}>
                            Check Our Annual Planner »
                        </Link>
                        <Link href="/auth" className={styles.authBtn}>
                            SIGN IN / SIGN UP »
                        </Link>
                    </div>
                </div>
            </div>

            {/* Main Nav */}
            <nav className={styles.navbar}>
                <div className={styles.navContainer}>
                    <Link href="/" className={styles.logo}>
                        TNPSCTRB<span>.</span>
                    </Link>
                    <div className={styles.navLinks}>
                        <Link href="/" className={styles.navLink}>Home</Link>
                        <Link href="/courses" className={styles.navLink}>Courses ▾</Link>
                        <Link href="/std-10" className={styles.navLink}>10th Std</Link>
                        <Link href="/std-11" className={styles.navLink}>11th Std</Link>
                        <Link href="/std-12" className={styles.navLink}>12th Std</Link>
                        <Link href="/exams" className={styles.navLink}>TNPSC / TET</Link>
                        <Link href="/blog" className={styles.navLink}>Blog</Link>
                    </div>
                    <div className={styles.navExtra}>
                        <div className={styles.cartIcon}>
                            🛒 <span className={styles.cartBadge}>0</span>
                        </div>
                        <button className={styles.mobileMenuBtn}>☰</button>
                    </div>
                </div>
            </nav>
        </header>
    );
}
