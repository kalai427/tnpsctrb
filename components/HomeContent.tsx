'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import styles from '../app/page.module.css';

interface Material {
    id: number;
    title: string;
    subject: string;
    standard: string;
    created_at: string;
    download_count?: number;
    link?: string;
}

interface HomeContentProps {
    initialPosts: Material[];
}

const subjects = [
    { name: 'Tamil', icon: '📘' },
    { name: 'English', icon: '📗' },
    { name: 'Maths', icon: '📐' },
    { name: 'Physics', icon: '⚡' },
    { name: 'Chemistry', icon: '🧪' },
    { name: 'Biology', icon: '🧬' },
    { name: 'Computer', icon: '💻' },
    { name: 'History', icon: '🔍' },
];

export default function HomeContent({ initialPosts }: HomeContentProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedStandard, setSelectedStandard] = useState<'all' | 'std-10' | 'std-11' | 'std-12'>('all');
    const [selectedSubject, setSelectedSubject] = useState('all');
    const [previewId, setPreviewId] = useState<number | null>(null);

    const filteredPosts = useMemo(() => {
        return initialPosts.filter(post => {
            const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                post.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                post.standard.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesStandard = selectedStandard === 'all' || post.standard === selectedStandard;
            const matchesSubject = selectedSubject === 'all' || post.subject === selectedSubject;
            return matchesSearch && matchesStandard && matchesSubject;
        });
    }, [searchTerm, selectedStandard, selectedSubject, initialPosts]);

    const mostDownloaded = [...initialPosts].sort((a, b) => (b.download_count || 0) - (a.download_count || 0)).slice(0, 5);

    const renderClassSection = (std: 'std-10' | 'std-11' | 'std-12', title: string) => {
        const stdPosts = filteredPosts.filter(p => p.standard === std);

        return (
            <div className={styles.classSection} id={std}>
                <div className={styles.sectionHeader}>
                    <h2 className="section-title">{title}</h2>
                    <div className={styles.chipsContainer}>
                        <button
                            className={`chip ${selectedSubject === 'all' ? 'active' : ''}`}
                            onClick={() => setSelectedSubject('all')}
                        >
                            All Subjects
                        </button>
                        {subjects.map(s => (
                            <button
                                key={s.name}
                                className={`chip ${selectedSubject === s.name ? 'active' : ''}`}
                                onClick={() => setSelectedSubject(s.name)}
                            >
                                {s.icon} {s.name}
                            </button>
                        ))}
                    </div>
                </div>

                <div className={styles.featuredGrid}>
                    {stdPosts.length > 0 ? (
                        stdPosts.map(post => <PDFCard key={post.id} post={post} onPreview={() => setPreviewId(post.id)} />)
                    ) : (
                        <p style={{ color: 'var(--text-muted)' }}>No materials found matching your filters.</p>
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className="container">
            {/* Global Search */}
            <div className={styles.searchContainer}>
                <div className={styles.searchWrapper}>
                    <div className={styles.searchIcon}>🔍</div>
                    <input
                        type="text"
                        placeholder='Search across subjects like "12th Maths" or "10th Tamil"...'
                        className={styles.searchInput}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Quick Access Cards */}
            <div className={styles.quickCardsGrid}>
                <a href="#std-10" className={`${styles.quickCard} ${styles.std10Card}`}>
                    <span className={styles.cardIcon}>🟦</span>
                    <span className={styles.cardTitle}>10th Textbooks</span>
                </a>
                <a href="#std-11" className={`${styles.quickCard} ${styles.std11Card}`}>
                    <span className={styles.cardIcon}>🟩</span>
                    <span className={styles.cardTitle}>11th Textbooks</span>
                </a>
                <a href="#std-12" className={`${styles.quickCard} ${styles.std12Card}`}>
                    <span className={styles.cardIcon}>🟧</span>
                    <span className={styles.cardTitle}>12th Textbooks</span>
                </a>
                <Link href="/exams" className={`${styles.quickCard} ${styles.tnpscCard}`}>
                    <span className={styles.cardIcon}>🟥</span>
                    <span className={styles.cardTitle}>TNPSC / TRB</span>
                </Link>
                <Link href="/neet" className={`${styles.quickCard} ${styles.neetCard}`}>
                    <span className={styles.cardIcon}>🟪</span>
                    <span className={styles.cardTitle}>NEET Entrance</span>
                </Link>
            </div>

            {/* Most Downloaded */}
            <div className={styles.classSection}>
                <h2 className="section-title">🔥 Most Downloaded</h2>
                <div className={styles.featuredGrid}>
                    {mostDownloaded.map(post => <PDFCard key={post.id} post={post} onPreview={() => setPreviewId(post.id)} />)}
                </div>
            </div>

            {/* Class Sections */}
            {renderClassSection('std-10', '10th Standard')}
            {renderClassSection('std-11', '11th Standard')}
            {renderClassSection('std-12', '12th Standard')}

            {/* Trust Banner */}
            <div className={styles.trustBanner}>
                <h2>50,000+ Students Joined</h2>
                <p>Stay updated with the latest exam results and study materials on our Telegram channel.</p>
                <button className="btn btn-primary" style={{ marginTop: '2rem' }}>Join Telegram Community</button>
            </div>

            {/* PDF Beta Preview Modal */}
            {previewId && (
                <div className={styles.modalOverlay} onClick={() => setPreviewId(null)}>
                    <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                        <div className={styles.modalHeader}>
                            <h3>PDF Preview</h3>
                            <button className={styles.closeBtn} onClick={() => setPreviewId(null)}>×</button>
                        </div>
                        <div className={styles.modalBody}>
                            <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc', borderRadius: '8px' }}>
                                <div style={{ textAlign: 'center' }}>
                                    <p style={{ fontSize: '3rem' }}>📄</p>
                                    <p style={{ marginTop: '1rem', fontWeight: '600' }}>Preview logic for PDF goes here.</p>
                                    <p style={{ color: 'var(--text-muted)' }}>Integrating with Google Drive or local viewer...</p>
                                    <Link href="#" className="btn btn-primary" style={{ marginTop: '2rem' }}>Download Now</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function PDFCard({ post, onPreview }: { post: Material, onPreview: () => void }) {
    const isNew = new Date().getTime() - new Date(post.created_at).getTime() < 7 * 24 * 60 * 60 * 1000;

    return (
        <div className={styles.pdfCard} onClick={onPreview} style={{ cursor: 'pointer' }}>
            {isNew && <span className={styles.newBadge}>NEW</span>}
            <div className={styles.pdfHeader}>
                <span className={styles.pdfIcon}>📂</span>
                <div className={styles.pdfInfo}>
                    <h3>{post.title}</h3>
                    <span className={styles.subjectBadge}>{post.subject}</span>
                </div>
            </div>
            <div className={styles.metaInfo}>
                <div className={styles.downloadCount}>
                    <span>📥</span> {post.download_count?.toLocaleString() || '1.2k'} downloads
                </div>
            </div>
            <button className={styles.downloadBtn}>View PDF</button>
        </div>
    );
}
