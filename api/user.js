const bcrypt = require('bcrypt-nodejs')

module.exports = app => {
    const {existsOrError, notExistsOrError, equalsOrError} =  app.api.validation

    const encryptPassword = password =>{
        const salt = bcrypt.genSaltSync(10); //Gerando a seed para a hash da senha
        return bcrypt.hashSync(password, salt);
    }

    const save = async (req, res) => {
        const user = {...req.body}
        if(req.params.id) user.id = req.params.id

        try {
            existsOrError(user.cpf, 'Cpf não informado.')
            existsOrError(user.email, 'Email não informado')
            existsOrError(user.nome, 'Nome não informado')
            existsOrError(user.senha, 'Senha não informada')
            existsOrError(user.genero, 'Gênero não informado')
            existsOrError(user.telefone, 'Telefone não informado')

            const userFromDB = await app.db('users')
                .where({emai: user.email}).first()
            if(!user.id) {
                notExistsOrError(userFromDB, 'usuário não cadastrado')
            }
        }   catch (msg){
            return res.status(400) 
        }

        user.password = encryptPassword(user.password)

        if(user.id) {
            app.db('users')
                .update(user)
                .where({ id: user.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err)) 
        } else {
            app.db('users')
                .insert(user)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const get = (req,res) => {
        app.db('users')
            .select('cpf','nome','email','telefone')
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err))
    }

    const getByCpf = (req, res) => {
        app.db('users')
            .select('cpf','nome','email','telefone')
            .where({id: req.params.id})
            .first()
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err))
    }

    return {save, get, getByCpf} //retornando a função como objeto
}