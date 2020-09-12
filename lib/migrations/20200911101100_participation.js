exports.up = function(knex) {
    return knex.schema.createTable('participations', table => {
        table.increments('id').primary();
        table.string('email').notNullable();
        table.string('participant_name').notNullable();
        table.string('event_name').notNullable();
        table.string('team_name').notNullable();
        table.string('college').notNullable();
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('participations')
};
