
exports.up = function(knex, Promise) {
    return knex.schema.createTable('sponsers', table => {
        table.increments('id').primary();
        table.string('sponser_name').notNullable();
        table.string('sponser_email').notNullable();
        table.bigInteger('sponser_contact').notNullable();
        table.string('company_name').notNullable();
        table.string('sponsering_amount').notNullable();
        table.string('event').notNullable();
    })
  };

  exports.down = function(knex, Promise) {
    return knex.schema.dropTable('sponsers')
  };
