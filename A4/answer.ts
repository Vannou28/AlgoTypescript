/**
 * In this challenge, you have to regroup messages into an array of day based on their
 * sentAt property.
 * You have to manipulate dates in vanillaJS. Be carefull to call, if needed, setUTCHours, setUTCMinutes, ... 
 * instead of setHouts, setMinutes, ... to avoid timezone offsets!
 *
 * Example:
 * Input: [{ message: "Hi there", sentAt: "2020-11-17T10:38:01.021Z" }, { message: "Hello", sentAt: "2020-11-17T11:45:01.721Z" }, { message: "It's a new day", sentAt: "2020-11-18T10:38:01.021Z" }]
 * Output: [
 *      {
 *          day: "2020-11-17T00:00:00.000Z",
 *          messages: [
 *              { message: "Hi there", sentAt: "2020-11-17T10:38:01.021Z" },
 *              { message: "Hello", sentAt: "2020-11-17T11:45:01.721Z" },
 *          ]
 *      },
 *      {
 *          day: "2020-11-18T00:00:00.000Z",
 *          messages: [
 *              { message: "It's a new day", sentAt: "2020-11-18T10:38:01.021Z" },
 *          ]
 *      },
 * ]
 * 
 * @param messages List of messages, unsorted and not grouped in days
 * @returns Sorted list of days (only days with messages!) with a list of sorted messages of the day
 */

import { exists } from "fs";

// ↓ uncomment bellow lines and add your response!

export default function ({ messages }: { messages: Message[] }): DayMessages[] {
    
    messages.sort((a, b) => new Date(a.sentAt).getTime() - new Date(b.sentAt).getTime());

    //on crée un tableau pour grouper les messages
    const groupedMessages: { [day: string]: Message[] } = {};

    for (const message of messages) {
        const sentAt = new Date(message.sentAt);
        //on recupère juste la date
        const day = new Date(Date.UTC(sentAt.getUTCFullYear(), sentAt.getUTCMonth(), sentAt.getUTCDate()));

        //transforme en string car on peut utilisé le format date comme index
        // toString ne marche pas -> Thu Nov 05 2020 01:00:00 GMT+0100
        // toISOString fonctionne -> 2020-11-05T00:00:00.000Z
        const dayISO = day.toISOString();

        //si ca existe pas on crée un tableau ac la date comme index
        if (groupedMessages[dayISO] == undefined ) {
            groupedMessages[dayISO] = [];
        }

        groupedMessages[dayISO].push(message);
    }

    const result: DayMessages[] = Object.keys(groupedMessages).map((day) => ({
        day,
        messages: groupedMessages[day],
    }));

    return result;
}


// used interfaces, do not touch
export interface Message {
    author: string;
    sentAt: string;
    message: string;
}

export interface DayMessages {
    day: string;
    messages: Message[];
}