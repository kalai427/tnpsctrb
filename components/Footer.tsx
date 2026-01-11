import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerContainer}>
                <div className={styles.column}>
                    <h3>About TNPSCTRB</h3>
                    <p style={{ color: '#94a3b8', lineHeight: '1.6' }}>
                        Your No.1 Educational Website for 10th, 11th, and 12th Standard Students in Tamil Nadu. We provide the latest study materials, question papers, and news.
                    </p>
                </div>
                <div className={styles.column}>
                    <h3>Quick Links</h3>
                    <ul>
                        <li><Link href="/std-10">10th Standard</Link></li>
                        <li><Link href="/std-11">11th Standard</Link></li>
                        <li><Link href="/std-12">12th Standard</Link></li>
                        <li><Link href="/tet">TET / TRB</Link></li>
                    </ul>
                </div>
                <div className={styles.column}>
                    <h3>Support</h3>
                    <ul>
                        <li><Link href="/contact">Contact Us</Link></li>
                        <li><Link href="/privacy">Privacy Policy</Link></li>
                        <li><Link href="/terms">Terms of Service</Link></li>
                        <li><Link href="/about">About Us</Link></li>
                    </ul>
                </div>
                <div className={styles.column}>
                    <h3>Connect</h3>
                    <ul>
                        <li><a href="#">Telegram Channel</a></li>
                        <li><a href="#">WhatsApp Group</a></li>
                        <li><a href="#">YouTube Channel</a></li>
                        <li><a href="#">Facebook Page</a></li>
                    </ul>
                </div>
            </div>
            <div className={styles.copyright}>
                © {new Date().getFullYear()} TNPSCTRB. All rights reserved. | <Link href="/admin" style={{ opacity: 0.5 }}>Admin Login</Link>
            </div>
        </footer>
    );
}
