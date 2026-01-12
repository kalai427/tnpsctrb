'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './style.module.css';
import { SubjectSection, Material } from '@/lib/study-materials';

interface StandardClientPageProps {
    standard: string;
    displayStandard: string;
    subjectsData: SubjectSection[];
}

const filters = [
    { id: 'all', label: 'All Resources' },
    { id: 'textbook', label: '📘 Textbooks' },
    { id: 'notes', label: '📝 Notes' },
    { id: 'mcq', label: '❓ MCQs' },
    { id: 'pyq', label: '📄 PYQs' },
    { id: 'update', label: '📢 Exam News' },
];

export default function StandardClientPage({ standard, displayStandard, subjectsData }: StandardClientPageProps) {
    const [activeFilter, setActiveFilter] = useState('all');

    const filteredData = subjectsData.map(section => {
        const filteredMaterials = activeFilter === 'all'
            ? section.materials
            : section.materials.filter(m => m.type.toLowerCase() === activeFilter.toLowerCase());

        return {
            ...section,
            materials: filteredMaterials
        };
    }).filter(section => section.materials.length > 0);

    const getIconForType = (type: string) => {
        switch (type.toLowerCase()) {
            case 'textbook': return '📘';
            case 'notes': return '📝';
            case 'mcq': return '❓';
            case 'pyq': return '📄';
            default: return '📢';
        }
    };

    const getBadgeStyle = (type: string) => {
        switch (type.toLowerCase()) {
            case 'textbook': return { background: '#e0f2fe', color: '#0369a1' };
            case 'notes': return { background: '#f5f3ff', color: '#6d28d9' };
            case 'mcq': return { background: '#fef2f2', color: '#b91c1c' };
            case 'pyq': return { background: '#f0fdf4', color: '#15803d' };
            default: return { background: '#fdf2f8', color: '#be185d' };
        }
    };

    return (
        <div className={styles.pageWrapper}>
            {/* Academy Header */}
            <header className={styles.header}>
                <div className="container">
                    <div className={styles.headerContent}>
                        <div className={styles.breadcrumbs}>
                            <Link href="/" className={styles.breadcrumbLink}>Home</Link>
                            <span className={styles.breadcrumbSeparator}>/</span>
                            <span>{displayStandard}</span>
                        </div>
                        <h1 className={styles.title}>{displayStandard} Study Materials</h1>
                        <p className={styles.subtitle}>
                            Completely free Samacheer Kalvi aligned textbooks, master notes, and practice question papers curated by Tamil Nadu's top educators.
                        </p>
                    </div>
                </div>
            </header>

            {/* Sticky Filter Bar */}
            <nav className={styles.filterBar}>
                <div className="container">
                    <div className={styles.filterList}>
                        {filters.map((f) => (
                            <button
                                key={f.id}
                                className={`${styles.filterTab} ${activeFilter === f.id ? styles.filterTabActive : ''}`}
                                onClick={() => setActiveFilter(f.id)}
                            >
                                {f.label}
                            </button>
                        ))}
                    </div>
                </div>
            </nav>

            <main className={styles.mainContent}>
                <div className="container">
                    {filteredData.length === 0 ? (
                        <div className={styles.emptyState}>
                            <h3>No {activeFilter === 'all' ? '' : activeFilter} materials found.</h3>
                            <p>Requested content is currently being curated by our academy professors. Please check back soon.</p>
                            <button className="btn btn-primary" style={{ marginTop: '1.5rem' }} onClick={() => setActiveFilter('all')}>
                                View All Available Content
                            </button>
                        </div>
                    ) : (
                        <>
                            {/* Quick Jump Grid */}
                            <div className={styles.subjectGrid}>
                                {filteredData.map((s, i) => (
                                    <a key={i} href={`#${s.subject}`} className={styles.subjectCard}>
                                        {s.subject}
                                    </a>
                                ))}
                            </div>

                            {/* Subject Sections */}
                            {filteredData.map((section, idx) => (
                                <section key={idx} id={section.subject} className={styles.subjectSection}>
                                    <h2 className={styles.subjectTitle}>
                                        <span>🎓</span> {section.subject}
                                    </h2>
                                    <div className={styles.materialList}>
                                        {section.materials.map((mat, mIdx) => (
                                            <div key={mIdx} className={styles.materialRow}>
                                                <div className={styles.materialIcon}>
                                                    {getIconForType(mat.type)}
                                                </div>
                                                <div className={styles.materialInfo}>
                                                    <h3 className={styles.materialTitle}>{mat.title}</h3>
                                                    <div className={styles.materialMeta}>
                                                        <span
                                                            className={styles.badge}
                                                            style={getBadgeStyle(mat.type)}
                                                        >
                                                            {mat.type}
                                                        </span>
                                                        <span className={styles.dot}>•</span>
                                                        <span>{mat.author || 'Academy Expert'}</span>
                                                        {mat.created_at && (
                                                            <>
                                                                <span className={styles.dot}>•</span>
                                                                <span>{new Date(mat.created_at).toLocaleDateString()}</span>
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                                <a href={mat.link} target="_blank" rel="noopener noreferrer" className={styles.downloadBtn}>
                                                    Download Material
                                                </a>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            ))}
                        </>
                    )}
                </div>
            </main>
        </div>
    );
}
