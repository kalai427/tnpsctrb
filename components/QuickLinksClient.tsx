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
}

export default function QuickLinksClient({ links }: QuickLinksProps) {
    const [expandedParents, setExpandedParents] = useState<Record<number, boolean>>({});

    const toggleParent = (id: number) => {
        setExpandedParents(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    // Build tree structure
    const parents = links.filter(link => !link.parent_id);
    const childrenMap = links.reduce((acc, link) => {
        if (link.parent_id) {
            if (!acc[link.parent_id]) acc[link.parent_id] = [];
            acc[link.parent_id].push(link);
        }
        return acc;
    }, {} as Record<number, QuickLink[]>);

    if (links.length === 0) {
        return (
            <ul className={styles.linkList}>
                <li><a href="/textbooks">10th/11th/12th Text Books</a></li>
                <li><a href="/timetable">Public Exam Time Table</a></li>
                <li><a href="/lesson-plan">Lesson Plan 2026</a></li>
                <li><a href="/model-papers">PTA Model Question Papers</a></li>
            </ul>
        );
    }

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
