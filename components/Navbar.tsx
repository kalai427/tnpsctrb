'use client';

import Link from 'next/link';
import { useState } from 'react';
import styles from './Navbar.module.css';

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
                        <li><Link href="/std-10">10th</Link></li>
                        <li><Link href="/std-11">11th</Link></li>
                        <li><Link href="/std-12">12th</Link></li>
                        <li><Link href="/tnpsc">TNPSC</Link></li>
                        <li><Link href="/tet">TET</Link></li>
                        <li><Link href="/downloads">Downloads</Link></li>
                        <li><Link href="/mcqs">MCQs</Link></li>
                    </ul>

                    {/* Right Side */}
                    <div className={styles.actions}>
                        <div className={styles.searchBar}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="11" cy="11" r="8" />
                                <path d="m21 21-4.35-4.35" />
                            </svg>
                            <input type="text" placeholder="Search..." />
                        </div>
                        <Link href="/login" className={styles.loginBtn}>Login</Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className={styles.menuBtn}
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
                        <Link href="/std-10" onClick={() => setIsMenuOpen(false)}>10th Standard</Link>
                        <Link href="/std-11" onClick={() => setIsMenuOpen(false)}>11th Standard</Link>
                        <Link href="/std-12" onClick={() => setIsMenuOpen(false)}>12th Standard</Link>
                        <Link href="/tnpsc" onClick={() => setIsMenuOpen(false)}>TNPSC</Link>
                        <Link href="/tet" onClick={() => setIsMenuOpen(false)}>TET</Link>
                        <Link href="/downloads" onClick={() => setIsMenuOpen(false)}>Downloads</Link>
                        <Link href="/mcqs" onClick={() => setIsMenuOpen(false)}>MCQs</Link>
                        <Link href="/login" onClick={() => setIsMenuOpen(false)} className={styles.mobileLogin}>Login</Link>
                    </div>
                )}
            </nav>
        </header>
    );
}
