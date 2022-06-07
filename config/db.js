/* Comandos para rodar o postgree no cmd:
1º- psql -U postgres
2º- \l para listar os DBs
3º- \c quebra_meu_galho para se conectar ao DB do app
4º- \dt para listar as tabelas
*/

const config = require ('../knexfile.js');
const knex = require ('knex')(config); //puxando o knex junto com a configuração

knex.migrate.latest([config])

module.exports = knex;