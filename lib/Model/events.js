const { Model } = require('objection');
const knex = require('../../Connection/knex')
Model.knex(knex)


class Events extends Model {
    static get tableName() {
        return 'events';
    }
    static get jsonSchema() {
        return {
            type: 'object',
            required: ['event'],
            properties: {
              id: { type: 'integer' },
              event: { type: 'string', minLength: 1, maxLength: 255 },
              description:{type:'string'},
              event_creator:{type:'string'},
              creator_role:{type:'string'},
              college: { type: 'string' },
              winner_team: { type: 'string' },
              team_captain: { type: 'string' },
              total_score: { type: 'integer' },
            }
          };
    }
}

module.exports = Events;