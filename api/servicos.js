//Aqui criaremos a parte que administra os serviços, atualiza eles no banco de dados, e também exclui
//Tudo isso será feito depois pelo usuário no front end

module.exports = app => {
    const { existsOrError, notExistsOrError } = app.api.validation

    const save = ( req, res ) =>{
        const servicos = { ...req.body }
        if(req.params.id) servicos.id = req.params.id

        try{
            existsOrError(servicos.name, 'nome não informado')
        } catch (msg) {
            return res.status(400).send(msg)
        }

        if(servicos.id){
            app.db('servicos')
            .update(servicos)
            .where({ id: servicos.id})
            .then (_ => res.status(204).send())
            .catch(err => res.status(500).send(err))        
        } else {
            app.db('servicos')
                .insert(servicos)
                .then(_ =>res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const remove = async (req, res) =>{
        try {
            existsOrError(req.params.id, 'Código do servico não informado!') //verifica se o servico existe

            const subservice = await app.db('servicos') //verifica se o serviço é pai de algum outro, caso seja, não realizaremos a exclusão
                .where({ parentId: req.params.id})

            notExistsOrError(subservice, 'O serviço possui subserviços!')

            const cliente_oferta = await app.db('cliente_oferta')
                .where({ cliente_ofertaId: req.params.id})
            notExistsOrError(cliente_oferta, 'O servico possui ofertas')

            const rowsDeleted = await app.db('servicos')
                .where({id: req.params.id}).del()
            existsOrError(rowsDeleted, 'Serviço não encontrado!')

            res.status(204).send()
        } catch(msg) {
            res.status(400).send(msg)
        }
    }

    const withPath = servicos => {      //Cria uma hierarquia de servicos (servico pai, servico filho, etc)
        const getParent = (servicos, parentId) => {
            let parent = servicos.filter(parent => parent.id === parentId)
            return parent.lenght ? parent[0] : null //caso não encontre, retorna nulo
        }

        const servicosWithPath = servicos.map(servicos => {     //Nesta função fica a criação das pastas filhas, caso o serviço possua sub serviços
            let path = servicos.name
            let parent = getParent(servicos, servicos.parentId) 

            while(parent){      //Enquanto houver pais, fará a criação
                path = `${parent.name} > ${path}`
                parent = getParent(servicos, parent.parentId)
            }

            return { ...servicos, path}
        })

        servicesWithPath.sort((a, b)=> {  //Ordenar os servicos pelo caminho deles eg: Confeiteiro -> doces ->bolo de chocolate
            if(a.path < b.path) return -1
            if(a.path > b.path) return 1
            return 0
        })

        return servicesWithPath
    }
    
    const get = (req,res) => {
        app.db('servicos')
            .then(servicos => res.json(withPath(servicos)))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
            app.db('servicos')
                .where({ id: req.params.id})
                .first()
                .then(servicos => res.json(servicos))
                .catch(err=> res.status(500).send(err))
    }

    /*Criando a função que transformará em árvores de serviços para facilitar o usuário no fornecimento*/

    const toTree = (servicos, tree) => {
        if(!tree) tree = servicos.filter(c => !cparentId)
        tree = tree.map(parentNode => {
            const isChild = node => node.parentId == parentNode.id
            parentNode.children = toTree(servicos, servicos.filter(isChild))
            return parentNode
        })
        return tree
    }
    
    const getTree =(req, res) => {
        app.db('servicos')
            .then(servicos => res.json(toTree(servicos)))
            .catch(err => res.status(500).send(err))
    }    
    
    return {save,remove,get,getById, getTree}
}