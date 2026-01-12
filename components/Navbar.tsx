import Link from 'next/link';
import styles from './Navbar.module.css';

export default function Navbar() {
    return (
        <nav className={styles.navbar}>
            <div className={styles.navContainer}>
                <Link href="/" className={styles.logo}>
                    TNPSCTRB<span>.</span>
                </Link>
                <div className={styles.navLinks}>
                    <Link href="/" className={styles.navLink}>Home</Link>
                    <Link href="/news" className={styles.navLink}>News</Link>
                    <Link href="/std-10" className={styles.navLink}>10th Std</Link>
                    <Link href="/std-11" className={styles.navLink}>11th Std</Link>
                    <Link href="/std-12" className={styles.navLink}>12th Std</Link>
                    <Link href="/exams" className={styles.navLink}>TNPSC / TET</Link>
                    <Link href="/neet" className={styles.navLink}>NEET</Link>
                </div>
                <div className={styles.navExtra}>
                    <button className={styles.mobileMenuBtn}>☰</button>
                </div>
            </div>
        </nav>
    );
}
