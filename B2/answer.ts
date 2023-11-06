/**
 * In this challenge, you have to get all the categories from the events. The categories 
 * must be unique and sorted from A to Z.
 * 
 * Dans ce défi, vous devez obtenir toutes les catégories à partir des événements. 
 * Les catégories doivent être uniques et triées de A à Z.
 * 
 * @param events List of events with their categories
 * @returns All existing categories sorted alphabatically without duplicates (A to Z)
 */

// ↓ uncomment bellow lines and add your response!

export default function ({ events }: { events: EventWithCategory[] }): string[] {

    const allCategories: string[] = [];

    //on ajoute toutes les categories dans le tableau
    for (const event of events) {
        for (const category of event.categories) {
            if (allCategories.indexOf(category) === -1) {
                allCategories.push(category);
            }
        }
    }

    //on le trie en ordre alphabetique
    allCategories.sort();

    return allCategories;
}


// used interfaces, do not touch
export interface EventWithCategory {
    startDatetime: string;
    endDatetime: string;
    event: string;
    categories: string[];
}
