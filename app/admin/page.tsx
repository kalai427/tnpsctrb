'use client';

import { useState } from 'react';
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
        </div>
    );
}
