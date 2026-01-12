import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className="container">
                <div className={styles.footerGrid}>
                    <div className={styles.brandSection}>
                        <h2 className={styles.logo}>TNPSCTRB</h2>
                        <p className={styles.description}>
                            Official Professor Academy Portal for Tamil Nadu Students and Teachers.
                            Providing high-quality, free educational resources since 2024.
                        </p>
                        <div className={styles.socials}>
                            <a href="#" className={styles.socialLink}>Telegram</a>
                            <a href="#" className={styles.socialLink}>YouTube</a>
                        </div>
                    </div>

                    <div className={styles.linksSection}>
                        <div className={styles.linksCol}>
                            <h4>Standard Wise</h4>
                            <ul>
                                <li><Link href="/std-10">10th Standard</Link></li>
                                <li><Link href="/std-11">11th Standard</Link></li>
                                <li><Link href="/std-12">12th Standard</Link></li>
                            </ul>
                        </div>
                        <div className={styles.linksCol}>
                            <h4>Competitive</h4>
                            <ul>
                                <li><Link href="/exams/tnpsc">TNPSC Exams</Link></li>
                                <li><Link href="/exams/tet">TET Exam</Link></li>
                                <li><Link href="/exams/trb">TRB Exams</Link></li>
                            </ul>
                        </div>
                        <div className={styles.linksCol}>
                            <h4>Resource Hub</h4>
                            <ul>
                                <li><Link href="/downloads">Textbooks</Link></li>
                                <li><Link href="/syllabus">Syllabus</Link></li>
                                <li><Link href="/mcqs">MCQ Test</Link></li>
                            </ul>
                        </div>
                        <div className={styles.linksCol}>
                            <h4>Support</h4>
                            <ul>
                                <li><Link href="/about">About Us</Link></li>
                                <li><Link href="/contact">Contact</Link></li>
                                <li><Link href="/privacy">Privacy Policy</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className={styles.footerBottom}>
                    <p>© {new Date().getFullYear()} TNPSCTRB Academy. All Rights Reserved.</p>
                    <p className={styles.tagline}>Education for All — Free Public Portal</p>
                </div>
            </div>
        </footer>
    );
}
