'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css';

const menuItems = [
    { label: 'Home', href: '/' },
    { label: '10th', href: '/std-10' },
    { label: '11th', href: '/std-11' },
    { label: '12th', href: '/std-12' },
    { label: 'TNPSC', href: '/exams/tnpsc' },
    { label: 'TET', href: '/exams/tet' },
    { label: 'TRB', href: '/exams/trb' },
    { label: 'MCQs', href: '/mcqs' },
    { label: 'Downloads', href: '/downloads' },
    { label: 'Exam News', href: '/exams/updates' },
];

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                <div className={styles.container}>
                    <Link href="/" className={styles.logo}>
                        <span className={styles.logoText}>TNPSCTRB</span>
                    </Link>

                    {/* Desktop Menu */}
                    <ul className={styles.menu}>
                        {menuItems.map((item) => (
                            <li key={item.label}>
                                <Link href={item.href} className={styles.menuLink}>
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* Right Side - Search Only */}
                    <div className={styles.actions}>
                        <div className={styles.searchBar}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="11" cy="11" r="8"></circle>
                                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                            </svg>
                            <input type="text" placeholder="Search materials..." className={styles.searchInput} />
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className={`${styles.menuBtn} ${isMenuOpen ? styles.active : ''}`}
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className={styles.mobileMenu}>
                        <ul className={styles.mobileMenuList}>
                            {menuItems.map((item) => (
                                <li key={item.label}>
                                    <Link
                                        href={item.href}
                                        className={styles.mobileMenuLink}
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </nav>
        </header>
    );
}
