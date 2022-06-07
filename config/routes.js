module.exports = app => {
    app.route('/users')
        .post(app.api.user.save)
        .get(app.api.user.get)

    app.route('/users/:id')
        .put(app.api.user.save)
        .get(app.api.user.get)

    app.route('/servicos')
        .get(app.api.servicos.get)
        .post(app.api.servicos.save)
        .delete(app.api.servicos.remove)

    app.route ('/servicos/tree')
        .get(app.api.servicos.getTree)

 /*   app.route('/servicos/:id')
        .get(app.api.category.getById)      debugar dps
        .put(app.api.category.save)
        .delete(app.api.category.remove)
    */
    }