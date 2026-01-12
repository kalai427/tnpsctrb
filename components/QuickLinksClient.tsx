'use client';

import { useState } from 'react';
import styles from '@/app/page.module.css';

interface QuickLink {
    id: number;
    title: string;
    url: string;
    position: number;
    parent_id: number | null;
}

interface QuickLinksProps {
    links: QuickLink[];
    category?: 'std-10' | 'std-11' | 'std-12' | 'other';
}

export default function QuickLinksClient({ links, category }: QuickLinksProps) {
    const [expandedParents, setExpandedParents] = useState<Record<number, boolean>>({});

    const toggleParent = (id: number) => {
        setExpandedParents(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const getFilteredLinks = (allLinks: QuickLink[]) => {
        if (!category) return allLinks;

        if (category === 'other') {
            const forbiddenKeywords = ['10th', '11th', '12th'];
            return allLinks.filter(l => {
                const isStandardParent = forbiddenKeywords.some(key => l.title.includes(key)) && !l.parent_id;
                const parent = allLinks.find(p => p.id === l.parent_id);
                const isStandardChild = parent && forbiddenKeywords.some(key => parent.title.includes(key));
                return !isStandardParent && !isStandardChild;
            });
        }

        const standardKey = category.replace('std-', '') + 'th';
        return allLinks.filter(l => {
            const isTargetParent = l.title.includes(standardKey) && !l.parent_id;
            const parent = allLinks.find(p => p.id === l.parent_id);
            const isTargetChild = parent && parent.title.includes(standardKey);
            return isTargetParent || isTargetChild;
        });
    };

    const activeLinks = links.length > 0 ? getFilteredLinks(links) : [];

    // Build tree structure
    const parents = activeLinks.filter(link => !link.parent_id);
    const childrenMap = activeLinks.reduce((acc, link) => {
        if (link.parent_id) {
            if (!acc[link.parent_id]) acc[link.parent_id] = [];
            acc[link.parent_id].push(link);
        }
        return acc;
    }, {} as Record<number, QuickLink[]>);

    if (links.length === 0) {
        // Fallback or Initial Data structure
        const defaultLinks: QuickLink[] = [
            { id: 100, title: '10th Textbooks', url: '/std-10', position: 1, parent_id: null },
            { id: 101, title: 'Tamil', url: '/std-10/tamil', position: 1, parent_id: 100 },
            { id: 102, title: 'English', url: '/std-10/english', position: 2, parent_id: 100 },
            { id: 103, title: 'Maths', url: '/std-10/maths', position: 3, parent_id: 100 },

            { id: 110, title: '11th Textbooks', url: '/std-11', position: 2, parent_id: null },
            { id: 111, title: 'Tamil', url: '/std-11/tamil', position: 1, parent_id: 110 },
            { id: 112, title: 'English', url: '/std-11/english', position: 2, parent_id: 110 },

            { id: 120, title: '12th Textbooks', url: '/std-12', position: 3, parent_id: null },
            { id: 121, title: 'Tamil', url: '/std-12/tamil', position: 1, parent_id: 120 },
            { id: 122, title: 'Maths', url: '/std-12/maths', position: 2, parent_id: 120 },

            { id: 200, title: 'Public Exam Time Table', url: '/timetable', position: 4, parent_id: null },
            { id: 300, title: 'Lesson Plan 2026', url: '/lesson-plan', position: 5, parent_id: null },
            { id: 400, title: 'PTA Model Question Papers', url: '/model-papers', position: 6, parent_id: null },
        ];

        const filteredFallback = getFilteredLinks(defaultLinks);

        // Re-run the tree building logic for fallback links
        const fallbackParents = filteredFallback.filter(link => !link.parent_id);
        const fallbackChildrenMap = filteredFallback.reduce((acc, link) => {
            if (link.parent_id) {
                if (!acc[link.parent_id]) acc[link.parent_id] = [];
                acc[link.parent_id].push(link);
            }
            return acc;
        }, {} as Record<number, QuickLink[]>);

        if (fallbackParents.length === 0) return null;

        return (
            <ul className={styles.linkList}>
                {fallbackParents.map(parent => {
                    const hasChildren = fallbackChildrenMap[parent.id] && fallbackChildrenMap[parent.id].length > 0;
                    const isExpanded = expandedParents[parent.id];

                    return (
                        <li key={parent.id} className={styles.parentItem}>
                            {hasChildren ? (
                                <>
                                    <button
                                        className={`${styles.parentToggle} ${isExpanded ? styles.active : ''}`}
                                        onClick={() => toggleParent(parent.id)}
                                    >
                                        <strong>{parent.title}</strong>
                                        <span>{isExpanded ? '−' : '+'}</span>
                                    </button>
                                    {isExpanded && (
                                        <ul className={styles.subList}>
                                            {fallbackChildrenMap[parent.id].map(child => (
                                                <li key={child.id}>
                                                    <a href={child.url}>{child.title}</a>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </>
                            ) : (
                                <a href={parent.url} className={styles.standaloneParent}>
                                    <strong>{parent.title}</strong>
                                </a>
                            )}
                        </li>
                    );
                })}
            </ul>
        );
    }

    if (parents.length === 0) return null;

    return (
        <ul className={styles.linkList}>
            {parents.map(parent => {
                const hasChildren = childrenMap[parent.id] && childrenMap[parent.id].length > 0;
                const isExpanded = expandedParents[parent.id];

                return (
                    <li key={parent.id} className={styles.parentItem}>
                        {hasChildren ? (
                            <>
                                <button
                                    className={`${styles.parentToggle} ${isExpanded ? styles.active : ''}`}
                                    onClick={() => toggleParent(parent.id)}
                                >
                                    <strong>{parent.title}</strong>
                                    <span>{isExpanded ? '−' : '+'}</span>
                                </button>
                                {isExpanded && (
                                    <ul className={styles.subList}>
                                        {childrenMap[parent.id].map(child => (
                                            <li key={child.id}>
                                                <a
                                                    href={child.url || '#'}
                                                    target={child.url?.startsWith('http') ? '_blank' : '_self'}
                                                    rel="noopener noreferrer"
                                                >
                                                    • {child.title}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </>
                        ) : (
                            <a
                                href={parent.url || '#'}
                                target={parent.url?.startsWith('http') ? '_blank' : '_self'}
                                rel="noopener noreferrer"
                                className={styles.standaloneParent}
                            >
                                <strong>{parent.title}</strong>
                            </a>
                        )}
                    </li>
                );
            })}
        </ul>
    );
}
