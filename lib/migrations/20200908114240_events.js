
exports.up = function(knex) {
    return knex.schema.createTable('events', table => {
        table.increments('id').primary();
        table.string('event').notNullable().unique();
        table.string('description').notNullable();
        table.string('event_creator').notNullable();
        table.string('creator_role').notNullable();
        table.string('college').nullable();
        table.string('winner_team').nullable();
        table.string('team_captain').nullable();
        table.bigInteger('total_score').nullable();
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('events')
};
