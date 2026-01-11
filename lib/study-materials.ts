export interface Material {
    id: number;
    title: string;
    author: string;
    type: string;
    link: string; // URL to the PDF or external link
}

export interface SubjectSection {
    subject: string;
    materials: Material[];
}

export const studyMaterials: Record<string, SubjectSection[]> = {
    "std-10": [
        {
            subject: "Tamil",
            materials: [
                { id: 1, title: "10th Tamil - Public Exam Model Question Paper 2026", author: "TNDGE", type: "Question Paper", link: "/uploads/10th_tamil_model_2026.pdf" },
                { id: 2, title: "10th Tamil - Unit 1 Guide", author: "Surya Guides", type: "Study Material", link: "https://drive.google.com/file/d/example" },
            ]
        },
        {
            subject: "English",
            materials: [
                { id: 3, title: "10th English - Grammar Notes", author: "Way to Success", type: "Notes", link: "#" },
            ]
        },
        {
            subject: "Maths",
            materials: []
        }
    ],
    "std-11": [
        // Add 11th standard materials here
    ],
    "std-12": [
        // Add 12th standard materials here
    ]
};

// Helper function to get data safely
export const getMaterialsForStandard = (std: string) => {
    return studyMaterials[std] || [];
};
