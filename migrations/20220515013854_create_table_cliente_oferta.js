/*	
    CPF_CLIENTE VARCHAR(20) NOT NULL,
    ID_SERVICO INTEGER NOT NULL,
    
    PRIMARY KEY(CPF_CLIENTE,ID_SERVICO),
    FOREIGN KEY (CPF_CLIENTE) REFERENCES CLIENTE(CPF),
    FOREIGN KEY (ID_SERVICO) REFERENCES SERVICO(ID)
*/
exports.up = function(knex, Promise) {
    return knex.schema.createTable('cliente_oferta', table => {
        table.increments('id').primary();

        table.string('cpf_cliente').references('cpf')
        .inTable('users').notNull();

        table.integer('id_servico').references('id')
        .inTable('servicos').notNull();
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('cliente_oferta')
};  
