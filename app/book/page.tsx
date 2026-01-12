'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './book.module.css';

const chapters = [
    { id: 1, title: 'Chapter 1: Number System', pages: '1-24' },
    { id: 2, title: 'Chapter 2: Algebra', pages: '25-56' },
    { id: 3, title: 'Chapter 3: Geometry', pages: '57-89' },
    { id: 4, title: 'Chapter 4: Mensuration', pages: '90-112' },
    { id: 5, title: 'Chapter 5: Statistics', pages: '113-145' },
];

const relatedBooks = [
    { title: '10th Maths Guide', subject: 'Maths' },
    { title: '10th Science Textbook', subject: 'Science' },
    { title: '10th Tamil Book', subject: 'Tamil' },
];

export default function BookViewPage() {
    const [activeChapter, setActiveChapter] = useState(1);

    return (
        <div className={styles.bookView}>
            <div className={styles.container}>
                {/* Header */}
                <div className={styles.header}>
                    <div className={styles.breadcrumb}>
                        <Link href="/">Home</Link>
                        <span>/</span>
                        <Link href="/std-10">10th Standard</Link>
                        <span>/</span>
                        <span>Maths Textbook</span>
                    </div>
                    <h1 className={styles.bookTitle}>10th Standard Mathematics Textbook</h1>
                    <p className={styles.bookMeta}>Tamil Nadu State Board • 2024 Edition</p>
                </div>

                {/* Split Screen Layout */}
                <div className={styles.splitLayout}>
                    {/* Left: PDF Viewer */}
                    <div className={styles.pdfViewer}>
                        <div className={styles.viewerHeader}>
                            <div className={styles.viewerControls}>
                                <button className={styles.controlBtn}>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M15 18l-6-6 6-6" />
                                    </svg>
                                </button>
                                <span className={styles.pageInfo}>Page 1 of 145</span>
                                <button className={styles.controlBtn}>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M9 18l6-6-6-6" />
                                    </svg>
                                </button>
                            </div>
                            <div className={styles.viewerActions}>
                                <button className={styles.actionBtn}>
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <circle cx="11" cy="11" r="8" />
                                        <path d="M21 21l-4.35-4.35M11 8v6M8 11h6" />
                                    </svg>
                                </button>
                                <button className={styles.actionBtn}>
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <circle cx="11" cy="11" r="8" />
                                        <path d="M21 21l-4.35-4.35M8 11h6" />
                                    </svg>
                                </button>
                                <button className={styles.actionBtn}>
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div className={styles.pdfContent}>
                            <div className={styles.pdfPlaceholder}>
                                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                                    <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
                                </svg>
                                <p>PDF Viewer</p>
                                <span>Book content will be displayed here</span>
                            </div>
                        </div>
                    </div>

                    {/* Right: Sidebar */}
                    <div className={styles.sidebar}>
                        {/* Chapter List */}
                        <div className={styles.sidebarSection}>
                            <h3 className={styles.sidebarTitle}>Chapters</h3>
                            <div className={styles.chapterList}>
                                {chapters.map((chapter) => (
                                    <button
                                        key={chapter.id}
                                        className={`${styles.chapterItem} ${activeChapter === chapter.id ? styles.active : ''}`}
                                        onClick={() => setActiveChapter(chapter.id)}
                                    >
                                        <div className={styles.chapterInfo}>
                                            <span className={styles.chapterTitle}>{chapter.title}</span>
                                            <span className={styles.chapterPages}>Pages {chapter.pages}</span>
                                        </div>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M9 18l6-6-6-6" />
                                        </svg>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className={styles.sidebarSection}>
                            <h3 className={styles.sidebarTitle}>Quick Actions</h3>
                            <div className={styles.actionButtons}>
                                <button className={styles.primaryBtn}>
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
                                    </svg>
                                    Download PDF
                                </button>
                                <button className={styles.secondaryBtn}>
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                    </svg>
                                    MCQs for this Chapter
                                </button>
                                <button className={styles.secondaryBtn}>
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
                                    </svg>
                                    Bookmark
                                </button>
                            </div>
                        </div>

                        {/* Related Books */}
                        <div className={styles.sidebarSection}>
                            <h3 className={styles.sidebarTitle}>Related Books</h3>
                            <div className={styles.relatedList}>
                                {relatedBooks.map((book, index) => (
                                    <Link key={index} href="#" className={styles.relatedItem}>
                                        <div className={styles.relatedIcon}>📚</div>
                                        <div className={styles.relatedInfo}>
                                            <span className={styles.relatedTitle}>{book.title}</span>
                                            <span className={styles.relatedSubject}>{book.subject}</span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
