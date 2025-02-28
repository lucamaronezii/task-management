import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable('task', (table) => {
        table.uuid('id').alter().primary()
        table.boolean('concluded').alter().defaultTo(false)
    })
}


export async function down(knex: Knex): Promise<void> {

}
