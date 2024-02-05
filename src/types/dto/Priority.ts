export enum Priority {
    NORMAL = 'NORMAL',
    VIP = 'VIP',
    INSTANT = 'INSTANT'
}

export function convertToPriority(value: string): Priority {
    if (!Object.values(Priority).includes(value as Priority)) {
        throw new Error('Priority not found');
    }
    return value as Priority;
}