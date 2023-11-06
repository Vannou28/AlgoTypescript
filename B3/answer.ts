/**
 * In this challenge, you must find and attach to each group the group (or groups)
 * with which the current group has the most skills in common. 
 * Attached groups must be sorted by their name (A to Z).
 * You must not change the order of the main list of groups.
 * 
 * Dans ce défi, vous devez trouver et attacher à chaque groupe le ou les groupes
avec lesquels le groupe actuel partage le plus de compétences. Les groupes attachés
doivent être triés par leur nom (de A à Z). Vous ne devez pas modifier l'ordre de
la liste principale des groupes.
 * 
 * @param groups List of groups without closestGroups
 * @returns The same list but with a new closestGroups prop on each
 */

// ↓ uncomment bellow lines and add your response!

export default function ({ groups }: { groups: GroupWithSills[] }): GroupWithSillsAndClosestGroups[] {
    // Créez une copie de la liste des groupes pour ne pas la modifier
    const groupsCopy: GroupWithSills[] = [...groups];

    // Créez une fonction pour calculer le nombre de compétences communes entre deux groupes
    const calculerCompetencesCommunes = (groupeA: GroupWithSills, groupeB: GroupWithSills): number => {
        return groupeA.skills.filter(skill => groupeB.skills.includes(skill)).length;
    };

    // Parcourez la liste de chaque groupe
    const groupesAvecProches: GroupWithSillsAndClosestGroups[] = groupsCopy.map(groupe => {
        // Triez la liste des groupes en fonction du nombre de compétences communes avec le groupe actuel
        const groupesTriés = groupsCopy
            .filter(g => g.name !== groupe.name) // Exclure le groupe actuel
            .sort((a, b) => {
                const competencesCommunesA = calculerCompetencesCommunes(groupe, a);
                const competencesCommunesB = calculerCompetencesCommunes(groupe, b);

                if (competencesCommunesA < competencesCommunesB) return 1;
                if (competencesCommunesA > competencesCommunesB) return -1;
                return a.name.localeCompare(b.name); // En cas d'égalité, triez par nom
            });

        // Sélectionnez les groupes avec le même nombre de compétences communes que le maximum
        const groupesProches = groupesTriés.filter(g => calculerCompetencesCommunes(groupe, g) === calculerCompetencesCommunes(groupe, groupesTriés[0]));

        return {
            ...groupe,
            closestGroups: groupesProches,
        };
    });

    return groupesAvecProches;
}


// used interfaces, do not touch
export interface GroupWithSills {
    name: string;
    skills: string[];
}

export interface GroupWithSillsAndClosestGroups extends GroupWithSills {
    closestGroups: GroupWithSills[];
}
