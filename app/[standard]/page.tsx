import { getMaterialsForStandard } from '@/lib/study-materials';
import StandardClientPage from './StandardClientPage';
import { Metadata } from 'next';

type Params = Promise<{ standard: string }>;

export async function generateMetadata(props: { params: Params }): Promise<Metadata> {
    const params = await props.params;
    const standardNum = params.standard.replace('std-', '');
    return {
        title: `${standardNum}th Standard Study Materials - TNPSCTRB Academy`,
        description: `Download free Samacheer Kalvi aligned textbooks, notes, and question papers for ${standardNum}th Standard.`,
    };
}

export default async function StandardPage(props: { params: Params }) {
    const params = await props.params;
    const std = params.standard;
    const displayStandard = std.replace('std-', '') + 'th Standard';

    // Get real data from Supabase
    const subjectsData = await getMaterialsForStandard(std);

    return (
        <StandardClientPage
            standard={std}
            displayStandard={displayStandard}
            subjectsData={subjectsData}
        />
    );
}
