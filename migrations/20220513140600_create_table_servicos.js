/* 
    ID INTEGER NOT NULL,
    NOME_SERVICO VARCHAR(200),
    DESCRICAO VARCHAR(244),
    PRIMARY KEY (ID)
*/
exports.up = function(knex, Promise) {
    return knex.schema.createTable('servicos', table => {
        table.increments('id').primary();
        table.string('nome_servico').notNull();
        table.string('descricao',1000).notNull();
    })
  
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('servicos');
};
