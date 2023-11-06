/**
 * In this challenge, you have to add a list of skills to each group (based on 
 * students skills in the group). Duplicates skills for one group is not permitted. Skills must be
 * sorted alphabatically. Groups order, students order and students skills order must remain
 * untouched.
 * 
 * @param groups List of groups without skills, but with students
 * @returns List of groups with a new prop skills
 */

// ↓ uncomment bellow lines and add your response!

export default function ({ groups }: { groups: Group[] }): GroupWithSills[] {
        // Créez un ensemble pour stocker toutes les compétences uniques de tous les groupes
        const allSkillsSet = new Set<string>();

        // Parcourez les groupes pour extraire les compétences uniques et les ajouter à l'ensemble
        groups.forEach((group) => {
            group.students.forEach((student) => {
                student.skills.forEach((skill) => {
                    allSkillsSet.add(skill);
                });
            });
        });
    
        // Triez les compétences de manière alphabétique
        const allSkills = Array.from(allSkillsSet).sort();
    
        // Pour chaque groupe, ajoutez les compétences triées
        const groupsWithSkills: GroupWithSills[] = groups.map((group) => {
            // Créez une copie du groupe pour éviter de modifier l'original
            const groupCopy: GroupWithSills = { ...group, skills: [] };
    
            // Parcourez les étudiants pour extraire leurs compétences
            group.students.forEach((student) => {
                groupCopy.skills.push(...student.skills);
            });
    
            // Supprimez les compétences en double et triez-les
            groupCopy.skills = Array.from(new Set(groupCopy.skills)).sort();
    
            return groupCopy;
        });
    
        return groupsWithSkills;
    
}


// used interfaces, do not touch
interface Student {
    name: string;
    age: number;
    skills: string[];
}

export interface Group {
    students: Student[];
    name: string;
}

export interface GroupWithSills extends Group {
    skills: string[];
}