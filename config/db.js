const config = require ('../knexfile.js');
const knex = require ('knex')(config); //puxando o knex junto com a configuração

knex.migrate.latest([config])

module.exports = knex;