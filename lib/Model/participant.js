const { Model } = require('objection');
const knex = require('../../Connection/knex')
Model.knex(knex);



class Participation extends Model {
  static get tableName() {
    return 'participations';
  }
  static get jsonSchema() {
    return {
      type: 'object',
      required: ['team_name','event_name','participant_name','college'],
      properties: {
        id: { type: 'integer' },
        event_name: { type: 'string'},
        participant_name: { type: 'string' },
        college: { type: 'string' },
        team_name: { type: 'string' },
        email: { type: 'string' }
      }
    };
  }
}

module.exports = Participation;