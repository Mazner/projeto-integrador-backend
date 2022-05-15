/*	
    CPF_CLIENTE VARCHAR(20) NOT NULL, 
    CEP CHAR(8) NOT NULL,
	CIDADE VARCHAR(30) NOT NULL,
    ESTADO VARCHAR(30) NOT NULL,
    BAIRRO VARCHAR(30) NOT NULL,
	RUA VARCHAR(30),
    NUMERO_LOGRADOURO VARCHAR(10),
    
    PRIMARY KEY(CPF_CLIENTE),
    FOREIGN KEY (CPF_CLIENTE) REFERENCES CLIENTE(CPF)
    */
exports.up = function(knex, Promise) {
    return knex.schema.createTable('cliente_localizacao', table =>{
        table.increments('id').primary();
        table.string('cpf_morador').references('cpf')
        .inTable('users').notNull();

        table.string('cep').notNull();
        table.string('cidade').notNull();
        table.string('estado').notNull();
        table.string('bairro').notNull();
        table.string('rua').notNull();
        table.integer('n_logradouro').notNull();
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('cliente_localizacao');
};
