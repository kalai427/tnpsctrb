import { supabase } from './supabase';

export interface Material {
    id: number;
    title: string;
    author: string;
    type: string;
    link: string;
    created_at?: string;
}

export interface SubjectSection {
    subject: string;
    materials: Material[];
}

export const getMaterialsForStandard = async (std: string): Promise<SubjectSection[]> => {
    // Check if Supabase is properly configured
    const isSupabaseConfigured = process.env.NEXT_PUBLIC_SUPABASE_URL &&
        !process.env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder');

    if (!isSupabaseConfigured) {
        // Return dummy data if not configured to avoid console errors
        return getFallbackData(std);
    }

    try {
        const { data, error } = await supabase
            .from('study_materials')
            .select('*')
            .eq('standard', std)
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching materials:', error);
            return getFallbackData(std); // Return fallback on error too
        }

        if (!data || data.length === 0) {
            return getFallbackData(std);
        }

        // Group by subject
        const groupedMap = new Map<string, Material[]>();

        data.forEach((item: any) => {
            if (!groupedMap.has(item.subject)) {
                groupedMap.set(item.subject, []);
            }
            groupedMap.get(item.subject)!.push({
                id: item.id,
                title: item.title,
                author: item.author,
                type: item.type,
                link: item.link,
                created_at: item.created_at
            });
        });

        // Convert map to array
        const results: SubjectSection[] = [];
        groupedMap.forEach((materials, subject) => {
            results.push({ subject, materials });
        });

        return results;

    } catch (err) {
        console.error('Unexpected error:', err);
        return getFallbackData(std);
    }
};

// Helper for demonstration data
function getFallbackData(std: string): SubjectSection[] {
    const data: Record<string, SubjectSection[]> = {
        'std-10': [
            {
                subject: 'Tamil',
                materials: [
                    { id: 1, title: '10th Tamil Full Guide 2026', author: 'Victory', type: 'Guide', link: '#' },
                    { id: 2, title: '10th Tamil Quarterly Exam 2025 QP', author: 'Padasalai', type: 'Exam Paper', link: '#' }
                ]
            },
            {
                subject: 'Maths',
                materials: [
                    { id: 3, title: '10th Maths PTA Model QP 1', author: 'PTA', type: 'Model Paper', link: '#' }
                ]
            }
        ],
        'std-11': [
            {
                subject: 'Physics',
                materials: [
                    { id: 4, title: '11th Physics Unit 1 Notes', author: 'KSR', type: 'Notes', link: '#' }
                ]
            }
        ],
        'std-12': [
            {
                subject: 'Maths',
                materials: [
                    { id: 5, title: '12th Maths Volume 1 Guide', author: 'Loyola', type: 'Full Guide', link: '#' }
                ]
            }
        ]
    };

    return data[std] || [];
}
