'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { v4 as uuidv4 } from 'uuid';
import styles from './admin.module.css';

export default function AdminPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');

    // Form State
    const [title, setTitle] = useState('');
    const [standard, setStandard] = useState('std-10');
    const [subject, setSubject] = useState('Tamil');
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    // Quick Links State
    const [linkTitle, setLinkTitle] = useState('');
    const [linkUrl, setLinkUrl] = useState('');
    const [linkPosition, setLinkPosition] = useState('');
    const [parentLink, setParentLink] = useState<string>('null');
    const [quickLinks, setQuickLinks] = useState<any[]>([]);
    const [linkLoading, setLinkLoading] = useState(false);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Simple hardcoded password for demonstration - in prod use Env vars or proper Auth
        if (password === 'admin123') {
            setIsAuthenticated(true);
        } else {
            alert('Invalid Password');
        }
    };

    const handleUpload = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file) return;
        setLoading(true);
        setMessage(null);

        try {
            const filename = `${standard}-${subject}-${uuidv4()}.pdf`;

            // 1. Upload file to Supabase Storage
            const { data: uploadData, error: uploadError } = await supabase.storage
                .from('materials')
                .upload(filename, file);

            if (uploadError) throw uploadError;

            // 2. Get Public URL
            const { data: { publicUrl } } = supabase.storage
                .from('materials')
                .getPublicUrl(filename);

            // 3. Save Metadata to Database
            const { error: dbError } = await supabase
                .from('study_materials')
                .insert([
                    {
                        title,
                        standard,
                        subject,
                        author: 'Admin',
                        type: 'PDF',
                        link: publicUrl,
                        created_at: new Date()
                    }
                ]);

            if (dbError) throw dbError;

            setMessage({ type: 'success', text: 'File uploaded successfully!' });
            setTitle('');
            setFile(null);

            // Reset file input manually
            const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
            if (fileInput) fileInput.value = '';

        } catch (error: any) {
            console.error(error);
            setMessage({ type: 'error', text: error.message || 'Upload failed' });
        } finally {
            setLoading(false);
        }
    };

    const fetchQuickLinks = async () => {
        const { data, error } = await supabase
            .from('quick_links')
            .select('*')
            .order('position', { ascending: true });
        if (!error && data) setQuickLinks(data);
    };

    const handleAddLink = async (e: React.FormEvent) => {
        e.preventDefault();
        setLinkLoading(true);
        const { error } = await supabase
            .from('quick_links')
            .insert([{
                title: linkTitle,
                url: linkUrl,
                position: parseInt(linkPosition) || 0,
                parent_id: parentLink === 'null' ? null : parseInt(parentLink)
            }]);

        if (!error) {
            setLinkTitle('');
            setLinkUrl('');
            setLinkPosition('');
            setParentLink('null');
            fetchQuickLinks();
        } else {
            alert(error.message);
        }
        setLinkLoading(false);
    };

    const handleDeleteLink = async (id: number) => {
        if (!confirm('Are you sure?')) return;
        const { error } = await supabase
            .from('quick_links')
            .delete()
            .eq('id', id);
        if (!error) fetchQuickLinks();
        else alert(error.message);
    };

    // Load links when logged in
    useEffect(() => {
        if (isAuthenticated) fetchQuickLinks();
    }, [isAuthenticated]);

    if (!isAuthenticated) {
        return (
            <div className={styles.adminContainer}>
                <div className={styles.loginCard}>
                    <h1>Admin Login</h1>
                    <form onSubmit={handleLogin}>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Password</label>
                            <input
                                type="password"
                                className={styles.input}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button type="submit" className={styles.submitBtn}>Login</button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.adminContainer}>
            <div className={styles.uploadCard}>
                <h1>Upload Study Material</h1>

                <form onSubmit={handleUpload}>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Material Title</label>
                        <input
                            required
                            type="text"
                            className={styles.input}
                            placeholder="e.g. 10th Maths Quarterly Question Paper"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Standard</label>
                            <select className={styles.select} value={standard} onChange={(e) => setStandard(e.target.value)}>
                                <option value="std-10">10th Standard</option>
                                <option value="std-11">11th Standard</option>
                                <option value="std-12">12th Standard</option>
                            </select>
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Subject</label>
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
                            </select>
                        </div>
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Upload File (PDF)</label>
                        <div className={styles.fileInputWrapper}>
                            <input
                                required
                                type="file"
                                accept=".pdf"
                                onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
                            />
                        </div>
                    </div>

                    <button disabled={loading} type="submit" className={styles.submitBtn}>
                        {loading ? 'Uploading...' : 'Upload Material'}
                    </button>

                    {message && (
                        <div className={`${styles.statusMessage} ${message.type === 'success' ? styles.success : styles.error}`}>
                            {message.text}
                        </div>
                    )}
                </form>
            </div>

            <div className={styles.uploadCard} style={{ marginTop: '2rem' }}>
                <h1>Quick Links Manager</h1>
                <form onSubmit={handleAddLink}>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Link Title</label>
                        <input
                            required
                            type="text"
                            className={styles.input}
                            value={linkTitle}
                            onChange={(e) => setLinkTitle(e.target.value)}
                            placeholder="e.g. 10th Books"
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>URL</label>
                        <input
                            required
                            type="text"
                            className={styles.input}
                            value={linkUrl}
                            onChange={(e) => setLinkUrl(e.target.value)}
                            placeholder="https://..."
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Position (Lower comes first)</label>
                        <input
                            required
                            type="number"
                            className={styles.input}
                            value={linkPosition}
                            onChange={(e) => setLinkPosition(e.target.value)}
                            placeholder="1"
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Parent Link (Optional)</label>
                        <select
                            className={styles.select}
                            value={parentLink}
                            onChange={(e) => setParentLink(e.target.value)}
                        >
                            <option value="null">None (Top Level)</option>
                            {quickLinks.filter(l => !l.parent_id).map(link => (
                                <option key={link.id} value={link.id}>{link.title}</option>
                            ))}
                        </select>
                    </div>
                    <button disabled={linkLoading} type="submit" className={styles.submitBtn}>
                        {linkLoading ? 'Adding...' : 'Add Link'}
                    </button>
                </form>

                <div style={{ marginTop: '2rem' }}>
                    <h2 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Existing Links</h2>
                    <ul className={styles.adminLinkList}>
                        {quickLinks.map((link) => (
                            <li key={link.id} className={styles.adminLinkItem}>
                                <span>{link.position}. {link.title}</span>
                                <button
                                    onClick={() => handleDeleteLink(link.id)}
                                    className={styles.deleteBtn}
                                >
                                    Delete
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
