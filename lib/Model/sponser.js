const { Model } = require('objection');
const knex = require('../../Connection/knex')
  Model.knex(knex)
class Sponsor extends Model {
  static get tableName() {
    return 'sponsers';
  }
  static get jsonSchema() {
    return {
      type: 'object',
      required: ["sponser_email","sponsering_amount","event"],
      properties: {
        id: { type: 'integer' },
        sponser_name: { type: 'string'},
        sponser_email: { type: 'string' },
        sponser_contact: { type: 'integer' },
        company_name: { type: 'string' },
        sponsering_amount: { type: 'string' },
        event: {type: 'string'}
      }
    };
  }
}

module.exports = Sponsor;