import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('task', (table) => {
        table.uuid("id")
        table.text("name").notNullable
        table.text("description")
        table.integer("priority")
        table.integer("category")
        table.integer("status")
        table.timestamp("created_at").defaultTo(knex.fn.now()).notNullable
        table.date("estimated_date").defaultTo(knex.fn.now()).notNullable
        table.boolean("concluded")
    })
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('task')
}
