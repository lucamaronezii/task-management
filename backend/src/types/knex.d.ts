import { UUID } from "crypto";
import { Knex } from "knex";

declare module 'knex/types/tables' {
    export interface Tables {
        task: {
            id: UUID;
            name: string;
            description?: string;
            priority?: number;
            category?: number;
            status?: number;
            created_at: Date;
            estimated_date: Date | string;
            session_id: UUID;
        }
    }
}