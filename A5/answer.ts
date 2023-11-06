/**
 * In this challenge, you should compute a week planning split in 1 hour slots
 * and including existing events. To keep it simple, don't work with Dates!
 * Be carefull with leading 0!
 * 
 * Example:
 * Input: [{ day: "Monday", startTime: "09:00", endTime: "11:00", name: "First work day!" }]
 * Output: [
 *     { day: "Monday", startTime: "00:00", "endTime": "01:00"},
 *     { day: "Monday", startTime: "01:00", "endTime": "02:00"},
 *     ...,
 *     { day: "Monday", startTime: "09:00", "endTime": "10:00", event: [Object] },
 *     { day: "Monday", startTime: "10:00", "endTime": "11:00", event: [Object] },
 *     { day: "Monday", startTime: "11:00", "endTime": "12:00" },
 *     ...,
 *     { day: "Sunday", startTime: "23:00", "endTime": "00:00" },
 * ] 
 * 
 * @param events List of event to add on the planning
 * @returns List of planning slots, from Monday 00:00 to Sunday 00:00, 1 hour each slot
 */

// ↓ uncomment bellow lines and add your response!

export default function ({ events }: { events: Event[] }): PlanningSlot[] {
    const planning: PlanningSlot[] = [];

    // Créez des créneaux pour chaque jour de la semaine, de 00:00 à 23:00
    const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    for (const day of daysOfWeek) {
        for (let hour = 0; hour < 24; hour++) {
            const startTime = hour.toString().padStart(2,"0") +":00";
            const endTime = (hour + 1).toString().padStart(2,"0") +":00";
            planning.push({ day, startTime, endTime });
        }
    }

    // Ajoutez les événements aux créneaux correspondants
    for (const event of events) {
        const dayIndex = daysOfWeek.indexOf(event.day);
        if (dayIndex !== -1) {
            const eventStartHour = parseInt(event.startTime.split(":")[0]);
            const eventEndHour = parseInt(event.endTime.split(":")[0]);

            // Trouvez les créneaux correspondant à l'événement
            const relevantSlots = planning.filter(
                (slot) =>
                    slot.day === event.day &&
                    parseInt(slot.startTime.split(":")[0]) >= eventStartHour &&
                    parseInt(slot.endTime.split(":")[0]) <= eventEndHour
            );

            // Marquez les créneaux d'événement
            relevantSlots.forEach((slot) => (slot.event = event));
        }
    }

    return planning;
}


// used interfaces, do not touch
export interface Event {
    day: string;
    startTime: string;
    endTime: string;
    name: string;
}

export interface PlanningSlot {
    day: string;
    startTime: string;
    endTime: string;
    event?: Event;
}