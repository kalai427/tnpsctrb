import { supabase } from './supabase';

export interface Material {
    id: number;
    title: string;
    subject: string;
    standard: string;
    type: 'PDF' | 'MCQ' | 'Exam' | 'Notes';
    link: string;
    category?: string;
    sub_category?: string;
    created_at?: string;
}

export interface SubjectSection {
    subject: string;
    materials: Material[];
}

export interface UpdateItem {
    title: string;
    type: string;
    date: string;
    tag: string;
    badgeColor: string;
    textColor: string;
}

export interface ExamStat {
    name: string;
    mcqs: string;
    notes: string;
    icon: string;
}

// 1. Fetch Latest Updates across all categories
export const getLatestUpdates = async (): Promise<UpdateItem[]> => {
    try {
        const { data, error } = await supabase
            .from('study_materials')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(5);

        if (error || !data || data.length === 0) return getFallbackUpdates();

        return data.map(item => ({
            title: item.title,
            type: item.type,
            date: new Date(item.created_at).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
            tag: 'New',
            badgeColor: getBadgeColors(item.type).bg,
            textColor: getBadgeColors(item.type).text
        }));
    } catch {
        return getFallbackUpdates();
    }
};

// 2. Fetch Stats for Competitive Exams
export const getExamStats = async (category: string): Promise<ExamStat[]> => {
    // In a real app, you might have an 'exam_stats' table or aggregate 'study_materials'
    // For this step, we'll simulate the aggregation or return structured mock data from Supabase if available
    try {
        const { data, error } = await supabase
            .from('exam_stats')
            .select('*')
            .eq('category', category);

        if (error || !data || data.length === 0) return getFallbackExamStats(category);

        return data.map(item => ({
            name: item.name,
            mcqs: item.mcq_count,
            notes: item.notes_count,
            icon: item.icon
        }));
    } catch {
        return getFallbackExamStats(category);
    }
};

// 3. Helper for grouping materials by standard
export const getMaterialsForStandard = async (std: string): Promise<SubjectSection[]> => {
    try {
        const { data, error } = await supabase
            .from('study_materials')
            .select('*')
            .eq('standard', std)
            .order('created_at', { ascending: false });

        if (error || !data || data.length === 0) return [];

        const groupedMap = new Map<string, Material[]>();
        data.forEach((item: any) => {
            if (!groupedMap.has(item.subject)) groupedMap.set(item.subject, []);
            groupedMap.get(item.subject)!.push(item as Material);
        });

        return Array.from(groupedMap.entries()).map(([subject, materials]) => ({ subject, materials }));
    } catch {
        return [];
    }
};

// --- Fallback & Utility Functions ---

function getBadgeColors(type: string) {
    const colors: Record<string, { bg: string, text: string }> = {
        'PDF': { bg: '#e0f2fe', text: '#0369a1' },
        'MCQ': { bg: '#fef2f2', text: '#b91c1c' },
        'Exam': { bg: '#f0fdf4', text: '#15803d' },
        'Notes': { bg: '#f5f3ff', text: '#6d28d9' },
    };
    return colors[type] || { bg: '#f3f4f6', text: '#374151' };
}

function getFallbackUpdates(): UpdateItem[] {
    return [
        { title: '12th Physics Vol-1 Samacheer Book', type: 'PDF', date: 'Jan 12, 2026', tag: 'New', badgeColor: '#e0f2fe', textColor: '#0369a1' },
        { title: 'TNPSC Group-4 General Tamil MCQ', type: 'MCQ', date: 'Jan 11, 2026', tag: 'Hot', badgeColor: '#fef2f2', textColor: '#b91c1c' },
        { title: '10th Maths Model Question Paper', type: 'Exam', date: 'Jan 10, 2026', tag: 'Updates', badgeColor: '#f0fdf4', textColor: '#15803d' },
        { title: 'SSLC Science Chapter 5 Notes', type: 'Notes', date: 'Jan 09, 2026', tag: 'PDF', badgeColor: '#f5f3ff', textColor: '#6d28d9' },
    ];
}

function getFallbackExamStats(category: string): ExamStat[] {
    if (category === 'TNPSC') {
        return [
            { name: 'TNPSC Group 1', mcqs: '2,500+', notes: '150+', icon: '🏛️' },
            { name: 'TNPSC Group 2', mcqs: '3,200+', notes: '200+', icon: '🏛️' },
            { name: 'TNPSC Group 4', mcqs: '5,000+', notes: '350+', icon: '🏛️' },
            { name: 'VAO', mcqs: '1,800+', notes: '120+', icon: '🏘️' },
        ];
    }
    if (category === 'TET') {
        return [
            { name: 'TET Paper 1', mcqs: '2,100+', notes: '180+', icon: '📝' },
            { name: 'TET Paper 2', mcqs: '2,400+', notes: '190+', icon: '📖' },
        ];
    }
    return [
        { name: 'TRB Secondary Teacher', mcqs: '1,500+', notes: '100+', icon: '👨‍🏫' },
        { name: 'TRB PG Assistant', mcqs: '2,000+', notes: '140+', icon: '👨‍🎓' },
        { name: 'TRB BT Assistant', mcqs: '1,800+', notes: '120+', icon: '🧑‍🏫' },
    ];
}
