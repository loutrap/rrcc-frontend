import { Department } from './department';

/* Message interface represents a message with a message string and list of departments */
export interface Message {
    message: string;
    departments: Department[];
}
