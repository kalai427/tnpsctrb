import Link from "next/link";

const newsItems = [
    { id: 1, title: "TN 10th Public Exam Time Table 2026 Released", date: "Jan 10, 2026", category: "Exam Updates", content: "The Directorate of Government Examinations has officially released the time table for the 10th Standard Public Examination." },
    { id: 2, title: "TRB Annual Planner 2026 is Out", date: "Jan 09, 2026", category: "Recruitment", content: "Teachers Recruitment Board has released the tentative planner for the year 2026." },
    { id: 3, title: "Instructions for Practical Exams", date: "Jan 08, 2026", category: "Academics", content: "Chief Education Officer released new guidelines for conducting 11th and 12th practical exams." },
    { id: 4, title: "Holiday Announced for Schools in Chennai", date: "Jan 07, 2026", category: "General", content: "Due to heavy rains, a holiday has been declared for all schools in Chennai district tomorrow." },
    { id: 5, title: "NEET 2026 Syllabus Revised?", date: "Jan 06, 2026", category: "Entrance Exmas", content: "NTA clarifies rumors about syllabus reduction for NEET 2026." }
];

export default function NewsPage() {
    return (
        <div className="container" style={{ padding: '2rem 1rem', minHeight: '80vh' }}>
            <h1 className="section-title">Latest Educational News</h1>

            <div style={{ display: 'grid', gap: '2rem', maxWidth: '800px', margin: '0 auto' }}>
                {newsItems.map(item => (
                    <div key={item.id} className="card" style={{ padding: '1.5rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                            <span className="badge" style={{ background: 'var(--primary-light)', color: 'white' }}>{item.category}</span>
                            <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{item.date}</span>
                        </div>
                        <h2 style={{ fontSize: '1.5rem', marginBottom: '0.8rem' }}>
                            <Link href={`/news/${item.id}`}>{item.title}</Link>
                        </h2>
                        <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>
                            {item.content}
                        </p>
                        <Link href={`/news/${item.id}`} style={{ color: 'var(--primary)', fontWeight: '600' }}>
                            Read More →
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
