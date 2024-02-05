import {Priority} from "./Priority";

export interface GetClientDto {
    id: number;
    username: string;
    priority: Priority;
}