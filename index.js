/* Rode os comandos no terminal para setar seu ambiente:
npm start;
psql -U postgres

*/


const app = require('express')();
const consign = require('consign'); //O consign ajuda a interpretar e juntar os dados, facilitando o trabalho
const db = require('./config/db')

app.db = db; //com isso, podemos usar o app.db para chamar o que for necessario de manipulação do BD

consign()
    .then('./config/middlewares.js')
    .then('./api/validation.js')
    .then('./api')
    .then('./config/routes.js')
    .into(app)

app.listen(3000, () => {
    console.log('Backend ola')
})