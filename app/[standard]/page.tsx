import styles from './style.module.css';
import { getMaterialsForStandard } from '@/lib/study-materials';

type Params = Promise<{ standard: string }>;

export default async function StandardPage(props: { params: Params }) {
    const params = await props.params;
    const standard = params.standard.replace('std-', '') + 'th Standard';

    // Get real data from our data file
    const subjectsData = await getMaterialsForStandard(params.standard);

    return (
        <div style={{ minHeight: '80vh' }}>
            <div className={styles.header}>
                <div className="container">
                    <h1 className={styles.title}>{standard} Study Materials</h1>
                    <p style={{ opacity: 0.8, marginTop: '10px' }}>
                        Select a subject to view available question papers, notes, and guides.
                    </p>
                </div>
            </div>

            <div className="container">
                {subjectsData.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '4rem' }}>
                        <h3>No materials found for this standard yet.</h3>
                        <p>Check back later!</p>
                    </div>
                ) : (
                    <>
                        <h2 className="section-title">Subjects</h2>
                        <div className={styles.subjectGrid}>
                            {subjectsData.map((s, i) => (
                                <a key={i} href={`#${s.subject}`} className={styles.subjectCard}>
                                    <h3>{s.subject}</h3>
                                </a>
                            ))}
                        </div>

                        <div className="content-area">
                            {subjectsData.map((subjectBlock, index) => (
                                <div key={index} id={subjectBlock.subject} style={{ marginBottom: '3rem', scrollMarginTop: '100px' }}>
                                    <h2 className="section-title" style={{ fontSize: '1.5rem' }}>{subjectBlock.subject}</h2>
                                    <div className={styles.materialsSection}>
                                        <table className={styles.table}>
                                            <thead>
                                                <tr>
                                                    <th>Material Title</th>
                                                    <th>Type</th>
                                                    <th>Author</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {subjectBlock.materials.length > 0 ? (
                                                    subjectBlock.materials.map((mat, mIdx) => (
                                                        <tr key={mIdx}>
                                                            <td>{mat.title}</td>
                                                            <td><span className="badge" style={{ background: '#e2e8f0', color: '#475569' }}>{mat.type}</span></td>
                                                            <td>{mat.author}</td>
                                                            <td>
                                                                <a href={mat.link} target="_blank" rel="noopener noreferrer" className={styles.downloadBtn}>
                                                                    Download
                                                                </a>
                                                            </td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan={4} style={{ textAlign: 'center', padding: '1rem', color: '#888' }}>No materials added yet.</td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
