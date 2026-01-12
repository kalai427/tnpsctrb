'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import styles from './admin.module.css';

export default function AdminPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [activeTab, setActiveTab] = useState<'materials' | 'news' | 'stats'>('materials');

    // Material Upload State
    const [title, setTitle] = useState('');
    const [standard, setStandard] = useState('std-10');
    const [subject, setSubject] = useState('Tamil');
    const [materialType, setMaterialType] = useState<'PDF' | 'MCQ' | 'Notes' | 'Exam'>('PDF');
    const [author, setAuthor] = useState('TNPSCTRB Academy');
    const [file, setFile] = useState<File | null>(null);
    const [externalLink, setExternalLink] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    // Exam News State
    const [newsTitle, setNewsTitle] = useState('');
    const [newsContent, setNewsContent] = useState('');
    const [newsCategory, setNewsCategory] = useState('TNPSC');
    const [newsLoading, setNewsLoading] = useState(false);

    // Recent Materials State
    const [recentMaterials, setRecentMaterials] = useState<any[]>([]);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Use environment variable in production
        const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin123';
        if (password === adminPassword) {
            setIsAuthenticated(true);
            localStorage.setItem('admin_auth', 'true');
        } else {
            alert('Invalid Password');
        }
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('admin_auth');
    };

    const handleMaterialUpload = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        try {
            let materialLink = externalLink;

            // If file is uploaded, handle Supabase Storage
            if (file && materialType === 'PDF') {
                const timestamp = Date.now();
                const filename = `${standard}/${subject}/${timestamp}-${file.name}`;

                const { data: uploadData, error: uploadError } = await supabase.storage
                    .from('materials')
                    .upload(filename, file);

                if (uploadError) throw uploadError;

                const { data: { publicUrl } } = supabase.storage
                    .from('materials')
                    .getPublicUrl(filename);

                materialLink = publicUrl;
            }

            // Save to database
            const { error: dbError } = await supabase
                .from('study_materials')
                .insert([
                    {
                        title,
                        standard,
                        subject,
                        author,
                        type: materialType,
                        link: materialLink,
                        created_at: new Date().toISOString()
                    }
                ]);

            if (dbError) throw dbError;

            setMessage({ type: 'success', text: '✅ Material uploaded successfully!' });

            // Reset form
            setTitle('');
            setFile(null);
            setExternalLink('');
            const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
            if (fileInput) fileInput.value = '';

            // Refresh recent materials
            fetchRecentMaterials();

        } catch (error: any) {
            console.error(error);
            setMessage({ type: 'error', text: `❌ ${error.message || 'Upload failed'}` });
        } finally {
            setLoading(false);
        }
    };

    const handleNewsPublish = async (e: React.FormEvent) => {
        e.preventDefault();
        setNewsLoading(true);

        try {
            const { error } = await supabase
                .from('exam_news')
                .insert([
                    {
                        title: newsTitle,
                        content: newsContent,
                        category: newsCategory,
                        published_at: new Date().toISOString()
                    }
                ]);

            if (error) throw error;

            setMessage({ type: 'success', text: '✅ Exam news published!' });
            setNewsTitle('');
            setNewsContent('');

        } catch (error: any) {
            setMessage({ type: 'error', text: `❌ ${error.message}` });
        } finally {
            setNewsLoading(false);
        }
    };

    const fetchRecentMaterials = async () => {
        const { data } = await supabase
            .from('study_materials')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(10);

        if (data) setRecentMaterials(data);
    };

    const handleDeleteMaterial = async (id: number) => {
        if (!confirm('Are you sure you want to delete this material?')) return;

        const { error } = await supabase
            .from('study_materials')
            .delete()
            .eq('id', id);

        if (!error) {
            setMessage({ type: 'success', text: '✅ Material deleted' });
            fetchRecentMaterials();
        } else {
            setMessage({ type: 'error', text: `❌ ${error.message}` });
        }
    };

    useEffect(() => {
        const auth = localStorage.getItem('admin_auth');
        if (auth === 'true') {
            setIsAuthenticated(true);
        }
    }, []);

    useEffect(() => {
        if (isAuthenticated) {
            fetchRecentMaterials();
        }
    }, [isAuthenticated]);

    if (!isAuthenticated) {
        return (
            <div className={styles.loginWrapper}>
                <div className={styles.loginCard}>
                    <div className={styles.loginHeader}>
                        <h1>🎓 Professor's Desk</h1>
                        <p>TNPSCTRB Academy Admin Portal</p>
                    </div>
                    <form onSubmit={handleLogin} className={styles.loginForm}>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Admin Password</label>
                            <input
                                type="password"
                                className={styles.input}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter admin password"
                                autoFocus
                            />
                        </div>
                        <button type="submit" className={styles.loginBtn}>
                            Access Admin Panel
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.adminWrapper}>
            {/* Admin Header */}
            <header className={styles.adminHeader}>
                <div className={styles.headerContent}>
                    <div>
                        <h1>🎓 Professor's Desk</h1>
                        <p>Content Management System</p>
                    </div>
                    <button onClick={handleLogout} className={styles.logoutBtn}>
                        Logout
                    </button>
                </div>
            </header>

            {/* Tab Navigation */}
            <nav className={styles.tabNav}>
                <button
                    className={`${styles.tab} ${activeTab === 'materials' ? styles.tabActive : ''}`}
                    onClick={() => setActiveTab('materials')}
                >
                    📚 Upload Materials
                </button>
                <button
                    className={`${styles.tab} ${activeTab === 'news' ? styles.tabActive : ''}`}
                    onClick={() => setActiveTab('news')}
                >
                    📢 Publish Exam News
                </button>
                <button
                    className={`${styles.tab} ${activeTab === 'stats' ? styles.tabActive : ''}`}
                    onClick={() => setActiveTab('stats')}
                >
                    📊 Recent Uploads
                </button>
            </nav>

            <main className={styles.adminMain}>
                {/* Status Message */}
                {message && (
                    <div className={`${styles.alert} ${message.type === 'success' ? styles.alertSuccess : styles.alertError}`}>
                        {message.text}
                    </div>
                )}

                {/* Materials Upload Tab */}
                {activeTab === 'materials' && (
                    <div className={styles.panel}>
                        <h2 className={styles.panelTitle}>Upload Study Material</h2>
                        <form onSubmit={handleMaterialUpload} className={styles.form}>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Material Title *</label>
                                <input
                                    required
                                    type="text"
                                    className={styles.input}
                                    placeholder="e.g., 10th Maths Quarterly Question Paper 2026"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>

                            <div className={styles.formRow}>
                                <div className={styles.formGroup}>
                                    <label className={styles.label}>Standard *</label>
                                    <select className={styles.select} value={standard} onChange={(e) => setStandard(e.target.value)}>
                                        <option value="std-10">10th Standard</option>
                                        <option value="std-11">11th Standard</option>
                                        <option value="std-12">12th Standard</option>
                                        <option value="tnpsc">TNPSC</option>
                                        <option value="tet">TET</option>
                                        <option value="trb">TRB</option>
                                    </select>
                                </div>

                                <div className={styles.formGroup}>
                                    <label className={styles.label}>Subject *</label>
                                    <select className={styles.select} value={subject} onChange={(e) => setSubject(e.target.value)}>
                                        <option>Tamil</option>
                                        <option>English</option>
                                        <option>Maths</option>
                                        <option>Science</option>
                                        <option>Social Science</option>
                                        <option>Physics</option>
                                        <option>Chemistry</option>
                                        <option>Biology</option>
                                        <option>Computer Science</option>
                                        <option>General Knowledge</option>
                                    </select>
                                </div>

                                <div className={styles.formGroup}>
                                    <label className={styles.label}>Type *</label>
                                    <select className={styles.select} value={materialType} onChange={(e) => setMaterialType(e.target.value as any)}>
                                        <option value="PDF">PDF</option>
                                        <option value="Notes">Notes</option>
                                        <option value="MCQ">MCQ</option>
                                        <option value="Exam">Exam Paper</option>
                                    </select>
                                </div>
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.label}>Author</label>
                                <input
                                    type="text"
                                    className={styles.input}
                                    placeholder="TNPSCTRB Academy"
                                    value={author}
                                    onChange={(e) => setAuthor(e.target.value)}
                                />
                            </div>

                            <div className={styles.uploadOptions}>
                                <div className={styles.formGroup}>
                                    <label className={styles.label}>📎 Upload File (PDF)</label>
                                    <input
                                        type="file"
                                        accept=".pdf"
                                        className={styles.fileInput}
                                        onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
                                    />
                                </div>

                                <div className={styles.orDivider}>OR</div>

                                <div className={styles.formGroup}>
                                    <label className={styles.label}>🔗 External Link</label>
                                    <input
                                        type="url"
                                        className={styles.input}
                                        placeholder="https://example.com/material.pdf"
                                        value={externalLink}
                                        onChange={(e) => setExternalLink(e.target.value)}
                                    />
                                </div>
                            </div>

                            <button disabled={loading} type="submit" className={styles.submitBtn}>
                                {loading ? '⏳ Uploading...' : '✅ Upload Material'}
                            </button>
                        </form>
                    </div>
                )}

                {/* Exam News Tab */}
                {activeTab === 'news' && (
                    <div className={styles.panel}>
                        <h2 className={styles.panelTitle}>Publish Exam News</h2>
                        <form onSubmit={handleNewsPublish} className={styles.form}>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>News Title *</label>
                                <input
                                    required
                                    type="text"
                                    className={styles.input}
                                    placeholder="e.g., TNPSC Group 4 Exam Date Announced"
                                    value={newsTitle}
                                    onChange={(e) => setNewsTitle(e.target.value)}
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.label}>Category *</label>
                                <select className={styles.select} value={newsCategory} onChange={(e) => setNewsCategory(e.target.value)}>
                                    <option>TNPSC</option>
                                    <option>TET</option>
                                    <option>TRB</option>
                                    <option>General</option>
                                </select>
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.label}>Content *</label>
                                <textarea
                                    required
                                    className={styles.textarea}
                                    rows={6}
                                    placeholder="Enter the full news content here..."
                                    value={newsContent}
                                    onChange={(e) => setNewsContent(e.target.value)}
                                />
                            </div>

                            <button disabled={newsLoading} type="submit" className={styles.submitBtn}>
                                {newsLoading ? '⏳ Publishing...' : '📢 Publish News'}
                            </button>
                        </form>
                    </div>
                )}

                {/* Recent Materials Tab */}
                {activeTab === 'stats' && (
                    <div className={styles.panel}>
                        <h2 className={styles.panelTitle}>Recent Uploads</h2>
                        <div className={styles.materialsList}>
                            {recentMaterials.length === 0 ? (
                                <p className={styles.emptyState}>No materials uploaded yet.</p>
                            ) : (
                                recentMaterials.map((mat) => (
                                    <div key={mat.id} className={styles.materialItem}>
                                        <div className={styles.materialInfo}>
                                            <h3>{mat.title}</h3>
                                            <div className={styles.materialMeta}>
                                                <span className={styles.badge}>{mat.type}</span>
                                                <span>{mat.standard}</span>
                                                <span>•</span>
                                                <span>{mat.subject}</span>
                                                <span>•</span>
                                                <span>{new Date(mat.created_at).toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => handleDeleteMaterial(mat.id)}
                                            className={styles.deleteBtn}
                                        >
                                            🗑️ Delete
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
