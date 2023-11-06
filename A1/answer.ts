/**
 * In this challenge, you must sort students by their age (younger first). If some of them have
 * the same age, then you should sort them alphabetically (A to Z)
 * 
 * @param students Unsorted list of students
 * @returns Sorted list of students
 */

// ↓ uncomment bellow lines and add your response!

export default function ({ students }: { students: Student[] }): Student[] {
    
    return students.sort((a, b) => {
        if (a.age === b.age) {
            return a.name.localeCompare(b.name); // Trie par nom
        }
        return a.age - b.age; // Trie par âge
    });
}


// used interfaces, do not touch
export interface Student {
    name: string;
    age: number;
    skills: string[];
}