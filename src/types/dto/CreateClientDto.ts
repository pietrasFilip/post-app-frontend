import {Priority} from "./Priority";

export interface CreateClientDto {
    username: string;
    priority: Priority;
    password: string;
}