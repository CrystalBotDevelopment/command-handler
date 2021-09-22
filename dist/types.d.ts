import { APIApplicationCommandOption } from 'discord-api-types/v9';
export declare type InversePartial<T> = {
    [P in keyof T]-?: T[P];
};
export declare type Constructor<T = any> = Function & {
    prototype: T;
};
export interface ApplicationCommand {
    name: string;
    description: string;
    default_permission?: boolean;
    options?: APIApplicationCommandOption[];
}
