import styles from './style.module.css';

// Mock data generator
const getMaterials = () => {
    const subjects = ['Tamil', 'English', 'Maths', 'Physics', 'Chemistry', 'Biology', 'Computer Science'];

    // Just returning mock materials
    return subjects.map(sub => ({
        subject: sub,
        materials: [
            { id: 1, title: `${sub} - Quarterly Exam 2025 Original Question Paper`, author: 'TNDGE', type: 'Question Paper' },
            { id: 2, title: `${sub} - Unit 1 Slow Learners Guide`, author: 'Victory Academy', type: 'Study Material' },
            { id: 3, title: `${sub} - Full Portion Test Question Paper`, author: 'Ravi Sir', type: 'Model QP' },
        ]
    }));
};

// We need to await params in Next.js 15+ (if using latest, params is a Promise)
// But to be safe with types, let's treat it as potentially async or use proper type.
// Since we used `create-next-app@latest`, let's assume async params.

type Params = Promise<{ standard: string }>;

export default async function StandardPage(props: { params: Params }) {
    const params = await props.params;
    const standard = params.standard.replace('std-', '') + 'th Standard';

    const subjectsData = getMaterials();

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
                                        {subjectBlock.materials.map((mat, mIdx) => (
                                            <tr key={mIdx}>
                                                <td>{mat.title}</td>
                                                <td><span className="badge" style={{ background: '#e2e8f0', color: '#475569' }}>{mat.type}</span></td>
                                                <td>{mat.author}</td>
                                                <td><button className={styles.downloadBtn}>Download PDF</button></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
