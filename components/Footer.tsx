import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.footerTop}>
                    <div className={styles.brandCol}>
                        <h2 className={styles.footerLogo}>TNPSCTRB</h2>
                        <p className={styles.footerDescription}>
                            The official learning platform for Tamil Nadu school students and competitive exam aspirants.
                            Providing high-quality Samacheer Kalvi resources and expert guidance.
                        </p>
                        <div className={styles.socialButtons}>
                            <a href="#" className={styles.socialLink} aria-label="Telegram">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
                                </svg>
                            </a>
                            <a href="#" className={styles.socialLink} aria-label="YouTube">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    <div className={styles.linksGrid}>
                        <div className={styles.linksCol}>
                            <h4>Standard Wise</h4>
                            <ul>
                                <li><Link href="/std-10">10th Standard</Link></li>
                                <li><Link href="/std-11">11th Standard</Link></li>
                                <li><Link href="/std-12">12th Standard</Link></li>
                                <li><Link href="/syllabus">Lesson Plan</Link></li>
                            </ul>
                        </div>
                        <div className={styles.linksCol}>
                            <h4>Competitive</h4>
                            <ul>
                                <li><Link href="/exams/tnpsc">TNPSC Group 1, 2, 4</Link></li>
                                <li><Link href="/exams/tet">TET Paper 1 & 2</Link></li>
                                <li><Link href="/exams/calendar">Exam Calendar</Link></li>
                                <li><Link href="/mcqs">Online MCQ Test</Link></li>
                            </ul>
                        </div>
                        <div className={styles.linksCol}>
                            <h4>Resource Hub</h4>
                            <ul>
                                <li><Link href="/downloads">Textbooks Download</Link></li>
                                <li><Link href="/downloads/notes">Study Notes</Link></li>
                                <li><Link href="/downloads/pyq">Previous Year Question</Link></li>
                                <li><Link href="/downloads/form">Forms & Applications</Link></li>
                            </ul>
                        </div>
                        <div className={styles.linksCol}>
                            <h4>Support</h4>
                            <ul>
                                <li><Link href="/about">About Us</Link></li>
                                <li><Link href="/contact">Contact Support</Link></li>
                                <li><Link href="/privacy">Privacy Policy</Link></li>
                                <li><Link href="/terms">Terms & Conditions</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className={styles.footerBottom}>
                    <div className={styles.copyright}>
                        © {new Date().getFullYear()} TNPSCTRB Education Portal. All rights reserved.
                    </div>
                    <div className={styles.legalInfo}>
                        Designed for Tamil Nadu Students • Samacheer Kalvi Compliant
                    </div>
                </div>
            </div>
        </footer>
    );
}
