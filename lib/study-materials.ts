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
    try {
        const { data, error } = await supabase
            .from('study_materials')
            .select('*')
            .eq('standard', std)
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching materials:', error);
            return [];
        }

        if (!data || data.length === 0) {
            return [];
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
        return [];
    }
};
