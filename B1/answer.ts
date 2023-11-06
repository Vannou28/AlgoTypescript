/**
 * In this challenge, you must sort events chronologically (oldest to latest) based on 
 * their startDatetime prop. If some events have the same startDatetime, then the shortest must appear
 * first
 * 
 * @param events Unsorted list of events
 * @returns Sorted list of events
 */

// ↓ uncomment bellow lines and add your response!

export default function ({ events }: { events: EventDatetime[] }): EventDatetime[] {
    events.sort((a, b) => {
        const dateA = new Date(a.startDatetime);
        const dateB = new Date(b.startDatetime);

        if (dateA < dateB) return -1; //placé avant
        if (dateA > dateB) return 1;    //placé apres

        // Si les startDatetime sont identiques, trier par la durée de l'événement
        const dureeA = new Date(a.endDatetime).getTime() - dateA.getTime();
        const dureeB = new Date(b.endDatetime).getTime() - dateB.getTime();

        if (dureeA < dureeB) return -1;
        if (dureeA > dureeB) return 1;

        return 0;
    });

    return events;
}


// used interfaces, do not touch
export interface EventDatetime {
    startDatetime: string;
    endDatetime: string;
    event: string;
}