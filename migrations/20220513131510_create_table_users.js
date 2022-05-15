/*	CPF varchar(20) NOT NULL,
    DATA_NASCIMENTO DATE,
    EMAIL VARCHAR(100),
    NOME VARCHAR(80),
	GENERO VARCHAR(15),
    SENHA VARCHAR(100),
    TELEFONE VARCHAR(15),*/

exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', table => {
        table.string('cpf').primary();
        table.string('email').notNull();
        table.string('nome').notNull();
        table.string('senha').notNull();
        table.string('genero').notNull();
        table.string('telefone').notNull();
    })


};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('users');
};
