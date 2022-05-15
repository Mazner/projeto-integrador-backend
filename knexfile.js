// Update with your config settings.

module.exports = {

    client: 'postgresql',
    connection: {
      database: 'quebra_meu_galho',
      user:     'postgres',
      password: '24227443'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }

};
